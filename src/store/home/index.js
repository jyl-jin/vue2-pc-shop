import {reqCreatgoryList,reqGetBannerList,reqGetFloorList} from '@/api'
// home模块的小仓库
const state={
    // 三级列表
    categoryList:[],
    // 轮播图
    bannerList:[],
    // floor
    floorList:[]
    
}
const actions={
    // 俩参数：一个commit，一个传递过来的参数或者接口的数据
    async categoryList({commit}){   //解构下 很重要
        let result=await reqCreatgoryList()
        if(result.data.code==200){
            commit('CATEGORYLIST',result.data)
        }
    },
    // 请求mockjs里面的轮播图数据
    async getBannerList({commit}){
        // console.log("获取轮播数据");
        let result=await reqGetBannerList()
        if(result.data.code==200){
            commit('GETBANNERLIST',result.data)
            // console.log(result.data);
        }
    },
    // 请求mock里面的floor数据
    async getFloorList({commit}){
        let result=await reqGetFloorList()
        if(result.data.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
const mutations={
    // 俩：state存放，传过来的参数
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList.data        
        // console.log(state);
    },
    // 请求mockjs里面的轮播图数据
    GETBANNERLIST(state,getBannerList){
        // console.log("修改vuex轮播数据");

        state.bannerList=getBannerList.data
    },
    GETFLOORLIST(state,getFloorList){
        state.floorList=getFloorList.data
    }
}
const getters={}
export default ({
    state,
    actions,
    mutations,
    getters
})