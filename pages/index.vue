<template>
  <div class="app">
    <div class="vct_container">
      <div class="refreshConversationButton"  @click="messageList=[]">
        刷新
      </div>

      <div class="chat-message-container" ref="chatListDom">
        <div class="chat-message-info-container">


          <div v-if="filteredList.length===0" class="welcome-container">
            <div class="chat-logo-container">

              <div class="chat-logo">
                <img src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/chat-logo.svg">
              </div>
              <h1>How can I help you today?</h1>
            </div>



            <div class="features-container">

              <div class="feature-item" v-loadByAnimate>
                <h1>Help me study</h1>
                <p>vocabulary for a college entrance exam</p>
              </div>


              <div class="feature-item" v-loadByAnimate>
                <h1>Suggest some names</h1>
                <p>for my cafe-by-day, bar-by-night business</p>
              </div>

              <div class="feature-item" v-loadByAnimate>
                <h1>Explain this code:</h1>
                <p>"cat config.yaml | awk NF"</p>
              </div>

              <div class="feature-item" v-loadByAnimate>
                <h1>Make up a story</h1>
                <p>about Sharky, a tooth-brushing shark superhero</p>
              </div>


            </div>
          </div>


          <div v-if="filteredList.length!==0"  class="message-container" >
            <li v-for="(ms,msi) in filteredList">

              <div class="avatar" style="background-color: rgb(25, 195, 125); width: 24px; height: 24px;" :style="ms.role!=='user'? 'padding: 2px':''">
                <img  :src="ms.role==='user'?'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/unnamed.jpg':'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/chat-tx.svg'">
              </div>


              <div class="message-chat">
                <h1>{{ roleList.get(ms.role) }}</h1>
                <div class="res-message" v-html="markedRender(ms.content.replace(/^\n\n/, ''))"></div>
              </div>
            </li>
          </div>



        </div>
      </div>



<!--      @keydown.enter="sendMsg"-->
      <div class="bottom-container"  :style="`min-height:${bottomHeight}px`">
        <div class="message-send-container">
          <div class="input-container">
            <div class="flex w-full items-center">
              <div class="overflow-hidden [&amp;:has(textarea:focus)]:border-token-border-xheavy [&amp;:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
                <textarea
                          @keydown.enter.prevent
                          @keydown.enter="sendOrSave()"
                          v-model="messageContent"
                          placeholder="Message ChatGPT…"
                          id="prompt-textarea"
                          :rows="inputRow"
                          class="chat-gpt-input m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
                          :class="{inputMessageTextA:true}"
                          @input="handleInput"
                          style="max-height: 52px;height: auto"
                          :style="{'min-height':`${inputHeight}px`,'overflow-y':inputHeight===52? 'hidden':'auto'}">
                </textarea>


                <button @click="sendOrSave()"
                        :disabled="isTalking"
                        class="absolute md:bottom-3 md:right-3
                        dark:hover:bg-gray-900
                        dark:disabled:hover:bg-transparent right-2
                        dark:disabled:bg-white disabled:bg-black
                        disabled:opacity-10 disabled:text-gray-400
                        enabled:bg-black text-white p-0.5 border border-black
                        rounded-lg dark:border-white
                        dark:bg-white bottom-1.5 transition-colors"
                        style="cursor: pointer;z-index: 999"
                       :style="messageContent.length>0?  'background-color: #000000;opacity: 1':'background-color: #E5E5E5;opacity: 0.8; border-color:  #E5E5E5;'"
                        data-testid="send-button">
                  <span class="" data-state="closed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
                      <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="all-right">

          </div>
        </div>
      </div>


    </div>
  </div>
</template>




<script lang="ts" setup>
// @ts-ignore
import { EventSourcePolyfill } from 'event-source-polyfill';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { markedRender } from '../assets/libs/highlight'
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,onUpdated,onBeforeUnmount   } from "vue";
import cryptoJS from "crypto-js";
import { chat } from "../assets/libs/gpt";
import keywordsArray from "assets/js/keywordsChat/keywordsArray";
let keywords = keywordsArray.keywordsArrayList; // 添加你的关键词
import {fetchEventSource} from '@microsoft/fetch-event-source';

useHead({
  title: "ChatGPT",
  meta: [
    {name: 'keywords', content: "ChatGPT" },
    {name: 'description', content: "ChatGPT" }
  ],
})

const disabledButton = ref(false)



const roleList  = ref(new Map().set('user','You').set('assistant','ChatGPT'))

let apiKey = "sk-7eLfqi1RRheP7HpkQswwrRqqUQLae0OScbjru8plvZGsGtiM";
const requestPath = ref('https://api.chatanywhere.com.cn/v1/chat/completions')



let isConfig = ref(true);
let isTalking = ref(false);
const isMouseOver = ref(false)
let messageContent = ref("");







// @ts-ignore
function isStringAllSpaces(inputString) {
  // 使用trim()方法去掉字符串两端的空格，然后检查结果是否为空字符串
  return inputString.trim() === '';
}
function getAvailableButton(){
  // @ts-ignore
  if (isStringAllSpaces(messageContent.value) ||messageContent.value.length===0 || isTalking===true ){
    messageContent.value ='';
    return false;
  }else {
    return true
  }
}


const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
const messageList = ref([
  {
    role: "system",
    content: ""
  }
]);

const filteredList = computed(() => {
  return messageList.value.filter((v, index) => {
    return   v.role !== 'system';
  });
});


const chatListDom = ref(null);

const scrollToBottom = () => {
  if (!chatListDom.value) return;
  if (chatListDom.value) {
    // @ts-ignore
    chatListDom.value.scrollTop = chatListDom.value.scrollHeight;
  }
};
watch(messageList.value, () => nextTick(() => scrollToBottom()));




onMounted(() => {
  if (getAPIKey()) {
    switchConfigStatus();
  }
});




const appendLastMessageContent = (content: string) => (messageList.value[messageList.value.length - 1].content += content);

const sendOrSave = () => {
  if (isTalking.value===true){
/*    console.log("正在回复中 无法输入"+isTalking.value)*/
  }else {
    inputHeight.value=52
    contentHeight.value=52



    if (isStringAllSpaces(messageContent.value) || messageContent.value.length===0 ){
      messageContent.value ='';
      return;
    }
    if (isConfig.value) {
      if (saveAPIKey(messageContent.value.trim())) {
        switchConfigStatus();
      }
      clearMessageContent();
    } else {
      const content = messageContent.value.trim()
      let index = isKeywordHit(content, keywords)
      if (index !== -1) {
        // 如果包含关键词
        keywordsChat(index);
      } else {
        sendChatMessage();
      }
    }
  }
};


const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    if (messageList.value.length === 2) {
      messageList.value.pop();
    }
    messageList.value.push({ role: "user", content });
    clearMessageContent();
    messageList.value.push({ role: "assistant", content: "" });

    const controller = new AbortController()
    const signal = controller.signal
    fetchEventSource(requestPath.value, {
      method: 'POST',
      signal:signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: messageList.value,
      }),
      onmessage(event) {
        if (event.data !=='[DONE]'){
          const message = JSON.parse(event.data);
          appendLastMessageContent(message.choices[0].delta.content);
          isTalking.value=true
/*          console.log("回复中"+isTalking.value)*/
        }else {
          isTalking.value = false;
/*          console.log("回复完成")*/
          controller.abort()
        }
      },
      onclose(){
/*        console.log("回复完成并,关闭")*/
        isTalking.value = false;
        controller.abort()
      },
      onerror(err){
/*        console.log('发生错误:', err);*/
        isTalking.value = false;
        appendLastMessageContent("CONNECT ERROR");
        throw err
      }
    })
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {
    isTalking.value = false;
  }
};


const readStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    status: number
) => {
  let partialLine = "";

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });

    if (status !== 200) {
      const json = JSON.parse(decodedText); // start with "data: "
      const content = json.error.message ?? decodedText;
      appendLastMessageContent(content);
      return;
    }

    const chunk = partialLine + decodedText;
    const newLines = chunk.split(/\r?\n/);

    partialLine = newLines.pop() ?? "";

    for (const line of newLines) {
      if (line.length === 0) continue; // ignore empty message
      if (line.startsWith(":")) continue; // ignore sse comment message
      if (line === "data: [DONE]") return; //

      const json = JSON.parse(line.substring(6)); // start with "data: "
      const content =
          status === 200
              ? json.choices[0].delta.content ?? ""
              : json.error.message;
      appendLastMessageContent(content);
    }
  }
};


//余弦相似度 处理英文
function cosineSimilarity(str1, str2) {
  // 将字符串转换为词语数组
  const tokenize = (str) => str.toLowerCase().match(/\w+/g) || [];

  const tokens1 = tokenize(str1);
  const tokens2 = tokenize(str2);

  // 创建词频向量
  const vector1 = {};
  const vector2 = {};

  tokens1.forEach((token) => {
    vector1[token] = (vector1[token] || 0) + 1;
  });

  tokens2.forEach((token) => {
    vector2[token] = (vector2[token] || 0) + 1;
  });

  // 计算余弦相似度
  const dotProduct = Object.keys(vector1).reduce((acc, token) => {
    return acc + (vector1[token] || 0) * (vector2[token] || 0);
  }, 0);

  const magnitude1 = Math.sqrt(Object.keys(vector1).reduce((acc, token) => {
    return acc + Math.pow(vector1[token] || 0, 2);
  }, 0));

  const magnitude2 = Math.sqrt(Object.keys(vector2).reduce((acc, token) => {
    return acc + Math.pow(vector2[token] || 0, 2);
  }, 0));

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;  // 处理零向量
  }

  return dotProduct / (magnitude1 * magnitude2);
}


//编辑距离相似度
function similarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  const editDistance = new Array(longerLength + 1);
  for (let i = 0; i <= longerLength; i++) {
    editDistance[i] = new Array(shorter.length + 1);
    editDistance[i][0] = i;
  }
  for (let j = 0; j <= shorter.length; j++) {
    editDistance[0][j] = j;
  }
  for (let i = 1; i <= longerLength; i++) {
    for (let j = 1; j <= shorter.length; j++) {
      const cost = longer[i - 1] === shorter[j - 1] ? 0 : 1;
      editDistance[i][j] = Math.min(
          editDistance[i - 1][j] + 1,
          editDistance[i][j - 1] + 1,
          editDistance[i - 1][j - 1] + cost
      );
    }
  }
  const maxLen = Math.max(str1.length, str2.length);
  const editDistanceValue = editDistance[longerLength][shorter.length];
  const similarity = (1.0 - editDistanceValue / maxLen);
  return similarity;
}
const similarThreshold = 0.75; // 设置相似度阈值
function isKeywordHit(content) {
  let keywordsArray = keywords;
  const matchingIndices = [];
  let matchingIndicesMap = new Map()
  for (let i = 0; i < keywordsArray.length; i++) {
    const keywords = keywordsArray[i];
    const similarities = keywords.map(keyword => similarity(content, keyword));
    const maxSimilarity = Math.max(...similarities);
    if (maxSimilarity >= similarThreshold) {
      matchingIndices.push(i);
      matchingIndicesMap.set(i,maxSimilarity)
    }
  }
  if (matchingIndices.length > 0) {
    let maxSimilarityIndex = -1;
    let maxSimilarityValue = -1;
    matchingIndicesMap.forEach((similarityValue, index) => {
      if (similarityValue > maxSimilarityValue) {
        maxSimilarityValue = similarityValue;
        maxSimilarityIndex = index;
      }
    });
    return maxSimilarityIndex;
  } else {
    return -1;
  }
}

function keywordsChat(index){
  let content = ""
  content = messageContent.value
  isTalking.value = true;
  if (messageList.value.length === 2) {
    messageList.value.pop();
  }
  messageList.value.push({ role: "user", content });
  clearMessageContent();
  let message = ""
  if (keywordsArray.keywordsMap.get(index)){
    message = keywordsArray.keywordsMap.get(index).message
  }
  messageList.value.push({ role: "assistant", content: "" });

  const messageChunks = message.split(""); // 拆分消息成字符数组
  let currentIndex = 0;

  /*流式输出*/
  const addMessage = () => {
    if (currentIndex < messageChunks.length) {
      messageList.value[messageList.value.length-1].content += messageChunks[currentIndex];
      currentIndex++;
      if (currentIndex < messageChunks.length) {
        setTimeout(addMessage, 20); // 每隔1秒添加下一个字符
        isTalking.value = true;
      } else {
        isTalking.value = false;
      }
    }
  };
  // 开始添加消息字符
  addMessage();
}

const saveAPIKey = (apiKey: string) => {
  if (apiKey.slice(0, 3) !== "sk-" || apiKey.length !== 51) {
    alert("API Key 错误，请检查后重新输入！");
    return false;
  }
  const aesAPIKey = cryptoJS.AES.encrypt(apiKey, getSecretKey()).toString();
  localStorage.setItem("apiKey", aesAPIKey);
  return true;
};










const getAPIKey = () => {
  if (apiKey) return apiKey;
  const aesAPIKey = localStorage.getItem("apiKey") ?? "";
  apiKey = cryptoJS.AES.decrypt(aesAPIKey, getSecretKey()).toString(
      cryptoJS.enc.Utf8
  );
  return apiKey;
};
const getSecretKey = () => "lianginx";
const switchConfigStatus = () => (isConfig.value = !isConfig.value);
const clearMessageContent = () => (messageContent.value = "");

















const inputHeight = ref(52)
const bottomHeight = ref(85)
const inputRow = ref(1)

const contentHeight = ref(0)
const lineHeightA = ref(0)

const handleInput = () => {
  const textarea = document.getElementById('prompt-textarea') as HTMLTextAreaElement;
  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
  contentHeight.value = textarea.scrollHeight;
  const newInputRow = Math.max(Math.ceil(contentHeight.value / lineHeight), 1); // Ensure the minimum is 1

  // Update inputRow
  inputRow.value = newInputRow;

  if (messageContent.value==="" || messageContent.value.length===0){
    contentHeight.value = 52
  }
  textarea.style.height = 'auto'; // Reset height to auto to allow it to shrink
  textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content

  // Ensure the calculated height is within the specified range
  inputHeight.value = Math.min(Math.max(textarea.scrollHeight, 52), 200);

  if (messageContent.value==="" || messageContent.value.length===0){
    inputHeight.value = 52
  }
/*  console.log("inputHeight.value: " + inputHeight.value + " contentHeight" +contentHeight);*/
};




watch(messageContent,(newValue)=>{
  if (messageContent.value==="" || messageContent.value.length===0){
    inputRow.value = 1;
    inputHeight.value=52

    const textarea = document.getElementById('prompt-textarea') as HTMLTextAreaElement;
    textarea.value=''
    textarea.style.height = "52px";
  }
})


const handleWidthChange = () => {
  // 在宽度小于768px时执行的函数
  // 可以在这里添加你的逻辑
/*  console.log('Window width is less than 768px!');*/
};

const addResizeListener = () => {
  window.addEventListener('resize', handleWidthChange);
};

const removeResizeListener = () => {
  window.removeEventListener('resize', handleWidthChange);
};

onBeforeUnmount(() => {
  // 组件销毁前移除监听器，防止内存泄漏
  removeResizeListener();
});
</script>

<style scoped>
.vct_container{
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.inputMessageTextA{

}
.chat-message-container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
}
.chat-message-container::-webkit-scrollbar {
  width: 9px;
  height: 0px;
  background: transparent;
  overflow-x: auto;
}


.chat-message-info-container{
  width: 748px;
  height: 100%;
}

@media screen and (max-width: 748px){
  width: 100%;
  padding: 0 16px;
}



.bottom-container{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message-send-container{
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 768px;
}


.welcome-container{
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.chat-logo-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chat-logo{
  height: 72px;
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.075);
  box-shadow: 0px 0px 5px rgba(0,0,0,0.095);
  border-radius: 100000px;
}

.chat-logo-container>img{
  width: 48px;
  height: 48px;
}

.chat-logo-container>h1{
  font-size: 24px;
  font-weight: 500;
  color: #303133;
}

.features-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}


.feature-item{
  cursor: pointer;
  width: calc(50% - 5px);
  min-height: 64px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.075);
  margin-bottom: 10px;
  padding: 12px 16px;
}
.feature-item >h1{
  font-weight: 500;
  font-size: 15px;
  margin: 0;
  color: #303133;
}

.feature-item >p{
  font-size: 14px;
  margin: 0;
  color: #909399;
}


.message-container{
  position: relative;
  margin: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.message-container>li{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
}


.avatar{
  border-radius: 50000px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar>img{
  border-radius: 50000px;
  object-fit: cover;
}
.message-chat{
  width: calc(100% - 38px);
}
.message-chat>h1{
  margin: 0;
  font-size: 18px;
  font-weight: 500;

}


.chat-gpt-input{
  color: #303133;
  font-size: 16px;
  text-align: start; /* 文本水平居中 */
  line-height: 1.6; /* 控制文本在垂直方向的居中 */
}

.input-container{
  width: 100%;
  min-height: 52px;
}

.chat-gpt-input::-webkit-input-placeholder{
  height: 52px;line-height: 26px
}    /* 使用webkit内核的浏览器 */
.chat-gpt-input:-moz-placeholder{
  height: 52px;line-height: 26px
}                  /* Firefox版本4-18 */
.chat-gpt-input::-moz-placeholder{
  height: 52px;line-height: 26px
}                  /* Firefox版本19+ */
.chat-gpt-input:-ms-input-placeholder{
  height: 52px;line-height: 26px
}
.chat-gpt-input:focus{
  outline: none;

}

.refreshConversationButton{
  z-index: 999;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 20px;
}

.input-bg-black{
  background-color: #000000;
}

/*@media screen and ( max-width: 800px){
  .vct_container{
    padding: 0 10px;
  }

}*/
</style>
