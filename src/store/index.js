// 引入vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import users from './users'
import trade from './trade'

// state:存放数据的地方
// 可以在里面书写逻辑业务
//修改state的唯一方法 
// 简化数据仓库，组件获取数据更加简单 可以直接对state的数据进行逻辑，相当于计算属性

// 对外暴露Store
export default new Vuex.Store({
    // 使用vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopCart,
        users,
        trade
    }
})