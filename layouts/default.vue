<template>
  <main>
<!--    <notice></notice>-->
<!--    <top-menu></top-menu>-->
    <slot />
  </main>
</template>

<script setup>
import HeaderMenu from "~/layouts/components/headerMenu.vue";
import Notice from "~/components/nav/notice.vue";
import TopMenu from "~/components/nav/top-menu.vue";

</script>