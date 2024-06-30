<template>
  <div class="video-container"  >

    <t-image class="video-wrapper" ref="videoPlayer"
           style="z-index: 1"
           :src="poster"></t-image>


    <div class="play-video-button" @click="isPalyingVideo=!isPalyingVideo">
            <span class="videoPlay">
            </span>
    </div>



    <div v-if="isPalyingVideo" class="play-video-page" >
      <div class="close-bg" @click="isPalyingVideo=false"></div>
      <div class="video-play-container" >
        <div class="close-button" @click="isPalyingVideo=false">
          <img src="https://file.kwunphi.com/kwunphi4/images/svg/%E5%85%B3%E9%97%AD.svg" :alt="$t('close')">
        </div>
        <video  :src="src"  autoplay :poster="poster"
                controls :autoplay="true" :loop="true"> </video>
      </div>
    </div>





  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount ,watch} from 'vue';
const isPalyingVideo = ref(false);





watch(isPalyingVideo,(newVal)=>{
  openOrCloseDialog(newVal)
})




function openOrCloseDialog(newVal) {
  if (newVal){
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  }else {
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
  }
}


function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}
onBeforeUnmount(()=>{
  document.body.style.overflowY = 'auto';
  document.body.style.paddingRight = '0';
})

defineProps(['imgUrl','poster', 'src']);
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
  height: 100%;
  object-fit: cover;
  background-position: center;
  transition: all 0.5s ease;
}


.video-poster-wrapper{
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;

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
  background: rgba(255,255,255) url(https://file.kwunphi.com/kwunphi4/images/svg/%E6%92%AD%E6%94%BE.svg) no-repeat center;
  padding: 27px;
  left: 50%;
  top: 50%;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  margin-left: -37px;
}



.play-video-page{
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 使用视窗宽度作为宽度 */
  height: 100vh; /* 使用视窗高度作为高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.35);
}
.close-bg{
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.35);
}
.close-button{
  position: absolute;
  top: 0px;
  right: -60px;
  cursor: pointer;
  z-index: 9999;
}
.close-button>img{
  height: 40px;
  width: 40px;
  transition: all 0.5s ease;
  transform: rotate(0deg);
}
.close-button:hover >img{
  transform: rotate(180deg);
}

.video-play-container{
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-play-container>video{
  width: 100%;
  max-height: 70vh;
  border-radius: 5px;
  object-fit: cover;
}
@media screen and (max-width: 1260px){
  .video-play-container{
    width: 100%;
    padding: 0 16px;
  }

  .close-button{
    position: absolute;
    top: -50px;
    right: 20px;
    cursor: pointer;
    z-index: 9999;
  }
}
@media screen and (max-width: 1024px){


}

@media screen and (max-width: 768px){
  .video-wrapper{
    height: 100%;
    width: 100%;
  }




}




</style>
