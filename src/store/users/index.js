import {reqPhoneNumber,reqRegister,reqLogin,getUserInfo,loginOut} from '@/api'
import {setToken,getToken,clearToken} from '@/utils/setToken'
// user模块的小仓库
const state={
    // 放置搜索数据
    userKeyCode:'',
    token:getToken(),
    userInfo:{}
}
const actions={
    // 必须传递一个参数（空对象），params形参，派发actions事件的时候，第二个参数传递过来的，至少是一个空对象
    async getPhoneNumber({commit},phone){
        let result=await reqPhoneNumber(phone)
        if(result.data.code==200){
            commit('REQPHONENUMBER',result.data.data)
        }
    },
    // 注册
    async getRegister({commit},data){
        let result=await reqRegister(data)
        if(result.data.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录 
    async goLogin({commit},data){
        let result=await reqLogin(data)
        if(result.data.code==200){
            console.log(result.data.data.token);
            commit('REQLOGIN',result.data.data.token)
            setToken(result.data.data.token)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserData({commit}){
        let result=await getUserInfo()
        // console.log(result.data.data);
        if(result.data.code==200){
            commit('GETUSERINFO',result.data.data)
        }
    },
    // 退出登录
    async goLoginOut({commit}){
        let result=await loginOut()
        if(result.data.code==200){
            commit('GOLOGINOUT')
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
    
}
const mutations={
    REQPHONENUMBER(state,phoneNumber){
        state.userKeyCode=phoneNumber
    },
    REQLOGIN(state,getTOKEN){
        state.token=getTOKEN
    },
    // 存贮用户信息
    GETUSERINFO(state,data){
        state.userInfo=data
    },
    // 退出登录，清除数据
    GOLOGINOUT(state){
        state.token=''
        state.userInfo={}
        clearToken()
    }
}
// 简化数据 把多层级的数据直接简化
const getters={
    getPhoneNumberss(state){
        return state.userKeyCode|| ''
    }
    
}
export default ({
    state,
    actions,
    mutations,
    getters
})