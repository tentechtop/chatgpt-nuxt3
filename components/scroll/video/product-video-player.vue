<template>
  <div class="container1">
    <div class="video-play-space">
      <video v-if="isPlayVideo" controls :autoplay="isPlayVideo" :src="videoInfo" @ended="onVideoEnded"></video>
      <img v-if="!isPlayVideo" :src="videoInfo+'?x-oss-process=video/snapshot,t_1000,m_fast'"  @click="isPlayVideo=true">
    </div>
  </div>
</template>

<script lang="ts" setup>
const isPlayVideo = ref(true)

function  onVideoEnded() {
  // 视频播放结束时触发的函数
  isPlayVideo.value=false
}

const props = defineProps({
  videoInfo:{
    required:true,
    default: () => {}
  }
})
</script>

<style scoped>
.container1{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.video-play-space{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-play-space>video{
  cursor: pointer;
  width: 100%;
  object-fit: cover;
}
.video-play-space>img{
  cursor: pointer;
  width: 100%;
}
</style>
