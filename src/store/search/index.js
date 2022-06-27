import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state={
    // 放置搜索数据
    searchList:{}
}
const actions={
    // 获取search模块数据
    // 必须传递一个参数（空对象），params形参，派发actions事件的时候，第二个参数传递过来的，至少是一个空对象
    async getSearchList({commit},params={}){
        let result=await reqGetSearchInfo(params)
        if(result.data.code==200){
            commit('REQGETSEARCHINFO',result.data)
        }
    }
    
}
const mutations={
    REQGETSEARCHINFO(state,searchList){
        state.searchList=searchList.data
        // console.log(state.searchList);
    }
}
// 简化数据 把多层级的数据直接简化
const getters={

    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }

}
export default ({
    state,
    actions,
    mutations,
    getters
})