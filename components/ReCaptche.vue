<template>
  <div>

      <img @click="handleChangeCheckCode"  :src="verifyData.randCodeImage">

  </div>
</template>

<script setup>
import {ref} from 'vue'

import {httpPrefix} from "~/enums/appEnum.ts";
import axios from "axios";

const verifyData = ref({
  requestCodeSuccess:false,
  randCodeImage: "", //64字符图片
  captcha: "GYw5", //填写的验证码
  checkKey: 1629428467008
})



function handleChangeCheckCode() {
  verifyData.value.checkKey = new Date().getTime(); //new Date().getTime();
  verifyData.value.requestCodeSuccess = false;
  axios.get(httpPrefix+'/sys/randomImage/'+verifyData.value.checkKey)
      .then(function (response) {
        verifyData.value.randCodeImage = response.data.result
        verifyData.value.requestCodeSuccess = true;
      })
      .catch(function (error) {
        // 请求失败，处理错误
        verifyData.value.requestCodeSuccess = false;
      });
}

onBeforeMount(()=>{
  handleChangeCheckCode()
})

</script>


<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


