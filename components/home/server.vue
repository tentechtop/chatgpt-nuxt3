<template>
  <div class="app">
    <div class="container">

      <div class="server-item" v-for="(item,index) in serverList">

        <img :src="item.imgUrl">
        <h1>{{item.title1}}</h1>
        <nuxt-link :to="localePath(item.buttonPath)">{{item.buttonTitle }} ></nuxt-link>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>


const props = defineProps({
  serverList: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.app{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container{
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.server-item{
  width: 33.333%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.server-item>img{
  width: 48px;
  height: 48px;
}
.server-item>h1{
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin: 16px 0;
}
.server-item>a{
  text-align: center;
}
@media screen and (max-width: 1532px){
  .container{
    padding: 0 16px;
  }
}

@media screen and (max-width: 768px){
  .container{
    padding: 0 16px;
  }
  .server-item>img{
    width: 36px;
    height: 36px;
  }
  .server-item>h1{
    text-align: center;
    font-size: calc(100vw * 60 / 1920);
    margin: 12px 0;
  }
  .server-item>a{
    font-size: calc(100vw * 50 / 1920);
    text-align: center;
  }
}

@media screen and (max-width: 480px){
  .container{
    padding: 0 16px;
  }
  .server-item>img{
    width: 36px;
    height: 36px;
  }
  .server-item>h1{
    text-align: center;
    font-size: calc(100vw * 60 / 1800);
    margin: 12px 0;
  }
  .server-item>a{
    font-size: calc(100vw * 50 / 1800);
    text-align: center;
  }
}
</style>
