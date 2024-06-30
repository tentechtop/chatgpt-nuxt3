<template>
  <div class="adaptive-width-containers">
    <div class="adaptive-containers" :style="{'max-width':`${maxWidth}px`}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  maxWidth:{
    required:false,
    type:Number,
    default:1088
  }
})
</script>

<style scoped>
.adaptive-width-containers{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.adaptive-containers{
  position: relative;
  width: 100%;
  height: auto;
}

</style>
