<template>
  <div   class="component-container">
    <scroll-container  class="slide-swiper" :max-width="1088">

      <div class="swiper-button-container">
        <h1 class="item-module-h1">{{title}}</h1>
        <el-row>
          <button aria-label="上一项" class="swiper-button left" :class="{opacityButton:currentIndex===0}" @click="leftSwiper" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path></svg></button>
          <button aria-label="下一项" class="swiper-button right" :class="{opacityButton:!rightButtonIsUse}" @click="rightSwiper" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path></svg></button>
        </el-row>
      </div>

      <div ref="slideContainer" class="video-slide-container"
           @transitionend="animateEnd"
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend"
           :style="{transform:'translateX(' + offsetX +'px)'}">
        <div class="swiper-item"
             :class="{isSelectedVideo:item.isSelected}"
             :ref="`videoItemRef${index}`"
             v-for="(item,index) in videoListData"
             @click="goToTargetPage(item)"
             :style="{width:`${itemWidth}px`,'aspect-ratio':aspectRatioInfo}">
          <t-image :scale="true" fit="cover" class="swiper-item-img" :src="item.productCover">
            <div class="intro-text-box">
              <p :style="{color: item?.color}">{{item?.productName}}</p>
              <h1 :style="{color: item?.color}">{{item?.productTitle}}</h1>
            </div>
          </t-image>
        </div>
      </div>

      <div class="swiper-button-dot-container">
        <div class="swiper-button-dot" @click="moveTheContainer(videoListData[index],index)"  :class="{activeDot:index===currentIndex}" v-for="(item,index) in videoListData"></div>
      </div>

    </scroll-container>



  </div>
</template>

<script setup lang="ts">
// 场景列表偏移量
import {ref,getCurrentInstance} from "vue";
const  {proxy}  = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath();

function goToTargetPage(item) {
  router.push({ path: localePath(`/product/${item.model}`) })
}
const props = defineProps({
  videoList: {
    type: Array,
    required: true
  },
  aspectRatio:{
    type: Number,
    required: true,
    default: 16 / 9
  },
  maxWidth:{
    type: Number,
    required: true,
    default: 1920
  },
  title:{
    type: String,
    required: true,
    default:"Unknow"
  }
});

const rightButtonIsUse = ref(true)

const aspectRatioInfo = ref(props.aspectRatio)


const videoListData = ref(props.videoList)
const slideContainer = ref<HTMLDivElement | null>(null)
const offsetX = ref(0);

//宽度
const itemWidth = ref(0)
const marginRight = ref(16)
// 当前元素索引
const currentIndex = ref(0)
// 定时器
let timer: any = null;
const interval = ref(2000) // 滚动间隔时间

const flag = ref(true)//节流阀门
const startX = ref(0)//鼠标开始移动的位置
const moveX = ref(0)//手指移动的位置

function animateEnd() {
  flag.value = true; // 打开节流阀
}
function touchstart(event){  // 手指开始触摸事件
  if(flag.value){
    startX.value = event.targetTouches[0].clientX; // 获取开始触摸位置
    console.log("开始触摸的位置:"+startX.value)
  }
}
function touchmove(event){	// 手指开始移动
  if(flag.value){
    moveX.value = event.targetTouches[0].clientX - startX.value;  // 手指移动位置
  }
}
function touchend(event){	// 结束触摸
  if(flag.value){
    if (moveX.value > 50){
      leftSwiper()
    }else if (moveX.value < -50){
      rightSwiper()
    }
  }
}




function leftSwiper(){
  rightButtonIsUse.value =true
  if (currentIndex.value > 0){
    currentIndex.value--
    moveTheContainer(videoListData.value[currentIndex.value],currentIndex.value)
  }
}

function rightSwiper(){
  if (currentIndex.value < videoListData.value.length - 1){
    currentIndex.value++
    moveTheContainer(videoListData.value[currentIndex.value],currentIndex.value)
    rightButtonIsUse.value =true
  }else {
    rightButtonIsUse.value =false
  }
}

function moveTheContainer(item,index){
  currentIndex.value = index
  localStorage.setItem("currentIndex",index)
  console.log("当前的索引： "+ localStorage.getItem("currentIndex"))
  const x = proxy.$refs[`videoItemRef1`][0].style.width
  let numberValue = +x.split('px')[0];
  /*这里会导致出现bug*/
  /*
      if (window.innerWidth<780){
        offsetX.value=0
      }else {
        offsetX.value = -(numberValue+marginRight.value) * index
      }
  */
  offsetX.value = -(numberValue+marginRight.value) * index
  videoListData.value.forEach((video)=>{
    video.isSelected = false
    video.isPlaying = false
  })
  item.isSelected = true
  item.isPlaying = true
}



const handleResize = () => {
  let originalItemWidth = props.maxWidth
  if (window.innerWidth>780){
    itemWidth.value = Math.min(Math.max(originalItemWidth, props.maxWidth), window.innerWidth)
    marginRight.value = 16
    aspectRatioInfo.value = props.aspectRatio
  }else {
    itemWidth.value = 280
    aspectRatioInfo.value = 353/471
    marginRight.value = 16
  }
}

onMounted(() => {
  // 页面增加滚动事件
  window.addEventListener('resize', handleResize);
  handleResize()



})
onUnmounted(()=>{
  window.removeEventListener('resize', handleResize);
})
</script>

<style scoped>
.component-container{
  width: 100%;
  position: relative;
}
.video-slide-container{
  transition: all 0.4s ease;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.swiper-item{
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.4s ease;
  margin-right: 16px;
  max-width: 1920px;
  width:100%;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
}

.isSelectedVideo{

}
.swiper-item:last-child{
  margin-right: 0;
}

.swiper-item:hover  {

}



.video-introduce{
  padding: 6px 0 0 0px;
}

.swiper-item:last-child{

}

.swiper-item-img{
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}


.intro-container{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
}

.swiper-button-container{
  margin: 96px 0 20px 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.swiper-button{
  cursor: pointer;
  margin: 5px 10px;
  background-color: var(--special-background-color);
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  border: none;
}
.opacityButton >svg{
  opacity: 0.5;
}


.intro-container{
  top: 50%;
  left: 50%;
  z-index: 99;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate3d(-50%,-50%,0);
}
.intro-container>P {
  font-size: 20px;
  font-weight: 300;
  color: #FFF;
  margin-bottom: 8px;
}
.intro-container>h1 {
  color: #FFF;
  font-size: 28px;
}
.intro-container>h2 {
  color: #3a3a3a;
  margin-top: 8px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 300;
}
.swiper-button-dot-container{
  margin: 10px 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: none;
}

.swiper-button-dot{
  cursor: pointer;
  margin: 0 2px;
  width: 10px;
  height: 10px;
  background-color: #e6e6e6;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.activeDot{
  background-color: #565656;
}

.item-module-h1{
  color: var(--color-text-1);
  font-size: 27px;
}

.intro-text-box{
  left: 0;
  z-index: 2;
  background-color: transparent;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: visible;
  padding: 5px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.intro-text-box>p{
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

}
.intro-text-box>h1{
  font-size: 16px;
  font-weight: 600;
  line-height: 1.8;

}
@media screen and (max-width: 768px){
  .slide-swiper{
    overflow-x: hidden;
  }
  .swiper-item{
    margin-right: 16px;
  }
  .swiper-button{
    transform: scale(0.75);
    margin: 3px 0px;
  }

  .swiper-button-dot{
    width: 8px;
    height: 8px;
  }
  .swiper-button-dot-container {
    margin: 5px 0;
  }

  .swiper-button-container{
    margin: 48px 0 20px 0;
  }
  .item-module-h1{
    font-size: 22px;
  }
}





</style>
