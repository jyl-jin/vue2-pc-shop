import {getAddressList,getOrderInfo} from '@/api'
// trade模块的小仓库
const state={
    // 放置搜索数据
   addressList:[],
   orderList:{}
}
const actions={
    // 地址
    async getAdresslist({commit}){
        let result= await getAddressList()
        commit('GETADDRESSLIST',result.data.data)
    },
    // 订单
    async getOrder({commit}){
        let result=await getOrderInfo()
        console.log(result.data);
        commit('GETORDER',result.data.data)
    }
}
const mutations={
    GETADDRESSLIST(state,address){
        state.addressList=address
    },
    // 订单
    GETORDER(state,data){
        state.orderList=data
    }
    
}
// 简化数据 把多层级的数据直接简化
const getters={
   
    
}
export default ({
    state,
    actions,
    mutations,
    getters
})