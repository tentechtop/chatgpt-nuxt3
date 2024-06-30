import { defineStore } from 'pinia'; //引入pinia
import { _encrypt, _decrypt } from '@/utils/encipher';


export const productCategory = defineStore('productCategory', {
    persist: process.client && { // 仅在客户端使用
        key: 'productCategory', //给一个要保存的名称
        storage: localStorage, // localStorage 本地存储，可替换sessionStorage
    },
    state: () => {
        return {
            productCategory: {},
        };
    },
    getters: {
        getCurrentCategory() {
            return this.productCategory;
        },
    },
    actions: {
        // 设置头像
        setCurrentCategory(productCategory) {
            this.productCategory = productCategory;
        }
    }
});
