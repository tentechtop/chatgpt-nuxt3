import { defineStore } from 'pinia'; //引入pinia
import { _encrypt, _decrypt } from '@/utils/encipher';
import {useThemeStore} from "~/stores/Theme";


export const useWebsiteConfigStore = defineStore('websiteConfig', {
    persist: process.client && { // 仅在客户端使用
        key: 'websiteConfig', //给一个要保存的名称
        storage: localStorage, // localStorage 本地存储，可替换sessionStorage
    },
    state: () => {
        return {
            websiteConfig:{}, //https://ipinfo.io/json
            websiteConfigFlag: false,
        };
    },
    getters: {
        getWebsiteConfig() {
            return this.websiteConfigFlag ? JSON.parse(_decrypt(this.websiteConfig)) : '';
        },
    },
    actions: {
        // 设置用户信息
        setConfig(websiteConfig) {
            this.websiteConfigFlag = true;
            this.websiteConfig = _encrypt(websiteConfig);
        }
    }
});
