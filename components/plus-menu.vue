<template>
  <div class="plus-menu-container">

    <div class="plus-item item1"></div>
    <div class="plus-item item2" :class="{isActiveMenu: isActive}"></div>

  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.plus-menu-container{
  width: 11px;
  height: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.plus-item{
  width: 100%;
  height: 1px;
  background-color: var(--background-color-menu);
}
.item2{
  transition: all 0.3s ease;
  position: absolute;
  transform: rotate(-90deg);
}
.isActiveMenu{
  transform: rotate(0deg);
}
</style>
