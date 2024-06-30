<template>
  <div style="width: 100%">
    <div class="upload-resume">
      <div class="upload-file">
        <div class="upload-introduce">
          <span><img src="https://file.kwunphi.com/kwunphi4/svg/smart.svg"> {{ property?.text }}</span>
          <p>{{ property?.description }}</p>
        </div>
        <input type="file" @change="handleFileChange" style="display: none" ref="fileInputRef" />
        <div class="upload-button" @click="gotoUploadResume">
          {{ property?.text }}
        </div>
      </div>

<!--   v-if="fileUrl"   -->
      <div v-if="fileList.length>0"  class="file-container">
        <div class="file-list-container">
          <template v-for="(item,index) in fileList" :key="index">
            <div v-if="item.checked" class="file-item" >
              <template v-if="property?.type ==='avatar'">
                <t-image fit="cover" class="file-list-item-img" :src="item.fileUrl" >
                </t-image>
              </template>

              <template v-if="property?.type ==='img'">
                <t-image class="file-list-item-img" :src="item.fileUrl" >
                  <div class="file-list-item-mask">
                    <icon-delete-one style="color:#FFF;cursor: pointer" @click="deleteFile(item,index)"/>
                  </div>
                </t-image>

              </template>

              <template v-if="property?.type ==='video'">

              </template>

              <template v-if="property?.type ==='file'">
                <p class="file-list-item-name">
                  {{  index+1 }} : {{item.fileName}}
                </p>
                <icon-delete-one style="color:#000;cursor: pointer" @click="deleteFile(item,index)"/>

              </template>


            </div>
          </template>
        </div>
        <div class="file-list-container-line">
          <p>上传成功完成!</p>
        </div>

<!--        <h1>请查看我们在下面为您填写的信息。</h1>-->
      </div>
    </div>

  </div>
</template>





<script setup lang="ts">
import {
  CheckOne as IconCheckOne,
  Download as IconDownload,
  DeleteOne as IconDeleteOne,
} from "@icon-park/vue-next";

import {watch} from "vue";
const emits = defineEmits(['fileUrlChange']);//触发事件
import axios from "axios";
import {httpPrefix} from "~/enums/appEnum";
import {ref} from "vue";

const fileUrl = ref('');

const fileList = ref([])

const props = defineProps({
  file: {
    type: String,
    default: ''
  },
  property: {
    type: Object,
    default: {
      type:'file', //img video file
      bizPath:'kwunphi4/official/file',
      text: '文件上传',
      description: '在此处上传您的文件。',
      //最大上传数量
      //最大上传数
      maxCount: 1,
      //是否显示下载按钮
      download: true,
      limit:['png','jpg','jpeg']
    }
  }
})

const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadFile = ref<File | null>(null);

const gotoUploadResume = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click(); // 触发文件选择
  }
};

const handleFileChange = (event: Event) => {
  if ( !(fileList.value.length<props.property.maxCount)){
    alert(`超出上传数量！`);
    return
  }
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const allowedExtensions = props.property.limit;
    const file = input.files[0];
    if (file){
      const extension = file.name.split('.').pop()?.toLowerCase();
      console.log("extension:"+extension)
      if (allowedExtensions.includes(extension)) {
        // 文件类型允许，执行上传逻辑
  /*      console.log('文件类型允许，开始上传文件...');*/
        // 这里可以添加文件上传的代码
        uploadFile.value = file; // 保存选择的文件
        axios.post(httpPrefix+'/official-api/career/upload',{
          biz: props.property.bizPath,
          file: file // 这里的file应该是一个File对象
          // 可以添加其他参数，例如文件名、文件大小等
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          if (response.data.success){
            fileUrl.value = response.data.message
            if (fileList.value.length<props.property.maxCount){
              fileList.value.push({
                fileName: file.name,
                fileUrl: response.data.message,
                checked: true
              })
            }
          }else {
          }
        }).catch(function (error) {});
      } else {
        alert(`不支持的文件类型: ${extension}。请上传${props.property.limit}`);
      }
    }
  }
};


watch(fileUrl,()=>{
  fileUrl.value = fileList.value
      .filter(item => item.checked) // 过滤出选中的项
      .map(item => item.fileUrl) // 提取每个选中项的值
      .join(','); // 将值用逗号连接成一个字符串
  emits('fileUrlChange',fileUrl.value)
})

function deleteFile(item,index){
  fileList.value.splice(index,1)
  fileUrl.value = fileList.value
      .filter(item => item.checked) // 过滤出选中的项
      .map(item => item.fileUrl) // 提取每个选中项的值
      .join(','); // 将值用逗号连接成一个字符串
  emits('fileUrlChange',fileUrl.value)
}


</script>

<style scoped>
p,span{
  margin: 0;
  padding: 0;
}
.upload-resume{
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.upload-file{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.upload-introduce{
  display: flex;
  flex-direction: column;
}
.upload-introduce >p{
  margin: 0px 0 0;
  padding: 0;
  color: #323232;
  font-size: 16px;
}
.upload-introduce span{
  color: #323232;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.upload-introduce img{
  color: #000000;
  width: 18px;
  margin-right: 6px;
}
.upload-button{
  white-space: nowrap;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  padding: 3px 36px;
  border-radius: 40px;
  border: 2px solid rgba(0,0,0);
}
.upload-button:hover{
  background-color: #000000;
  color: #FFFFFF;
}
.file-container{
  margin: 5px 0 0;
  border-radius: 10px;
  padding: 10px 10px;
/*  background-color: green;*/
  width: 100%;
  display: flex;
  flex-direction: column;
}
.file-container >p{
  font-weight: 300;
  margin: 3px 0;
  padding: 0;
  color: #000000;
}
.file-container >h1{
  font-size: 16px;
  margin: 0;
  padding: 0;
  color: #000000;
}
.file-list-container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.file-item{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.file-list-item-name{
  font-size: 16px;
  margin: 0 10px 0 0;
  padding: 0;
  color: #000000;
}
.file-item >img{
  cursor: pointer;
  width: 18px;
}
.file-list-item-img{
  cursor: pointer;
  width: 100px;
  height: 100px;
}

.file-list-item-mask{
  transition: all 0.3s ease;
  background-color: rgba(0,0,0,0.15);
  top: 50%;
  left:50%;
  transform: translate3d(-50%, -50%,0);
  position: absolute;
  z-index: 2;

  opacity: 0;
}
.file-list-item-img:hover .file-list-item-mask{
  opacity: 1;
}


.file-list-container-line{
  margin: 8px 0 0;
  background-color: green;
  border-radius: 10px;
  padding: 10px 10px;
}
.file-list-container-line p,h1{
  color: #FFFFFF;
}


</style>
