<template>
  <div class="bread-crumb">
    <adaptive-containers :max-width="1088" >
      <div  class="bread-crumb-container">



        <nuxt-link v-for="(pathItem, index) in pathList" :key="index" :to="localePath(pathItem.path)">
          {{ pathItem.pathName }}
          <span style="margin: 0  6px" v-if="index!==pathList.length-1">/</span>
        </nuxt-link>



      </div>
    </adaptive-containers>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath();


const props = defineProps({
  pathList: {
    type: Array,
    default: () => {
      return []
    }
  }
});
</script>

<style scoped>
.bread-crumb{
  background-color: transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bread-crumb-container{
  white-space: nowrap;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.bread-crumb-container>a{
  font-size: 14px;
  color: var(--color-text-1);
}

.bread-crumb-container>p{
  margin: 0 16px;
  color: var(--color-text-1);
  font-size: 14px;
}



</style>
