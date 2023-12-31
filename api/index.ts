import * as article from './article'
import * as tag from './tag'
import * as category from './category'
import request from '../api/request.js'

// 获取用户信息

// 古诗词
export const gushici = async () => {
  const res = await request.http('https://jiang-xia.top/x-zone/api/v1/third/gushici', {
    method: 'GET',
  })
  return res.data
}
// 获取天气
export const getWeather = async () => {
  const res = await request.get('/resources/weather')
  return res.data
}
const api = {
  ...article,
  ...tag,
  ...category,
  gushici,
  getWeather,
}
// https://gitee.com/api/v5/repos/jiang-xia/blog-home-nuxt/commits?access_token=53db1802db341bf994093cace04c275b&page=1&per_page=20
export default api
