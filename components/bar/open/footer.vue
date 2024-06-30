<template>
  <div>
    <div v-if="!whiteList.includes(route.path)" class="footer-container">
      <div  class="container">
        <!--
              <el-divider style="opacity: 0.3" class="divider-split"></el-divider>
        -->

        <div class="adaptive-container">
          <div class="menu-container">
          </div>
        </div>




        <el-divider style="opacity: 0.3" class="divider-split"></el-divider>
        <div class="info-container">
          <div class="copy-right">
            <div class="bottom-info">
              <p>Copyright © 2018-{{ formatDate(new Date()) }} {{ locale.startsWith('zh')? '以太AI 版权所有':'Ether AI  All Rights Reserved' }}</p>
              <p class="beiAnInfo">
                <a class="icp" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">湘ICP备2023014859号</a>
                <a class="beian"
                   href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2023014859" target="_blank">
                  <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/beian.png">湘ICP备2023014859号-1
                </a>
              </p>
            </div>
<!--            <div class="policyAndTerms">
              <a style="cursor: pointer" @click.stop="open = !open">{{CurrentLanguage.dialect}}</a>
              <nuxt-link :to="localePath('/policy')">{{ $t('menu.globalPrivacyPolicy') }}</nuxt-link>
              <nuxt-link :to="localePath('/terms')">{{ $t('menu.termsOfUse') }}</nuxt-link>
            </div>-->
          </div>
        </div>
      </div>

      <!--手机页脚  -->
      <div class="drawer-footer">
        <div class="menu-drawer">
          <template v-if="!pageDataLoading">
          </template>
        </div>

        <div class="drawer-contact-container">

        </div>

        <div class="subscribe">
<!--          <div class="drawer-policyAndTerms">
            <a style="cursor: pointer" @click.stop="open = !open">{{CurrentLanguage.dialect}}</a>
            <nuxt-link :to="localePath('/policy')">{{ $t('menu.globalPrivacyPolicy') }}</nuxt-link>
            <nuxt-link :to="localePath('/terms')">{{ $t('menu.termsOfUse') }}</nuxt-link>
          </div>-->
          <p class="website-info" style="font-size: 14px">Copyright © 2018-{{ formatDate(new Date()) }} {{ locale.startsWith('zh')? '以太AI 版权所有':'Ether AI  All Rights Reserved' }}   </p>
          <div class="beian-box">
            <p class="website-info"><a class="beian" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2023014859" target="_blank">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/foot/beian.png">湘ICP备2023014859号</a>
            </p>
            <p class="website-info"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">湘ICP备2023014859号-1</a></p>
          </div>
        </div>
      </div>




    </div>
    <client-only>
      <el-dialog
          :lock-scroll="true"
          class="selectLanguageDialog"
          :title="$t('menu.selectLanguage')" v-model="open">
        <div class="dialog-container">
          <div class="select-language-container">
            <div v-for="(regionItem, regionIndex) in regionList" class="region-item">
              <h1>{{regionItem.title}}</h1>
              <div class="select-language-item-box">
                <nuxt-link v-for="(langItem, langIndex) in regionItem.languageList"
                           :to="getTargetDomain(langItem.language)"
                           class="select-language-item"
                           :class="{'select-language-item-last':((langIndex+1)%3)===0}"
                           @click="CurrentLanguage = langItem;open=false;cacheLanguage(langItem.language)">
                  <p style="color: #3b3e40;float: left;">{{ langItem.langEnName }}</p>
                  <p style="float: right;color: #9fa3a6;">{{ langItem.dialect }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import allLanguage from "assets/js/language";
import PlusMenu from "~/components/plus-menu.vue";
import {httpPrefix} from "~/enums/appEnum";
import axios from "axios";
import {forEach} from "lodash-es";
// @ts-ignore
const localePath = useLocalePath();
// @ts-ignore
const switchLocalePath = useSwitchLocalePath();
const router = useRouter()
const route = useRoute()


const open = ref(false)
const CurrentLanguage = ref(allLanguage.LanguageMap.get(locale.value))
const regionList = ref(allLanguage.regionList)
const verifyLanguageList = ref(allLanguage.LanguageList)



/*
const emits = defineEmits(['selectLanguage']);//触发事件

watch(open,(newValue)=>{
  emits('selectLanguage',newValue);
})
*/


let savedScrollPosition;
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
      } else if (item.code === 'zh-CN') {
        defaultDomain = item.code
      } else if (!defaultDomain && item.code.startsWith('zh')) {
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

function cacheLanguage(language) {
  localStorage.setItem('selectLanguage', language);
}

function initLanguage(){
  /*console.log("当前语言标志"+locale.value)*/
  let language =  localStorage.getItem('selectLanguage')+'';
  if (locale.value!==language){
    let languageExists =  verifyLanguageList.value.some(item => item.language === language);
    if (languageExists){
      /*     console.log("使用缓存的语言")
           router.push({ path: switchLocalePath(language) })
           locale.value=language
           cacheLanguage(language)
           console.log("缓存了新的语言"+language)
           CurrentLanguage.value = allLanguage.LanguageMap.get(language)*/
    }else {
      /*      console.log("使用浏览器默认语言")*/
      const defaultLanguage = navigator.language || navigator.userLanguage;
      /*  console.log('Browser default language:', defaultLanguage);*/
      let defaultLanguageExists =  verifyLanguageList.value.some(item => item.language === defaultLanguage);
      if (defaultLanguageExists){
        /*        console.log("默认语言有效")*/
        router.push({ path: switchLocalePath(defaultLanguage) })
        locale.value=defaultLanguage
        cacheLanguage(defaultLanguage)
        /*        console.log("缓存了新的语言"+defaultLanguage)*/
        CurrentLanguage.value = allLanguage.LanguageMap.get(defaultLanguage)
      }else {
        router.push({ path: switchLocalePath('zh') })
        locale.value='zh'
        cacheLanguage('zh')
        /*        console.log("缓存了新的语言"+'zh')*/
      }
    }
  }
}

const menuList = ref([
  [
    {
      title:"menu.products",
      menuList:[
        { menuName:"series.rental-led-display", menuPath:"/products/rental-led-display", },
        { menuName:"series.fixed-install-led-display", menuPath:"/products/fixed-install-led-display"},
        { menuName:"series.fines-mall-pixel-led-display", menuPath:"/products/fines-mall-pixel-led-display"},
        { menuName:"series.transparent-led-display", menuPath:"/products/transparent-led-display"},
        { menuName:"series.iposter", menuPath:"/products/iposter"},
        { menuName:"series.creative-display", menuPath:"/products/creative-display"},
        { menuName:"series.led-module", menuPath:"/products/led-module"},
        { menuName:"series.led-display-accessories", menuPath:"/products/led-display-accessories"},
      ]
    },
  ],
  [
    {
      title:"menu.serviceAndSupport",
      menuList:[
        { menuName:"menu.serviceCenter", menuPath:"/service", },
        { menuName:"menu.app", menuPath:"/app", },
        { menuName:"menu.downloadCenter", menuPath:"/downloads", },
        { menuName:"menu.faq", menuPath:"/faq", },
        { menuName:"menu.helpCenter", menuPath:"/help", },
      ]
    },
    {
      title:"menu.solution",
      menuList:[

        { menuName:"menu.successCases",menuPath:"/cases",},
        { menuName:"menu.solution",menuPath:"/solution",},
        { menuName:"menu.productComparison", menuPath:"/comparison", },

      ]
    },
  ],
  [
    {
      title:"menu.officialAfterSalesService",
      menuList:[
        { menuName: "menu.afterSalesService", menuPath: "/after-sales", },
        { menuName: "menu.afterServicePolicy", menuPath: "/after-sales/policy", },


      ]
    },
    {
      title:"menu.information",
      menuList:[
        {menuName:"menu.newsCenter",menuPath:"/news",},
        {menuName:"menu.bulletin",menuPath:"/bulletin",},
        {menuName:"menu.exhibitions",menuPath:"/exhibitions",},
        { menuName:"menu.globalLayout",menuPath:"/about/global-layout",},

      ]
    },
  ],
  [
    {
      title:"menu.onlineVideoCenter",
      menuList:[
        { menuName: "menu.instructional", menuPath: "/video/instructional", },
      ]
    },
    {
      title:"menu.moreService",
      menuList:[
        { menuName:"menu.securityAndPrivacy", menuPath:"/security-and-privacy", },
        { menuName:"menu.termsOfUse", menuPath:"/terms", },
        { menuName:"menu.siteMap", menuPath:"/sitemap", },
        { menuName: "menu.recruitment", menuPath: "/recruitment", },
      ]
    },
  ],
  [
    {
      title:"menu.aboutTentech",
      menuList:[
        { menuName:"menu.aboutUs",menuPath:"/about",},
        { menuName:"menu.socialResponsibility",menuPath:"/about/social-responsibility",},
      ]
    },
    {
      title:"menu.contactTentech",
      menuList:[
        { menuName:"menu.contactUs",menuPath:"/contact",},
        { menuName: "menu.leaveMessage", menuPath: "/leave-message", },


      ]
    },
  ],
])



const downloadApp = ref(
    [
      {
        title: "",
        imgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/ios-download-app.png",
        storeImgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/app-store.png",
        version: "2.1.20240125",
        downloadUrl:"",
        explain: "",
      },
      {
        title: "",
        imgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/android-download-app.png",
        storeImgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/android.png",
        version: "1.9.20230526",
        downloadUrl:"https://file.kwunphi.com/app/aikwun/android/aikwun-release.2.1.20240125.apk",
        explain: "",
      },
    ]
)

const contactList = ref([
  { imgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/wechat-icon-white.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/qrcode/gongzhonghao.jpg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/youtube.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/socialLink/wechat-02.svg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/twitter.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/socialLink/twitter-02.svg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/facebook.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/bi.png"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/linkedin.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/socialLink/wechat-02.svg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/pinterest.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/socialLink/twitter-02.svg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/instagram.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/bi.png"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/whatsapp.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/socialLink/twitter-02.svg"},
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/skype.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/commons/bi.png"},
])

const contactList2 = ref([
  { imgUrl: "https://file.kwunphi.com/kwunphi4/images/icon/wechat-icon-white.svg", popupImgUrl: "https://file.kwunphi.com/kwunphi4/images/qrcode/gongzhonghao.jpg"},
])

function  formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
}
const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单
function getRouterLink(sub) {
  router.push({ path: localePath(`${sub.menuPath}`) });
}


function gotoSelectDrawerMenu(menuItem) {
  let temp = menuItem.selecting

  menuList.value.forEach((item) => {
    item.forEach((sub) => {
      sub.selecting= false;
    })
  })
  menuItem.selecting = !temp;

}

const socialMediaLinks = ref()
const socialMediaLinksLoading = ref(true)


const pageData = ref()
const pageDataLoading = ref(true)

onBeforeMount( () => {
  initLanguage()

  menuList.value.forEach((item) => {
    item.forEach((sub) => {
      sub.selecting= false;
    })
  })
  axios.get(httpPrefix+'/official-api/page-module/queryModuleBySlug',{
    params: {
      slug: "social-media-links",
      language: locale.value
    }
  }).then(function (response) {
    socialMediaLinks.value  = response.data.result?.moduleItemList || []
    socialMediaLinksLoading.value = false
  }).catch(function (error) {
    // 请求失败，处理错误
    console.error('请求失败:', error);
    socialMediaLinksLoading.value = true
  });


  axios.get(httpPrefix+'/official-api/page-module/queryPageBySlug',{
    params: {
      slug: "foot-menu",
      language: locale.value
    }
  })
      .then(function (response) {
        pageData.value = response.data.result.moduleList
/*        menuList.value[0][0] = pageData.value*/
        let dataMap = new Map()

        //根据sort字段排序
        // 过滤掉 item.slug === "social-media-links" 的元素
        pageData.value = pageData.value.filter(function(item) {
          return item.slug !== "social-media-links";
        });
        pageData.value.sort(function(a, b) {
          return a.sort - b.sort;
        });
        pageData.value.forEach((item) => {
          let menuItem = {
            title: item.text1,
            menuList:[],
            selecting: false
          }
          item.moduleItemList.forEach( (sub) => {
            menuItem.menuList.push({
              menuName: sub.path1Title,
              menuPath: sub.path1,
              externalUrl: sub.externalUrl,
              externalTitle: sub.externalTitle
            })
          })
          dataMap.set(item.slug, menuItem)
        })

/*        let k = 0;
        for (let i = 0; i < menuList.value.length; i++) {
          for (let j = 0; j < menuList.value[i].length; j++) {
            menuList.value[i][j] = dataMap.get(pageData.value[k].slug)
            k++
          }
        }*/

        pageDataLoading.value = false
      })
      .catch(function (error) {
        // 请求失败，处理错误
        console.error('请求失败:', error);
        pageDataLoading.value = true
      });

});






</script>



<style scoped>
@import '@/styles/open/foot.css';


.dialog-container{
  overflow: auto;
  width: 100%;
  min-height: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}



/*.select-language-container{
    width: 100%;
    height: 1600px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
}*/

.select-language-item{
  cursor: pointer;
  width: calc(33.33% - 16px);
  padding: 2px 14px;
  margin-right: 24px;
  margin-bottom: 16px;
  border-radius: 5px;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F7F9FA;
  transition: all 0.3s ease;
}
.drawer-select-language-item{
  width: 100%;
}



.select-language-item-last{
  margin-right: 0
}

.select-language-item:hover{
  background-color: #f3f3f3;

}


.select-language-container{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.region-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
}
.region-item>h1{
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;

}
.select-language-item-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}




</style>
