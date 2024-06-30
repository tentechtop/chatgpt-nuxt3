<template>
  <div class="box " @mouseover="showImgDot" @mouseout="hiddenImgDot"
       @mousedown="startDrag"
       @mousemove="drag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
  >
    <div class="swiper" ref="listRef">
      <t-image :scale="false" v-for="(item,index) in productImgList" class="img" :src="item" :style="{ zIndex: active === index ? 9 : 1}" ></t-image>
    </div>

    <div class="dots">
      <div class="dots-box">
        <div   v-for="(item,index) in productImgList" :key="index" class="img-dots"  :class="{ 'img-dots-mask': active!==index, 'isADot': !show,'isActiveDot': active===index}"  @click="active = index">
          <img :src="item"  alt="">
        </div>
      </div>
    </div>



    <div :class="{ 'isShowPage': show}" class="left" @click="left"> <svg t="1686904252717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2373" width="48" height="48"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" fill="#currentColor" p-id="2374"></path></svg> </div>
    <div :class="{ 'isShowPage': show}" class="right" @click="right"> <svg t="1686904291322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3347" width="48" height="48"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" fill="#currentColor" p-id="3348"></path></svg> </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,onBeforeMount,watch ,onUpdated,onBeforeUnmount} from "vue";
const dragStartX = ref(0);
const dragOffset = ref(0);
const dragging = ref(false);


const listRef = ref<HTMLElement | null>(null);

const list = ref([]);
const imgList = ref([]);

// 定时器
let timer: any = null;

// 当前图片
const active = ref(0);

const length = ref(0);

const startDrag = (event: MouseEvent) => {
  dragging.value = true;
  dragStartX.value = event.clientX;
};

const drag = (event: MouseEvent) => {
  if (dragging.value) {
    dragOffset.value = event.clientX - dragStartX.value;
    if (dragOffset.value < 0) {
      right();
      endDrag();
    } else if (dragOffset.value > 0) {
      left();
      endDrag();
    }
  }
};
const endDrag = () => {
  dragging.value = false;
};
watch(
    [active],
    (newValue) => {
      if (active.value>length.value-1 ){
        active.value=0
      }else if(active.value<0){
        active.value=length.value-1
      }

    }
);




const timeSecond = ref(2000)

// 图片圆点显示
const show = ref(false);


const getStyle = ref(0);
// 生命周期 渲染完成后
onMounted(() => {
  // @ts-ignore
  list.value = Array.from(listRef.value.children);
  autoPlay();
});

onUpdated(()=>{
  // @ts-ignore
  imgList.value=props.productImgList
  length.value=imgList.value.length
})



// 生命周期 销毁前
onBeforeUnmount(() => {
  clearInterval(timer);
  timer = null;
});

watch(show, (newValue) => {
  if (newValue) {
    const startValue = 10; // 起始值
    const endValue = 100; // 结束值
    const duration = 0.3; // 过渡时间（秒）
    const step = (endValue - startValue) / (duration * 60); // 每帧的步长

    let currentValue = startValue;
    const interval = setInterval(() => {
      currentValue += step;

      if (currentValue >= endValue) {
        currentValue = endValue;
        clearInterval(interval);
      }

      getStyle.value = currentValue;
    }, 1000 / 60); // 每秒60帧
  }
});




// 自动轮播
const autoPlay = () => {
  timer = setInterval(() => {
    right();
  }, 6000);
};

// 右
const right = () => {
  active.value === list.value.length - 1 ? (active.value = 0) : active.value++;
};
// 左
const left = () => {
  active.value === 0 ? (active.value = list.value.length - 1) : active.value--;
};
// 鼠标移入显示图片圆点
const showImgDot = () => {
  show.value = true
  // 清除定时器
  clearInterval(timer);
  timer = null;
}
// 鼠标移出隐藏图片圆点
const hiddenImgDot = () => {
  show.value = false
  // 重新开启定时器
  autoPlay();
}

const props =defineProps({
  productImgList: {
    required: true,
  },
});

watch(
    () => props.productImgList,
    (newValue) => {
      active.value = 1;
    }
);

</script>

<style scoped>
.box {
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}
.img {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.left, .right {
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0);
  color: #fff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 9;
  margin: 0 -30px;
  display: flex;
  opacity: 0;

}
.isShowPage{
  /*  width: 45px;
    height: 45px;*/
  opacity: 1;
}
.left:hover, .right:hover {
  background-color: rgba(0,0,0,0);
}
.left svg, .right svg {
  width: 30px;
  height: 30px;
  fill: #000;
}
.left {
  left: 0px;
}
.right {
  right: 0px;
}

.dots {
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  z-index: 999;
}

ul {
  display: flex;
}

ul > li {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #72706f;
  list-style: none;
  cursor: pointer;
}

.dots-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.img-dots {
  transition: all 0.4s ease;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,.2);
}
.img-dots img {
  width: 100%;
  height: 100%;
}

.img-dots-mask:after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background-color: rgba(0,0,0,.4);
  z-index: 99;
  width: 100%;
  height: 100%;
}
.isADot{
  border: none;
  width: 10px;
  height: 10px;
  margin: 0 0px;
  border-radius: 100%;
  background-color: #000000;
  list-style: none;
  cursor: pointer;
}
.isADot img{
  display: none;
}

.isActiveDot{
  background-color: #E3E3E3;
}
@media screen and (max-width: 768px){
  .img-dots {
    width: 40px;
    height: 40px;
  }
  .isADot{
    width: 10px;
    height: 10px;
  }
  .left, .right {
    width: 40px;
    height: 40px;
    display: none;
  }

}

</style>
