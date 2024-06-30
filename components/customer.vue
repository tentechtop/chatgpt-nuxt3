<template>
  <div>
    <a  class="root-page"
         @click="isOpenChatWindows=!isOpenChatWindows">
<!--      :href="getRandomChatCustomer()" target="_blank"-->
      <img src="https://image.crisp.chat/avatar/operator/5ea15f83-614b-4f36-b038-5691f1f97d3a/240/?1695276836189">
      <div class="point"></div>
    </a>


    <transition name="fade">
    <div v-if="isOpenChatWindows" class="chat-windows">
      <div class="chat-header-container">
        <div class="wx-chat-container">
          <img src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95.svg">
          <h1>{{ $t('customer.chat') }}</h1>
        </div>
        <div class="message-notice-container">
          <div class="avatar-container">
            <img src="https://image.crisp.chat/avatar/operator/5ea15f83-614b-4f36-b038-5691f1f97d3a/240/?1695276836189&quot" alt="聊天头像">
            <div class="hintPoint"></div>
          </div>
          <p>{{ $t('tentech') }}</p>
          <h1>Tentech</h1>
          <div class="send-email-container" @click="messageList=messageList.splice(0,1)">
            <div class="hot-point" v-for="(pItem,PIndex) in 3"></div>
          </div>
        </div>
        <div class="close-button" @click="isOpenChatWindows=false">
          <img src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E5%85%B3%E9%97%AD.svg">
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


      <div class="message-list-container" ref="chatListDom" @scroll="handleScroll">
        <div class="message-item" v-for="(message,messageIdx) in messageList" :class="message.role==='user'? 'userMessage':'assistantMessage'">
          <img v-if="message.role!=='user'" src="https://image.crisp.chat/avatar/operator/5ea15f83-614b-4f36-b038-5691f1f97d3a/240/?1695276836189">
          <div class="chat-message">
            <div class="role-container">
              <h1>{{ message.role  }}</h1>
            </div>
            <!--     用户消息       -->
            <div v-if="message.role==='user'" class="message-container" v-copyText>
              <p class="res-message" :class="{userMessageRes:message.role==='user'}"
                 v-html="markedRender(message.content.replace(/^\n\n/, ''))"></p>
            </div>
            <!--     chat消息       -->
            <div v-else class="message-container" v-copyText>
              <p class="res-message" :class="{userMessageRes:message.role==='user'}"  v-html="markedRender(message.content.replace(/^\n\n/, ''))"></p>
            </div>

          </div>
          <img v-if="message.role==='user'" src="https://image.crisp.chat/avatar/operator/5ea15f83-614b-4f36-b038-5691f1f97d3a/240/?1695276836189">
        </div>
      </div>

      <div class="message-input-container">
        <div class="split-line"></div>
        <div class="message-input">
<!--          @keydown.enter.prevent
          @keydown.enter="sendOrSave"-->
          <el-input
              type="textarea"
              class="no-border-input"
              resize="none"
              :height="33"
              v-model="messageContent"
              :autosize="{ minRows: 1, maxRows: 3 }"
              placeholder=""
          />


          <div ref="sendButton"  class="send-button" :class="{'available_Button':isCanSendMessages}"    @click="sendOrSave">
            <img :src=" isTalking? 'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/24gf-square.svg':'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E5%8F%91%E9%80%81.svg'">
          </div>



        </div>
        <div class="bottom-message-input">
          <div class="file-input-contianer">

            <div class="emo-container" @click="isOpenEmo=!isOpenEmo">
              <img src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E8%A1%A8%E6%83%85.svg">
            </div>


            <div class="file-container"   @click="uploadFile">
              <input type="file" ref="fileInput" style="display:none" @change="onFileChange">
              <img   src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E5%9B%9E%E5%BD%A2%E9%92%88.svg">
            </div>

            <div class="file-container"  >
              <img style="opacity: 1"  src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E8%AF%9D%E7%AD%92.svg">
            </div>




          </div>
          <div class="bottom-logo">
            <p>Tentech</p>
            <img src="https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/%E6%B6%88%E6%81%AF.svg">
            <p>全德</p>
          </div>
        </div>
      </div>
    </div>
    </transition>




  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,watch,computed ,nextTick} from "vue";
import { useI18n } from "vue-i18n";
const { t,locale} = useI18n()

const router = useRouter()
const localePath = useLocalePath();
const route = useRoute()
import cryptoJS from "crypto-js";
import keywordsArray from "assets/js/keywordsChat/keywordsArray";
import {markedRender} from "assets/libs/highlight";


//链接webSocket






const messageList = ref([]);




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










const chatListDom = ref(null);
const isUserScrollsUp = ref(false)

const sendOrSave = () => {
  if (isStringAllSpaces(messageContent.value) ||messageContent.value.length===0 || isTalking.value===true ){
    messageContent.value ='';
    return;
  }
  isUserScrollsUp.value=false

  //将消息发送到后台

  console.log("发送消息")







};














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
    if (!chatListDom.value) return;
    if (chatListDom.value) {
      if (!isUserScrollsUp.value){
        // @ts-ignore
        chatListDom.value.scrollTop = chatListDom.value.scrollHeight;
      }
    }
}


watch(messageList.value, () => nextTick(() => scrollToBottom()));

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
</script>


<style>
.no-border-input .el-textarea__inner {
  border: 0;
  box-shadow:none;
  padding: 3.85px 0px;
}







</style>

<style scoped>
.root-page{
  z-index: 9996;
  cursor: pointer;
  right: 12px;
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
.point{
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: #4ece3d!important;
  height: 15px;
  width: 15px;
  border-radius: 10px;
}
.chat-windows{
  max-height: 75vh;
  z-index: 9999;
  border-radius: 10px;
  position: fixed;
  right: 12px;
  bottom: 80px;
  width: 400px;
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
  padding: 10px 0;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1c293b !important;
  background-color: rgba(59,130,246);
}
.chat-header-container:before{
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
  z-index: 99999;
  cursor: pointer;
  top: 10px;
  right: 10px;
  position: absolute;
  height: 20px;
  width: 20px;
}
.close-button>img{
  width: 100%;
}

.message-notice-container{
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar-container{
  margin-right: 6px;
  position: relative;
  width: 30px;
  height: 30px;
}
.avatar-container>img{
  z-index: 1;
  border-radius: 100px;
  width: 30px;
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
  font-size: 12.4px!important;
  line-height: 18px!important;
  color: #FFFFFF;
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
  transition: height 0.3s ease;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 3;
  width: 100%;
  height: 486px;
  background-color: #FFFFFF;
  padding: 5px 12px;
  display: flex;
  flex-direction: column;
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
  margin: 4px 0 8px 0;
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
  max-width: 332px;
}
.assistantMessage .chat-message .role-container{
  width: 100%;
  margin-bottom: 4px;
}
.assistantMessage .chat-message .role-container >h1{
  font-size: 16px;
  color: rgba(108,108,108);
}

.assistantMessage .chat-message .message-container{
  border-radius: 10px;
  padding: 5px 11px;
  width: 100%;
  background-color: #0d7ae1;
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 4px;
}
.userMessage .chat-message .role-container >h1{
  font-size: 16px;
  color: rgba(108,108,108);
}

.userMessage .chat-message .message-container{
  border-radius: 10px;
  padding: 5px 11px;
  width: 100%;
  background-color: #F0F2F5;
}

@media screen  and ( max-width: 424px){
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


</style>
