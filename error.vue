<template>
  <div class="common-page">

    <el-empty></el-empty>

    <h1>{{error.statusCode}}</h1>

    Sorry, the page you are looking for does not exist.

    <el-button style="margin: 16px 0;padding: 5px 20px;border-radius: 8px;border: 1px solid rgba(0,0,0,0.15);cursor: pointer;color: #1d9bf0"  @click="gotoHomePage" color="GoBack-button">GoBack HomePage</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const props = defineProps(['error'])
const localePath = useLocalePath();

onBeforeMount(()=>{
  setTimeout(()=>{
    router.push({ path: localePath('/') });
  },1000)
})

function gotoHomePage(){
  router.push({ path: localePath('/') });
}

</script>

<style lang="less" scoped>
.common-page {
  h1{
    font-size: 44px;
    font-weight: 700;
  }
  padding: 5% 0 0 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    bottom: -30vh;
    left: 0;
    height: 40vh;
    width: 100%;
    background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
    filter: blur(20vh);
  }
  .b-text {
    margin-top: -70px;
  }

}



</style>
