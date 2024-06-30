<template>
  <button class="custom-button" :class="[shape, over ? 'btn-hover' : '', press ? 'btn-active' : '']" :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

const props = defineProps({
  color: {
    type: String,
    default: "#2065d7"
  },
  over: {
    type: String,
    default: "#0252d5"
  },
  press: {
    type: String,
    default: "#0540a1"
  },
  shape: {
    type: [String],
    default: "round"
  },
  width: {
    type: [String, Number],
    default: "auto"
  },
  height: {
    type: [String, Number],
    default: "auto"
  },
  fontSize: {
    type: [String, Number],
    default: "14px"
  },
  ghost: {
    type: [Boolean, String],
    default: false
  }
});

const buttonStyle = reactive({
  fontSize: (typeof props.fontSize === "number" ? props.fontSize + 'px' : props.fontSize),
  width: (typeof props.width === "number" ? props.width + 'px' : props.width),
  height: (typeof props.height === "number" ? props.height + 'px' : props.height),
  lineHeight: (typeof props.height === "number" ? props.height + 'px' : props.height),
  '--bg-color': props.color,
  '--hover-bg-color': props.over,
  '--active-bg-color': props.press,
});
</script>

<style scoped>
.custom-button {
  /* border: none; */
  outline: none;
  border-width: 1px;
  border-style: solid;
  background-color: var(--bg-color);
  color: #ffffff;
  cursor: pointer;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 2;
  position: relative;
}

.btn-hover:hover {
  background-color: var(--hover-bg-color);
}

.btn-active:active {
  background-color: var(--active-bg-color);
}

.round {
  border-radius: 1000px;
}

.rectangle {
  border-radius: 5px;
}

.square {
  border-radius: 0;
}

.circle {
  border-radius: 50%;
}
</style>
