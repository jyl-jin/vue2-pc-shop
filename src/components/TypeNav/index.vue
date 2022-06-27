<template>
  <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <!-- 利用事件委派 搞一个新的div把他们抱起来，事件加到上面 -->
                <div @mouseleave="leaveIndex">
                    <h2 class="all" @mouseenter="entershow">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="show">
                            <div class="all-sort-list2" @click="goSearch">
                                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                                    <h3 @mouseenter="changeIndex(index)"  :class="{cur:index==currentIndex}">
                                        <a href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    </h3>
                                    <div class="item-list clearfix" :style="{display:index==currentIndex?'block':'none'}">
                                        <div class="subitem">
                                            <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                                <dt>
                                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                </dt>
                                                <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <em>
                                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                    <a @click="goTest">测试</a>
                    <router-link to="/moreStudy">面试题学习</router-link>
                </nav>
                
            </div>
        </div>
</template>

<script>
import { mapState } from "vuex"
// 全部引入  最好是按需引入
// import _ from 'lodash'
// 这个就是按需引入
import {throttle} from 'lodash'
export default {
  name:'TypeNav',
  data(){
      return{
          currentIndex:-1,
          show:true
      }
  },
//   当组件挂载完毕，向服务器发送请求，把数据存到vuex里面
  mounted(){
    
    //   在search模块里面默认是不出现的，判断一下当前的路由是不是search是的话就隐藏  
    if(this.$route.path!='/home'){
        this.show=false
    }
    // console.log(this.$route.path);
  },
  computed:{
    //   这里vuex已经有了数据  数据多了修改all-sort-list2，加 return state.categoryList.slice(0, 16)
      ...mapState({
        //   箭头函数如果只有一个参数，可以省略括号
          categoryList:(state)=>{
              return state.home.categoryList.slice(0,16)
          }
      })
  },
  methods:{
      goTest(){
          this.$router.push('/test')
      },
    // 节流
      changeIndex:_.throttle(function(index){
          this.currentIndex=index
      },50),
      leaveIndex(){
          this.currentIndex=-1
        //   判断在那个路径下使用这个全局组件，是否显示出来
          if(this.$route.path!='/home'){
            this.show=false
          }
      },
      goSearch(event){
        //   先区分是不是a标签，再区分是几级标签
        //  利用自定义属性来判断是不是a标签和几级标签
        let element=event.target
        console.log(element.dataset);
        // 解构
        let {categoryname,category1id,category2id,category3id}=element.dataset

        if(categoryname){
            // 确定是a标签，在确定是几级标签
            // 整理路由跳转参数
            let location={name:'search'}
            let query={categoryName:categoryname}
            if(category1id){
                query.category1Id=category1id
            }else if(category2id){
                query.category2Id=category2id
            }else{
                query.category3Id=category3id
            }
            // console.log(location,query);
            if(this.$route.params){
            }
            location.params=this.$route.params

            location.query=query
            console.log(location.params);
            this.$router.push(location)
        }
      },
    //   判断在那个路径下使用这个全局组件，是否显示出来
      entershow(){
          if(this.$route.path!='/home'){
            this.show=true
          }
      },
  }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    height: 450px; 
                    overflow: hidden;
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        .cur{
                            background: #e1251b;
                        }
                        // &:hover{
                        //     background: red;
                        // }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                // display: block;
                            }
                        }
                    }
                }
            }
            // 过度动画的样式
            // 开始进去
            .sort-enter{
                height: 0px;
            }
            // 动画过度结束
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画时间sulv
            .sort-enter-active{
                transition: all 3s linear;
            }

        }
    }
</style>