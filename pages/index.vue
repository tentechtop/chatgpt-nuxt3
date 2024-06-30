<template>
  <div class="container">
    <client-only>



      <adaptive-containers :max-width="1088">
        <div v-if="!pageDataLoading" class="html-text-container" v-html="pageData?.text6">

        </div>

      </adaptive-containers>










    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onServerPrefetch,toRefs, onMounted, getCurrentInstance,onUnmounted,onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";
const { t, locale, locales } = useI18n()


import { useSeoStore } from "@/stores/seo.js";
const seoStore = useSeoStore();
import { useRoute, useRouter } from "vue-router";
import {removeLanguageDomain} from "@/assets/js/commons";
const router = useRouter()
const route = useRoute()
function setPageSeo(){
  let seoMap = seoStore.getSeoMap || new Map()
  let pageSEO = seoMap.get(`ether/seo/home`)
  if (pageSEO){
    useHead({
      title: pageSEO.title,
      meta: [
        {name: 'keywords', content: pageSEO.keywords },
        {name: 'description', content: pageSEO.description }
      ],
    })
  }
}
setPageSeo()


const pageData = ref({})
const pageDataLoading = ref(true)
function fetchModuleAllDataList(params) {
  // 使用axios发送GET请求
  axios.get(httpPrefix+'/official-api/page-module/queryModuleBySlug',{
    params: params
  })
      .then(function (response) {
        pageData.value = response.data.result
        pageDataLoading.value = false
      })
      .catch(function (error) {
        // 请求失败，处理错误
        console.error('请求失败:', error);
        pageDataLoading.value = true
      });
}


onBeforeMount(() => {
  fetchModuleAllDataList({
    slug: "ether_page_home_module",
    language: locale.value
  })
})

</script>

<style scoped>
.home-page{
  height: auto;
}

.item-module{
  width: 100%;
}


</style>
