import { defineStore } from 'pinia'; //引入pinia
import { _encrypt, _decrypt } from '@/utils/encipher';
import {generateRandomID} from "assets/js/commons";


export const user = defineStore('user', {
  persist: process.client && { // 仅在客户端使用
    key: 'userStateTen', //给一个要保存的名称
    storage: localStorage, // localStorage 本地存储，可替换sessionStorage
  },
  state: () => {
    return {
      ipInfo:{}, //https://ipinfo.io/json
      avatar: '',
      userInfo: {}, // 当前登陆人信息
      token: '',
      infoFlag: false,
      tokenFlag: false,
      ipInfoFlag: false,
      userId: '', //用户设备ID 浏览器指纹 或者随机字符
      userIdFlag: false,
    };
  },
  getters: {
    // 获取当前登录用户头像
    getavatar() {
      return this.avatar;
    },
    // 获取当前登录人信息
    getUserInfo() {
      return this.infoFlag ? JSON.parse(_decrypt(this.userInfo)) : '';
    },
    // 获取token
    getToken() {
      return this.tokenFlag ? _decrypt(this.token) : '';
    },
    getIpInfo() {
      return this.ipInfoFlag? _decrypt(this.ipInfo) : '';
    },
    getUserId() {
      if (this.userIdFlag){
        return _decrypt(this.userId)
      }else {
        this.userIdFlag = true
        const userId = generateRandomID();
        this.userId = _encrypt(userId)
        return userId
      }
    }
  },
  actions: {
    // 设置头像
    setavatar(avatar) {
      this.avatar = avatar;
    },
    // 设置用户信息
    setUserInfo(userInfo) {
      this.infoFlag = true;
      this.userInfo = _encrypt(userInfo);
    },
    setIpInfo(ipInfo) {
      this.ipInfoFlag = true;
      this.ipInfo = _encrypt(ipInfo);
    },
    // 设置token
    setToken(token) {
      this.tokenFlag = true;
      this.token = _encrypt(token);
    },
    setUserId(userId) {
      this.userIdFlag = true;
      this.userId = _encrypt(userId);
    },
    // 清除用户信息
    clearUserInfo() {
      this.userInfo = {};
      this.token = '';
      this.tokenFlag = false;
      this.infoFlag = false;
    },
  }
});
