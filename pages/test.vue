<template>
  <div class="app">

  </div>
</template>




<script lang="ts" setup>


</script>

<style scoped>
.vct_container{
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.chat-message-container{

  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
}
.chat-message-container::-webkit-scrollbar {
  width: 9px;
  height: 0px;
  background: transparent;
  overflow-x: auto;
}


.chat-message-info-container{
  width: 748px;
  height: 100%;

}

.bottom-container{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message-send-container{
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 768px;
}


.welcome-container{
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.chat-logo-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chat-logo{
  height: 72px;
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.075);
  box-shadow: 0px 0px 5px rgba(0,0,0,0.095);
  border-radius: 100000px;
}

.chat-logo-container>img{
  width: 48px;
  height: 48px;
}

.chat-logo-container>h1{
  font-size: 24px;
  font-weight: 500;
  color: #303133;
}

.features-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}


.feature-item{
  cursor: pointer;
  width: calc(50% - 5px);
  min-height: 64px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.075);
  margin-bottom: 10px;
  padding: 12px 16px;
}
.feature-item >h1{
  font-weight: 500;
  font-size: 15px;
  margin: 0;
  color: #303133;
}

.feature-item >p{
  font-size: 14px;
  margin: 0;
  color: #909399;
}


.message-container{
  position: relative;
  margin: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.message-container>li{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
}


.avatar{
  border-radius: 50000px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar>img{
  border-radius: 50000px;
  object-fit: cover;
}
.message-chat{
  width: calc(100% - 38px);
}
.message-chat>h1{
  margin: 0;
  font-size: 18px;
  font-weight: 500;

}


.chat-gpt-input{
  color: #303133;
  font-size: 16px;
  text-align: start; /* 文本水平居中 */
  line-height: 1.6; /* 控制文本在垂直方向的居中 */
}

.input-container{
  width: 100%;
  min-height: 52px;
}

.chat-gpt-input::-webkit-input-placeholder{
  height: 52px;line-height: 26px
}    /* 使用webkit内核的浏览器 */
.chat-gpt-input:-moz-placeholder{
  height: 52px;line-height: 26px
}                  /* Firefox版本4-18 */
.chat-gpt-input::-moz-placeholder{
  height: 52px;line-height: 26px
}                  /* Firefox版本19+ */
.chat-gpt-input:-ms-input-placeholder{
  height: 52px;line-height: 26px
}
.chat-gpt-input:focus{
  outline: none;

}

.refreshConversationButton{
  z-index: 999;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 20px;
}

.input-bg-black{
  background-color: #000000;
}

/*@media screen and ( max-width: 800px){
  .vct_container{
    padding: 0 10px;
  }

}*/
</style>
