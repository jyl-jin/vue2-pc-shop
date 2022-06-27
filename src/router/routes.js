// 配置路由的地方

// 引入路由组件
// import Home from '@/pages/Home'
// const Home=()=>{
//     console.log(1454545);
//     return import('@/pages/Home')
// }
// const Home=()=>import('@/pages/Home')

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// const Center=()=>{
//     return import ('@/pages/Center')
// }

// 简写
const Center=()=>import ('@/pages/Center')

// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


// 配置路由
export default [
        {
            path:"/home",    //url的路径 PaySuccess
            component:()=>import('@/pages/Home'),   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
        },
        // 额外的学习
        {
            path:"/moreStudy",    //url的路径 PaySuccess
            component:()=>import('@/pages/MoreStudy'),   //组件
            children:[
                {
                    path:"/moreStudy/event",    //url的路径
                    component:()=>import('@/pages/MoreStudy/event'),   //组件
                },
                {
                    path:"/moreStudy/model",    //url的路径
                    component:()=>import('@/pages/MoreStudy/model'),   //组件
                },
                {
                    path:"/moreStudy/async",    //url的路径
                    component:()=>import('@/pages/MoreStudy/async'),   //组件
                },
                {
                    path:"/moreStudy/listren",    //url的路径
                    component:()=>import('@/pages/MoreStudy/listren'),   //组件
                },
                {
                    path:"/moreStudy/childrenParent",    //url的路径
                    component:()=>import('@/pages/MoreStudy/childrenParent'),   //组件
                },
                {
                    path:"/moreStudy/slots",    //url的路径
                    component:()=>import('@/pages/MoreStudy/slots'),   //组件
                },
                {
                    path:'moreStudy',
                    redirect:'/event'
                }
            ]
        },
        // 交易页面  独享守卫   
        {
            path:"/trade",    //url的路径
            component:Trade,   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
            beforeEnter:(to,from,next)=>{
                // to  要去那里
                // from 从哪里啦
                // next  放行
                if(from.path=='/ShopCart'){
                    next()
                }else{
                    console.log("不能直接接去订单，必须从购物车");
                    next(false) //中断操作  返回之前的
                }
            }
        },
        {
            path:"/center",    //url的路径
            component:Center,   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
            children:[
                {
                    path:"/center/myOrder",
                    component:MyOrder,
                    meta:{show:true},
                },
                {
                    path:"/center/groupOrder",
                    component:GroupOrder,
                    meta:{show:true},
                },
                {
                    path:"/center",
                    redirect:'/center/myOrder'
                },
            ]
        },
        {
            path:"/paySuccess",    //url的路径
            component:PaySuccess,   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
        },
        {
            path:"/pay",    //url的路径
            component:Pay,   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
            beforeEnter:(to,from,next)=>{
                // to  要去那里
                // from 从哪里啦
                // next  放行
                if(from.path=='/trade'){
                    next()
                }else{
                    console.log("不能直接接去支付，必须从trade");
                    next(false)
                }
            }
        },
        {
            path:"/AddCartSuccess",    //url的路径
            component:AddCartSuccess,   //组件
            name:'AddCartSuccess',
            meta:{show:true}, //路由元信息，可以自己定义一些参数
        },
        {
            path:"/ShopCart",    //url的路径
            component:ShopCart,   //组件
            name:'ShopCart',
            meta:{show:true}, //路由元信息，可以自己定义一些参数
        },
        {
            path:"/detail/:detailId",    //url的路径
            component:Detail,   //组件
            // meta:{show:true}, //路由元信息，可以自己定义一些参数
        },
        {
            path:"/login",    //url的路径
            component:Login,   //组件
            meta:{show:false}, //路由元信息，可以自己定义一些参数

        },{
            path:"/register",    //url的路径
            component:Register,   //组件
            meta:{show:false}, //路由元信息，可以自己定义一些参数

        },{
            path:"/search/:keyword?",    //url的路径
            component:Search,   //组件
            meta:{show:true}, //路由元信息，可以自己定义一些参数
            name:"search",
            props:true,

        },{
            path:"/test",    //url的路径
            component:Test,   //组件
        },{
            path:"*",    //url的路径
            redirect:'/home',   //组件
        }
    ]
// 最后回到入口文件注册使用