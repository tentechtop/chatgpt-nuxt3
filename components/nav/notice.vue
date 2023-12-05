<template>
  <div class="content">
    <div class="notice-space"  >
      <img src="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/img/svg/icon_spark_1-b5a63181b36171b144a767df0d3d69b9.svg">
      <div class="notice-text">
        <p>您可以分两期付款！</p>
        <img @mouseover="showNotice=true"
             @mouseleave="showNotice=false"
             src="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/img/svg/Circleexclamationmark.svg">
      </div>
      <img   src="https://knowledge-nuxt3.oss-cn-shenzhen.aliyuncs.com/img/svg/icon_spark_2-00883d0de7f28b4c5f715b53f7e08a4f.svg">
    </div>
<!--    <div class="contact-us">
      <div class="contact-us-content">


      </div>
    </div>-->
    <transition name="fade">
    <div v-if="showNotice"  class="nitice-hover-text">
      <p style="color: #3a7326">下单时，你只需要支付总价的50%，并在完成时支付剩下的50%。</p>
    </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const showNotice = ref(false)
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  background-color: #FFD166;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.notice-space{
  z-index: 99999;
  width: 100%;
  max-width: 510px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.notice-text{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.notice-text>p{
  font-size: 20px;
  line-height: 26px;
  color: #303133;
}
.notice-text>img{
  cursor:pointer;
}

.nitice-hover-text{
  padding: 14px 15px;
  border-radius: 10px;
  z-index: 9999;
  transform: translateY(75%);
  position: fixed;
  width: 360px;
  background-color: #ffffff;
  box-shadow: 2px 5px 20px rgba(0,0,0,0.25);
}
.nitice-hover-text>p{
  font-size: 18px;

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.contact-us{
  z-index: 99999;
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contact-us-content{
  width: 100%;
  max-width: 1200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

</style>