export default defineNuxtPlugin((nuxtApp) => {
    /* if (process.client) {
        function (mapInit) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=百度api获取你的密钥&callback=mapinit";
            window['mapinit'] = function () {
                mapInit();
            };
            document.head.appendChild(script);
        }(function () {
            // 这里使用BMap
            var map = new BMap.Map("allmap");
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            var local = new BMap.LocalSearch(map, {
                renderOptions: { map: map }
            });
            local.search("宋家庄地铁站");
        });
    } */
    return {
        provide: {
            apiTest: ()=>{}
        }
    }
})