<template>
  <div class="container">

    <div class="banner-container">
      <div class="header-text-container">
        <p>曲率帮助中心</p>
      </div>
      <div class="header-text-container" style="flex-direction: column;justify-content: center">
        <h1>请输您的问题！🙂</h1>
        <search-bar btn="搜索" placeholder="" height="54" maxlength="32" fontSize="16px" @search=""> </search-bar>
      </div>
    </div>


    <div class="service-container">
      <div class="header-text-service">
        <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E6%94%B6%E8%97%8F.svg">
        <h1>使用教程</h1>
      </div>

      <div href="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/software/clash%E9%85%8D%E7%BD%AE.docx" class="UseTutorial-container">
        <div class="UseTutorial-item">
          <p>Clash for Windows 使用教程</p>
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </div>
        <a href="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/software/clash%E9%85%8D%E7%BD%AE.docx" class="UseTutorial-item">
          <p>Clash for Android 使用教程</p>
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </a>
        <a href="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/software/clash%E9%85%8D%E7%BD%AE.docx" class="UseTutorial-item">
          <p>IOS 使用教程</p>
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </a>
      </div>
    </div>


    <div class="service-container">
      <div class="header-text-service">
        <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E6%94%B6%E8%97%8F.svg">
        <h1>软件下载</h1>
      </div>

      <div class="UseTutorial-container">
        <a href="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/software/Clash.for.Windows.Setup.0.20.30.zip" class="UseTutorial-item">
          <div class="text-icon-container">
            <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/windows.svg">
            <p>Clash for Windows</p>
          </div>
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </a>
        <a href="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/software/Clash%20for%20Android_2.5.12.premium_apkcombo.com.zip" class="UseTutorial-item">
          <div class="text-icon-container">
            <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/android.svg">
            <p>Clash for Android</p>
          </div>
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </a>
        <div class="UseTutorial-item">

          <div class="text-icon-container">
            <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/IOS.svg">
            <p>IOS 下载教程</p>
          </div>

          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.svg">
        </div>
      </div>
    </div>



    <div class="service-container">
      <div class="header-text-service">
        <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E6%89%B9%E6%AC%A1%E8%BF%BD%E6%BA%AF%E8%AF%A6%E6%83%85.svg">
        <h1>输入token生成链接</h1>
      </div>
      <div class="getUrlByToken-container">
        <div class="input-token">
          <input v-model="inputToken" placeholder="输入token" type="text" >
          <div class="getTokenButton" @click="getUrlPathByToken">
            生成
          </div>
        </div>

        <div class="input-token">
          <input class="generateUrl" ref="generateUrlByToken" v-model="getUrlByToken" placeholder="" type="text" >
          <div class="getTokenButton" @click="copyToClipboard">
            复制
          </div>
        </div>
      </div>
    </div>


    <div class="service-container">
      <div class="header-text-service">
        <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/%E6%89%B9%E6%AC%A1%E8%BF%BD%E6%BA%AF%E8%AF%A6%E6%83%85.svg">
        <h1>输入token查询剩余流量</h1>
      </div>
      <div class="getUrlByToken-container">
        <div class="input-token query-input">
          <input style="width: 85%" v-model="inputToken" placeholder="输入token" type="text" >
          <div class="getTokenButton" style="width: 15%"
          @click="getByteByToken"
          >
            查询
          </div>
        </div>

        <div class="input-token flux-input">
          <input class="generateUrl" v-model="flowByte" placeholder="" type="text" style="width: 85%">
          <div class="getTokenButton" style="width: 15%;background-color: #ffffff;border: 1px solid rgba(0,0,0,0.1);color: #000000" >
            Byte
          </div>
        </div>
      </div>
    </div>



    <div class="footer-container">

      <div class="footer-text-container">
        <div class="other-services">
          <h1>未找到您需要的内容</h1>
          <p>通过邮件联系我们 stroxy10086@gmail.com</p>
        </div>
        <a href="mailto:stroxy10086@gmail.com" class="contactUsByEmail">
          <img src="https://stroxy.oss-cn-shenzhen.aliyuncs.com/img/iconfont-email.svg">
          <p>联系我们</p>
        </a>
      </div>
      <div class="ipc-container">
        <p>Copyright © 2018-2023 Tentech 版权所有 </p>
        <p>湘ICP备2023014859号</p>
      </div>
    </div>



  </div>
</template>


<script lang="ts" setup>
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted } from "vue";
const { proxy } = getCurrentInstance();
const show = ref(true)
import { baseUrl } from '~~/config'
import request from "~/api/request";
import {getProject} from "~/api/project";
import SearchBar from "~/components/search-bar.vue";

const inputToken = ref("")

const getUrlByToken = ref("")

useHead({
  title: "曲率加速器，为速度而生，可轻松支持4K流媒体",
  meta: [
    {name: 'keywords', content: "曲率加速器,一键开启学术加速、游戏加速，无限速无限流，超强数据加密技术，以保护线上隐私安全。" },
    {name: 'description', content: "做最好，最安全的加速器，采用最前沿的数据加密技术，使您全面掌控您的网络隐私与安全。" }
  ],
})


const flowByte =ref()

const showData = ref(false)
const dateTest = ref({})


async  function getUrlPathByToken(){
  let token = inputToken.value
  const resp = await useFetch(`/api/ladder/link/${token}`,{
    method:"GET",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }).then((res)=>{

    if (res){
      let response = res.data.value
      if (response){
        let rePath = response.data
        if (rePath !== "false"){
          getUrlByToken.value = 'http://stroxy.tentech.top/api'+rePath
        }else {
          getUrlByToken.value = '您输入的token不存在，请重新输入！'
        }
      }
    }
  })
}


async function getByteByToken(){
  let token = inputToken.value
  const resp = await useFetch(`/api/ladder/traffic/count/${token}`,{
    method:"GET",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }).then((res)=>{
    if (res){
      let response = res.data.value
      if (response){
        let byte = response.data
        flowByte.value=byte
      }
    }
  })
}


/*async function getTestDate(){
  const resp = await useFetch('http://localhost:8000/',{
    method:"GET"
  }).then((response) => {
    console.log("baseUrl"+JSON.stringify(response.data.value))
    dateTest.value=response.data.value
    showData.value = true
  })
}
const { data: archivesList, } = await useAsyncData('archives_GetList', () => getProject())

dateTest.value = archivesList.value*/

// 复制到剪切板的函数
const copyToClipboard = () => {
  // 获取输入框的值

  if (getUrlByToken.value){
    const inputElement = proxy.$refs.generateUrlByToken
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
      // 在实际应用中，您可能还想提供一些用户反馈，例如提示消息
      alert('链接已复制到剪切板');
    }
  }else {
    alert('链接为空，请输入token生成链接');
  }




};

</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
  background-color: #F3F6FB;
}



.banner-container{
  width: 100%;
  min-height: 300px;
  background-color: #186DE9;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-text-container{
  padding-top: 24px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.header-text-container>p{
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}
.header-text-container>h1{
  color: #ffffff;
  font-weight: 600;
}
.service-container{
  padding: 24px 0;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
}
.header-text-service{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.header-text-service>h1{
  font-size: 26px;
  font-weight: 700;

}
.header-text-service>img{
  width: 30px;
  margin-right: 16px;
}
.UseTutorial-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.UseTutorial-item{
  cursor: pointer;
  width: calc(50% - 16px);
  min-height: 70px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 1px 3px 3px rgba(0,0,0,0.1);
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 16px 5px 16px;
}
.UseTutorial-item:hover{
  box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
}
.text-icon-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.text-icon-container>img{
  width: 16px;
  margin-right: 16px;
}
.text-icon-container>p{
  color: #000000;
  font-size: 16px;
}
.UseTutorial-item>img{
  width: 16px;
}
.UseTutorial-item>p{
  color: #000000;
  font-size: 16px;
}
.getUrlByToken-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.input-token{
  width: 100%;
  padding: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.input-token>input{
  border: 1px solid rgba(0,0,0,0.1);
  outline: none;
  padding: 5px 20px;
  height: 54px;
  width: 90%;
  font-size: 18px;
  color: #333333;
}
.input-token>input:focus{
  outline: none;
}
.getTokenButton{
  min-width: 99px;
  height: 54px;
  background-color: #1769E0;
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
}
.getTokenButton:hover{
  background-color: #448CE3;
}
.footer-container{
  padding: 24px 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.footer-text-container{
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.other-services{
  display: flex;
  flex-direction: column;
}
.other-services>h1{
  font-size: 22px;
  font-weight: 700;
  color: #303133;
}
.other-services>p{
  font-size: 14px;
  color: #606266;
}
.contactUsByEmail{
  cursor: pointer;
  background-color: #1972F5;
  padding: 10px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
}
.contactUsByEmail>img{
  width: 24px;
  margin-right: 10px;
}
.contactUsByEmail>p{
  color: #ffffff;
}
.ipc-container{
  padding-top: 24px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.ipc-container>p{
  color: #909399;
}

.query-input{
  width: calc(70% - 16px)
}
.flux-input{
  width: calc(30% - 16px)
}
@media screen and (max-width: 1032px){
  .container{
    padding: 0 16px;
  }
  .header-text-container{
    padding: 16px 16px;
  }
  .footer-text-container{
    padding: 0 16px;
  }
  .ipc-container{
    padding: 0 16px;
  }
}

@media screen and (max-width: 767px){
  .UseTutorial-item{
    width: 100%;
  }
  .query-input{
    width: 100%;
  }
  .flux-input{
    width: 100%;
  }
}
</style>
