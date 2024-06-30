import request from '../api/request'




// 古诗词
export const gushici = async () => {
  const res = await request.http('https://jiang-xia.top/x-zone/api/v1/third/gushici', {
    method: 'GET',
  })
  return res.data
}










const api = {
  gushici
}
export default api
