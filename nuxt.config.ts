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
                {hid: 'keywords', name: 'keywords', content: '曲率加速器,一键开启学术加速、游戏加速，无限速无限流，超强数据加密技术，以保护线上隐私安全。'},
                {hid: 'description', name: 'description', content: '做最好，最安全的加速器，采用最前沿的数据加密技术，使您全面掌控您的网络隐私与安全。'},
                {name: 'format-detection', content: 'telephone=no'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: 'https://com-img-space.oss-cn-shenzhen.aliyuncs.com/svg/favicon.ico'},
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
