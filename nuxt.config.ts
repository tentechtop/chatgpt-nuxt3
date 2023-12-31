// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    ssr: true,
    imports: {
        autoImport: true
    },
    // @ts-ignore

    css: [
        "@/assets/iconfont/iconfont.css",
        '@unocss/reset/tailwind.css',
        '@/styles/index.less',
        '@/styles/anime.css',
        'animate.css/animate.css',
    ],
    // @ts-ignore
    colorMode: {
        classSuffix: '',
    },
    experimental: {
        reactivityTransform: true,
        inlineSSRStyles: false,
    },
    app: {
        head: {
            title: '曲率加速器',
            htmlAttrs: {},
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid: 'keywords', name: 'keywords', content: 'ai聊天，ai，chap gpt，聊天gbt，聊天GPT 3，聊天GPT登录，聊天GPT网站，聊天GPT，聊天GTP，聊天openai，聊天，chatai，聊天机器人gpt，chatg，chatgpt登录，chatgpt，gpt聊天，open ai，openai聊天，openai chatgpt，openai'},
                {hid: 'description', name: 'description', content: 'ChatGPT 是一个免费使用的 AI 系统。使用它进行引人入胜的对话、获得见解、自动执行任务并见证 AI 的未来，所有这些都集中在一个地方。'},
                {name: 'format-detection', content: 'telephone=no'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: 'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/cfa7732d-76db-4a5e-87f6-55680f731f7d.tmp'},
                /*        { rel: "stylesheet", type: "text/css", href: 'https://file.kwunphi.com/kwunphi/css/' + htmlGrayCss },*/
                // { rel: "stylesheet", type: "text/css", href: '@/assets/iconfont/iconfont.css' }
            ],
            script: [
                { src: 'https://hm.baidu.com/hm.js?1409c51f185644f60151299637bebed3' },
            ]
        },
        // automatic transition，转场动画
        pageTransition: {
            name: 'scale',
            appear: true,
            mode: 'out-in'
        }
    },
    build: {},
    nitro: {
        output: {
            dir: '.output',
            serverDir: '.output/server',
            publicDir: '.output/public'
        },
        devProxy: {
            "/api": {
                //要访问的跨域的域名
                target: "http://127.0.0.1:8001/",
                changeOrigin: true,
                // @ts-ignore
                rewrite: (path) => path.replace(/^\//, ""),
            },
        },
    },
    plugins: [
        "@/plugins/Directives",
    ],
    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@element-plus/nuxt',
    ],



})
