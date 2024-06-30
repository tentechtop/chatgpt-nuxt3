<template>

  <client-only>
    <div class="header_box"
         :style="{ 'position': position }"
         :class="[headerState.headerClass,headerState.backgroundClass,isSelecting?'isSelectingMenu':'']">
      <!--    v-menuLoadByAnimate="'animate__slideInRight'"-->


      <div class="pc-menu">
        <div class="nav-container">
          <div class="menu-box">
            <div class="left-menu">
              <nuxt-link :to="localePath('/')" class="logo-space" @click="handleCloseSelectMenu">
                <img  :src="theme=='light'? (locale.startsWith('zh') ? logo['black']:logo['black-en']) :(locale.startsWith('zh') ? logo['white']:logo['white-en'])">
                <span>Ether Ai</span>
              </nuxt-link>


              <div class="menu-space" :style="{ 'min-width': menuList.length * 60 + 'px', }">
                <template v-for="(menu,index) in menuList">
                  <div v-if="menu.show"  class="menu-item">
                    <p>{{ $t(menu.name)}}</p>
                    <!--                <div  class="underline"></div>-->
                  </div>
                </template>
              </div>
            </div>




            <div class="right-menu">
              <!--     登录按钮       -->
              <!--            <div v-if="isShowLoginButton" class="switch-menu-item" style="width: 60px" @mouseover="isShowLogin = true"
                               @mouseleave="isShowLogin = false">
                            <img v-if="navPosition === 'nav-top'" style="width: 24px;opacity: 1;filter: brightness(10);"
                                 :style="isSelecting ? 'filter: brightness(0)' : ''"
                                 src="https://file.kwunphi.com/kwunphi4/images/svg/%E7%99%BB%E5%BD%95%E9%BB%91%E8%89%B2.svg">
                            <img v-else style="width: 24px;opacity: 1;filter: brightness(0);"
                                 :style="isSelecting ? 'filter: brightness(0)' : 'filter: brightness(0);'"
                                 src="https://file.kwunphi.com/kwunphi4/images/svg/%E7%99%BB%E5%BD%95%E7%99%BD%E8%89%B2.svg">
                            &lt;!&ndash;      弹出按钮       &ndash;&gt;
                            <div v-if="isShowLogin" class="item-pop" @mouseover="isShowLogin = true"  @mouseleave="isShowLogin = false">
                              <div v-if="!userStore.getToken" class="hover-item">
                                <a :href="`http://localhost:5173/login?language=${locale}&callback=http://localhost:3000${route.fullPath}`">登录</a>
                                <a :href="`http://localhost:5173/register?language=${locale}&callback=http://localhost:3000${route.fullPath}`">注册</a>
                              </div>
                              <div v-else class="hover-item">
                                <a @click="getUserInfo">我的账号</a>
                                <a @click="loginOut">注销</a>
                              </div>
                            </div>
                          </div>-->
              <!--     切换语言按钮       -->
<!--              <div class="switch-menu-item" @click="open = !open">
                <img v-if="navPosition === 'nav-top'" style="width: 26px;opacity: 1;filter: brightness(10);"
                     :style="isSelecting ? 'filter: brightness(1)' : ''"
                     src="https://file.kwunphi.com/kwunphi4/images/svg/language-switch.svg">
                <img v-else style="width: 26px;opacity: 1;filter: brightness(0);"
                     :style="isSelecting ? 'filter: brightness(1)' : 'filter: brightness(0);'"
                     src="https://file.kwunphi.com/kwunphi4/images/svg/language-switch.svg">
                {{ CurrentLanguage.dialect }}
              </div>-->

<!--             @mouseover="isSearching=true"
                   @mouseleave="isSearching=false"        -->

              <div class="switch-menu-item search-item"
                   @click.stop="isSearching=true;handleMouseoverMenu(menuList[5]);isSelecting=true;ShowMenu=true"
                   @mouseleave="isSearching=false"

              >
                <img :src="searchIcon">
              </div>

              <div class="switch-menu-item">
                <el-switch v-model="theme"  active-value="dark" inactive-value="light"></el-switch>
              </div>






            </div>
          </div>
        </div>
      </div>
      <div class="mobile_menu flex_r_between">
        <nuxt-link :to="localePath('/')" class="drawer-logo">
          <img  :src="theme=='light'? (locale.startsWith('zh') ? logo['black']:logo['black-en']) :(locale.startsWith('zh') ? logo['white']:logo['white-en'])">
          <span>Ether Ai</span>
        </nuxt-link>
        <div class="flex_items-center">
          <left-directory-button :theme="navPosition" :active-value="headerState.drawerShow" @click="headerState.drawerShow = !headerState.drawerShow" style="margin-left: 20px"></left-directory-button>
        </div>




        <div class="flex_r_between drawer-container" >
          <!--     左开   direction="ltr"-->
          <el-drawer :title="$t('menu.navigation')" class="drawer-mobile_menu" v-model="headerState.drawerShow" :before-close="handleClose" :append-to-body="true" size="70%" :z-index="9998">
            <el-menu class="mobile-container" :default-active="getPath" :ellipsis="false" @select="(val) => handleSelect(val, 'mobile')">
              <el-menu-item index="/"> {{ $t('menu.home') }}</el-menu-item>









            </el-menu>

            <div class="drawer-select-container">
              <div class="drawer-select-split-line"></div>
              <div class="select-button-container">
                <div class="select-button-item" @click="innerOpen = true">
                  <img src="https://file.kwunphi.com/static/kwunphi5/svg/%E9%80%89%E6%8B%A9%E8%AF%AD%E8%A8%80.svg">
                  <p>{{ $t('menu.selectLanguage') }}</p>
                </div>
              </div>
            </div>
            <el-drawer :title="$t('menu.selectLanguage')" class="drawer-mobile_menu " v-model="innerOpen"
                       :append-to-body="true" size="70%" :z-index="9999" :before-close="handleInnerClose">
              <el-menu class="mobile-container" :default-active="getPath" :ellipsis="false" @select="(val) => handleselectLanguage(val, 'mobile')">

                <div v-for="(regionItem, regionIndex) in regionList" class="region-item">
                  <h1>{{regionItem.title}}</h1>
                  <div class="select-language-item-box">
                    <nuxt-link v-for="(langItem, langIndex) in regionItem.languageList"
                               :to="getTargetDomain(langItem.language)"
                               class="select-language-item drawer-select-language-item"
                               :class="{'select-language-item-last':((langIndex+1)%3)===0}"
                               @click="CurrentLanguage = langItem; innerOpen = false;  cacheLanguage(langItem.language)">
                      <p style="color: #3b3e40;float: left;">{{ langItem.langEnName }}</p>
                      <p style="float: right;color: #9fa3a6;">{{ langItem.dialect }}</p>
                    </nuxt-link>
                  </div>
                </div>


              </el-menu>
            </el-drawer>
          </el-drawer>
        </div>
      </div>

      <client-only>
        <el-dialog
            class="selectLanguageDialog container"
            :title="$t('menu.selectLanguage')" v-model="open"
            append-to-body>
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



  </client-only>


</template>

<script setup lang="ts">
import products from "@/components/bar/menu/products-tentech.vue"
import services from "@/components/bar/menu/services.vue"
import solution from "@/components/bar/menu/solution.vue"
import aboutus from "@/components/bar/menu/aboutus.vue"
import contact from "@/components/bar/menu/contact.vue"
import search from "@/components/bar/menu/search.vue"
import instructional from "@/components/bar/menu/instructional.vue"
import { user } from "@/stores/index.js";
const userStore = user();

import { useThemeStore } from "@/stores/Theme.js";
const useTheme = useThemeStore();

const theme = ref(useTheme.theme)



import searchIcon from '@/public/images/search-icon1.svg'
import logo from "@/assets/ts/logo";
import { onMounted, reactive, ref, watch, computed, onUnmounted, getCurrentInstance, onUpdated, onBeforeMount } from "vue";
const { proxy } = getCurrentInstance();
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
// @ts-ignore
const localePath = useLocalePath();
// @ts-ignore
const switchLocalePath = useSwitchLocalePath();
// @ts-ignore
import allLanguage from "~/assets/js/language";
const CurrentLanguage = ref(allLanguage.LanguageMap.get(locale.value))
const regionList = ref(allLanguage.regionList)
const verifyLanguageList = ref(allLanguage.LanguageList)
watch(theme,(newValue)=>{
  useTheme.setTheme(theme.value)
})




function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const isSearching = ref(false)

const userInfoValid = ref(false)

// 创建一个计算属性 filterList
const filteredList = computed(() => {
  return languageList.value.filter((v, index) => {
    return v.language !== 'test';//system
  });
});

const isShowLoginButton = ref(true)

const languageList = ref(allLanguage.language)
const isSelecting = ref(false)
const isShowSubMenu = ref(false)
const innerOpen = ref(false)

const currentMenuInfo = ref({})
const isShowLogin = ref(false)

const ShowMenu = ref(false)
const isCurrentMenu = ref(null)
let currentMenuComponent = products

watch(ShowMenu,(newValue)=>{
  if (ShowMenu.value){
    isSelecting.value=true
  }else {
    isSelecting.value=false
  }
})

const moveRigHt = ref(true)


function getCookieToken() {
  // 获取整个 cookie 字符串
}

function parseCookies(cookieString) {
  let cookies = {};
  cookieString.split(';').forEach(function (cookie) {
    let parts = cookie.split('=');
    let name = decodeURIComponent(parts[0].trim());
    cookies[name] = decodeURIComponent(parts[1]);
  });
  return cookies;
}

const handleInnerClose = () => {
  innerOpen.value = false
};

const open = ref(false)

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


//路由
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
// @ts-ignore
import TMenu from "~/components/bar/t-menu.vue";
// @ts-ignore
import DirectoryButton from "~/components/bar/directory-button.vue";
import LeftDirectoryButton from "~/components/bar/left-directory-button.vue";
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";



// 切换抽屉
const handleClose = () => {
  headerState.drawerShow = false;
};

const getPath = computed(() => {
  return localePath(route.path);
});


const menuList = ref([
  {
    menuId:1,
    name: 'menu.queryOrder',
    path: '/',
    isSelected:false,
    submenuExists:true,
    show:true
  },
  {
    menuId:2,
    name:  'menu.contact',
    path: '/',
    isSelected:false,
    submenuExists:true,
    show:true
  },


  {
    menuId:6,
    name:  'menu.search',
    path: '/',
    isSelected:false,
    submenuExists:true,
    show:false
  },
]);

watch(isCurrentMenu,(newValue)=>{
  if (isCurrentMenu.value){
    if (isCurrentMenu.value.menuId===1){
      currentMenuComponent=products
    }else if (isCurrentMenu.value.menuId===2) {
      currentMenuComponent=services
    }else if (isCurrentMenu.value.menuId===3){
      currentMenuComponent=solution
    }else if (isCurrentMenu.value.menuId===4){
      currentMenuComponent=instructional
    }else if (isCurrentMenu.value.menuId===5){
      currentMenuComponent=aboutus
    }else if (isCurrentMenu.value.menuId===6){
      currentMenuComponent=search
    }
  }
})

const fadeInClass = ref('animate__fadeInUpMenu') //'animate__fadeInRightMenu':'animate__fadeInLeftMenu'  ‘’animate__fadeInUpMenu

function handleMouseoverMenu(menu){
/*
  console.log("当前: "+menu.menuId +"之前 ： "+  (isCurrentMenu.value?.menuId))

  if (isCurrentMenu.value?.menuId != undefined  && menu.menuId !== isCurrentMenu.value?.menuId){
    fadeInClass.value = menu.menuId > (isCurrentMenu.value?.menuId) ? 'animate__fadeInRightMenu' : 'animate__fadeInLeftMenu'
  }
*/

  isCurrentMenu.value=menu
  if (menuList.value.length>0){
    menuList.value.forEach((mItem)=>{
      mItem.isSelected=false
    })
    menu.isSelected=true
  }
  /* router.push({ path: localePath(`${menu.path}`) })*/
}

function handleCloseSelectMenu(){
  if (menuList.value.length>0){
    menuList.value.forEach((mItem)=>{
      mItem.isSelected=false
    })
  }
  ShowMenu.value=false
}

watch(route, (newValue) => {
  menuList.value.forEach((menu) => {
    menu.isSelected = newValue.path === menu.path
  })
})

const headerState = reactive({
  drawerShow: false,
  startScrollTop: 0,
  headerClass: "fixed-header",
  activeIndex: 0,
  backgroundClass: "",
  placeholderSlider:""
});

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = async (val, type) => {
  if (type == "mobile") {
    headerState.drawerShow = false;
    router.push({ path: localePath(`${val}`) })
  }
};
const handleselectLanguage = async (val, type) => {
  innerOpen.value = false
};

// 添加响应式数据
const menuState = reactive({
  underlinedMenuIndex: null,
});

// 添加鼠标悬停时显示下划线的函数
function addUnderline(index) {
  menuState.underlinedMenuIndex = index;
}

// 添加鼠标离开时移除下划线的函数
function removeUnderline(index) {
  menuState.underlinedMenuIndex = null;
}

// 判断是否显示下划线的函数
function isMenuUnderlined(index) {
  return menuState.underlinedMenuIndex === index;
}

function gotoTargetPage(language) {

}

// 不需要渲染的名单
const whiteList = ref(["/login", "/reset-password", "/sign-up"]); // 不需要渲染的名单

const navPosition = ref('nav-bottom') //'nav-bottom'  nav-top

const position = ref("sticky")//sticky fixed

// 顶部导航固定
const scroll = () => {
  isShowSubMenu.value = false
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if (route.path === localePath('/')) {
    position.value = 'sticky'
    if (scrollTop < 100) {
      headerState.backgroundClass = ""
      headerState.backgroundClass = ""
      navPosition.value = 'nav-bottom'
      /*      navPosition.value='nav-bottom'*/
    } else {
      headerState.backgroundClass = ""
      navPosition.value = 'nav-bottom'
    }
  } else {
    position.value = 'sticky'
    headerState.backgroundClass = ""
    navPosition.value = 'nav-bottom'
  }
  const { startScrollTop } = headerState;
  if (scrollTop <= 50) {
    headerState.headerClass = "fixed-header";
    headerState.placeholderSlider = "showSlider";
    headerState.startScrollTop = scrollTop;
    return;
  }
  if (startScrollTop > scrollTop) {
    headerState.headerClass = "fixed-header";
    headerState.placeholderSlider = "showSlider";
  } else if (startScrollTop <= scrollTop) {
    headerState.headerClass = "hide-header";
    headerState.placeholderSlider = "hideSlider";
  }
  headerState.startScrollTop = scrollTop;
};

watch(route, (newValue) => {
  scroll()
})

function getUserInfo() {
  /*  console.log("currentUserInfo" + JSON.stringify(userStore.getUserInfo))*/
  /*http://192.168.3.123:5173/profile*/ /*带上token和*/
  window.location.href = `http://192.168.3.123:5173/profile`
}

function loginOut() {
  /*要去账户中心注销*/
  userStore.clearUserInfo()
}

const handleResize = () => {
  // 允许页面滚动，恢复到保存的滚动位置
  isSelecting.value = false
}






onBeforeMount( () => {
  // 页面增加滚动事件
  scroll()
  window.addEventListener("scroll", scroll);
  handleResize()
  window.addEventListener('resize', handleResize);

  //获取浏览器语言
  initLanguage()
/*  if (route.query["token"]) {
    router.push({ path: route.path })
  }*/


});

let savedScrollPosition;


/*
if (newValue) {
  // 禁止页面滚动，保存当前的滚动位置
  savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  document.body.style.position = 'fixed'; // 将body的位置设置为fixed，以防止页面滚动
  document.body.style.width = '100%'; // 确保滚动条不会消失
  document.body.style.top = `-${savedScrollPosition}px`;
  document.body.style.overflowY = 'scroll'; // 确保滚动条仍然可见
  window.removeEventListener("scroll", scroll);
} else {
  // 允许页面滚动，恢复到保存的滚动位置
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, savedScrollPosition)
  setTimeout(() => {
    window.addEventListener("scroll", scroll);
  }, 50);
}
*/

/*当触摸时触发事件*/
const emits = defineEmits(['menuSelecting']);//触发事件
watch(isSelecting,(newValue)=>{
  triggerSelectMenuEvent()
  if (newValue) {
    const m = (e) => { e.preventDefault() };
    // 当选择菜单被激活时，添加 padding-right 以适应滚动条的宽度
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", m, false); // 禁止页面滑动
  } else {
    const m = (e) => { e.preventDefault() };
    // 当选择菜单未被激活时，移除 padding-right 并恢复滚动
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
    document.removeEventListener("touchmove", m, true);
  }
})



function triggerSelectMenuEvent() {
  emits('menuSelecting',isSelecting.value);
}




</script>

<style>
.select-language-button {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.iconfont {
  font-size: 1.2rem;
  margin-right: 5px;
}

.icon-menu2 {
  font-size: 1.4rem;
}

.icon-menu {
  font-size: 1.1rem;
}

.icon-pengyouquan {
  font-size: 1.3rem;
}

.icon-timerauto {
  font-size: 1.1rem;
}

.icon-houduankaifa {
  font-size: 1.2rem;
}

.icon-tuichudenglu {
  font-size: 1.3rem;
}

.icon-liuyan {
  font-size: 1.3rem;
}

.el-drawer__body {
  padding: 10px;
}

.mobile-container {
  border: none;
}

.el-menu-item {
  color: #000;
  border-radius: 5px;
}

.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}



.drawer-mobile_menu .el-drawer__header .el-drawer__title {
  font-size: 18px;
  color: #030303;
}


.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn:hover .el-drawer__close>svg {
  color: #6C7073;
}

.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn .el-drawer__close {
  height: 26px;
  width: 26px;
}

.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn .el-drawer__close>svg {
  height: 26px;
  width: 26px;
  transform: rotate(0deg);
  transition: all 0.3s ease;
}


.selectLanguageDialog {
  width: 780px;
  z-index: 2001;
  background-color: var(--color-background);
}

@media screen and (max-width: 780px) {
  .selectLanguageDialog {
    width: 98%;
  }
}

.selectLanguageDialog .el-dialog__body {
  border-top: 1px solid rgba(0, 0, 0, 0.5);
}


.selectLanguageDialog .el-dialog__header .el-dialog__title {
  text-align: center;
}

.selectLanguageDialog .el-dialog__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn {
  color: #6C7073;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn:hover .el-dialog__close>svg {
  color: #6C7073;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
  height: 28px;
  width: 28px;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close>svg {
  height: 28px;
  width: 28px;
  transform: rotate(0deg);
  transition: all 0.3s ease;
}


/*.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close >svg:hover {
  color: #6C7073;
  transform: rotate(180deg);
}*/
</style>

<style scoped>
@import '@/styles/open/nav.css';

.all-container {}

.fade-enter-active,
.fade-leave-active {
  animation-name: showSubMenu;
  animation-duration: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  animation-name: hideSubMenu;
  animation-duration: 0.5s;
}

@keyframes showSubMenu {
  0% {

    transform: translateY(-80px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes hideSubMenu {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-100%);
  }
}

.header_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  /*  box-shadow: 0px -1px 3px rgba(0,0,0,0.15);*/
  backdrop-filter: blur(20px);/*模糊化背景*/
  transition-timing-function: cubic-bezier(.6,0,.4,1);
  background-color: var(--nav-background-color);
}

.transparentClass {
  background: rgba(0, 0, 0, 0);
  transition: all 0s ease;
}

/*选中后无色*/
.isSelectingMenu {
  background-color: var(--isSelectingMenu);
}

.hide-header {
  position: sticky;
  animation-name: hideHeader;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.fixed-header {
  position: sticky;
  animation-name: header;
  animation-duration: 0.6s;
}

@keyframes header {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes hideHeader {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-100%);
  }
}



@media screen and (max-width: 768px) {
  .header_box {
    height: 50px;
  }
}


/*隐藏滑块*/
.hideSlider{
  animation-name: hideSlider;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}
@keyframes hideSlider {
  0% {
    position: sticky;
    height: 100%;
    transform: translateY(0px);
  }
  100% {
    position: sticky;
    height: 0;
    transform: translateY(-100%);
  }
}

/*显示滑块*/
.showSlider{
  animation-name: showSlider;
  animation-duration: 0.6s;

}
@keyframes showSlider {
  0% {

  }
  100% {

  }
}

</style>
