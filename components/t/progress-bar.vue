<template>
  <div class="container">
    <div class="progress-bar">
      <div class="progress" :style="progressStyle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, getCurrentInstance,onUnmounted,computed } from "vue";
const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 1,
  },
  max: {
    type: Number,
    required: true,
    default: 1,
  },
});
const progressStyle = computed(() => ({
  width: `${(props.value / props.max) * 100}%`,
}));
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px;
  max-width: 600px;
}

.progress-bar {
  width: 100%;
  height: 16px;
  background-color: #e3e3e3;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  transition: all 0.3s ease;
  height: 100%;
  background-color: #2936DC;
  border-radius: 10px 0 0 10px;
}
</style>
