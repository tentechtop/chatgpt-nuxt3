// 引入所有指令
import directives from "@/utils/directive";

// 定义nuxt插件
export default defineNuxtPlugin((nuxtApp) => {
    // 通过循环注册所有指令
    for(let key in directives){
        // @ts-ignore
        nuxtApp.vueApp.directive(key,directives[key])
    }
})
