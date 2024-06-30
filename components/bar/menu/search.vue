<template>
  <div class="select-container">
    <div class="select-inner-container">
      <div class="horizontal-containers">


        <input @keyup.enter.stop="triggerSelectMenuEvent" v-model="inputString" class="search-input--input" type="text" placeholder="Press Return to search">







      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t, locale, locales } = useI18n()
const localePath = useLocalePath();
const emits = defineEmits(['SelectMenu']);//触发事件
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()

const inputString = ref('')



function triggerSelectMenuEvent() {
  emits('SelectMenu','Solution');
  router.push({ path: localePath(`/search`),query:{keyword:inputString.value}})
}
</script>

<style scoped>
@import '@/styles/open/component.css';

.horizontal-containers{
  width: 100%;
  min-height: 100px;
}
.search-input--input{
  margin: 22px 0;
  width: 100%;
  height: 66px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 60px;
  color: var(--color-text-1);
}
.search-input--input:focus{
  border: none;
  outline: none;
}
</style>
