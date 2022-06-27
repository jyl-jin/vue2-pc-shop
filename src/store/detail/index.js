import {reqGoodsInfo,reqShoopCarInfo} from '@/api'
import {getUuid} from '@/utils/uuid_token'
// detail模块的小仓库
const state={
    // 放置搜索数据
    detailsList:{},
    // 获取访客身份
    uuid_token:getUuid()
}
const actions={
    // 获取detail模块数据
    // 必须传递一个参数（空对象），params形参，派发actions事件的时候，第二个参数传递过来的，至少是一个空对象
    async getDetailsList({commit},skuId){
        let result=await reqGoodsInfo(skuId)
        if(result.data.code==200){
            commit('GETDETAILSLIST',result.data.data)
        }
    },
    // shoopcar
    async getCarData({commit},{skuId,skuNum}){
        let result =await reqShoopCarInfo(skuId,skuNum)
        if(result.data.code==200){
           return "ok"
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error("faile"))

        }

    }
    
}
const mutations={
    GETDETAILSLIST(state,detailData){
        state.detailsList=detailData
        console.log(state.detailsList);
    },
}
// 简化数据 把多层级的数据直接简化
const getters={
    categoryView(state){
        return state.detailsList.categoryView || {}
    },
    skuInfo(state){
        return state.detailsList.skuInfo || {}
    }

}
export default ({
    state,
    actions,
    mutations,
    getters
})