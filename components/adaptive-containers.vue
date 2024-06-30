<template>
  <div class="adaptive-width-containers container">
    <div class="adaptive-containers" :style="{'max-width':`${maxWidth+32}px`}">
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
  padding: 0 16px;
}

</style>
