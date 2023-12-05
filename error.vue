<template>
    <div class="error-page">
        <div class="error-content">
            <h1>{{ error.statusCode }} </h1>
            <p>哦豁，迷路了</p>
            <p>你正在寻找的页面出错了</p>
            <nuxt-link to="/" class="home-link">回到主页</nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['error'])
</script>


<style scoped>

</style>
