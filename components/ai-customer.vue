<template>
  <div>
    <client-only> <!--   :href="getRandomChatCustomer()" target="_blank"-->
      <a  class="root-page"
          @click="isOpenChatWindows=!isOpenChatWindows">
        <img :src="welcomeData?.path1">
        <div class="point"></div>
      </a>
    </client-only>



    <transition name="fade">
      <div v-show="isOpenChatWindows" class="chat-windows">
        <div class="chat-header-container">
          <div class="message-notice-container">
            <div class="avatar-container">
              <img :src="welcomeData?.path1" alt="聊天头像">
            </div>
            <p></p>
            <h1>{{ welcomeData?.text1}}</h1>
          </div>
          <div class="close-button" @click="isOpenChatWindows=false">
            <!--          <img src="https://file.kwunphi.com/kwunphi4/images/svg/%E5%85%B3%E9%97%AD.svg">-->
            <div class="close-line"></div>
          </div>
        </div>




        <transition name="fadeEmo">
          <div v-if="isOpenEmo" class="emotion-container">
            <div class="emo-box">

              <div class="emo-item" v-for="(eItem,eIndex) in emoList" @click="goToSendEmo(eItem)">
                <t-image class="emo-item-img" :src="eItem.imgUrl"></t-image>
              </div>




            </div>
          </div>
        </transition>


        <div class="message-list-container" id="messageDivRef" ref="chatListDom" @scroll="handleScroll">

          <div style="padding: 0 20px">
            <template v-if="showHistoryMessage"  v-for="(gMessage,gIndex) in groupedMessages" >
              <div class="message-item"

                   v-for="(message,messageIdx) in gMessage.messageList" :class="message.role==='user'? 'userMessage':'assistantMessage'">
                <img class="avatar-img"  v-if="message.role!=='user'" src="https://file.kwunphi.com/kwunphi4/images/customService/ServiceLogo.png">
                <div class="chat-message">
                  <div class="role-container">
                    <!--                <h1>{{ roleMap.get(message.role)  }}</h1>-->
                    <p>{{message?.createTime}}</p>
                  </div>
                  <!--     用户消息       -->
                  <div v-if="message.role==='user'" class="message-container" v-copyText>
                    <div class="res-message" :class="{userMessageRes:message.role==='user'}"
                         v-html="markedRender(message.content.replace(/^\n\n/, ''))"></div>
                  </div>
                  <!--     chat消息       -->
                  <div v-else class="message-container" v-copyText>  <!--v-html="markedRender(message.content.replace(/^\n\n/, ''))"-->
                    <div class="res-message">

                      <md-editor
                          style="margin: 0;padding: 0"
                          v-model="message.content"
                          class="chatGPTMessage"
                          previewOnly
                      />
                    </div>


                  </div>

                </div>
                <img class="avatar-img" v-if="message.role==='user'" src="https://file.kwunphi.com/kwunphi4/images/customService/Boy-6%402x.svg">
              </div>
              <div class="history-message-tips">{{ gMessage?.dateText }}</div>
            </template>

            <div v-if="showHistoryMessage" class="goto-bottom-button c-center" @click="gotoBottom">
              <img  src="https://file.tentech.top/resource/official/svg/down-icon.svg">
            </div>


            <div class="history-message-tips tips-message">请您在沟通中遵循当地法律法规，怪虫服务团队将竭诚解答您的问题</div>

            <div v-if="!showHistoryMessage" style="cursor: pointer" class="history-message-tips" @click="showHistoryMessage=true">历史消息</div>


            <div class="message-item assistantMessage" >
              <img class="avatar-img" src="https://file.kwunphi.com/kwunphi4/images/customService/ServiceLogo.png">
              <div class="chat-message">
                <div class="role-container">
                  <!--              <h1>Kwunphi</h1>-->
                  <p>{{ getFormatDate(new Date())}}</p>
                </div>


                <template v-if="!welcomeDataLoading">
                  <div  class="message-container" >  <!--v-html="markedRender(message.content.replace(/^\n\n/, ''))"-->
                    <div class="res-message"  v-html="markedRender(welcomeData?.text6.replace(/^\n\n/, ''))" ></div>
                  </div>

                  <div class="message-container affiliate-messages"  >  <!--v-html="markedRender(message.content.replace(/^\n\n/, ''))"-->
                    <div class="res-message">
                      <p>{{ welcomeData?.text2 }}</p>
                      <div style="margin: 4px 0"></div>
                      <p class="affiliate-messages-item" @click="handleFollowUpMessage(faqItem)" v-for="(faqItem,fIndex) in welcomeData?.moduleItemList" >{{faqItem?.text1}}</p>
                    </div>
                  </div>
                </template>


              </div>
            </div>

            <div class="message-item" v-for="(message,messageIdx) in messageList" :class="message.role==='user'? 'userMessage':'assistantMessage'">

              <img class="avatar-img" v-if="message.role!=='user'" src="https://file.kwunphi.com/kwunphi4/images/customService/ServiceLogo.png">
              <div class="chat-message">
                <div class="role-container">
                  <!--              <h1>{{ roleMap.get(message.role)  }}</h1>-->
                  <p>{{message?.createTime}}</p>
                </div>
                <!--     用户消息       -->
                <div v-if="message.role==='user'" class="message-container" v-copyText>
                  <div class="res-message" :class="{userMessageRes:message.role==='user'}"
                       v-html="markedRender(message.content.replace(/^\n\n/, ''))"></div>
                </div>
                <!--     chat消息       -->
                <div v-else class="message-container" >  <!--v-html="markedRender(message.content.replace(/^\n\n/, ''))"-->
                  <div class="res-message">
                    <md-editor
                        style="margin: 0;padding: 0"
                        v-model="message.content"
                        class="chatGPTMessage"
                        previewOnly
                    />
                  </div>
                </div>

                <!--      跟随消息         -->
                <template v-if="message.followUp && message.followUp.length>0">
                  <div  class="message-container affiliate-messages"  @click="handleSelectFollowUpMessage(followUpItem)"  v-for="(followUpItem,followUpIdx) in message.followUp">  <!--v-html="markedRender(message.content.replace(/^\n\n/, ''))"-->
                    <div class="res-message" >
                      <md-editor
                          style="margin: 0;padding: 0"
                          v-model="followUpItem.message"
                          class="chatGPTMessage"
                          previewOnly
                      />
                    </div>
                  </div>
                </template>




              </div>
              <img class="avatar-img" v-if="message.role==='user'" src="https://file.kwunphi.com/kwunphi4/images/customService/Boy-6%402x.svg">
            </div>

          </div>

          <div class="message-mask"></div>



        </div>

        <div class="message-input-container">
          <div class="split-line"></div>
          <div class="message-input">
            <!--          @keydown.enter.prevent
                      @keydown.enter="sendOrSave"-->
            <el-input
                style="font-size: 16px"
                @keyup.enter="sendOrSave"
                type="textarea"
                class="no-border-input"
                resize="none"
                :height="33"
                v-model="messageContent"
                :autosize="{ minRows: 1, maxRows: 4 }"
                placeholder=""
            />


            <div ref="sendButton"  class="send-button" :class="{'available_Button':isCanSendMessages}"   @keyup.enter="sendOrSave"  @click="sendOrSave" >
              <img :src=" isTalking? 'https://file.kwunphi.com/kwunphi4/images/svg/24gf-square.svg':'https://file.kwunphi.com/kwunphi4/images/svg/%E5%8F%91%E9%80%81.svg'">
            </div>



          </div>
          <div class="bottom-message-input">
            <div class="file-input-contianer">

<!--                          <div class="emo-container" @click="isOpenEmo=!isOpenEmo">
                            <img src="https://file.kwunphi.com/kwunphi4/images/svg/%E8%A1%A8%E6%83%85.svg">
                          </div>-->


                          <div class="file-container"   @click="uploadFile">
                            <input type="file" ref="fileInput" style="display:none" @change="onFileChange">
                            <img   src="https://file.kwunphi.com/kwunphi4/images/svg/%E5%9B%9E%E5%BD%A2%E9%92%88.svg">
                          </div>

<!--                          <div class="file-container"  >
                            <img style="opacity: 1"  src="https://file.kwunphi.com/kwunphi4/images/svg/%E8%AF%9D%E7%AD%92.svg">
                          </div>-->




            </div>
            <div class="bottom-logo">
              <p>{{ welcomeData?.text5}}</p>
              <!--            <img src="https://file.kwunphi.com/kwunphi4/images/svg/%E6%B6%88%E6%81%AF.svg">-->
              <!--            <p>怪虫</p>-->
            </div>
          </div>
        </div>
      </div>
    </transition>




  </div>
</template>

<script lang="ts" setup>
import { useWebsiteConfigStore } from "@/stores/websiteConfig.js";
const websiteConfigStore = useWebsiteConfigStore();
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { user } from "@/stores/index.js";
const userStore = user();
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,watch,computed ,nextTick} from "vue";
import { useI18n } from "vue-i18n";
const { t,locale} = useI18n()
const router = useRouter()
const localePath = useLocalePath();
const route = useRoute()
import { markedRender } from '../assets/libs/highlight'
import {read, readCoze} from "~/utils/ai/aiUtils";
import {httpPrefix} from "~/enums/appEnum";
import axios from "axios";
import {generateNumericUUID, getFormatDate, timeAgoHistory} from "assets/js/commons";

const showHistoryMessage = ref(false)

const welcomeText = ref("怪虫机器人智能客服为您服务！请问有什么可以帮到您？")

const faqText = ref("<p>常见问题：<br><span  style=\"color: rgb(2, 100, 255);\">Model 3官方网站售价是多少？</span><br><span style=\"color: rgb(2, 100, 255);\">Model Y官方网站售价是多少？</span><br><span style=\"color: rgb(2, 100, 255);\">Model S官方网站售价是多少？</span><br><span style=\"color: rgb(2, 100, 255);\">Model X官方网站售价是多少？</span><br><span style=\"color: rgb(2, 100, 255);\">第一笔付款是多少？</span><br><span style=\"color: rgb(2, 100, 255);\">如何订购Cybertruck越野旅行车以及何时能提车？</span></p>")
function handleFollowUpMessage(messageItem :any){
  if (messageItem?.path1){
    //如果内链接存在
    router.push({path: localePath(`${messageItem.path1}`)})
  }else if (messageItem?.externalUrl) { // 假设path2是外部链接
    // 使用window.open打开新窗口或新标签页
    window.open(messageItem.externalUrl, '_blank');
  }else {
    sendChatMessage(messageItem?.text1)
  }
}

function gotoBottom(){
  scrollToBottom()
}
interface Message {
  content: string;
  role: "user" | "assistant" | "system";
  followUp:[],
  isRight:boolean
}
const messageList = ref<Message[]>([]);
const roleMap  = ref(new Map().set('user','You').set('assistant','Kwunphi'))
const emoList = ref([
  {
    name:"微笑",
    imgUrl:"https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg",
    text:"😊",
    markdown:"![微笑](https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg)\n"
  },
  {
    name:"大笑",
    imgUrl:"https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%A4%A7%E7%AC%91.svg",
    text:"😁",
    markdown:"![大笑](https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg)\n"
  },
  {
    name:"微笑",
    imgUrl:"https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg",
    text:"😊",
    markdown:"![微笑](https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg)\n"
  },
  {
    name:"大笑",
    imgUrl:"https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%A4%A7%E7%AC%91.svg",
    text:"😁",
    markdown:"![大笑](https://file.kwunphi.com/kwunphi4/images/svg/emo/%E5%BE%AE%E7%AC%91.svg)\n"
  },

])
const isOpenEmo = ref(false)

const sendButton = ref(null);

function goToSendEmo(eItem){
  messageContent.value += eItem.markdown
  isOpenEmo.value=false
}


let isTalking = ref(false);
const isOpenChatWindows = ref(false)
let messageContent = ref("");


const userId = userStore.getUserId;
//分页请求参数  查询最新的10条消息记录
const params = ref({
  column: "createTime",
  order: "desc",
  pageNo: 1,
  pageSize: 10,
  userId:userId,
})
//分页参数
const pageInfo = reactive({
  total:0,
  current:1,
  size:0,
  small:false,
  disabled:false,
  background:false,
})
const currentTopic = ref({})
const historyTopic = ref()
const historyTopicLoading = ref(true)

const chatListDom = ref(null);
const isUserScrollsUp = ref(false)

const sendOrSave = () => {
  if (isStringAllSpaces(messageContent.value) ||messageContent.value.length===0 || isTalking.value===true ){
    messageContent.value ='';
    return;
  }
  isUserScrollsUp.value=false
  sendChatMessage();

};

function handleSelectFollowUpMessage(followUpItem){
/*
  messageList.value.push({ role: "user", content: followUpItem.message ,createTime:getFormatDate(new Date()) });
*/

  sendChatMessage(followUpItem.message)
}

const appendLastMessageContent = (content: string) =>
    (messageList.value[messageList.value.length - 1].content += content);


const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    //如果没有话题则创建一个新话题
    if (historyTopic.value.length===0){
      let topicId = generateNumericUUID(19)
      currentTopic.value={
        id:topicId,
        title:content,
        userId:userId,
        language:locale.value
      }
      createTopic(currentTopic.value)
    }
    messageList.value.push({ role: "user", content: content ,createTime:getFormatDate(new Date()), followUp:[],isRight:true });
    clearMessageContent();
/*    const completion = await fetch(
        `https://api.chatanywhere.com.cn/v1/chat/completions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk-VcsMNS2JQziQbWaFdmRvHBVqzIH0Ph6QNLN5a1X8QdaemMQ7`,
          },
          method: "POST",
          body: JSON.stringify({
            messages: messageList.value,
            model: 'gpt-3.5-turbo',
            stream: true,
          }),
        }
    );*/

    const completion = await fetch(
        httpPrefix+`/official-api/chat/send`,
        {
          headers: {
            'Accept':"text/event-stream",
            "Content-Type": "application/json",
          },
          method: "POST",
          body:JSON.stringify({
            userId:userId,
            topicId:currentTopic.value?.id,
            message:content
          })
        },
    );
    // Handle errors
    if (!completion.ok) {
      const errorData = await completion.json();
      console.error("错误信息： "+errorData )
      return;
    }
    let reader = completion.body?.getReader();
    if (!reader) {
      console.error("读取器不存在： " )
    }
    messageList.value.push({ role: "assistant", content: "" ,createTime:getFormatDate(new Date()), followUp:[] ,isRight:true});
    if(websiteConfigStore.getWebsiteConfig?.isCoze == 1){
      readCoze(reader, messageList).catch((error)=>{
        messageList.value.pop()
        messageList.value[messageList.value.length-1].isRight=false
      })
    }else {
      read(reader, messageList).catch((error)=>{
        messageList.value.pop()
        messageList.value[messageList.value.length-1].isRight=false
      })
    }
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {

  }
};


const clearMessageContent = () => (messageContent.value = "");



// 创建一个ref来持有文件输入元素的引用
const fileInput = ref<HTMLInputElement | null>(null);

// 文件选择事件处理函数
const onFileChange = () => {
  if (fileInput.value) {
    // @ts-ignore
    const selectedFile = fileInput.value.files?.[0];
    if (selectedFile) {

    }
  }
};


// 模拟点击文件输入事件
const uploadFile = () => {
  if (fileInput.value) {
    // @ts-ignore
    fileInput.value.click();
  }
};


const isCanSendMessages = ref(false)


//上滑取消
watch(messageContent,(newValue)=>{
  if (messageContent.value.trim()!=='' && isTalking.value===false){
    isCanSendMessages.value=true
  }else {
    isCanSendMessages.value=false
  }
})


const scrollToBottom = () => {
  if (chatListDom.value) {
    // @ts-ignore
    chatListDom.value?.scrollTo({
      top: chatListDom.value.scrollHeight,
      behavior: 'smooth'
    });
  }
}



watch(messageList, (newVal, oldVal) => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });


const previousScrollTop = ref(0)
function  handleScroll(event) {
  const scrollTop = event.target.scrollTop;
  if (scrollTop > previousScrollTop.value) {
    /*   console.log("向下滚动");*/
    isUserScrollsUp.value=false
  } else if (scrollTop < previousScrollTop.value) {
    /*    console.log("向上滚动");*/
    isUserScrollsUp.value=true
  }
  // 更新 previousScrollTop 为当前的scrollTop值，以便下一次比较
  previousScrollTop.value = scrollTop;
}





function isStringAllSpaces(inputString) {
  // 使用trim()方法去掉字符串两端的空格，然后检查结果是否为空字符串
  return inputString.trim() === '';
}




const allChatMessage = ref([])
const groupedMessages = ref([])
const historyTopicMessage = ref([])

function getHistoryTopic(){
  historyTopicLoading.value = true
  axios.get(httpPrefix+'/official-api/chat/list',{
    params: params.value
  })
      .then(function (response) {
        historyTopic.value=response.data.result.records
        pageInfo.total = response.data.result.total
        pageInfo.size = response.data.result.size
        pageInfo.current = response.data.result.current
        if (historyTopic.value.length!==0){
          currentTopic.value = historyTopic.value[0]

          historyTopicMessage.value = currentTopic.value?.messageList
          /*          messageList.value = currentTopic.value?.messageList*/

          for (let i = historyTopic.value.length - 1; i >= 0; i--) {
            for(let j = 0; j < historyTopic.value[i].messageList.length; j++){
              allChatMessage.value.push(historyTopic.value[i].messageList[j])
            }
          }



          const grouped = groupMessagesByDate(allChatMessage.value);
          groupedMessages.value = Object.values(grouped);


        }
        historyTopicLoading.value = false
      })
      .catch(function (error) {
        // 请求失败，处理错误
        console.error('请求失败:', error);
        historyTopicLoading.value = true
      });
}



const groupMessagesByDate = (messages) => {
  return messages.reduce((acc, message) => {
    const date = message.createTime;
    const dateText = timeAgoHistory(date); // 用于作为对象键

    // 如果acc中还没有这个日期的分类，则创建一个新的分类
    if (!acc[dateText]) {
      acc[dateText] = {
        dateTime: message.createTime,
        dateText: dateText,
        messageList: []
      };
    }

    // 将消息添加到相应日期的分类中
    acc[dateText].messageList.push(message);

    return acc;
  }, {});
};


function createTopic(newTopic){
  axios.post(httpPrefix+'/official-api/chat/add',newTopic, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    getHistoryTopic()
  }).catch(function (error) {

  });
}

function handleCreateNewTopic(){
  messageList.value = []
  createTopic({
    userId:userId,
    language:locale.value
  })
}



function saveMessage(message){
  axios.post(httpPrefix+'/official-api/chat/saveMessage', {
    topicId:currentTopic.value?.id,
    content:message.content,
    role:message.role,
    userId:userId
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {

  }).catch(function (error) {

  });
}

watch(isOpenChatWindows,(newValue)=>{
  setTimeout(()=>{

    if (chatListDom.value) {
      // @ts-ignore
      chatListDom.value.scrollTo({
        top: chatListDom.value.scrollHeight,
        behavior: 'smooth'
      });
    }
    /*    const messageDiv = document.getElementById('messageDivRef');
        if (messageDiv) {
          console.log("历史消息开始滚动"+messageDiv.scrollHeight)
          messageDiv.scrollTop = messageDiv.scrollHeight;
        }*/
  },50)
})


const welcomeData = ref([])
const welcomeDataLoading = ref(true)
function fetchModuleAllDataList(params) {
  // 使用axios发送GET请求
  axios.get(httpPrefix+'/official-api/page-module/queryModuleBySlug',{
    params: {
      slug: "page/aichat/welcome",
      language: locale.value
    }
  })
      .then(function (response) {
        welcomeData.value = response.data.result
        welcomeDataLoading.value = false
      })
      .catch(function (error) {
        // 请求失败，处理错误
        console.error('请求失败:', error);
        welcomeDataLoading.value = true
      });
}


onMounted(()=>{
  getHistoryTopic()
  fetchModuleAllDataList()
})
watch(locale,(newValue)=>{
  fetchModuleAllDataList()
})

</script>


<style>
.no-border-input .el-textarea__inner {
  border: 0;
  box-shadow:none;
  padding: 3.85px 0px;
}
.md-editor-content .md-editor-preview-wrapper{
  padding: 0;
}
.md-editor-preview p{
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
}
.root-page{
  transition: all 0.3s ease;
  z-index: 9996;
  cursor: pointer;
  right: 20px;
  bottom: 12px;
  border-radius: 100px;
  width: 45px;
  height: 45px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.root-page>img{
  border-radius: 1000px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.root-page:hover{
  transform: scale(1.25);
}
.point{
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: #4ece3d!important;
  height: 12px;
  width: 12px;
  border-radius: 10px;
}
.chat-windows{
  z-index: 9999;
  border-radius: 10px;
  position: fixed;
  right: 20px;
  bottom: 12px;
  width: 460px;
  /*  height: auto;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.28);
}
.chat-header-container{
  position: relative;
  padding: 26px 20px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  /*  background-color: #00dc82;*/
}
/*.chat-header-container:before{
  background-image: url(https://client.crisp.chat/static/images/tiles/squares-in-squares.svg?0a15717)!important;
  background-size: 54px!important;
  opacity: .075!important;
  content: ""!important;
  background-repeat: repeat!important;
  position: absolute!important;
  left: 0!important;
  right: 0!important;
  top: 0!important;
  bottom: 0!important;
  z-index: 0!important;
}*/
.affiliate-messages-item{
  color: #0d7ae1;
  margin: 2px 0;
}

.wx-chat-container{
  z-index: 1;
  cursor: pointer;
  border-radius: 13px;
  padding: 9px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #004ec0;
}
.wx-chat-container:hover,wx-chat-container:active{
  background-color: #0050c7;
}
.wx-chat-container>img{
  margin-right: 3px;
  width: 15px;
}
.wx-chat-container>h1{
  color: #FFFFFF;
  font-size: 13px;
}

.close-button{
  z-index: 1;
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.close-line{
  width: 20px;
  height: 3px;
  background-color: #808080;
}
.close-button>img{
  width: 100%;
}

.message-notice-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.avatar-container{
  margin-right: 12px;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  /*  border: 1px solid rgba(0,0,0,0.05);*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar-container>img{
  z-index: 1;
  width: 100%;
  object-fit: cover;
}
.hintPoint{
  z-index: 2;
  border-radius: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 10px;
  width: 10px;
  background-color: #00dc82;
  outline: 2px solid  rgba(59,130,246);
}
.message-notice-container>h1{
  font-size: 16px!important;
  font-weight: 700;
  color: #323232;
}
.message-notice-container>p{
  font-size: 12.4px!important;
  line-height: 18px!important;
  color: #FFFFFF;
}

.send-email-container{
  cursor: pointer;
  z-index: 1;
  background-color: #0159d9;
  width: 27px;
  height: 27px;
  margin-left: 6px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.send-email-container:hover{
  background-color: #0154ce;
}
.hot-point{
  border-radius: 10px;
  width: 4px;
  height: 4px;
  background-color: rgba(200,200,200);
  margin:1px;
}

.message-list-container{
  position: relative;
  transition: all 0.3s ease;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 3;
  width: 100%;
  height: calc(100vh - 260px);
  background-color: #FFFFFF;
  padding: 10px 0px 0;
  display: flex;
  flex-direction: column;
}
.message-list-container::-webkit-scrollbar {
  width: 4px;
  border-radius: 0;
  background: transparent;
}
/* 滚动条滑块 */
.message-list-container::-webkit-scrollbar-thumb {
  border-radius: 0;
  transition: all 0.2s;
  background:#848484;
}



.message-input-container{
  background-color: #FFFFFF;
  z-index: 3;
  width: 100%;
  min-height: 94px;
  padding: 0 12px;
}
.message-input{
  padding: 7px 0;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}
.no-border-input{
  width: calc(100% - 33px);
}
.goto-bottom-button{
  border-radius: 50px;
  cursor: pointer;
  position: sticky;
  bottom: 10px;
  z-index: 20;
  left: 100%;
  height: 30px;
  width: 30px;
  background-color: #FFFFFF;
  padding: 5px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.28);
}
.goto-bottom-button>img{
  width: 100%;
}

.history-message-tips{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #E0E0E0;
  margin: 16px 0 8px;
}
.tips-message{
  margin: 0px 0 8px;
  width: 100%;
  text-align: center;
  color: #5C5E62;
  font-size: 12px;
}

.send-button{
  z-index: 99;
  opacity: 0.55;
  cursor: pointer;
  height: 33px;
  width: 33px;
  border-radius: 5px;
  background: #1972F5 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.send-button>img{
  width: 17px;
}

.send-button:hover{
  background: #1768e1 !important;
}
.available_Button{
  opacity: 1;
}
.split-line{
  height: 1px;
  z-index: 3;
  width: 100%;
  background-color: rgba(0,0,0,0.12);
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.25s ,opacity 0.25s ;
  transform: translateY(0px);
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(400px);
}

.fadeEmo-enter-active,
.fadeEmo-leave-active {
  transition: opacity 0.2s ;
}

.fadeEmo-enter,
.fadeEmo-leave-active {
  opacity: 0;
}

.bottom-message-input{
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom-logo{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bottom-logo>p{
  font-size: 15px;
  color: #92A9C1;
}
.bottom-logo>img{
  margin: 0 3px;
  width: 15px;
}
.file-input-contianer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.emo-container{
  margin-right: 6px;
  cursor: pointer;
  width: 17px;
  height: 17px;
  border-radius: 20px;
}
.emo-container>img{
  width: 100%;
  opacity: 0.6;
}
.file-container{
  margin-right: 6px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 20px;
}
.file-container>img{
  width: 100%;
  opacity: 0.70;
}
.emotion-container{
  z-index: 99;
  bottom: 40px;
  left: 0;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}
.emo-box{
  padding: 5px 10px;
  width: 98%;
  background-color: #FFFFFF;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.emo-item{
  transition: all 0.3s ease;
  cursor: pointer;
  width: 9%;
  margin: 4px 6px;
  height: 32px;
}

.emo-item-img{
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.message-item{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0 8px 0;
}
.avatar-img{
  display: none;
}
.assistantMessage{
  align-items: flex-start;
  justify-content: flex-start;
}
.assistantMessage>img{
  width: 36px;
  height: 36px;
  border-radius: 500px;
}
.chat-message{
  max-width: 100%;
}
.message-container{
  position: relative;
/*  max-width: 100%; 消息长度约束*/

}
.assistantMessage .chat-message .role-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 4px;
}
.assistantMessage .chat-message .role-container >h1{
  font-size: 16px;
  color: rgba(108,108,108);
}
.assistantMessage .chat-message .role-container >p{
  font-size: 12px;
  color: rgba(200,200,200);
}
.assistantMessage .chat-message .message-container{
  border-radius: 0 15px 15px 15px;
  padding: 16px;
  width: 100%;
  background-color: #F3F3F3;
}






.userMessage{
  align-items: flex-end;
  justify-content: flex-end;
}


.userMessage>img{
  width: 36px;
  height: 36px;
  border-radius: 500px;
}
.userMessage .chat-message .role-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 4px;
}
.userMessage .chat-message .role-container >h1{
  font-size: 16px;
  color: rgba(108,108,108);
}
.userMessage .chat-message .role-container >p{
  font-size: 12px;
  color: rgba(200,200,200);
}
.userMessage .chat-message .message-container{
  border-radius: 15px 15px 0px 15px;
  padding: 16px;
  width: 100%;
  background-color: #3E6AE1;
}

.affiliate-messages{
  cursor: pointer;
  margin: 6px 0;
  border-radius:  15px 15px 15px 15px !important;
}

.message-mask{
  width: 100%;
  padding: 10px 0;
  background-color: transparent;
}
@media screen and ( max-width: 768px){
  .chat-windows{
    max-height: 80vh;
  }

}

@media screen  and ( max-width: 492px){
  .chat-windows{
    right: 0;
    width: calc(100% - 16px);
    bottom: 12px;
    transform: translateX(-8px);

  }
  .message-list-container{
    max-height: 486px;

  }

}

.chatGPTMessage{
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.chatGPTMessage p {
  color: white;
}
</style>
