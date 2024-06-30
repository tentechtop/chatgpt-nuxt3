<template>
  <div   class="component-container">

    <adaptive-containers  class="slide-swiper" :max-width="1280">
      <div ref="slideContainer" class="slide-container"
           @transitionend="animateEnd"
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend"


           :style="{transform:'translateX(' + offsetX + 'px)'}"
      >
        <div class="slide-item"
             :class="{isSelected:item.isSelected}"
             :ref="`videoItemRef${index}`"
             v-for="(item,index) in itemList"
             @click="funcIsUse? moveTheContainer(item,index):''"
             :style="{width:`${itemWidth}px`,'aspect-ratio':aspectRatio}">
          <t-image class="item-image" :src="item.imgUrl"></t-image>



        </div>
      </div>



    </adaptive-containers>


    <div class="adaptive-width-containers">
      <div class="adaptive-containers" :style="{'max-width':`${1280+32}px`}">
        <div class="swiper-button-container1">
          <button aria-label="上一项" class="swiper-button1 left" :class="{opacityButton:currentIndex===0}" @click="leftSwiper" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path></svg></button>
          <button aria-label="下一项" class="swiper-button1 right" :class="{opacityButton:!rightButtonIsUse}" @click="rightSwiper" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path></svg></button>
        </div>
      </div>
    </div>







  </div>
</template>

<script setup lang="ts">
// 场景列表偏移量
import {ref,getCurrentInstance} from "vue";
import VideoProduct from "~/components/t/video-product.vue";
const  {proxy}  = getCurrentInstance()

const funcIsUse = ref(true)


const props = defineProps({
  itemList: {
    type: Array,
    required: true
  },
  aspectRatio:{
    type: Number,
    required: true,
    default: 55 / 80
  },
  maxWidth:{
    type: Number,
    required: true,
    default: 550
  }
});
const itemListData = ref(props.itemList)
//宽度
const itemWidth = ref(0)
const marginRight = ref(32)
// 当前元素索引
const currentIndex = ref(0)
const offsetX = ref(0);
const rightButtonIsUse = ref(true)
function leftSwiper(){
  rightButtonIsUse.value =true
  if (currentIndex.value > 0){
    currentIndex.value--
    moveTheContainer(itemListData.value[currentIndex.value],currentIndex.value)
  }
}

function rightSwiper(){
  if (currentIndex.value < itemListData.value.length - 1){
    currentIndex.value++
    moveTheContainer(itemListData.value[currentIndex.value],currentIndex.value)
    rightButtonIsUse.value =true
  }else {
    rightButtonIsUse.value =false
  }
}
function moveTheContainer(item,index){

    currentIndex.value = index
    const x = proxy.$refs[`videoItemRef1`][0].style.width
    /*  console.log(proxy.$refs[`videoItemRef1`][0].style.width)*/
    let numberValue = +x.split('px')[0];
    /*这里会导致出现bug*/
    /*  if (window.innerWidth<780){
        offsetX.value=0
      }else {
        offsetX.value = -(numberValue+marginRight.value) * index
      }*/

    offsetX.value = -(itemWidth.value + marginRight.value) * index
    itemListData.value.forEach((video)=>{
      video.isSelected = false
      video.isPlaying = false
    })
    item.isSelected = true
    item.isPlaying = true

}

const handleResize = () => {
  let originalItemWidth = window.innerWidth / 3.5;
  if (window.innerWidth>780){
    itemWidth.value = Math.min(Math.max(originalItemWidth, 300), props.maxWidth);
    marginRight.value = 32
    funcIsUse.value = true
  }else {
    itemWidth.value = Math.min(Math.max(originalItemWidth, 300), window.innerWidth - 32);
    marginRight.value = 16
    funcIsUse.value = false
  }

}

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
.adaptive-width-containers{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.adaptive-containers{
  position: relative;
  width: 100%;
  height: auto;
  padding: 0 16px;
}
.component-container{
  width: 100%;
  position: relative;
}
.slide-container{
  transition: all 0.4s ease;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.slide-item{
  scroll-snap-align: start;
  transition: all 0.4s ease;
  margin-right: 32px;
  max-width: 550px;
  aspect-ratio: 55 / 80;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.isSelected{

}

.slide-item:last-child{

}
.item-image{
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 768px){
  .slide-swiper{
    overflow: scroll;
  }
  .slide-item{
    margin-right: 16px;
  }
}


.swiper-button-container1{
  z-index: 2;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

}
.swiper-button1{
  cursor: pointer;
  margin: 16px 16px;
  background: rgba(210,210,215,0.34);
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  border: none;
  transition: background 100ms linear, color 100ms linear, opacity 100ms linear;
}
.opacityButton >svg{
  opacity: 0.5;
}
</style>
