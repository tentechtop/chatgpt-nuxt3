export const TITLE = 'Ether AI'
export const COMPANY = 'Ether AI'

const isDev = process.env.NODE_ENV === 'development'


export const    httpPrefix = isDev? 'http://localhost:8080': 'https://api.tentech.top'

