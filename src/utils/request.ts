import axios, { InternalAxiosRequestConfig, AxiosResponse }from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000,
})
//请求拦截器
service.interceptors.request.use(
  (config:InternalAxiosRequestConfig)=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      config.headers.Authorization = accessToken
    }
    // debugger
    return config
  },
  error=>{
    return Promise.reject(error);
  }
)

// 响应拦截
service.interceptors.response.use(
    (response:AxiosResponse) => {
      //响应成功的时候....
     
      return response.data.data;
    },
    error => {
  
      //响应失败的时候...
      return Promise.reject(error);
    }
  )

export default service

