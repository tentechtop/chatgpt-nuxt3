<template>
    <div class="image-container" :class="{ 'image-scale': scale === true || scale === 'true' }">
        <div class="image-wrapper" :class="[blendMode && 'image-' + blendMode, 'image-' + fit]"
            :style="{ 'background-image': (src ? ('url(\'' + src + '\')') : 'none') }">
            <img v-if="src && (mask === true || mask === 'true')" :src="src" :alt="alt" />
        </div>
      <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        default: ""
    },
    alt: {
        type: String,
        default: ""
    },
    blendMode: {
        type: String,
        default: ""
    },
    scale: {
        type: [String, Boolean],
        default: false
    },
    fit: {
        type: String,
        default: "cover"
    },
    mask: {
        type: [String, Boolean],
        default: true
    }
})
</script>

<style scoped>
.image-container {
    position: relative;
    overflow: hidden;
}

.image-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    transition: all 0.5s ease;
}

.image-cover {
    background-size: cover;
}

.image-contain {
    background-size: contain;
}

.image-wrapper.image-darken {
    background-color: rgba(0, 0, 0, 0.3);
    background-blend-mode: darken;
}

.image-scale:hover .image-wrapper {
    transform: scale(1.1);
}

.image-container img {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
}
</style>
