import request from '~~/api/request'



// 获取文章归档
export const getProject = async () => {
    const res = await request.get('')
    return res.data
}
