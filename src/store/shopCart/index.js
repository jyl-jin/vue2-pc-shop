import {reqShoopCartList,delShoopListOne,reqUpdateCheck} from '@/api'
// 购物车模块的小仓库
const state={
    // 放置搜索数据
    shoopCartList:[]
}
const actions={
    // 获取cart模块数据
    // 必须传递一个参数（空对象），params形参，派发actions事件的时候，第二个参数传递过来的，至少是一个空对象
    async getShopCartList({commit}){
        let result=await reqShoopCartList()
        if(result.data.code==200){
            commit('GETSHOPCARTLIST',result.data.data)
        }
    },

    // 删除数据
async deleteOne({commit},skuId){
    let result=await delShoopListOne(skuId)
    if(result.data.code==200){
       return 'OK'
    }else{
        return Promise.reject(new Error("faile"))
    }
},
// 切换选中状态
async updateCheck({commit},{skuId,isChecked}){
    let result=await reqUpdateCheck(skuId,isChecked)
    if(result.data.code==200){
        // console.log('ok');
        return "ok"
    }else{
        return Promise.reject(new Error("faile..............."))
    }
},
// 删除选中的所有   actions可以接收一个小的state，里面dispatch，getters，commit都有，带个大括号只是为了解构出来
deleteAllCheck({dispatch,getters}){
    let PromiseAll=[]
    getters.cartList.cartInfoList.forEach(item => {
       let promise= item.isChecked==1?delShoopListOne(item.skuId):''
    //    console.log(promise);
    // 将每一次promise的结果放到上面的数组里
       PromiseAll.push(promise)
    });
    // 全部成功，返回成功，一个失败，就返回失败
    return Promise.all(PromiseAll)
},
// 点击全选
allCheck({getters,dispatch},isChecked){
    console.log(isChecked);
    let PromiseAll=[]
    getters.cartList.cartInfoList.forEach(item => {
        // 状态是传过来的，传过来的是选中，全都变成选中，反之一样
        let promise=reqUpdateCheck(item.skuId,isChecked)
        PromiseAll.push(promise)
     });
     return Promise.all(PromiseAll)
}
    
}
const mutations={
    GETSHOPCARTLIST(state,shopCatData){
        state.shoopCartList=shopCatData
        // console.log(state.shoopCartList[0].cartInfoList);
    }
    
}
// 简化数据 把多层级的数据直接简化
const getters={
   cartList(state){
       return state.shoopCartList[0]|| []
   }

}
export default ({
    state,
    actions,
    mutations,
    getters
})