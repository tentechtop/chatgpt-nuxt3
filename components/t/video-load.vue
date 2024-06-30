<template>
  <div class="video-container">
    <video  class="video-wrapper"
            style="z-index: 1"
            ref="videoPlayer"
           :controls="false"
            autoplay
            loop
           muted
           :poster="poster"
           :src="src"
           @click="togglePlayPause"></video>
    <div v-if="!isPlaying" class="play-video-button" @click="togglePlayPause" >
            <span class="videoPlay">
            </span>
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
/* Add any additional styles here */
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-wrapper{
  width: 100%;
  height: auto;
  object-fit: cover;
  background-position: center;
  transition: all 0.5s ease;
}
.video-poster-wrapper{
  width: 100%;
  height: 100%;
}


.play-video-button{
  position: absolute;
  top: calc(50% - 37px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.videoPlay {
  transform: scale(0.85);
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
.videoPlay:after {
  content: "";
  left: -4px;
  top: -4px;
  bottom: -4px;
  right: -4px;
  position: absolute;
  border: 4px solid transparent;
  border-left: 4px solid #fff;
  border-radius: 50%;
  -webkit-animation: round 6s linear infinite;
  animation: round 6s linear infinite;
}

@keyframes round {
  100% {
    transform: rotate(360deg);
  }
}


@media screen and (max-width: 768px){
  .video-wrapper{
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center;
    transition: all 0.5s ease;
  }
  .videoPlay {
    background: rgba(255,255,255,0.3) url(../../public/png/icon-play.png) no-repeat center;
    padding: 30px;
    margin-left: -30px;
  }
  .videoPlay:after {
    -webkit-animation: round 5s linear infinite;
    animation: round 5s linear infinite;
  }

}

</style>
