// 配置路由的地方
// 引入vue
import Vue from 'vue'
// 引入vuerouter
import VueRouter from 'vue-router'
// 使用vuerouter
Vue.use(VueRouter)

// 引入路由配置组件
import routes from './routes'

import store from '@/store'




// 先把VueRouter原型对象上的push保存一份，
// 解决编程式路由跳转到当前路由（参数不变），多次执行会警告（NavigationDuplicated）
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
// 重写push，
VueRouter.prototype.push=function (location,reslove,reject) {
    if(reslove&&reject){
        // call、apply区别：都可以改变函数上下文一次，不同点：call传递参数用逗号隔开，apply方法执行，传递的是数组
        originPush.call(this,location,reslove,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
    
}

// 重写replace
VueRouter.prototype.replace=function (location,reslove,reject) {
    if(reslove&&reject){
        // call、apply区别：都可以改变函数上下文一次，不同点：call传递参数用逗号隔开，apply方法执行，传递的是数组
        originReplace.call(this,location,reslove,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
    
}


// 配置路由
let router= new VueRouter({
    routes,
    // vue的默认滚动行为 x为横轴y为zhongzhou
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})
// 最后回到入口文件注册使用

// 配置守卫
router.beforeEach(async(to,from,next)=>{
    // console.log(to,from,next);
    // to 可以获取到你要跳转的哪个路由信息
    // from 获取从哪个路由来
    // next()放行  next(path) 放行到哪个路径
    // 
    next()
    let token=store.state.users.token
    let userName=store.state.users.userInfo.name
    if(token){
        if(to.path=='/login'){
            console.log("token存在");
            next('/home')
        }else{
            // 这个时候调往其他页面的时候会没有name，因为那个页面并没有请求name的接口，所以要重新派发请求用户信息的接口
            console.log("token存在，去的是其他地方除了登录");
            console.log(userName);
            if(name){
                next()
            }else{
                console.log("没有用户信息了");
                // 没有用户信息，派发actions让仓库存储用户信息在跳转，
                try {
                    await store.dispatch('getUserData')
                    next()
                } catch (error) {
                    // 这里是在用户信息token过期的时候放出来的，清除登录信息，然后跳转登录
                    await store.dispatch('goLoginOut')
                    next('/login')

                }
            }
            
        }
    }else{
        // 在没有登录的情况下，有些地方不能进去，要先判断去的路径是否不能去，如果不能去，跳转登录，
        // 优化：在跳转登录之后，登录成功后应该返回之前你想要进去的页面，我们可以给他的路由上加参数,
        // 参数是之前没有权限去的地方，登陆成功有了权限，就可以直接去，不过要先判断路由有没有参数，因为登录页默认的是登陆成功跳转到home，需要在登录页
        // 判断一下有没有路由参数，有的话就跳转路由参数，没有的话，就默认跳转home
        console.log("没有登录，没有token");
        let topath=to.path
        console.log(topath);
        if(topath.indexOf('/center')!=-1 || topath.indexOf('/pay')!=-1 || topath.indexOf('/trade')!=-1 || topath.indexOf('/ShopCart')!=-1){
            next('/login?redirect='+topath)

        }else{
            next(false)
        }
    }
})


export default router