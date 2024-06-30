import { defineStore } from 'pinia'; //引入pinia
import { _encrypt, _decrypt } from '@/utils/encipher';

export const useThemeStore  = defineStore('theme', {
    persist: process.client && { // 仅在客户端使用
        key: 'theme', //给一个要保存的名称
        storage: localStorage, // localStorage 本地存储，可替换sessionStorage
    },
    state: () => {
        return {
            theme:'', //https://ipinfo.io/json
            themeFlag: false,
        };
    },
    getters: {
        getTheme() {
            if (!this.themeFlag){
                this.themeFlag = true
                this.theme = 'light'
            }

            const htmlElement = document.querySelector('html');
            if (htmlElement) {
                // 检查当前要设置的主题
                if (this.theme === 'dark') {
                    // 如果是设置为 'dark' 主题，先添加 'dark' 类
                    htmlElement.classList.add('dark');
                    // 然后删除 'light' 类
                    htmlElement.classList.remove('light');
                } else if (this.theme === 'light') {
                    // 如果是设置为 'light' 主题，先添加 'light' 类
                    htmlElement.classList.add('light');
                    // 然后删除 'dark' 类
                    htmlElement.classList.remove('dark');
                }

            }
            return this.theme;
        },
    },
    actions: {
        setDarkTheme(){
            this.setTheme('dark')
        },
        setLightTheme(){
            this.setTheme('light')
        },
        // 设置用户信息
        setTheme(theme) {
            this.themeFlag = true;
            this.theme = theme;
            const htmlElement = document.querySelector('html');
            if (htmlElement) {
                // 检查当前要设置的主题
                if (this.theme === 'dark') {
                    // 如果是设置为 'dark' 主题，先添加 'dark' 类
                    htmlElement.classList.add('dark');
                    // 然后删除 'light' 类
                    htmlElement.classList.remove('light');
                } else if (this.theme === 'light') {
                    // 如果是设置为 'light' 主题，先添加 'light' 类
                    htmlElement.classList.add('light');
                    // 然后删除 'dark' 类
                    htmlElement.classList.remove('dark');
                }
            }
        }
    }
});


