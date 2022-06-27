// 对于axios的二次封装
import axios from 'axios' 

// 引入进度条和样式
import nprogress from 'nprogress'
// console.log(nprogress.start());
import "nprogress/nprogress.css"

// 利用axios的方法create，去创建一个axios实例
const requests=axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径会出现api
    baseURL:'/mock',
    timeout:5000
})

// 请求拦截器  在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些逻辑
requests.interceptors.request.use((config)=>{
    // 请求成功之前开始
    nprogress.start()
    // config :配置对象，对象中有一个重要的属性，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
// 之后结束
nprogress.done()
// 成功后的回调函数，
    return res.data

},(error)=>{
    // 失败后的回掉函数
    return Promise.reject(new Error("fail"))
})

// 对外暴露
export default axios
