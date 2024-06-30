<template>
  <div>
    <client-only>
      <el-form
          ref="ruleFormRef"
          style="max-width: 100%"
          :model="resultForm"
          :label-position="labelPosition"
          label-width="auto"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <!-- 遍历 applicationInfoList 数组 -->
        <div v-for="item in form" :key="item.field">
          <template v-if="!(item?.show===false)">
            <p>{{item?.show}}</p>
            <!-- 根据 component 属性渲染不同的表单控件 -->
            <el-form-item :label="item.label" :prop="item.field" :rules="item.rules">

              <template v-if="item.component === 'Input'">
                <el-input   v-model="resultForm[item.field]"></el-input>
              </template>
              <template v-if="item.component === 'InputNumber'">
                <el-input-number v-model="resultForm[item.field]"></el-input-number>
              </template>
              <template v-if="item.component === 'Select'">
                <el-select v-model="resultForm[item.field]" :placeholder="item.label">
                  <el-option
                      v-for="option in item.componentProps.options"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value">
                  </el-option>
                </el-select>
              </template>
              <template v-if="item.component === 'Editor'">
                <el-input
                    type="textarea"
                    v-model="resultForm[item.field]">
                </el-input>
              </template>
              <template v-if="item.component === 'FileUpload'">
                <file-upload @file-url-change="(event)=>{resultForm[item.field]=event}"   :property="item.componentProps"></file-upload>
              </template>



            </el-form-item>
          </template>
        </div>

        <template v-if="isVerify">
          <el-form-item label="验证码" prop="captcha" :rules="verifyData.rules">
            <el-input  v-model="resultForm['captcha']">
              <template #append><img @click="handleChangeCheckCode" :src="verifyData.randCodeImage"></template>

            </el-input>
          </el-form-item>
        </template>





        <div class="bottom-button-container">

          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submitForm">
            提交
          </el-button>
        </div>



      </el-form>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import VerifyInput from "~/components/input/verify-input.vue";
import FileUpload from "~/components/upload/file-upload.vue";
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";

const emits = defineEmits(['submitVerifySuccess', 'formRest']);//触发事件
const props = defineProps({
  isVerify:{
    type: Boolean,
    default: false
  },
  labelPosition:{
    type: String,
    default: 'left' /*left top right*/
  },
  form: {
    type: Array,
    default: () => {
      return []
    }
  },
  resultForm: {
    type: Object,
    default: () => {
      return {}
    }
  }
})



const verifyData = ref({
  requestCodeSuccess:false,
  randCodeImage: "", //64字符图片
  captcha: "GYw5", //填写的验证码
  checkKey: 1629428467008,
  rules: [
    { required: true, message: "请输入验证码"},
    { min: 0, max: 4, message: "超出长度限制", trigger: 'blur' },
  ]
})

function handleChangeCheckCode() {
  if (props.isVerify){
    let checkKey = new Date().getTime();
    props.resultForm["checkKey"] = checkKey; //new Date().getTime();
    verifyData.value.requestCodeSuccess = false;
    axios.get(httpPrefix+'/sys/randomImage/'+checkKey)
        .then(function (response) {
          verifyData.value.randCodeImage = response.data.result
          verifyData.value.requestCodeSuccess = true;
        })
        .catch(function (error) {
          // 请求失败，处理错误
          verifyData.value.requestCodeSuccess = false;
        });
  }
}



const formSize = ref<ComponentSize>('large')

const ruleFormRef = ref<FormInstance>()

// 提交表单的方法
function submitForm(){
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      emits('submitVerifySuccess', props.resultForm)
    } else {
      // 表单验证失败，可以在这里做一些错误提示
      alert('表单验证失败!');
    }
  });
}

function resetForm(){
  if (!ruleFormRef.value) return
  ruleFormRef.value?.resetFields()
}


handleChangeCheckCode()
</script>

<style scoped>
.bottom-button-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
