<template>
  <div class="container">

    <div class="contact-us-box">
      <div class="contact-us-box__title">
        <div class="contact-us-box__title__text">
          <div class="contact-us-box__title__text__title">
            {{$t('home.contact')}}
<!--    "释放您的潜力 - 与我们的销售团队接洽！"        -->
          </div>
          <div class="contact-us-box__title__text__subtitle">
            {{$t('home.contactHelp')}}
          </div>
          <a class="contact-us-box__title__text__button"  target="_blank"  :href="getRandomChatCustomer()" >
            {{$t('home.chat')}}
            <svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </a>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const chatCustomerList = ref([
  "https://work.weixin.qq.com/kfid/kfcbc3ea8617440b578",
  "https://work.weixin.qq.com/kfid/kfc2d78b744a2f8ed87"
])

function getRandomChatCustomer() {
  const randomIndex = Math.floor(Math.random() * chatCustomerList.value.length);
  return chatCustomerList.value[randomIndex];
}
</script>

<style scoped>
.container{
  width: 100%;
  margin: 96px 0;
}

.contact-us-box{
  width: 100%;
  height: 400px;
  background-color: var(--special-box-background-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contact-us-box__title__text{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-us-box__title__text__title{
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}
.contact-us-box__title__text__subtitle{
  margin: 10px 0;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
}
.contact-us-box__title__text__button{
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  padding: 15px 64px;
  background-color: black;
  color: white;
  border-radius: 50px;
  font-size: 18px;
}
.contact-us-box__title__text__button:hover{
  background-color: #484848;
}
@media screen and (max-width: 768px){
  .contact-us-box{
    height: 240px;
  }
  .container{
    margin: 36px 0;
  }
  .contact-us-box__title__text__title{
    font-size: 22px;
  }
  .contact-us-box__title__text__subtitle{
    font-size: 16px;
  }
  .contact-us-box__title__text__button{
    padding: 12px 48px;
    font-size: 16px;
  }
}
</style>
