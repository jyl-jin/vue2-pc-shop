// 对于axios的二次封装
import axios from 'axios' 

// 引入进度条和样式
import nprogress from 'nprogress'
// console.log(nprogress.start());
import "nprogress/nprogress.css"

// 引入vuex的store
import store from '@/store'

// 利用axios的方法create，去创建一个axios实例
let requests=axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径会出现api
    baseURL:'/api',
    timeout:5000
})

// 请求拦截器  在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些逻辑
requests.interceptors.request.use((config)=>{
// console.log("你是个小西八");

    // 如果临时身份存在的话，给请求头加上这个值，不过这个值得名字要和后端商量好
    if(store.state.detail.uuid_token){
        // console.log(store.state.detail.uuid_token);
       // userTempId:游客身份
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 获取token，请求在app上面，挂载的时候请求
    if(store.state.users.token){
        config.headers.token=store.state.users.token
    }else{
        // config.headers.token=localStorage.getItem('token')
    }

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
    return res

},(error)=>{
    // 失败后的回掉函数
    return Promise.reject(new Error("fail"))
})

// 对外暴露
export default requests
