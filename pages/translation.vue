<template>
  <div class="app">

    <div v-if="isTranslation" class="mask">

      <span class="videoPlay">
      </span>




    </div>




    <div class="compare-box" style="margin: 200px 0 20px 0">
      <div class="source-box">
        <input type="file" @change="handleFileChange">
      </div>



      <div class="target-box">
        <el-select v-model="targetLang" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in langOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

        <el-button class="translation-button" @click="TranslationI18n">翻译</el-button>
      </div>

    </div>






    <div class="compare-box">
      <div class="source-box content-box">
        <pre>{{ langJson  }}</pre>
      </div>


      <div class="target-box content-box">
        <pre>{{ targetLangMap  }}</pre>
      </div>

    </div>




  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
let apiKey = "sk-VcsMNS2JQziQbWaFdmRvHBVqzIH0Ph6QNLN5a1X8QdaemMQ7";
const file = ref<File | null>(null);


const isTranslation = ref(false)

const sourceLang = ref("auto")
const targetLang = ref("en")

const value = ref('')

const langOptions = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: '英语' },
  { value: 'ru', label: '俄语' },
  { value: 'ja', label: '日语' },
  { value: 'de', label: '德语' },
  { value: 'ko', label: '韩语' },
  { value: 'pl', label: '波兰语' },
  { value: 'fr', label: '法语' },
  { value: 'tr', label: '土耳其语' },
  { value: 'id', label: '印尼语' },
  { value: 'it', label: '意大利语' },
  { value: 'hu', label: '匈牙利语' },
  { value: 'el', label: '希腊语言' },
  { value: 'es', label: '西班牙语' },
  { value: 'uk', label: '乌克兰语' },
  { value: 'sv', label: '瑞典语' },
  { value: 'pt', label: '葡萄牙语' },

  { value: 'et', label: '爱沙尼亚语' },
  { value: 'bg', label: '保加利亚语' },
  { value: 'da', label: '丹麦语' },
  { value: 'fi', label: '芬兰语' },

  { value: 'nl', label: '荷兰语' },
  { value: 'cs', label: '捷克语' },



]









const targetLangMap = ref()





const sourceLangMap = ref(new Map())

const langJson = ref()

const handleFileChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const newFile = inputElement.files?.[0] || null;

  if (newFile) {
    const allowedExtensions = ['js', 'json'];
    const fileNameParts = newFile.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();


    if (allowedExtensions.includes(fileExtension)) {
      file.value = newFile;
      // Process the file or perform other actions as needed
      // @ts-ignore
      readFileContents(newFile);

    } else {
      alert('Invalid file type. Please upload a JavaScript (js) or JSON (json) file.');
      // Reset the input field to clear the invalid selection
      inputElement.value = '';
    }
  }
};






const readFileContents = (uploadedFile: File) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const contents = event.target?.result as string;


    const regex = /\{([\s\S]*)\}/;
    const matches = contents.match(regex);

    if (matches && matches.length > 1) {
      // 提取的内容
      const extractedContent = matches[1];

      try {
        const parsedJson = JSON.parse(`{${extractedContent}}`);
        langJson.value=parsedJson
      } catch (error) {
        console.error("解析JSON时出错：", error);
        alert('解析JSON时出错，请仔细检查js文件'+error);
      }
    } else {
      console.log("未找到匹配的内容");
    }
    // Do something with the file contents
  };

  reader.readAsText(uploadedFile);
};


async  function TranslationI18n(){




  if (isTranslation.value!==true){

    if (sourceLangMap.value!==null){
      isTranslation.value=true
      const resp = await useFetch('https://ai.tentech.top/v1/i18n/translations',{
        method:"POST",
        body: {
          target:targetLang.value,
          source:sourceLang.value,
          sourceLangMap:langJson.value
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((res)=>{
        targetLangMap.value=res.data
      }).finally(()=>{
        isTranslation.value=false
      })
    }
  }else {
    console.log("正在翻译中")
  }
}



</script>

<style scoped>
.app {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0,0,0,0.35);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.videoPlay {
  position: absolute;
  z-index: 20;
/*  background: rgba(255,255,255,0.3) url(https://www.kibing-glass.com/cn/images/icon-play.png) no-repeat center;*/
  padding: 37px;
  left: 50%;
  top: 20%;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  margin-left: -37px;
}


.videoPlay:after {
  content: "";
  left: -5px;
  top: -5px;
  bottom: -5px;
  right: -5px;
  position: absolute;
  border: 5px solid transparent;
  border-left: 5px solid #fff;
  border-radius: 50%;
  -webkit-animation: round 0.35s linear infinite;
  animation: round 0.35s linear infinite;
}


@keyframes round {

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  
}

.mask >p{
  color: #fff;
}



.compare-box{
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.source-box{
  width: 50%;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.15);
}
.source-box pre {
  white-space: pre-wrap;
}
.target-box{
  width: 50%;
  height: 100%;
}
.target-box pre {
  white-space: pre-wrap;
}
.content-box{
  border: 1px solid rgba(0,0,0,0.15);
}
.translation-button{
  padding: 4px 16px;
  background-color: #1d9bf0;
  color: #fff;
}
</style>
