<template>
  <div class="component-container">


  </div>
</template>

<script setup lang="ts">


const props = defineProps({
  menuDate: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.component-container{
  cursor: pointer;
  min-width: 70px;
  height: 100px;
  margin-right: 16px;
  color: #000000;
}
</style>