<template>
  <div class="select-container">
    <div class="select-inner-container">
      <div class="horizontal-containers">
        <div class="component-menu">


          <div v-for="(menu,mItem) in menuDataList" class="horizontal-menu-item" >
            <div class="optional-title">
              <nuxt-link v-if="menu.buttonPath && menu.buttonPath!==''"
                         @click="triggerSelectMenuEvent"
                         :to="localePath(`${menu.buttonPath}`)">{{$t(menu.title1)}}</nuxt-link>

              <a v-else >{{$t(menu.title1)}}</a>
              <img v-if="menu.buttonPath && menu.buttonPath!==''" src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/icon-%E8%B7%B3%E8%BD%AC.svg">
            </div>
            <p>{{menu.title2}}</p>
            <el-divider style="margin: 12px 0"></el-divider>
            <div class="sub-container-v">
              <nuxt-link :to="localePath(`${subM.buttonPath}`)"
                         @click="triggerSelectMenuEvent"
                         class="subMenu-Item" v-for="(subM,MItem) in menu.subMenuList">
                {{ $t(subM.buttonTitle)}}
              </nuxt-link>
            </div>
          </div>


        </div>
        <div class="introduce-box">
          <img src="https://file.kwunphi.com/kwunphi4/images/banner/3-machines-work-at-the-same-time.jpg?x-oss-process=image/resize,m_lfit,w_500,h_500">
        </div>
      </div>
      <!--    关闭  -->
      <div class="close-button-container"  @click="triggerSelectMenuEvent">
        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/%E5%85%B3%E9%97%AD.svg">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t, locale, locales } = useI18n()
const localePath = useLocalePath();
const emits = defineEmits(['SelectMenu']);//触发事件

const menuDataList = ref([
  {
    title1: "menu.serviceAndSupport",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"",
    imgUrl: "",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"",
    buttonPath: "/service",//在这里写跳转路径
    alt:"",
    subMenuList:[
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.serviceCenter",
        buttonPath: "/service",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.downloadCenter",
        buttonPath: "/downloads",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.app",
        buttonPath: "/app",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.faq",
        buttonPath: "/discussion",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.helpCenter",
        buttonPath: "/help",
        alt:"",
      },
    ]
  },
  {
    title1: "menu.officialAfterSalesService",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"",
    imgUrl: "",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"",
    buttonPath: "",//在这里写跳转路径
    alt:"",
    subMenuList:[
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.afterSalesService",
        buttonPath: "/after-sales",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.afterServicePolicy",
        buttonPath: "/after-sales/policy",
        alt:"",
      },
    ]
  },
  {
    title1: "menu.moreService",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"",
    imgUrl: "",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"",
    buttonPath: "",//在这里写跳转路径
    alt:"",
    subMenuList:[
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.securityAndPrivacy",
        buttonPath: "/security-and-privacy",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.termsOfUse",
        buttonPath: "/terms",
        alt:"",
      },
      {
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
        title6: "",
        mediaType:"",
        imgUrl: "",
        videoPoster:"",
        videoUrl:"",
        buttonTitle:"menu.siteMap",
        buttonPath: "/sitemap",
        alt:"",
      }
    ]
  }
])

function triggerSelectMenuEvent() {
  emits('SelectMenu','Solution');
}
</script>

<style scoped>
@import '@/styles/open/component.css';
</style>
