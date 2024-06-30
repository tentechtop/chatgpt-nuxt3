<template>
  <div class="container">
      <adaptive-containers :max-width="1088">
        <div class="html-text-container" v-html="result?.text6"/>
      </adaptive-containers>
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


const pageData = ref([])
let {result} = await $fetch(httpPrefix+'/official-api/page-module/queryModuleBySlug',{
  params: {
    slug: "ether_page_home_module",
    language: locale.value
  },
  onResponse(){}
})
onServerPrefetch(async () => {
  pageData.value = result
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
