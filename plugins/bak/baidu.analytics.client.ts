
// export default defineNuxtPlugin(({ app: { router }, store }) => {
//     /* 每次路由变更时进行pv统计 */
//     router.afterEach((to, from) => {
//         /* 增加一个PV */
//         try {
//             window._hmt = window._hmt || []
//             window._hmt.push(['_trackPageview', to.fullPath])
//         } catch (e) { }
//     })
// })

// 百度统计已经开启单页设置，不需要再手动统计每个页面

/*
export default defineNuxtPlugin(nuxtApp => {
    const router = useRouter()
    /!* 每次路由变更时进行pv统计 *!/
    router.afterEach((to, from) => {
        /!* 增加一个PV *!/
        try {
            window._hmt = window._hmt || []
            window._hmt.push(['_trackPageview', to.fullPath])
        } catch (e) { }
    })
})*/
