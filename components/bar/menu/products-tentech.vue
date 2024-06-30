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

              <tree-select-menu
                  v-for="(item, index) in categoryOptions"
                  :key="index"
                  :item="item"
                  :item-index="index.toString()"
                  @toggleChecked="handleSelect"
                  :is-radio="isRadio"
              ></tree-select-menu>





            </div>


            <div class="introduce-box">
              <img src="https://file.kwunphi.com/kwunphi4/images/commons/products-bg.jpg?x-oss-process=image/resize,m_lfit,w_500,h_500">





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
import {productCategory} from "@/stores/productCategory.js";
const productCategoryStore = productCategory();
//路由
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";
import TreeSelectMenu from "~/components/scroll/tree-select-menu.vue";
import SelectOptionsItem from "~/components/select/select-options-Item.vue";

const isRadio = ref(false)
const itemIndex = ref("")

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['SelectMenu']);//触发事件

const productList = ref([
  {
    delay: 0,
    name: "series.rental-led-display",
    path: '/products/rental-led-display',
    imgUrl: "https://file.kwunphi.com/kwunphi4/images/kwun/63/bg-colourless/01.png?x-oss-process=image/resize,m_lfit,w_500,h_500",
  },
  {
    delay: 0.2,
    name: "series.fixed-install-led-display",
    path: '/products/fixed-install-led-display',
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
    buttonPath: "/products",//在这里写跳转路径
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

const isCurrentSelecting = ref({})
function handleSelect(event){
  isCurrentSelecting.value = event
  router.push({ path: localePath(`/products/${isCurrentSelecting.value.slug}`) })
  triggerSelectMenuEvent()
}


const categoryOptions = ref([])
const productCategoryLoading = ref(true)
function fetchProductCategory() {
  axios.get(httpPrefix+'/official-api/category/list',{
    params: {
      id: "1782710624644313090",//查询案例分类下的所有分类
      language: locale.value
    }
  }).then(function (response) {
    if (response.data.code == 200){
      categoryOptions.value = iterateList(response.data.result.children || [])
      productCategoryStore.setCurrentCategory(categoryOptions.value)
      productCategoryLoading.value=false
    }
  }).catch(function (error) {

  });
}
function iterateList(list) {
  return list.map(item => {
    const subMenu = item.children ? iterateList(item.children) : [];
    return {
      label: item.categoryName,
      value: item.id,
      slug:item.slug,
      checked: false,
      children: subMenu
    };
  });
}










onBeforeMount(()=>{
  fetchProductCategory()
})
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
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
/**/
.introduce-box{
  width: 30%;
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
  color: var(--color-text-1);
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
