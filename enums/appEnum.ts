export const TITLE = 'Kwunphi'
export const COMPANY = '怪虫机器人'

const isDev = process.env.NODE_ENV === 'development'


export const    httpPrefix = isDev? 'http://localhost:8080': 'https://api.tentech.top'

