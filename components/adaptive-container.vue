<template>
  <div class="container">
    <div class="adaptive-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.container{
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adaptive-container{
  transition: all 0.3s ease;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1232px){
  .adaptive-container{
    max-width: calc(100% - 32px);
  }
}
</style>
