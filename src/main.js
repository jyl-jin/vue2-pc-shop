import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 把三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 分页
import Pagination from '@/components/Pagination'
// 引入vuex
import store from '@/store'

// 引入mockjs  --模拟数据
import '@/mock/mockServe'

// 引入swiper样式   多个使用的话可以把样式引到main.js里面
import 'swiper/css/swiper.css'

// 引入接口
import * as API from '@/api'

// 懒加载的图片
import setu from '@/assets/1.gif'
// 引入懒加载
import VueLazyload from 'vue-lazyload'
// 懒加载配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: setu,  //默认展示的图片
  attempt: 1
})

// 引入插件
import Plugin from '@/plugins/myplugins' 
Vue.use(Plugin)

// 按需哟进入饿了吗
import { Button, Select,MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo({}));
// 挂载全局组件  第一个参数：全局组件的名字，第二个参数哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 挂载轮播图为全局组件
Vue.component(Carousel.name,Carousel)
// 挂载分页
Vue.component(Pagination.name,Pagination)


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // <!-- 全局事件总线配置，就是改变vm的原型指向 -->
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由  
  // 注册路由信息：挡在这里写router的时候，组件身上都有$route,$router属性
  router,
  // 注册仓库:组件身上会多一个￥store的属性
  store
}).$mount('#app')
