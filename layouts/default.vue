<template>
  <div class="container">
    <bar-open-nav @menu-selecting="handleMenuSelecting"></bar-open-nav>

<!--  keepalive  -->
    <nuxt-page></nuxt-page>

    <client-only>
      <ai-customer></ai-customer>
    </client-only>



    <bar-open-footer></bar-open-footer>

  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,onBeforeMount,onServerPrefetch,nextTick} from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const isSelecting = ref(false)
const isSelectLanguage = ref(false)
import { useWebsiteConfigStore } from "@/stores/websiteConfig.js";
const websiteConfigStore = useWebsiteConfigStore();
import { user } from "@/stores/index.js";
const userStore = user();
import { useSeoStore } from "@/stores/seo.js";
const seoStore = useSeoStore();

import { useThemeStore } from "@/stores/Theme.js";
const themeStore = useThemeStore();

import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()


const title = 'Ether 智能客服';
const icon = '';
const lang = 'zh-CN';
const layout = 'pc';


import Lenis from '@studio-freight/lenis'
import {httpPrefix} from "~/enums/appEnum";
import axios from "axios";
/*平滑鼠标*/
onMounted(()=>{
/*
  nextTick(()=>{
    new CozeWebSDK.WebChatClient({
      config: {
        bot_id: '7382835399770750984',
      },
      componentProps: {
        title: title,
        icon:icon
      },
    });
  })*/

/*  const lenis = new Lenis()
  lenis.on('scroll', (e) => {
    // console.log(e)

  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  watch(isSelectLanguage,(newValue) => {
    if (newValue){
      lenis.stop()



    }else {
      lenis.start()

    }
  })*/


  axios.get('https://ipinfo.io/json',{
  }).then(function (response) {
    userStore.setIpInfo(response.data)
  }).catch(function (error) {

  });

  axios.get(httpPrefix+'/official-api/websiteConfig/queryByName',{
    params: {
      name:'tentech-official'
    }
  }).then(function (response) {
    websiteConfigStore.setConfig(response.data.result)
  }).catch(function (error) {

  });
  let userId = userStore.getUserId;

  themeStore.getTheme
})


function handleSelectLanguage(event){
  isSelectLanguage.value=event
}


function handleMenuSelecting(event){
  isSelecting.value = event
}



onServerPrefetch(async () => {
  // 组件作为初始请求的一部分被渲染
  // 在服务器上预抓取数据，因为它比在客户端上更快。
  let seoData = await $fetch(httpPrefix+'/official-api/page-module/queryModuleBySlug',{
    params: {
      slug: "ether_seo",
      language: locale.value
    }
  });
  seoData.value = seoData.result
  let seoMap = new Map()
  let seoDataList = seoData.value?.moduleItemList || []
  seoDataList.forEach((item)=>{
    let seoItem = {
      title:item.text1,
      description:item.text2,
      keywords:item.text3,
    }
    seoMap.set(item.slug,seoItem)
  })
  seoStore.setSeo(seoData.value,seoMap)
})

</script>


<style scoped>

</style>
