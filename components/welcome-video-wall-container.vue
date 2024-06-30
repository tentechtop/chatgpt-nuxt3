<template>
  <div  class="container c-center">

    <div class="video-container c-center">
      <video class="welcome-video-video"
             ref="videoPlayer"
             :controls="false"
             muted
             autoplay
             loop
             src="https://www.apple.com.cn/105/media/ww/iphone/family/2024/1efec3e0-8619-4684-a57e-6e2310394f08/anim/welcome/xlarge_2x.mp4">
      </video>

      <button class="welcome-video-control-item" @click="togglePlayPause">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="control-centered-small-icon">
          <g v-if="isPlaying" class="control-icon-pause">
            <rect width="4.5" height="14" x="3.75" y="3" rx="1.5"></rect>
            <rect width="4.5" height="14" x="11.75" y="3" rx="1.5"></rect>
          </g>

          <path v-else class="control-icon-play" d="M5 15.25V4.77a1.44 1.44 0 0 1 1.44-1.62 1.86 1.86 0 0 1 1.11.31l8.53 5c.76.44 1.17.8 1.17 1.51s-.41 1.07-1.17 1.51l-8.53 5a1.86 1.86 0 0 1-1.11.31A1.42 1.42 0 0 1 5 15.25Z"></path>
        </svg>
      </button>

    </div>



  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);

const isPlaying = ref(true);
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
  const options = {
    threshold: 0.5, // Adjust the threshold as needed
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (isPlaying.value) {
          videoPlayer.value?.play();
        }
      } else {
        videoPlayer.value?.pause();
      }
    });
  }, options);

  observer.observe(videoPlayer.value as Element);

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
defineProps(['poster', 'src']);
</script>

<style scoped>
.container{
  width: 100%;
  transition: all 0.3s ease;
}
.video-container{
  width: calc(100% - 200px);
  position: relative;
}
.welcome-video-video{
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.welcome-video-control-item{
  transition: all 0.3s ease;
  position: absolute;
  bottom: 40px;
  right: 40px;
  z-index: 2;
  color: rgba(0, 0, 0, 0.56);
  border-radius: 50%;
  display: flex;
  align-items: center;
  height: 36px;
  width: 36px;
  outline: none;
  padding: 8px;
  border: 0;
  justify-content: center;
  cursor: pointer;
  background-color: rgb(232, 232, 237);
}
.welcome-video-control-item:hover{
  background-color: rgb(180, 180, 180);
}

@media screen and (max-width: 768px){

  .video-container{
    width: calc(100% - 32px);
    position: relative;
  }
}

</style>