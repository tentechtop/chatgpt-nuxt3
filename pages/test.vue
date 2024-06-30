<template>
  <div class="home-page">



    <adaptive-containers>

      <div class="margin-box"/>
      <div class="margin-box"/>

      <div class="logo-container">
        <img src="https://file.tentech.top/logo/tentech-logo.png">
        <p>TENTECH</p>
      </div>








    </adaptive-containers>






    <breadcrumb></breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
import allLanguage from "~/assets/js/language";
import Breadcrumb from "~/components/breadcrumb.vue";










useHead({
  title: t('seo.pages.home.title'),
  meta: [
    {name: 'keywords', content: t('seo.pages.home.keywords') },
    {name: 'description', content: t('seo.pages.home.description') }
  ],
})
</script>

<style scoped>
@import '../styles/menu.css';
.home-page{
  height: auto;
  background-color: #F9F9F9;
}

.logo-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;


}
.logo-container >img{
  width: 100px;
  margin-right: 20px;
}
.logo-container >p{
  font-size: 80px;
  font-weight: 700;
  color: var(--color-text-1);
}
</style>
