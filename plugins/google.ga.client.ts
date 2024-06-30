/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
    /*
     ** Google 统计分析脚本
     */
    (function (i, s, o, g, r, a, m) {
        // @ts-ignore
        i.GoogleAnalyticsObject = r;
        // @ts-ignore
        i[r] = i[r] || function () {
            // @ts-ignore
            (i[r].q = i[r].q || []).push(arguments)
        };
        // @ts-ignore
        i[r].l = 1 * new Date();
        // @ts-ignore
        a = s.createElement(o);
        // @ts-ignore
        m = s.getElementsByTagName(o)[0];
        // @ts-ignore
        a.async = 1
        // @ts-ignore
        a.src = g
        // @ts-ignore
        m.parentNode.insertBefore(a, m)
    })(
        window,
        document,
        'script',
        'https://www.google-analytics.com/analytics.js',
        'ga'
    )
    /*
     ** 当前页的访问统计
     */
    // @ts-ignore
    if (window && window.ga) {
        // @ts-ignore
        ga('create', 'G-5N5KBXN0GZ', 'auto')
    }
}

// export default defineNuxtPlugin(({ app: { router }, store }) => {
//     /*
//      ** 每次路由变更时进行pv统计
//      */
//     router.afterEach((to, from) => {
//         /*
//          ** 告诉 GA 增加一个 PV
//          */
//         ga('set', 'page', to.fullPath)
//         ga('send', 'pageview')
//     })
// })

export default defineNuxtPlugin(nuxtApp => {
    const router = useRouter()
    /* 每次路由变更时进行pv统计 */
    router.afterEach((to, from) => {
        /*
         ** 告诉 GA 增加一个 PV
         */
        // @ts-ignore
        if (window && window.ga) {
            // @ts-ignore
            ga('set', 'page', to.fullPath)
            // @ts-ignore
            ga('send', 'pageview')
        }
    })
})