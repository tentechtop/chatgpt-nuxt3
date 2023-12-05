
import Cookies from 'js-cookie'
const TokenKey = 'nuxt_blog_token'
const InfoKey = 'nuxt_blog_info'
let day = 1 // 一天时间
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (type: string, token: string, time = 28800000) {
  day = time / (1000 * 60 * 60 * 24) // 一天时间
  return Cookies.set(TokenKey, type + ' ' + token, { expires: day, })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getInfo () {
  const userInfo = Cookies.get(InfoKey) || '{}'
  if (userInfo) {
    return JSON.parse(unescape(userInfo))
  }
}


export function removeInfo () {
  return Cookies.remove(InfoKey)
}
export function setNormalToken (
  type: string,
  token: string,
  time: number,
  tokenKey = 'access_token'
) {
  day = time / (1000 * 60 * 60 * 24) // 一天时间
  return Cookies.set(tokenKey, type + ' ' + token, { expires: day, })
}
// cookie 过期时间 expires_at
export function setExpires (expiresAt: string, time: number) {
  day = time / (1000 * 60 * 60 * 24)
  return Cookies.set('expires_at', expiresAt, { expires: day, })
}

export function getExpires () {
  return Cookies.get('expires_at')
}
