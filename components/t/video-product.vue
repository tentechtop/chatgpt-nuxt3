<template>
  <div class="video-container">
    <video  class="video-wrapper"
            style="z-index: 1"
            ref="videoPlayer"
            :controls="false"
            :autoplay="isSelected"
            loop
            muted
            :poster="poster"
            :src="src"
            @click="togglePlayPause"></video>
    <div v-if="!isSelected" class="play-video-button" @click="togglePlayPause" >
            <span class="videoPlay">
            </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);



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

const props = defineProps({
  poster: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  isPlaying:{
    type: Boolean,
    required: true
  },
  isSelected:{
    type: Boolean,
    required: true
  }
});

const isPlaying = ref(props.isPlaying);


onUpdated(()=>{
  if (props.isSelected){


  }else {
    if (videoPlayer.value) {
      videoPlayer.value.pause();
      isPlaying.value = false
    }
  }

})


/*onMounted(() => {


  const options = {
    threshold: 0.9, // Adjust the threshold as needed
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
});*/

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
  border-radius: 20px;
  height: 100%;
  width: auto;
  transition: all 0.5s ease;
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
  position: absolute;
  /* z-index: 20; */
  background: rgba(255,255,255) url(https://file.kwunphi.com/kwunphi4/images/svg/%E6%92%AD%E6%94%BE.svg) no-repeat center;
  background-size: 40%;
  padding: 28px;
  left: 50%;
  transform: translate3d(-50%,0,0);
  top: 50%;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  background-position: 19px center; /* 修改这里实现向右偏移20px */
  transition: all 0.3s ease;
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
  .videoPlay{
    background-size: 35%;
    padding: 23px;
    cursor: pointer;
    background-position: 17px center; /* 修改这里实现向右偏移20px */
  }
}

</style>
