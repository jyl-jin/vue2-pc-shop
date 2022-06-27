# shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1.public:一般放置一些静态资源，打包的时候，会原封不动的打包到dist文件夹里
src文件夹：
   assets：里面放置的也是一些静态资源（一般为多个组件公用的静态资源），需要注意的是，放在这里的静态资源，在webpack打包的时候，会把这个静态资源打包成一个模块，打包到js文件里面。
   components文件夹：一般放置的是路由组件（.vue文件）
   App.vue  唯一的根组件
   main.js 程序入口文件，整个程序最先执行的文件
babel.config.js:配置文件（babel相关）
package.json:依赖，运行配置
package-lock.json:依赖版本锁定

## 1.项目配置 ##
项目启动后浏览器自动打开
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  或者在vue.config.js里面添加新的配置：
  devServer:{
    host:'127.0.0.1',
    port:8081,
    open:true
  }

## 2.关闭eslint校验 ##
还是在vue.config.js里面
//关闭eslint校验
  lintOnSave:false,

## 3.配置@引用路径 @就代表src ##
{
    "compilerOptions": {
      "baseUrl": "./",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "exclude": ["node_modules", "dist"]   //这两个文件夹不能使用
  }

## 4.路由配置 ##
vue-router
所谓的key,value键值对
key:url（地址栏的路径） value:相对应的路由组件

创建router文件夹 来配置路由，最后需要回到入口文件去注册使用下
###  总结 ###
路由组件与非路由组件的区别：
路由组件一般放在pages/views文件夹里，出现的话需要写<router-view>,不需要引入，非路由组件放在components文件夹里，使用需要引入，标签的形式存在
注册完路由，不管非路由组件还是路由组件身上都会有$route,$router属性
我们可以通过$route来获取路由上面的信息，来做逻辑，路由上main可以配置一个meta，叫做路由元信息，是一个对象，里面可以写key，value
$route,$router属性区别：
$route:一般获取路由路径query，params等
$router一般用来进行编程式路由跳转（push/replace）
params传参要是用占位符：path:"/search/:searchDate",    //url的路径  '/search/'+this.keyword
query的话是由？来连接的+"?key="+参数

如果在传参的时候要用params的对象写法，不能写path属性，要写成name属性

分为声明式导航和路由式导航：
声明式导航：router-link
编程式导航：push/replace
声明式导航可以做的编程式都可，编程式导航可以做一些逻辑
使用声明式跳转的话，不能重复点击，会报错?解决方法：
先把VueRouter原型对象上的push保存一份，重写push，



# 大致 #
Home首页路由，search路由，login，refister注册

npm install --save less less-loader@5 //安装5版本的less

## 引入组件 ##
创建 引入 注册 使用
components 里面放置的是全局组件/菲路由组件
pages/views里面放置的是路由组件

## 全局组件 ##
在main.js配置，先引入，然后Vue.component(组件名字（组件自己的name属性），哪个组件)

## 引入默认样式reset.css在index.html ##
<!-- 引入清除磨人的样式 -->
<link rel="stylesheet" href="./reset.css">

## 5.axios ##
为什么进行axios的二次封装？
请求拦截器，相应拦截器：请求拦截器，可以在发请求之前处理一些问题，响应拦截器，在服务器返回数据之后，可以处理一些问题

接口一般放在src下面的api文件夹里面
接口当中：路径都带有/api        baseurl:"/api"

## 6.跨域 ##
协议，域名，端口号不同会出现跨域问题
http://127.0.0.1:8081/#/home    我的端口号
http://gmall-h5-api.atguigu.cn    后台服务器
需要配置代理服务器，服务器访问服务器不存在跨域问题
jsonp等等

## 7.nprogress加载进度条的使用 ##
npm install --save nprogress
先安装，在引入，还有样式也要引入，在接口请求之前start，之后done
进度条颜色可以修改


## 8.vuex的使用？ ##
他的数据是不持久化的
集中式管理项目数据的插件
关键词：state，mutations，actions，getters，modules
npm install --save vuex@3  vue2使用3版本的

在src下创建一个store文件夹,创建一个index.js来配置文件，引入使用暴露，在main。js里面注册下，然后vue实例上就会有store，
然后就是分模块开发，在store下面创建分别的文件夹，在里面单独暴露，再在总的index。js里面引入模块modules，在模块化的组建中
派发dispatch事件，在actions里面调节接口，在mutations里面把数据保存到vuex里面，再在组件里用mapstate解构使用

## 9.防抖和节流？ ##
防抖:规定时间内只执行最后一次,例子：搜索框：前面的所有触发都会被取消，只执行最后一次，
节流：规定时间内多次触发只执行一次，
lodash
// 这个就是按需引入   写法
import {throttle} from 'lodash'
// 节流
changeIndex:_.throttle(function(index){
    this.currentIndex=index
},500),

## 10.路由跳转？ ##
如果是多个的话，声明式导航性能不好，直接用编程式导航

因为有三级菜单，每个都要传递名字和id，利用事件委托和自定义事件
通过event.target.dataset属性判断是否含有自定义名字，补全路由跳转


在判断路由跳转路径的时候，可以判断路由路径做一些逻辑this.$route.path，比如说一个全局组件放在不同的地方使用的时候，会有不同的展示情况

## 11.过度动画？ ##
前提是组件必须使用了v-if/v-show
使用transition把使用了v-if/v-show的部分包裹着，然后给transition命名一个名字，要以名字为开头，开始写进入，结束的变化，以及所用时间

## 12.请求性能优化？ ##
当进行路由跳转的时候，组件会进行销毁，尤其是全局组件，会重复调用，这个时候可以把接口放在根组件里面，根组件只会调用一次

## 13.使用mockjs？ ##
npm install mockjs   安装
在src下建立mock文件夹
准备json数据（mock文件夹创建相对应所需要的json文件）记得格式化一下，有空格的话跑不起来
把所需要的图片放到public里面，{public打包的时候，会把图片原封不动的打包到dist文件夹里}
在mock文件夹里创建mockServe.js配置文件,通过配置文件实现模拟数据,api里面也要配置一个mockAjax文件，和axios的功能一样，改改名字
mockServe.js文件在入口文件中引入，（需要执行，才能使用)


## 14.轮播图？ ##
npm install --save swiper@5

第一步：引包
2.页面中的解构要有
3.2的前提下new swiper实例，给轮播图添加动态效果

一般情况下在组件挂载完毕后初始化轮播图的实例，但是这里涉及到dispatch请求数据为异步操作，在组件挂载完毕的时候数据可能还没请求回来，更不要说初始化swiper实例了，
这里可以加一个定时器来解决，最好的方法是用监听属性+nexttick，watch来判断数据请求完毕没有，数据请求完毕，nexttick来保证数据遍历完成，轮播图结构已经存在，就可以初始化swiper实例

nextTick:在下次dom更新循环结束之后，在执行延时回调，在修改数据之后，立即使用这个方法，获取更新后的dom'

利用父传子把参数传给子组件，轮播图并没有出现异步，所哟不用处理直接在mounted里面调用，和组件的生命周期相关，就是父组件渲染完毕，把数据给了子组件，然后在开始渲染子组件


## 15.拆分，封装全局组件？ ##
为了拆分组件，要让代码风格基本保持一致
放在公共组件里面，记得命名，在main.js里面配置好，记得引入，注册成全局组件
引入然后，ex：Vue.component(Carousel.name,Carousel)


记得以后如果看到某一个组建多个地方使用的话，可以封装成全局组件，注册一次，可以在多个地方重复使用，公用的组件放到comments文件夹下


##  16.getters?的使用？
简化获取state的数据，就是可以把多层的数据直接在getters里面return出来，可以在组件里面用maogetters直接使用
computed：{
  ...getters：["xxxx"]
}

为了避免没有网等的情况  记得加或者||[]  判断为空的时候的做法

## 17.在请求接口具有多个参数的时候，可以在beforemount之前整理要传的参数，
使用object.assign()来合并对象，貌似是后面的合并到前面

理解：当一个接口需要多次调用的时候，可以封装成一个函数，调用方便，然后当我们换要搜索的参数的时候，可以监听watch来
$route的变化，变化的话，就重新调用接口，要重新利用object.assign()获取参数，调用接口后，要清空搜索的值

搜索之后清空数据，改为underfind，默认会丢弃这个参数，提高性额能，axios里面自带的


## 18.面包屑？ ##
逻辑：展示条件，可以用v-if/show等，判断点击的是否有值，展示点击的值，删除之后清空参数，路由上的参数也要清空，可以自己跳自己，如果只清除一种参数，要判断下
还有没有其他烈类型的参数，if（this.$route.params）{如果params参数存在的话，跳转路由要记得带上params参数 this.$router.push（{name：search,params:this.$route.params}）}



## 19.全局事件总线？ ##
配置$bus
<!-- 全局事件总线配置，就是改变vm的原型指向 -->
beforeCreate(){
  Vue.prototype.$bus=this
}

通知事件
this.$bus.$emit('clear')


// 通过全局事件总线订阅事件
this.$bus.$on('clear',()=>{
    this.ttest()
})

###  props子传父  ###
先在子组件写自定义事件，@事件：事件名，在子组件内部调用this.$emit("事件名"，参数)
在父组件接收  事件名（参数）{打印参数试试}



## 20.阿里图标使用？ ##
先添加到自己的项目里面
在线使用先引入到index.html里面，生成在线代码
<link rel="stylesheet" href="https://at.alicdn.com/t/font_3390489_oldezjbkoj.css">
别忘记+https
使用：<span class="iconfont icon-long-arrow-up"></span>


## 21.排序？ ##
思路：点击不同的东西传不一样的值（唯一的标识），然后判断点击的哪个



## 22.默认滚动条事件？  ##
进入页面后滚动条在最开始的位置  
vue的默认滚动行为 x为横轴y为zhongzhou
scrollBehavior(to,from,savedPosition){
    return {y:0}
}
和routes平级


把路由配置放到专门放置路由的文件夹，routes，把路由放进去暴露为数组，引进路由的位置，原先的配置文件要引进这个专门的路由配置


## 23.sessionStorage?会话存储？不能直接存贮对象 ##
转化成json字符串在进行存贮


## 24.uuid？使用 ##
在请求之前先判断有没有token，有的话加到请求头上，没有的话要调用，
store里面的数据还可以写成 
  // 获取访客身份
uuid_token:getUuid()   这个样子，封装成一个函数，导入进来，这个函数就是从刚开始判断本地有没有uuid，没有的话获取并存储，有的话直接用
在配置里面引入store，也可以直接使用store里面的数据
// 如果临时身份存在的话，给请求头加上这个值，不过这个值得名字要和后端商量好
    if(store.state.detail.uuid_token){
        // console.log(store.state.detail.uuid_token);

    //     // userTempId:游客身份
        config.headers.userTempId=store.state.detail.uuid_token
    }


## 25.注册，登录？ ##
自己理解的数据存贮化，就是获取token的时候存储到本地或者网页，然后vuex里面的数据直接在本地或者网页拿，可以直接拿到。刷新并不会丢失
<!-- 如果单独分开的获取token的文件，记得return结果出来 -->

## 26.路由守卫？ ##
// to 可以获取到你要跳转的哪个路由信息           13700000000 111111
// from 获取从哪个路由来
// next()放行  next(path) 放行到哪个路径

<!-- 不能拿一个空对象来判断有没有，空的对象永远都是true -->


// 在没有登录的情况下，有些地方不能进去，要先判断去的路径是否不能去，如果不能去，跳转登录，
// 优化：在跳转登录之后，登录成功后应该返回之前你想要进去的页面，我们可以给他的路由上加参数,
// 参数是之前没有权限去的地方，登陆成功有了权限，就可以直接去，不过要先判断路由有没有参数，因为登录页默认的是登陆成功跳转到home，需要在登录页
// 判断一下有没有路由参数，有的话就跳转路由参数，没有的话，就默认跳转home

# 路由独享守卫 #
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
# 组件独享守卫 了解 #


## 27.默认选中？ ##
比如数组，遍历让其中每一个key的值为0，然后点击的那个为1，默认为一的那个是选中的

## 28.全局引入接口？ ##
import * as API from '@/api'
console.log(API);
beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },

## 29.在组件里调用？ ##
切记最好不要在生命周期里面写async，await等等
封装成函数，在生命周期里面调用

## 30.按需加载饿了吗ui？ ##


先  npm install babel-plugin-component -D
然后修改babel.config.js  看文档把

icon图标可以直接写进去
在组件里面引入想用的
ex：import { Button, Select } from 'element-ui';


## 31.长短轮询问？ ##
短轮询  响应一次完事
长轮询  间隔固定时间一直请求   定时器

## 32.二级路由？ ##
写在一级路由下面，跳转的时候一定要记得加上负极路由的名字，
要记得写占位符<router-view>,二级路由也要有重定向

## 33.图片懒加载 ##
利用插件vue-lazyload
npm i vue-lazyload -S
main.js配置
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

## 34.路由懒加载？ ##
不同路由分成不同的代码块，路由被访问时才加载对应的组件，提高性能
就是把路由封装一个函数，在访问对应路由的时候访问这个函数，这个函数返回的就是对应的路由

// 引入路由组件
// import Home from '@/pages/Home'
// const Home=()=>{
//     console.log(1454545);
//     return import('@/pages/Home')
// }
// const Home=()=>import('@/pages/Home')
最终
{
    path:"/home",    //url的路径 PaySuccess
    component:()=>import('@/pages/Home'),   //组件
    meta:{show:true}, //路由元信息，可以自己定义一些参数
}

## 35.打包？ ##
项目打包后，都是经过加密的，如果运行时报错，会不知道是哪里报错，
但是有了map之后，就可以像未加密的文件一样，准确的输出哪里报错
但是map打包后的文件很大，可以手动去掉
vue.config.js配置

## 36.event点击事件？ ##
组件上添加点击事件必须加@click.native，才是原生点击事件，不加的话会默认为是自定义事件
，点击组件的任意部分都会触发，所以原理就是利用了事件委托


就是在组件上不能用@click  必须加native 否则的话就是自定义事件

## 37.v-model的通信？sync修饰符 ##
v-model原理是
：value和@input

sync:修饰符
<组件 :tran.sync='tran' /> //参数是
组件里可以直接接收到tran
还可以接收到自定义事件@click="emit(update:tran,参数)"

就是可以直接传递参数还有一个自定义事件

## 38.$attrs,$listerns的用法？ ##
比如封装一个带有提示的按钮，可以把按钮用a标签包裹下，利用title的属性
$attrs可以监听传递过来的参数，如果使用props的话，attrs就不能监听到，使用v-bind可以接受所有的参数，不能使用引号
ex：<HitButton type="primary" icon="el-icon-plus" size="mini" title="测试ssss"></HitButton>

$listeners可以监听传递过来的方法，v-on不能简写，不能使用：
<a :title="title">  
       <el-button v-bind="$attrs" v-on="$listeners">测试</el-button>
</a>

## 39.插槽？ ##
可以实现父子组建通信（通信的解构）
默认插槽，作用域插槽，具名插槽


<!-- 父传子，子组件再回传item给父组件,在在父组件修改想用的解构
        <slot :todo="item"></slot>    子组件
        子组件决定不了外观和结构
        <template v-slot="todo">      父组件
          <span :style="{color:todo.todo.isflag?'green':'red'}">{{todo.todo.text}}</span>
        </template>
 -->










