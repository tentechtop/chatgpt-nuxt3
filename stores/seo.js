import { defineStore } from 'pinia'; //引入pinia
import { _encrypt, _decrypt } from '@/utils/encipher';

export const useSeoStore  = defineStore('seoData', {
    state: () => {
        return {
            seoData:null,
            seoMap:new Map(),
            seoDataFlag: false,
        };
    },
    getters: {
        getSeo() {
            return this.seoDataFlag ?  this.seoData: null;
        },
        getSeoMap() {
            return this.seoDataFlag ?  this.seoMap: new Map();
        }
    },
    actions: {
        // 设置用户信息
        setSeo(seo, seoMap) {
            this.seoDataFlag = true;
            this.seoData = seo;
            this.seoMap = seoMap;
        }
    }
});


