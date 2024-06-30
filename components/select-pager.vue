<template>
  <div class="containers">
    <div class="preview-button t-button" :class="{'no-click':currentPage===1}"
         @click="gotoPreViewPage"
    >
      上一页
    </div>
    <div class="target-page-item" v-for="(item,index) in total"
         :class="{'current-item':currentPage===index+1}"
    @click="gotoTarget(index+1)"
    >
      {{index+1}}
    </div>
    <div class="next-button t-button" :class="{'no-click':currentPage===total}"
         @click="gotoNextPage"
    >
      下一页
    </div>
    <div class="next-button t-button product-count" >
      总数:{{ productCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, onUpdated, ref} from "vue";
const emit = defineEmits(['changeCurrentPage']);
const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 1
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  productCount: {
    type: Number,
    required: true,
    default: 0
  }
});


const currentPage = ref(props.currentPage)
const total = ref(props.total)

function gotoTarget(index){
  currentPage.value=index
  emit('changeCurrentPage', currentPage.value);
  scrollToTop()
}

function gotoPreViewPage(){
  if (currentPage.value>1){
    currentPage.value--;
    emit('changeCurrentPage', currentPage.value);
  }
  scrollToTop()

}

function gotoNextPage(){
  if (currentPage.value<props.total){
    currentPage.value++;
    emit('changeCurrentPage', currentPage.value);
  }
  scrollToTop()
}





const scrollToTop = () => {
  const duration = 400; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const targetPosition = 404; // 目标Y轴位置
  const startTime = performance.now();
  const animateScroll = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    const newPosition = startPosition + (targetPosition - startPosition) * easeProgress;
    window.scrollTo(0, newPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};


onUpdated(()=>{
  currentPage.value = props.currentPage
  total.value = props.total
})



</script>

<style scoped>
.containers{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}
.t-button{
  border: 1px solid rgba(0,0,0,0.1);
  cursor: pointer;
  padding: 8px 16px;
  background-color: #fff;
  color: #545454;
  font-size: 14px;
  margin: 0 2px;
}

.t-button:hover{

}


.target-page-item{
  cursor: pointer;
  margin: 0 3px;
  padding: 8px 16px;
  background-color: #FFF;
  border: 1px solid rgba(0,0,0,0.1);
  color: #000;
  font-size: 14px;
}
.no-click{
  background-color: #FFFFFF;
  color: #545454;
}
.no-click:hover{

}
.product-count{
  position: absolute;
  right: 0;
  margin-left: 8px;
}
.current-item{
  color: #FFF;
  background-color: #2898E6;
}

@media screen and (max-width: 768px){
  .t-button{
    padding: 4px 12px;
  }

  .t-button:hover{
    padding: 4px 12px;
  }
  .target-page-item{
    margin: 0 4px;
    padding: 4px 12px;
  }
}

@media screen and (max-width: 500px){
  .product-count{
    display: none;
  }
}
</style>