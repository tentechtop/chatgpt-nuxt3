<template>
  <div class="header_box"
       :style="{'position':position}"
       :class="[headerState.headerClass,headerState.backgroundClass,isSelecting?'isSelectingMenu':'']">
<!--    v-menuLoadByAnimate="'animate__slideInRight'"-->
    <div  class="pc-menu">
      <div class="nav-container">
        <div class="menu-box">
          <div class="left-menu">
            <nuxt-link :to="localePath('/')" class="logo-space" @click="handleCloseSelectMenu">
              <img v-if="!isSelecting" :src="theme==='nav-top'?
            (locale.startsWith('zh')? logo['nav-top'] : logo['nav-top-en'] ): (locale.startsWith('zh')? logo['nav-bottom'] : logo['nav-bottom-en'])   ">
              <img v-if="isSelecting" :src="locale.startsWith('zh')?  logo['nav-bottom'] : logo['nav-bottom-en']">
            </nuxt-link>
            <div class="menu-space" :style="{'min-width':menuList.length*60+'px',}">
              <div v-for="(menu,index) in menuList" class="menu-item"
                   :class="{'active-menu':menu.isSelected}"
                   @click="handleMouseoverMenu(menu)"
                   @mouseenter="addUnderline(index);isSelecting=true"
                   @mouseleave="removeUnderline(index);isSelecting=false"
                   @mouseover="isSelecting=true;ShowMenu=true;isCurrentMenu=menu;handleMouseoverMenu(menu)"
              >
                <p>{{ menu.name}}</p>
                <div  class="underline"></div>
                <!--       子菜单开始       -->
<!--                <div v-if="menu.subMeuns.length>0 " class="sub-menu"
                                         @mouseleave="menu.subMenuVisible=false"
                                         @mouseover="menu.subMenuVisible=true"
                                         :style="{height:menu.subMenuVisible? ((Math.ceil(menu.subMeuns.length / 4)   * menu.subHeight )+    80+'px'):(0+'px')}">
                <div class="sub-select-container" :style="{'justify-content':menu.justifyContent}">
                  <div  v-for="(sub,subIndex) in menu.subMeuns" :class="`${menu.subMenuClass}`"
                        @click="gotoTargetPageBySub(menu,sub)"
                        :style="{opacity:menu.subMenuVisible? (1):(0),display:menu.subMenuVisible?(''):('none')}">
                    <div v-if="sub.imgUrl" class="select-img-box">
                      <img  :src="sub.imgUrl" alt="123">
                    </div>
                    <h1>{{sub.name}}</h1>
                  </div>
                </div>
              </div>-->
                <!--       子菜单结束       -->
              </div>
            </div>
          </div>
          <div class="right-menu">
            <div class="switch-menu-item"  @click="open=!open">
              <img :src="theme==='nav-top'? 'https://tentech.oss-cn-shenzhen.aliyuncs.com/common/svg/%E6%9C%8D%E5%8A%A1-top.svg':'https://tentech.oss-cn-shenzhen.aliyuncs.com/common/svg/%E6%9C%8D%E5%8A%A1-bottom.svg'">
              <p>{{CurrentLanguage.dialect}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="mobile_menu flex_r_between" >
      <nuxt-link class="drawer-logo"   :to="localePath('/')"  >
        <img v-if="!isSelecting" :src="theme==='nav-top'?
            (locale.startsWith('zh')? logo['nav-top'] : logo['nav-top-en'] ): (locale.startsWith('zh')? logo['nav-bottom'] : logo['nav-bottom-en'])   ">
        <img v-if="isSelecting" :src="locale.startsWith('zh')?  logo['nav-bottom'] : logo['nav-bottom-en']">
      </nuxt-link>
      <div class="flex_items-center">
        <left-directory-button
            :theme="theme"
            :active-value="headerState.drawerShow"
            @click="headerState.drawerShow = true"
            style="margin-left: 20px"
        >
        </left-directory-button>
      </div>
      <div class="flex_r_between drawer-container">
<!--     左开   direction="ltr"-->
        <client-only>
          <el-drawer
              :title="$t('menu.navigation')"
              class="drawer-mobile_menu"
              v-model="headerState.drawerShow"
              :before-close="handleClose"
              :append-to-body="true"
              size="70%"
              :z-index="9998"
          >
            <el-menu
                class="mobile-container"
                :default-active="getPath"
                :ellipsis="false"
                @select="(val) => handleSelect(val, 'mobile')"
            >
              <el-menu-item index="/"> {{ $t('menu.home') }}</el-menu-item>
              <el-sub-menu index="/products">
                <template #title> {{ $t('menu.products') }}</template>
                <el-menu-item index="/products/Kwun-B62G"> {{$t('products.Kwun-B62G')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B33F"> {{$t('products.Kwun-B33F')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B33H"> {{$t('products.Kwun-B33H')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B32H"> {{$t('products.Kwun-B32H')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B32L"> {{$t('products.Kwun-B32L')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B22H"> {{$t('products.Kwun-B22H')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B22L"> {{$t('products.Kwun-B22L')}}</el-menu-item>
                <el-menu-item index="/products/Kwun-B11L"> {{$t('products.Kwun-B11L')}}</el-menu-item>
              </el-sub-menu>
              <!--            <el-sub-menu index="/service">
                            <template #title> {{ $t('menu.service') }}</template>
                            <el-menu-item index="/service"> {{ $t('menu.service') }}</el-menu-item>
                            <el-menu-item index="/downloads"> {{ $t('menu.downloadCenter') }}</el-menu-item>
                            <el-menu-item index="/"> {{ $t('menu.helpMeChoose') }}</el-menu-item>
                          </el-sub-menu>
                          <el-menu-item index="/"> {{ $t('menu.solution') }}</el-menu-item>-->
              <el-menu-item index="/news"> {{ $t('menu.newsCenter') }}</el-menu-item>

              <!--            <el-sub-menu index="/contact">
                            <template #title>  {{ $t('menu.contactUs') }}</template>
                            <el-menu-item index="/contact">  {{ $t('menu.contactUs') }}</el-menu-item>
                            <el-menu-item index="/">{{ $t('menu.leave-message') }}</el-menu-item>
                            <el-menu-item index="/"> {{ $t('menu.afterSalesPolicy') }}</el-menu-item>
                            <el-menu-item index="/"> {{ $t('menu.recruit') }}</el-menu-item>
                          </el-sub-menu>-->
            </el-menu>
            <div class="drawer-select-container">
              <div class="drawer-select-split-line"></div>
              <div class="select-button-container">
                <div class="select-button-item" @click="innerOpen=true">
                  <img src="https://kwun.oss-cn-shenzhen.aliyuncs.com/static/kwunphi5/svg/%E9%80%89%E6%8B%A9%E8%AF%AD%E8%A8%80.svg">
                  <p>{{ $t('menu.selectLanguage') }}</p>
                </div>
              </div>
            </div>
            <el-drawer
                :title="$t('menu.selectLanguage')"
                class="drawer-mobile_menu drawerSelectLanguage"
                v-model="innerOpen"
                :append-to-body="true"
                size="70%"
                :z-index="9999"
                :before-close="handleInnerClose">
              <el-menu
                  class="mobile-container"
                  :default-active="getPath"
                  :ellipsis="false"
                  @select="(val) => handleSelectLanguage(val, 'mobile')"
              >
                <div v-for="(regionItem, regionIndex) in regionList" class="drawer-region-item">
                  <div class="drawer-region-item-title"><h1>{{regionItem.title}}</h1></div>
                  <div class="drawer-region-box">
                    <nuxt-link v-for="(langItem, langIndex) in regionItem.languageList"
                               :to="getTargetDomain(langItem.language)"
                               class="select-language-item drawer-language-item" @click="CurrentLanguage = langItem;innerOpen=false;cacheLanguage(langItem.language)">
                      <p style="font-size: 14px;color: #3b3e40;float: left;">{{ langItem.langEnName }}</p>
                      <p style="font-size: 14px;float: right;color: #9fa3a6;">{{ langItem.dialect }}</p>
                    </nuxt-link>
                  </div>
                </div>
              </el-menu>
            </el-drawer>
          </el-drawer>
        </client-only>
      </div>
    </div>
    <client-only>
      <el-dialog
          class="selectLanguageDialog"
          :title="t('menu.selectLanguage')" v-model="open"
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


<!-- 菜单   -->
  <div :class="(ShowMenu && isCurrentMenu && isCurrentMenu.submenuExists)?'animate__fadeInUpMenuContainer':'animate__fadeOutDownMenuContainer'"
       class="floating-menu">
    <div class="sub-select-menu-container">
      <div class="placeholder-slider"
           :class="[headerState.placeholderSlider]">
      </div>
      <div class="shadow-collection-menu">
          <component v-if="isCurrentMenu"
                     :class="ShowMenu?'animate__fadeInUpMenu':'animate__fadeOutDownMenu'"
                     :is="currentMenuComponent" @SelectMenu="handleCloseSelectMenu"></component>
      </div>
    </div>
    <div class="close-bg" :style="ShowMenu?'display: block;':'display: none;'" @mouseover="handleCloseSelectMenu" ></div>
  </div>
</template>

<script setup lang="ts">
import products from "@/components/bar/menu/products.vue"
import services from "@/components/bar/menu/services.vue"
import solution from "@/components/bar/menu/solution.vue"
import about from "@/components/bar/menu/about.vue"
import information from "@/components/bar/menu/information.vue"
import logo from "../../assets/ts/logo";
import {onMounted, reactive, ref, watch, computed, onUnmounted, onUpdated,onBeforeMount} from "vue";
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

const CurrentMenu = ref()





const ShowMenu = ref(false)
const isCurrentMenu = ref(null)
let currentMenuComponent = products

const menuList = ref([
  {
    menuId:1,
    name:  t('menu.products'),
    path: '/products',
    isSelected:false,
    submenuExists:true
  },
  {
    menuId:2,
    name:  t('menu.service'),
    path: '/service',
    isSelected:false,
    submenuExists:true
  },
  {
    menuId:3,
    name:  t('menu.solution'),
    path: '/contact',
    isSelected:false,
    submenuExists:true
  },
  {
    menuId:5,
    name:  t('menu.newsCenter'),
    path: '/news',
    isSelected:false,
    submenuExists:true
  },
  {
    menuId:4,
    name:  t('menu.about'),
    path: '/about',
    isSelected:false,
    submenuExists:true
  },

]);

function handleMouseoverMenu(menu){

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


watch(isCurrentMenu,(newValue)=>{
  if (isCurrentMenu.value){
    if (isCurrentMenu.value.menuId===1){
      currentMenuComponent=products
    }else if (isCurrentMenu.value.menuId===2) {
      currentMenuComponent=services
    }else if (isCurrentMenu.value.menuId===3){
      currentMenuComponent=solution
    }else if (isCurrentMenu.value.menuId===4){
      currentMenuComponent=about
    }else if (isCurrentMenu.value.menuId===5){
      currentMenuComponent=information
    }
  }
})



const innerOpen = ref(false)
const handleInnerClose = () => {
  innerOpen.value=false
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
      } else if (item.code === 'zh') {
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


function cacheLanguage(language){
  localStorage.setItem('selectLanguage',language)
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

const isSelecting = ref(false)

// 切换抽屉
const handleClose = () => {
  headerState.drawerShow = false;
};



const getPath = computed(() => {
  return  localePath(route.path) ;
});







watch(route,(newValue)=>{
  menuList.value.forEach((menu)=>{
    menu.isSelected = newValue.path===menu.path
  })
})

const headerState = reactive({
  drawerShow: false,
  startScrollTop: 0,
  headerClass: "",
  activeIndex: 0,
  backgroundClass:"",
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
const handleSelectLanguage = async (val, type) => {
  innerOpen.value=false
/*  console.log("选择语言"+val)*/

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






// 不需要渲染的名单
const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单



const theme = ref('nav-bottom')



const position = ref("sticky")//sticky


// 顶部导航固定
const scroll = () => {
  /*ShowMenu.value=false*/
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  if (route.path===localePath('/')){
    position.value='sticky'
    if (scrollTop<100){
      headerState.backgroundClass = ""
/*      headerState.backgroundClass = "transparentClass"*/
/*      theme.value='nav-top'*/
      theme.value='nav-bottom'
    }else {
      headerState.backgroundClass = ""
      theme.value='nav-bottom'
    }
  }else {
    position.value='sticky'
    headerState.backgroundClass = ""
    theme.value='nav-bottom'
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


watch(route,(newValue)=>{
  scroll()
})


onMounted(() => {
  // 页面增加滚动事件
  window.addEventListener("scroll", scroll);
  initLanguage()
});
</script>


<style>
.select-language-button{
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

.el-drawer__body{
  padding: 10px;
}
.mobile-container{
  border: none;
}
.el-menu-item{
  color: #000;
  border-radius: 5px;
}
.el-menu-item:hover{
  background-color: rgba(0,0,0,0.03);
}



.drawer-mobile_menu .el-drawer__header .el-drawer__title {
  font-size: 18px;
  color: #030303;
}


.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn:hover .el-drawer__close >svg  {
  color: #6C7073;
}

.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn .el-drawer__close {
  height: 26px;
  width: 26px;
}
.drawer-mobile_menu .el-drawer__header .el-drawer__close-btn .el-drawer__close >svg {
  height: 26px;
  width: 26px;
  transform: rotate(0deg);
  transition: all 0.3s ease;
}


.selectLanguageDialog{
  width: 780px;
  z-index: 2001;
}

@media screen and (max-width: 780px){
  .selectLanguageDialog{
    width: 98%;
  }
}

.selectLanguageDialog .el-dialog__body{
  border-top: 1px solid rgba(0,0,0,0.5);
}


.selectLanguageDialog .el-dialog__header .el-dialog__title  {
  text-align: center;
}

.selectLanguageDialog .el-dialog__header   {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn  {
  color: #6C7073;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn:hover .el-dialog__close >svg  {
  color: #6C7073;
}

.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
  height: 28px;
  width: 28px;
}
.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close >svg {
  height: 28px;
  width: 28px;
  transform: rotate(0deg);
  transition: all 0.3s ease;
}


/*.selectLanguageDialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close >svg:hover {
  color: #6C7073;
  transform: rotate(180deg);
}*/

.drawerSelectLanguage .el-drawer__header{
  display: none;

}
.drawerSelectLanguage .el-drawer__body{
  padding: 0;

}

</style>

<style scoped>
@import '../../styles/menu.css';
.header_box {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
/*  box-shadow: 0px -1px 3px rgba(0,0,0,0.15);*/
  background-color: #fff;
}

.transparentClass{
  background: rgba(0,0,0,0.1);
}

.isSelectingMenu{
  background-color: #fff;
}

.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.fixed-header {
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
    height: 60px;
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
    position: fixed;
    height: 100%;
    transform: translateY(0px);
  }
  100% {
    position: fixed;
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
