<template>
  <div class="select-container">
    <div class="select-inner-container">
      <div class="horizontal-containers">
        <div class="component-menu">

          <div v-for="(menu,mItem) in menuDataList" class="horizontal-menu-item" >
            <div class="optional-title">
              <nuxt-link v-if="menu.buttonPath && menu.buttonPath!==''"
                         @click="triggerSelectMenuEvent"
                         :to="localePath(`${menu.buttonPath}`)">{{ $t(menu.title1)}}</nuxt-link>

              <a v-else >{{$t(menu.title1)}}</a>
              <img v-if="menu.buttonPath && menu.buttonPath!==''" src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/icon-%E8%B7%B3%E8%BD%AC.svg">
            </div>

            <p>{{ menu.title2}}</p>
            <el-divider style="margin: 12px 0"></el-divider>
            <div class="sub-container-v">
              <nuxt-link :to="localePath(`${subM.buttonPath}`)"
                         @click="triggerSelectMenuEvent"
                         class="subMenu-Item" v-for="(subM,MItem) in menu.subMenuList">
                {{subM.buttonTitle}}
              </nuxt-link>
            </div>
          </div>

          <div class="products-container">
            <div class="product-item-container">
              <div class="product-item" v-for="(pItem,pIndex) in productList" @click="gotoTargetPage(pItem)">
                <div v-if="pItem.imgUrl" class="select-img-box">
                  <img :src="pItem.imgUrl" :alt="t(pItem.name)">
                </div>
                <h1>{{ t(pItem.name) }}</h1>
              </div>
            </div>


          </div>
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
import {ref} from "vue";
import {useI18n} from "vue-i18n";
const { t, locale, locales } = useI18n()
const localePath = useLocalePath();
//路由
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['SelectMenu']);//触发事件

const productList = ref([
  {
    delay: 0,
    name: "series.rental-led-display",
    path: '/',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/63/bg-colourless/01.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.2,
    name: "series.fixed-install-led-display",
    path: '/',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/33F/bg-colourless/01-removebg-preview.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.3,
    name: "series.fines-mall-pixel-led-display",
    path: '/products/Kwun-B33H',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/33/bg-colourless/01.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.4,
    name: "series.transparent-led-display",
    path: '/products/Kwun-B32H',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/33/bg-colourless/01.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.5,
    name: "series.iposter",
    path: '/products/Kwun-B32L',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/33/bg-colourless/01.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.6,
    name: "series.creative-display",
    path: '/products/Kwun-B22H',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/22/bg-colourless/02.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.7,
    name: "series.led-module",
    path: '/products/Kwun-B22L',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/22/bg-colourless/02.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.8,
    name: "series.led-display-accessories",
    path: '/products/Kwun-B11L',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/11/bg-colourless/1.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
])


const menuDataList = ref([
  {
    title1: "menu.products",
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
    buttonPath: "/",//在这里写跳转路径
    alt:"",
    subMenuList:[]
  }
])


function gotoTargetPage(pItem){
  router.push({ path: localePath(`${pItem.path}`) })
  triggerSelectMenuEvent()
}

function triggerSelectMenuEvent() {
  emits('SelectMenu','Solution');
}


</script>

<style scoped>
@import '@/styles/open/component.css';




.component-menu{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.product-item-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
/**/
.introduce-box{
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.introduce-box >img{
  width: 100%;
  object-fit: cover;
}

.horizontal-menu-item{
  width: calc(22% - 16px);
  margin-right: 16px;
  display: flex;
  flex-direction: column;
}


.optional-title>img{
  transition: all 0.3s ease;
  width: 25px;
  object-fit: cover;
}
.optional-title:hover >img{

  transform: translateX(5px);
}
@keyframes ShiftRight {
  0%{
    transform: translateX(0px);
  }
  100%{
    transform: translateX(5px);
  }
}

.horizontal-menu-item >p{
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
}


.sub-container-v{
  display: flex;
  flex-direction: column;
}

.sub-container-v >a{
  color: #545454;
  font-weight: 400;
  font-size: 16px;
  line-height: 40px;
}

.subMenu-Item{
  width: auto;
}

.subMenu-Item:hover{
  color: #000000;
  text-decoration: underline; /* 当悬停时显示下划线 */
}

.product-item{
  border-radius: 5px;
  padding: 10px 5px;
  cursor: pointer;
  width: calc( 25% - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.product-item:hover > h1{
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: .15em;
}

.select-img-box{
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
}

.select-img-box >img{
  height: 100%;
  object-fit: cover;
}
.product-item > h1{
  font-size: 14px;
}
.products-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

@media screen and ( max-width: 1312px){
  .select-inner-container{
    padding: 48px 16px 68px;
  }
  .close-button-container{
    right: 10px;
  }
}
</style>
