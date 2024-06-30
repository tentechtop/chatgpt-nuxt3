<template>
  <div class="home-page">


    <div :style="{ width: '100%' }">
      <home-img-banner :banner-list="bannerData"></home-img-banner>
    </div>






    <breadcrumb></breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
import allLanguage from "~/assets/js/language";
import Breadcrumb from "~/components/breadcrumb.vue";



const bannerData = ref([
  {
    title1: "测试",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/banner/banner-03.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2280,h_880/quality,q_100",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"测试",
    buttonPath: "/",
    alt:"测试",
  },
  {
    title1: "牛逼",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://support.colorlightinside.com/uploads/XR-bg_1656749996.png",
    videoPoster:"https://kwun.oss-cn-shenzhen.aliyuncs.com/kwunphi4/videos/home/kwunphi.mp4?x-oss-process=video/snapshot,t_1000,m_fast",
    videoUrl:"https://kwun.oss-cn-shenzhen.aliyuncs.com/kwunphi4/videos/home/kwunphi.mp4",
    buttonTitle:"测试",
    buttonPath: "/",
    alt:"测试",
  },
  {
    title1: "测试",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://support.colorlightinside.com/uploads/-1818325876_1702533913.png",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"测试",
    buttonPath: "/",
    alt:"测试",
  },


])

const homeServeList = ref([
  {
    title1: t('customer.chat'),
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/book-alt-dark-1?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=48&hei=48&qlt=95&fmt=png-alpha&fit=constrain",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"测试"+" >",
    buttonPath: "/",
    alt:"测试",
  },
  {
    title1:   t('customer.chat'),
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/resources-alt-dark-1?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=48&hei=48&qlt=95&fmt=png-alpha&fit=constrain",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"测试"+" >",
    buttonPath: "/",
    alt:"测试",
  },
  {
    title1: "测试",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    title6: "",
    mediaType:"img",
    imgUrl: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/blog-alt-dark?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=48&hei=48&qlt=95&fmt=png-alpha&fit=constrain",
    videoPoster:"",
    videoUrl:"",
    buttonTitle:"测试"+" >",
    buttonPath: "/",
    alt:"测试",
  },

])

// @ts-ignore
function getTargetDomain(language) {
  let domain
  // @ts-ignore
  if (locales && locales.length) {
    let defaultDomain
    // @ts-ignore
    for (let index = 0; index < locales.length; index++) {
      // @ts-ignore
      let item = locales[index]
      if (item.code === language) {
        domain = item.domain
        if (domain) {
          break;
        }
      } else if (item.code === 'cn') {
        defaultDomain = item.code
      } else if (!defaultDomain && item.code.startsWith('cn')) {
        defaultDomain = item.code
      }
    }
    if (!domain && defaultDomain) {
      domain = defaultDomain
    }
    if (domain) {
      return domain
    }
  }
  return switchLocalePath(language)
}

useHead({
  title: t('seo.pages.home.title'),
  meta: [
    {name: 'keywords', content: t('seo.pages.home.keywords') },
    {name: 'description', content: t('seo.pages.home.description') }
  ],
})
</script>

<style scoped>
@import '../styles/menu.css';
.home-page{
  height: auto;
  background-color: #F9F9F9;
}



</style>
