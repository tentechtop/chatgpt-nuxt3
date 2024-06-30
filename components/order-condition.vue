<template>
  <div>
    <div  class="select-condition-box"   >
      <div class="select-button-box" :class="{'selecting':selecting}"  @click="selecting=!selecting">
        <p>{{placeholderTitle}}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 10 6" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5 3.58579L8.29289 0.292894C8.68342 -0.0976307 9.31658 -0.0976307 9.70711 0.292894C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="currentColor"></path></svg>
      </div>


      <transition name="selectbox">
        <div v-if="selecting" class="select-options-container">
          <div class="select-options-box">

            <div class="select-options-list-box">
              <div class="select-options-item" v-for="(item,index) in options"   >
                <input type="radio" class="select-options-item-input" :id="'select-options-item-'+index"  :checked="item.checked" @click="handleChecked(item)" />
                <label class="select-options-item-label" :for="'select-options-item-'+index">{{item.label}}</label>
                <!--:checked="item.checked"  @change="item.checked=!item.checked"-->
              </div>
            </div>

            <div class="select-button-container">
              <button class="select-button cancel-button" @click="handleCancel">Cancel</button>
              <button class="select-button apply-button" @click="gotoHandleSelect">Apply</button>
            </div>
          </div>
        </div>
      </transition>




    </div>








  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['SelectOrderCondition']);//触发事件

const selecting = ref(false)
const testText = ref("达娃大")

function handleSelect(item){
  console.log("选择的值"+item)
}

function handleChecked(item){
  props.options.forEach(item=>{
    item.checked = false
  })
  item.checked=true
}

const isSelectingValue = ref("")

function gotoHandleSelect(){
  isSelectingValue.value = props.options
      .filter(item => item.checked) // 过滤出选中的项
      .map(item => item.value) // 提取每个选中项的值
      .join(','); // 将值用逗号连接成一个字符串
  emits('SelectOrderCondition',isSelectingValue.value);
  isSelectingValue.value = ""
  handleCancel()
}

function handleCancel(){
  selecting.value=false
  props.options.forEach(item=>{
    item.checked = false
  })
}

const props = defineProps({
  size:{
    type:String,
    default:'small'
  },
  placeholderTitle:{
    type:String,
    default:'Sort'
  },
  options:{
    type:Array,
    default:()=>[]
  },
})





</script>

<style scoped>
.select-condition-box{
  z-index: 99;
  user-select: none;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline:none;
  background-color: transparent;
}

.select-button-box{
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 11px 25px;
  border-radius: 20px;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.select-button-box:hover{
  background-color: #f5f5f5;
}

.selecting{
  background-color: #FFF;
  box-shadow: 0 0 0 1px #dadce0;
}
.selecting:hover{
  background-color: #FFF;
}


.select-button-box>p{
  padding: 0;
  margin: 0 5px 0 0;
}
.select-options-container{
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  padding: 10px;

}
.select-options-box{
  width: 100%;
  height: 100%;
  background-color: #FFF;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03);
}
.selectTitle{
  width: 100%;
  padding: 10px 0 5px;
  color: #656565;
}
.select-options-list-box{
  padding: 20px 0;
  width: 100%;
  max-height: 300px;
}

.select-options-item{
  user-select: none;
  cursor: pointer;
  padding: 8px 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #000000;
  font-size: 15px;

}
.select-options-item-input{
  cursor: pointer;
  margin-right: 16px;
}
.select-options-item-label{
  cursor: pointer;
}

.select-button-container{
  box-shadow: 0px -10px 20px rgba(255,255,255,0.85);
  padding: 0px 0 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.select-button{
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 45%;
}
@media screen and (max-width: 768px){
  .select-button-box{
    padding: 9px 20px;
  }

}
</style>
