<template>
  <div class="container">
    <!--   :centeredSlides="true"  元素居中 -->
    <swiper
        :slidesPerView="1"
        :spaceBetween="0"
        :loop="true"
        :centeredSlides="true"
        :pagination="{clickable: true}"
        :autoplay="{delay: 60000,disableOnInteraction: false}"
        :navigation="true" :modules="modules"
        class="mySwiper">
      <swiper-slide v-for="(item, index) in bannerList"  v-slot="{ isActive }">
        <div class="swiper-item" :class="{'animate__zoomInByCustom':isActive}" @click="gotoTarget(item)">

          <div class="intro-container " style="z-index: 2" >

<!--            <div class="product-name"  :class="{'animate__fadeInUpByCustom':isActive}">
              <h1>{{ item.title1 }}</h1>
            </div>
            <nuxt-link :to="localePath(item.buttonPath)">{{item.buttonTitle }} ></nuxt-link>-->


          </div>
          <img class="solution-img" style="z-index: 1" :src="item.imgUrl" :alt="item.alt">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref} from "vue";
const route=useRoute()
const router = useRouter()
// @ts-ignore
const localePath = useLocalePath();
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const modules = [Autoplay, Pagination, Navigation, A11y];
const delaySecond = ref(20000)


/*
@mouseover="delaySecond=50000"
@mouseleave="delaySecond=20000"
*/



function gotoTarget(item){
  router.push({ path: localePath(`${item.buttonPath}`) })
}


const props = defineProps({
  bannerList: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.slideDown-button{
  bottom: calc(0% - 25px);
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slideDown {
  padding: 25px 15px;
  position: absolute;
  left: 50%;
  margin-left: -10px;
  bottom: 50px;
  z-index: 30;
  -webkit-animation: bounce 2s ease-in-out infinite;
  animation: bounce 2s ease-in-out infinite;
  background: url(../../public/png/icon-slideDown.png) no-repeat center;
}

@keyframes bounce {
  0% {
    bottom: 70px;
  }
  50% {
    bottom: 50px;
  }
  100% {
    bottom: 70px;
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container{
  width: 100%;
}

.mySwiper {
  width: 100%;
  height: 100%;
}
.swiper-item {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-item >img{
  z-index: 1;
  height: calc(100vh - 80px);
  object-fit: cover;
}


.play-video-button{
  top: calc(50% - 37px);
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.intro-container{
  top: 75%;
  z-index: 99;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.product-name {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
}

.product-name>h1 {
  margin: 12px 0;
  font-size: 4rem;
  line-height: 1;
  color: #fff;
  font-weight: 700;
}
.intro-container>a{
  font-size: 1.6rem;
  margin-top: 16px;
  color: #FFF;
}
.intro-container>a:hover {
  color: rgb(2, 125, 255,0.8);
}

/*导航按钮本体*/
:deep(.swiper-pagination-bullet) {
  width: 88px;
  height: 5px;
  background-color: #fff;
  border-radius: 0;
}

/*激活后导航按钮本体*/
:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: rgb(255, 255, 255);
}


/*导航按钮间距*/
.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  margin: 0 4px;
}


/*分页*/
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  transform: scale(1.25);
  border-radius: 0;
  color: rgb(255, 255, 255,0.8);
  transform: scale(0.85);
}


:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  color: rgb(2, 125, 255,0.8);
}


/*pc*/
@media screen and (min-width: 768px) {


}

/*phone*/
@media screen and (max-width: 768px) {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    display: none;
  }
  .swiper-item >img{
    width: 100%;
    min-height: calc(50vh - 80px);
    object-fit: cover;
  }

  /**/
  .intro-container{
    top: 70%;
  }
}

</style>
