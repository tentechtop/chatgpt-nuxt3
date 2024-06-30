<template>
  <div v-if="!whiteList.includes(route.path)" class="footer-container">
    <div  class="container">
      <el-divider class="divider-split"></el-divider>
      <div class="adaptive-container">
        <div class="menu-container">
          <div class="body">
          <!--      菜单内容       -->
            <div class="menu">
              <ul v-for="(item,index) in menu" :key="index">
                <li><h1>{{ item.title }}</h1></li>
                <li v-for="(sub,index) in item.menuList" :key="index">
                  <nuxt-link   :to="localePath(sub.menuPath)">{{sub.menuName}}</nuxt-link>
                </li>
              </ul>
            </div>
            <div class="social">


            </div>
          </div>
        </div>
      </div>
      <el-divider class="divider-split"></el-divider>
      <div class="info-container">
        <div class="copy-right">
          <div class="bottom-info">
            <p>Copyright © 2018-{{ formatDate(new Date()) }} {{ locale.startsWith('zh')? '全德视讯 版权所有':'Tentech All Rights Reserved' }}</p>
            <p class="beiAnInfo">
              <a class="icp" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">粤ICP备2021034388号</a>
              <a class="beian"
                 href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702004694" target="_blank">
                <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/beian.png">粤公网安备 44030702004694号
              </a>
            </p>
          </div>
          <div class="policyAndTerms">
            <nuxt-link :to="localePath('/policy')">{{ t('menu.globalPrivacyPolicy') }}</nuxt-link>
            <nuxt-link :to="localePath('/terms')">{{ t('menu.termsOfUse') }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!--收纳式页脚  -->
    <div class="drawer-footer">
      <div class="drawer-contact-container">
        <div class="drawer-logo-container">




        </div>
      </div>
      <div class="subscribe">
        <p class="website-info">Copyright © 2018-{{ formatDate(new Date()) }} {{ locale.startsWith('zh')? '全德视讯 版权所有':'Tentech All Rights Reserved' }}   </p>
        <p class="website-info"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">粤ICP备2021034388号</a></p>
        <p class="website-info"><a class="beian" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702004694" target="_blank">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/foot/beian.png">粤公网安备 44030702004694号</a>
        </p>
        <p class="website-info"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
import {computed, onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
// @ts-ignore
const localePath = useLocalePath();
// @ts-ignore
const switchLocalePath = useSwitchLocalePath();

const router = useRouter()
const route = useRoute()

const menu = ref([
  {
    title:"关于全德",
    menuList:[
      {
        menuName:"关于全德",
        menuPath:"/about"
      },
      {
        menuName:"全球化布局",
        menuPath:"/about"
      }
    ]
  },{
    title:"关于全德",
    menuList:[
      {
        menuName:"关于全德",
        menuPath:"/about"
      },
      {
        menuName:"全球化布局",
        menuPath:"/about"
      }
    ]
  },{
    title:"关于全德",
    menuList:[
      {
        menuName:"关于全德",
        menuPath:"/about"
      },
      {
        menuName:"全球化布局",
        menuPath:"/about"
      }
    ]
  },{
    title:"关于全德",
    menuList:[
      {
        menuName:"关于全德",
        menuPath:"/about"
      },
      {
        menuName:"全球化布局",
        menuPath:"/about"
      }
    ]
  }
])

function  formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
}

const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单
function getRouterLink(sub) {
  router.push({ path: localePath(`${sub.menuPath}`) });
}

</script>

<style scoped>
@import '../../styles/foot.css';

</style>
