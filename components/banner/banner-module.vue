<template>
  <div class="container">
    <adaptive-containers :max-width="150">


      <template v-if="banner?.type=='img'">
        <t-image fit="contain" class="banner-img" :src="banner?.imgUrl" :alt="banner.title" />
      </template>

      <template v-if="banner?.type=='video'">
        <video
            autoplay
            loop
            class="banner-video" :src="banner?.videoUrl" ></video>
        <img src="https://www.apple.com.cn/v/apple-events/home/af/images/overview/hero/hero_logo__ela2m2lg9uye_large_2x.png">

      </template>


    </adaptive-containers>
  </div>
</template>

<script setup lang="ts">



const props = defineProps({
    banner:{
        type:Object,
        default: ()=>{
          return{
            type:"img",
            imgUrl:"",
            videoUrl:"",
            videoPoster:"",
            title:"",
            subtitle:"",
            link:"",
            linkText:"",
          }
        }
    }
})

</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.banner-img{
  width: 100%;
  height: 500px;
}
.banner-video{
  width: 100%;
  object-fit: cover;
}
</style>