<template>
  <div class="video-container">
    <video class="video-wrapper" ref="videoPlayer"
           :controls="false"
           muted
           :poster="poster"
           :src="src"
           @click="togglePlayPause"></video>
    <div v-if="!isPlaying" class="play-video-button" @click="togglePlayPause">
            <span class="videoPlay">
            </span>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);

const isPlaying = ref(false);
const togglePlayPause = () => {
  if (videoPlayer.value) {
    // @ts-ignore
    if (videoPlayer.value.paused) {
      // @ts-ignore
      videoPlayer.value.play();
    } else {
      // @ts-ignore
      videoPlayer.value.pause();
    }
    isPlaying.value = !isPlaying.value;
  }
};

onMounted(() => {
  // Add any additional setup logic here
});

onBeforeUnmount(() => {
  // Clean up logic, if needed
});

defineProps(['poster', 'src']);
</script>

<style scoped>
/* Add any additional styles here */
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-wrapper{
  height: 100%;
  object-fit: cover;
  background-position: center;
  transition: all 0.5s ease;
}


.play-video-button{
  position: absolute;
  top: calc(50% - 37px);
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.videoPlay {
  position: absolute;
  /* z-index: 20; */
  background: rgba(255,255,255,0.3) url(../../public/png/icon-play.png) no-repeat center;
  padding: 37px;
  left: 50%;
  top: 50%;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  margin-left: -37px;
}

</style>
