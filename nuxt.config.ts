const langs: any = {
    'zh': 'zh',
/*    'zh-CN': 'zh-CN',*/
/*    'en': 'en',*/
/*    'en-US': 'en-US'*/
}


const LANG_ENV = process.env.LANG_ENV

const CURRENT_LANG_ENV: string = LANG_ENV && langs.hasOwnProperty(LANG_ENV) ? LANG_ENV : 'zh'

const LANG = langs.hasOwnProperty(CURRENT_LANG_ENV) ? langs[CURRENT_LANG_ENV] : langs.zh

const NODE_ENV = process.env.NODE_ENV

console.error("打包环境: "+NODE_ENV,"   语言环境: "+ LANG_ENV,"   主要语言: "+ LANG)
export default defineNuxtConfig({
    //buildDir: LANG_ENV ? ('.nuxt-' + LANG_ENV) : '.nuxt',
    build: {
        // transpile: [/vue3-library-reproduction/]
        /* meta: {
            name: 'Tentech',
            version: '4.0.0'
        } */
    },
    nitro: {
        output: LANG_ENV ? {
            dir: '.output-' + LANG_ENV,
            serverDir: '.output-' + LANG_ENV + '/server',
            publicDir: '.output-' + LANG_ENV + '/public'
        } : {
            dir: '.output',
            serverDir: '.output/server',
            publicDir: '.output/public'
        },
/*        devProxy: {
            "/api": {
                //要访问的跨域的域名
                target: "http://192.168.2.213:80/api",
                changeOrigin: true,
                // @ts-ignore
                rewrite: (path) => path.replace(/^\/api/, ""),
                rewrite: (path) => path.replace(/^\/account/, ""),
            },
        },*/
        devProxy: {
            "/api": {
                //要访问的跨域的域名
                target: "http://192.168.2.213:80/api",
                changeOrigin: true,
                // @ts-ignore
                rewrite: (path) => path.replace(/^\/api/, ""),
                // @ts-ignore
                bypass(req, res, options) {
                    const proxyUrl = new URL(req.url || "", options.target)?.href || "";
                    res.setHeader("x-res-proxyUrl", proxyUrl);
                },
            },
        },
    },
    ssr: true,
    app: {
        head: {
            title: 'nuxt3',
            htmlAttrs: {lang: LANG,},
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'keywords', name: 'keywords', content: '' },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                // { rel: "stylesheet", type: "text/css", href: '@/assets/iconfont/iconfont.css' }
            ],
            script: [
                { src: 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.4/libs/oversea/index.js' },
/*                { src: 'https://www.recaptcha.net/recaptcha/api.js?render=6LdplZkpAAAAAGK5Y30z91gd0WF2cQnvskPMLJEN', type: 'text/javascript' },*/
                // 引入百度统计 https://tongji.baidu.com/
                // { src: '@/assets/iconfont/iconfont.js', type: 'text/javascript' },
                /*{ src: 'https://hm.baidu.com/hm.js?bbe5df24e1c24e850d281175d369d6d0' },*/
                // { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js' }
                // {
                //     //type: 'type/javascript',
                //     src: 'https://api.map.baidu.com/getscript?v=2.0&ak=AUP3eN9CHqxqQm0DPM0Vm9hFPSqljRqo'
                // }
                // {
                //     src: 'https://webapi.amap.com/maps?v=2.0&key=57c56b646db5005d46733a1ec1c29a12'
                // }
            ]
        },
        // 转场动画
        pageTransition: {
            name: 'fade',
            appear: true,
            mode: 'out-in', }
    },
    css: ["@/assets/main.css",
        "@/assets/iconfont/iconfont.css",
        "@/styles/index.less",
        "animate.css/animate.css"
    ],
    plugins: [
        "@/plugins/Directives",
    ],
    modules: [
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@tailvue/nuxt',
        '@element-plus/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    i18n: {
        strategy: 'prefix_except_default',
        locales: [ {
            code: 'zh',
            iso: 'zh',
            domain: NODE_ENV === 'production' ? '' : ''
            // domain: 'https://www.example.com'
        },
/*        {
            code: 'zh-CN',
            iso: 'zh-CN',
            domain: NODE_ENV === 'production' ? '' : ''
            // domain: 'https://www.example.com'
        },*/
/*        {
            code: 'en',
            iso: 'en',
            domain: NODE_ENV === 'production' ? '' : ''
            // domain: 'https://www.example.com'
        },*/
/*        {
            code: 'en-US',
            iso: 'en-US',
            domain: NODE_ENV === 'production' ? '' : ''
            // domain: 'https://www.example.com'
        }*/
        ],
        // differentDomains: NODE_ENV === 'production',
        differentDomains: false,
        defaultLocale: LANG,
        vueI18n: './plugins/i18n/vueI18n.ts'
    },


})
