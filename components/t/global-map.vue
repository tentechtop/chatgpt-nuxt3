<template>
    <div ref="worldMap" class="world-map">
        <t-global-map-city2 v-for="(item, index) in cityList" :city="item.city" :line="item.line" :point="item.point"
            :map-width="width" :coordinate-width="mapWidth" :coordinate-height="mapHeight"></t-global-map-city2>
    </div>
</template>

<script>
const mapWidth = 1587
const mapHeight = 760
export default {
    props: {

    },
    data() {
        return {
            mapWidth,
            mapHeight,
            width: mapWidth,
            cityList: [{
                city: {
                    localeName: 'aboutUs.Global.GlobalItem1.localeName',
                    enName: 'Seattle',
                    nationalFlag: 'https://file.kwunphi.com/kwunphi4/images/svg/meiguoguoqi.webp'
                },
                line: {
                    left: 200,
                    top: 100
                },
                point: {
                    x: 218,
                    y: 192
                }
            }, {
                city: {
                    localeName: 'aboutUs.Global.GlobalItem2.localeName',
                    enName: 'Munich',
                    nationalFlag: 'https://file.kwunphi.com/kwunphi4/images/svg/deguotubiao.webp'
                },
                line: {
                    left: 100,
                    top: 200
                },
                point: {
                    x: 803,
                    y: 183
                }
            }, {
                city: {
                    localeName: 'aboutUs.Global.GlobalItem3.localeName',
                    enName: 'Shenzhen',
                    nationalFlag: 'https://file.kwunphi.com/kwunphi4/images/svg/zgtubaio.webp'
                },
                line: {
                    left: 100,
                    top: 200
                },
                point: {
                    x: 1255,
                    y: 318
                }
            }, {
                city: {
                    localeName: 'aboutUs.Global.GlobalItem4.localeName',
                    enName: 'Tokyo',
                    nationalFlag: 'https://file.kwunphi.com/kwunphi4/images/svg/rbtubiao.webp'
                },
                line: {
                    right: 50,
                    top: 80
                },
                point: {
                    x: 1362,
                    y: 250
                }
            }]
        }
    },
    mounted() {
        this.init(100)
        window.addEventListener('resize', this.init)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.init)
    },
    methods: {
        init(repeat) {
            let worldMap = this.$refs['worldMap']
            let width = 0
            if (worldMap) {
                width = worldMap.offsetWidth
            }
            if (width) {
                this.width = width
            } else {
                // 初始化页面时，有可能获取不到地图容器真实宽度，需要多次获取
                if (repeat) {
                    setTimeout(() => {
                        this.init(repeat - 1)
                    }, 10);
                }
            }
        }
    }
}
</script>

<style scoped>
.world-map {
    width: 100%;
    height: 0;
    padding-bottom: 47.889%;
    position: relative;
    background-image: url('/images/global-pc.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    z-index: 10;
}

.image-container {
    position: relative;
    overflow: hidden;
}
</style>
