<template>
  <div ref="swiperBar" class="swiper-bar" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag"
       @mouseleave="endDrag">
    <div ref="sceneListDOM" class="scene-list" :class="{ 'none-animation': !enableAnimation }"
         :style="{ transform: 'translateX(' + offsetX + 'px)', width: ((slides.length * (itemWidth + itemMargin * 2)) * 3 + 30) + 'px' }">
      <template v-for="num in 3">
        <div v-for="(item, index) in caseList" class="scene-item"
             :style="{ width: itemWidth + 'px', height: (itemWidth * 0.6 + 'px'), margin: '0px ' + itemMargin + 'px', 'background-image': 'url(' + item.videoPoster + ')' }">

          <video v-if="num === 2 && index === activeVideo"
                 class="video-item"
                 ref="videoPlayer"
                 :poster="item.videoPoster"
                 loop
                 autoplay
                 muted
                 :src="item.videoUrl"></video>

        </div>
      </template>

    </div>
    <div class="item-content">
      <h1 v-if="caseList!==null && caseList.length>0">{{ caseList[activeScene].title1 }}</h1>
      <div v-for="(scene, index) in caseList" class="description-container" :class="{ 'description-active': (index === activeScene) }">
<!--        <h2  class="description">{{ scene.title2 }}</h2>-->
        <p class="link-more">
          <nuxt-link :to="localePath(scene.buttonPath)">{{scene.buttonTitle}}</nuxt-link>
        </p>
      </div>
    </div>

    <div class="btn-prev" @click="previousScene">
      <img src="https://file.kwunphi.com/kwunphi4/images/commons/jianto.svg">
    </div>
    <div class="btn-next" @click="nextScene">
      <img src="https://file.kwunphi.com/kwunphi4/images/commons/jianto.svg">
    </div>
    <div class="dot-bar">
      <div v-if="caseList!==null && caseList.length>0"  v-for="(dot, index) in caseList.length" class="dot" :class="{ 'dot-active': index === activeScene }"
           @click="swiperScene($event, index)">
        <div class="dot-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,onBeforeUnmount,watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const localePath = useLocalePath();
// 当前展示幕，负 length 到 2 倍 length
let currentIndex = 0
// 当前真正激活幕
const activeScene = ref(0)
// 当前播放的视频
const activeVideo = ref(0)

// const scrollPosition = ref(3630);//初始距离
const dragStartOffsetX = ref(0);
const dragStartX = ref(0);
const dragOffset = ref(0);
const dragging = ref(false);
const enableClick = ref(true)

// 滑动工具条
const swiperBar = ref<HTMLElement | null>(null)
// 幕列表 DOM 元素
const sceneListDOM = ref<HTMLElement | null>(null)
// 浏览器宽度
const clientWidth = ref(0)
// 一幕宽度
const itemWidth = ref(1200);
// 幕的左右间距
const itemMargin = ref(8);//
// 场景列表偏移量
const offsetX = ref(0);
// 是否停止动画
const enableAnimation = ref(false)
// 转场动画持续时间，毫秒
const animationDuration = 800
// 每一幕播放时长，毫秒
const defaultPlayDuration = 60000

// 转场动画
let animationTimer: any = null

// 监听当前播放视频的定时器
let videoTimer: any = null

// 播放下一幕的定时器
let nextTimer: any = null;

// 等待播放下一个
const waitNext = () => {
  clearNextTimer()
  nextTimer = setTimeout(() => {
    nextScene(null)
    // @ts-ignore
  }, slides.value[activeScene.value].duration || defaultPlayDuration)
};

const playVideo = () => {
  clearVideoTimer()
  videoTimer = setTimeout(() => {
    activeVideo.value = activeScene.value
  }, animationDuration)
}

function clearAnimationTimer() {
  if (animationTimer) {
    clearTimeout(animationTimer)
    animationTimer = null
  }
}

function clearVideoTimer() {
  if (videoTimer) {
    clearTimeout(videoTimer)
    videoTimer = null
  }
}

function clearNextTimer() {
  if (nextTimer) {
    clearTimeout(nextTimer)
    nextTimer = null
  }
}

let isClick = false
function defaultClick() {
  isClick = true
  setTimeout(() => {
    isClick = false
  }, 50)
}

const previousScene = (event: MouseEvent | null) => {
  if (event) {
    event.stopPropagation()
  }
  defaultClick()
  // 到负幕后，不再翻页
  if (currentIndex < 0) {
    return
  }
  const length = slides.value.length
  enableAnimation.value = true
  currentIndex = currentIndex - 1
  if (currentIndex < 0) {
    // 负数
    currentIndex = currentIndex % length
    activeScene.value = currentIndex != 0 ? (length + currentIndex) : 0
    offsetX.value = getOffsetX(currentIndex)
    clearAnimationTimer()
    animationTimer = setTimeout(() => {
      enableAnimation.value = false
      currentIndex = activeScene.value
      offsetX.value = getOffsetX(currentIndex)
    }, animationDuration)
  } else {
    activeScene.value = currentIndex
    offsetX.value = getOffsetX(currentIndex)
  }
  playVideo()
  waitNext()
}

const nextScene = (event: MouseEvent | null) => {
  // console.error("next")
  if (event) {
    event.stopPropagation()
  }
  defaultClick()
  const length = slides.value.length
  // 超过最后一幕后，不再翻页
  if (currentIndex >= length) {
    return
  }
  enableAnimation.value = true
  currentIndex = currentIndex + 1
  if (currentIndex >= length) {
    activeScene.value = currentIndex % length
    offsetX.value = getOffsetX(currentIndex)
    clearAnimationTimer()
    animationTimer = setTimeout(() => {
      enableAnimation.value = false
      currentIndex = activeScene.value
      offsetX.value = getOffsetX(currentIndex)
    }, animationDuration)
  } else {
    activeScene.value = currentIndex
    offsetX.value = getOffsetX(currentIndex)
  }
  playVideo()
  waitNext()
}

const swiperScene = (event: MouseEvent | null, index: number) => {
  // console.error(event)
  if (event) {
    event.stopPropagation()
    // event.preventDefault()
  }
  defaultClick()
  enableAnimation.value = true
  const length = slides.value.length
  currentIndex = index
  if (index < 0) {
    currentIndex = currentIndex % length
    activeScene.value = currentIndex != 0 ? (length + currentIndex) : 0
    offsetX.value = getOffsetX(currentIndex)
  } else if (index >= length) {
    activeScene.value = currentIndex % length
    offsetX.value = getOffsetX(currentIndex)
  } else {
    activeScene.value = currentIndex
    offsetX.value = getOffsetX(currentIndex)
  }
  if (index < 0 || index >= length) {
    clearAnimationTimer()
    animationTimer = setTimeout(() => {
      enableAnimation.value = false
      currentIndex = activeScene.value
      offsetX.value = getOffsetX(currentIndex)
    }, animationDuration)
  }
  playVideo()
  waitNext()
}

watch(activeScene, (newActive) => {
  setTimeout(() => {
    for (let i = 0; i < slides.value.length; i++) {
      slides.value[i].showDesc = (i === newActive);
    }
  }, 600);
});

const startDrag = (event: MouseEvent) => {
  // console.error("starting")
  if (event) {
    event.stopPropagation()
  }
  if (isClick) {
    return
  }
  dragging.value = true;
  dragStartOffsetX.value = offsetX.value
  dragStartX.value = event.clientX;
  enableAnimation.value = false
  clearNextTimer()
};

const drag = (event: MouseEvent) => {
  if (event) {
    event.stopPropagation()
  }
  // console.error(event.button, event)
  if (dragging.value) {
    dragOffset.value = event.clientX - dragStartX.value;
    offsetX.value = dragStartOffsetX.value + dragOffset.value
    // console.error(offsetX.value)
  }
};

const endDrag = () => {
  let isDragging = dragging.value

  dragging.value = false;
  if (isDragging) {
    let x = dragOffset.value
    if (x < -50) {
      nextScene(null)
    } else if (x > 50) {
      previousScene(null)
    } else {
      swiperScene(null, activeScene.value)
    }
  }
};


const slides = ref([
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-04.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-04.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B33H"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-02.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-02.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B32L"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-01.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-01.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B33H"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-03.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-03.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B22L"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-06.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-06.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B32L"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/poster/home-video-03.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/poster/home-video-03-cover.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B22H"
  },
  {
    videoUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-05.mp4",
    imgUrl: "https://file.kwunphi.com/kwunphi4/videos/new/home-video-cover-05.jpg",
    showImage: true,
    showVideo: false,
    showDesc: false,
    productId: 1,
    router: "/learn-more/Kwun-B32L"
  },
]);

function getOffsetX(index: number): number {
  let offset = -(slides.value.length + index) * (itemWidth.value + itemMargin.value * 2) + (clientWidth.value - itemWidth.value) / 2 - itemMargin.value
  return offset
}

function resizeItemWidth(repeat: number) {
  let cwidth = swiperBar.value?.getBoundingClientRect().width
  if (cwidth && cwidth > 0) {
    let margin = cwidth > 1200 ? 8 : 0
    let width = cwidth > 1200 ? 1200 : cwidth
    clientWidth.value = cwidth
    itemMargin.value = margin
    itemWidth.value = width
    let offset = -(slides.value.length + currentIndex) * (width + margin * 2) + (cwidth - width) / 2 - margin
    offsetX.value = offset
  } else if (repeat && repeat > 0) {
    setTimeout(() => {
      resizeItemWidth(repeat - 1)
    }, 10)
  }
}


onMounted(() => {
  slides.value[currentIndex].showDesc = true;
  currentIndex = 0
  activeScene.value = 0
  resizeItemWidth(100)
  // @ts-ignore
  window.addEventListener('resize', resizeItemWidth)
  playVideo()
  waitNext()








})
onUnmounted(() => {
  // @ts-ignore
  window.removeEventListener('resize', resizeItemWidth)

  // 清除定时器，防止下次进入页面产生多个定时器
  clearAnimationTimer()
  clearVideoTimer()
  clearNextTimer()
})

const props = defineProps({
  caseList: {
    type: Array,
    required: true,
    default: () => []
  }
});




</script>

<style scoped>
.swiper-bar {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.scene-list {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  flex-wrap: nowrap;
  transition: transform 0.8s ease;
  z-index: 1;
}

.scene-list.none-animation {
  transition: none;
}

.scene-item {
  background-size: cover;
  background-color: #f3f3f3;
  cursor: pointer;
  /* margin: 0 8px; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scene-item>img {
  height: 720px;
  width: 1200px;
  object-fit: cover;
  transition: width 2s ease, height 2s ease, opacity 0.2s ease;
}

.scene-item>video {
  transition: display 0.6s ease, opacity 0.8s ease, width 2s ease, height 2s ease;
  z-index: 10;
  height: 100%;
  width: 100%;
}

.button-space {
  cursor: pointer;
  width: 1200px;
  height: 720px;
  position: absolute;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.btn-prev {
  cursor: pointer;
  width: 44px;
  height: 44px;
  position: absolute;
  top: calc(50% - 22px);
  /* 包含滚动条宽度 */
  left: calc(50vw - 600px + 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.btn-next {
  cursor: pointer;
  width: 44px;
  height: 44px;
  position: absolute;
  top: calc(50% - 22px);
  right: calc(50vw - 600px + 10px);
  transform: rotate(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.btn-prev>img,
.btn-next>img {
  transition: opacity 0.1s ease;
  border-radius: 100px;
  width: 100%;
  opacity: 0.5;
  display: block;
}

.btn-prev:hover>img,
.btn-next:hover>img {
  opacity: 1;
}

.button-space>img:hover {
  background-color: black;
}

.dot-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.dot {
  width: 32px;
  padding: 16px 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}



.dot-wrapper {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.35);
}

.dot-active {
  width: 36px;
}

.dot-active .dot-wrapper {
  background-color: #fff;
}

.dot:hover .dot-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
}

.item-content {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.item-content>h1 {
  text-align: center;
  color: white;
  font-size: 30px;
  line-height: 21px;
  font-weight: 700;
}

.description-container {
  opacity: 1;
  height: 0;
  margin-top: 0;
  width: calc(100vw - 160px);
  max-width: 800px;
  text-align: center;
  position: relative;
  transform: translateY(-100px);
  transition: all 0.5s ease;
}

.description {
  color: white;
  opacity: 0;
  text-align: center;
  overflow: hidden;
  font-weight: 300;
  width: auto;
  font-size: 22px;
  margin: 8px 0;
  transform: translateY(100px);
  transition: opacity 0.5s ease 0s, transform 0s ease 0.5s;
}

.link-more {
  text-align: center;
  margin-top: 16px;
  opacity: 0;
  transform: translateY(180px);
  transition: opacity 0.5s ease 0s, transform 0s ease 0.5s;
}

.link-more>a {
  font-size: 18px;
  font-weight: 300;
  color: #fff;
}

.description-active.description-container {
  height: auto;
  margin-top: 16px;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease;
}

.description-active .description {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
}

.description-active .link-more {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease 0.6s, transform 1.2s ease 0.6s;
}

@media screen and (max-width: 1200px) {
  .btn-prev {
    left: 16px;
  }

  .btn-next {
    right: 16px;
  }

  .swiper-bar {
    width: 100%;
    height: 60vw;
  }
}

@media screen and (max-width: 767px) {
  .dot-bar {
    bottom: 16px;
  }

  .item-content {
    top: 8vw;
  }

  .item-content>h1 {
    font-size: 20px;
    line-height: 24px;
  }
  .description {
    font-size: 14px;
  }

  .description-active.description-container {
    margin-top: 8px;
  }

  .description {
    font-size: 18px;
    margin: 10px;
  }

  .link-more>a {
    font-size: 16px;
  }

  .link-more {
    margin-top: 16px;
  }
  .btn-prev>img,
  .btn-next>img {
    opacity: 0;
  }
}

@media screen and (max-width: 480px) {

  .btn-prev {
    left: 4px;
    width: 24px;
  }

  .btn-next {
    right: 4px;
    width: 24px;
  }

  .dot-bar {
    bottom: 4px;
  }

  .item-content {
    top: 24px;
  }

  .description-active.description-container {
    width: calc(100vw - 60px);
  }

  .link-more {
    margin-top: 8px;
  }
}
</style>

