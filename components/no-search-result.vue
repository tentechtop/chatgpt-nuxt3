<template>
  <div class="container">

    <adaptive-containers :max-width="600">
      <div class="on-search-result-box">
        <t-image fit="cover" class="on-search-result-box-img" src="https://file.kwunphi.com/kwunphi4/svg/pageNotFound.avif">

        </t-image>
        <div class="result-message">

          <h1 v-html="tipsText"></h1>
        </div>


      </div>
    </adaptive-containers>




  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  tipsText: {
    type: String,
    default: '您查看的页面<br>目前不可用'
  }
})

</script>

<style scoped>
.on-search-result-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.on-search-result-box-img{
  width: 100%;
  max-width: 200px;
  height: 200px;


}
.result-message{
  display: flex;
  flex-direction: column;
}
.result-message>h1{
  font-weight: 700;
  font-size: 40px;

}
</style>
