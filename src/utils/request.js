import axios from 'axios'
import { getToken, hasToken } from 'utils/storage'

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0/',
  timeout: 5000
})

// 配置请求拦截器
instance.interceptors.request.use(config => {
  if (hasToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, error => Promise.reject(error))

// 配置响应拦截器
instance.interceptors.response.use(response => response.data, error => Promise.reject(error))

export default instance
