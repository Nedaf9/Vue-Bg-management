import axios from 'axios';

//在跨域请求时，会携带用户凭证
axios.defaults.withCredentials = true;

let instance = axios.create({
  baseURL: "http://rap2api.taobao.org/app/mock",
})

//添加请求拦截器
instance.interceptors.request.use(
  //在发送请求之前
  config => config,
  //对请求错误
  error => Promise.reject(error)
)
//响应式拦截器
instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default instance;