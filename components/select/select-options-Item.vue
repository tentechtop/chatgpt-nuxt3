<template>
  <div class="select-options-item"  style="display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-start">

    <div class="select-item">
      <input
          :type="isRadio?'radio':'checkbox'"
          class="select-options-item-input"
          :id="'select-options-item-' + itemIndex"
          :checked="item.checked"
          :disabled="item.children && item.children.length > 0"
          @click="toggleChecked"
      />
      <label class="select-options-item-label" :for="'select-options-item-' + itemIndex">
        {{ item.label }}
      </label>
    </div>



    <div v-if="item.children && item.children.length > 0" class="select-options-children">
      <select-options-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :item-index="itemIndex + '-' + index"
          :is-radio="isRadio"
          @toggle-checked="handleChildToggleChecked"
      ></select-options-item>
    </div>

  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['toggle-checked']);
interface Option {
  label: string;
  checked: boolean;
  children: Option[];
}

const props = defineProps<{
  item: Option;
  itemIndex: string;
  isRadio:Boolean;
}>();


const toggleChecked = () => {
  props.item.checked = !props.item.checked;
  emits('toggle-checked', props.item);
};

const handleChildToggleChecked = (child: Option) => {
  emits('toggle-checked', child);
};


onUpdated(() => {
  props.item.checked
})


</script>

<style scoped>
.select-options-item{
  position: relative;
  user-select: none;
  cursor: pointer;
  padding: 0px 0;
  margin: 0;
  width: 100%;
  color: #000000;
  font-size: 15px;
}

.select-item{
  position: relative;
}
.select-options-item-input{
  cursor: pointer;
  margin-right: 8px;
}
.select-options-item-label{
  cursor: pointer;
}

.select-options-children{
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem; /* Each child will be indented */


}
</style>
