<template>
  <div class="verification-input">



    <div class="input-container">
      <p class="tips-title" :class="{'input-error':inputError,required:required}">{{ title }}</p>
      <el-input   class="el-input-verification" :style="{'font-size':fontSize+'px'}"  :class="{'error-input':inputError}"  v-model="inputData"  :show-password="type==='password'" :type="type==='password'?'password':'text'"   @blur="validateInput"></el-input>
      <span v-if="inputError" class="tips-message" :class="{'input-error':inputError}"> <img src="https://kwun.oss-cn-shenzhen.aliyuncs.com/kwunphi4/images/svg/%E9%94%99%E8%AF%AF%20(2).svg"> <p>{{tipsMessage}}</p> </span>
    </div>




  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['inputChange']);//触发事件

const inputError = ref(false)

const inputData = ref("")

const tipsMessage = ref("必填选项")
// 校验的是姓名

watch(inputData,(newValue)=>{
  emits('inputChange',inputData.value);
})




const props = defineProps({
  title:{
    type:String,
    default:"请输入"
  },
  dynamicRules:{
    type:Object,/*校验规则*/
  },
  type:{
    type:String,/*输入的数据类型 全小写*/
    default:"text" //text  username  phone  email  idcard  url  telphone  password  invitecode
  },
  required:{
    type:Boolean,
    default:false
  },
  height:{
    type:Number,
    default:55
  },
  fontSize:{
    type:Number,
    default:16
  }

})



function validateInput(){
  // 检查是否需要进行校验
/*  if (!props.required && isEmptyValue(inputData.value)) {
    return;
  }*/

  // 校验规则数组
  const rules = props.dynamicRules || [];

  // 遍历校验规则数组
  for (let rule of rules) {
    // 根据规则类型执行校验
    if (rule.required) {
      // 必填校验
      if (isEmptyValue(inputData.value)) {
        inputError.value = true;
        tipsMessage.value = rule.message || '必填选项';
        break;
      }
    } else if (rule.pattern) {
      // 正则表达式校验
      const regex = new RegExp(rule.pattern);
      if (!regex.test(inputData.value)) {
        inputError.value = true;
        tipsMessage.value = rule.message || '格式有误';
        break;
      }
    } else if (rule.min !== undefined || rule.max !== undefined) {
      // 长度校验
      const length = inputData.value.length;
      if (rule.min !== undefined && length < rule.min) {
        inputError.value = true;
        tipsMessage.value = `长度至少为 ${rule.min} 个字符`;
        break;
      } else if (rule.max !== undefined && length > rule.max) {
        inputError.value = true;
        tipsMessage.value = `长度不超过 ${rule.max} 个字符`;
        break;
      }
    }
  }

  // 如果没有错误，重置错误状态和提示信息
  if (!inputError.value) {
    inputError.value = false;
    tipsMessage.value = '';
  }

}

function isEmptyValue(value) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value.trim()) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }
  return false;
}


function init(){
  // 校验规则数组
  const rules = props.dynamicRules || [];
  for (let rule of rules) {
    // 根据规则类型执行校验
    if (rule.required) {
      // 必填校验
      if (isEmptyValue(inputData.value)) {
        inputError.value = true;
        tipsMessage.value = rule.message || '必填选项';
        break;
      }
    }
  }
}

</script>

<style>
.verification-input{
  position: relative;
  margin: 0px 0;
  height: auto;
}
/* 去除自动填充的蓝色背景 */
.el-input-verification{
  height: 44px;
}

.el-input-verification .el-input__wrapper{
  transition: all 0s ease;
  border-radius: 4px;
}

.el-input-verification .el-input__wrapper:hover{
  transition: all 0s ease;
}

.el-input-verification .is-focus{
  box-shadow: 0 0 0 3px #D1E9FF !important;
  border: 1px solid #1e88e5 !important;
  background-color: #FFF;
  transition: all 0s ease;
  padding:  0 10.1px;
}

.error-input .el-input__wrapper {
  transition: all 0s ease;
  border: 1px solid #d32029;
  box-shadow: 0 0 0 3px rgba(0,0,0,0);
}


.el-input-verification .el-input__wrapper .el-input__inner{
  border-radius: 0px;
  background: transparent;
  color: rgba(0,0,0,.75);
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  letter-spacing: -.02em;
}
.el-input-verification .el-input__wrapper >input:-webkit-autofill {
  transition: all 0s ease;
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
.el-input-verification .is-focus  >input:-webkit-autofill {
  transition: all 0s ease;
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
.el-input-verification .el-input__wrapper .el-input__suffix .el-input__suffix-inner .el-input__password{
  color: #7c8088;
  font-size: 20px;
  cursor: pointer;
  transform: rotate(180deg);
}
.error-input .el-input__wrapper {
  transition: all 0s ease;
  border: 1px solid #d32029;
  box-shadow: 0 0 0 3px rgba(0,0,0,0);
}




</style>

<style scoped>
.input-container{
  width: 100%;
}

.tips-title{
  margin: 4px 0 4px;
  padding: 0;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -.02em;
}

.input-error{
  color: #d32029!important;
}


.tips-message{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.tips-message >img{
  width: 16px;
  margin-right: 4px;
}

.tips-message >p{
  color: #d32029!important;
  font-size: 12px;
  font-weight: 400;
}


.required:after {
  color: red;
  content: "*";
}

</style>
