<template>
  <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList" v-if="!islogin">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link class="register" to="/regsiter">免费注册</router-link>
                        </p>
                    </div>
                    <!--  -->
                    <div class="loginList" v-if="islogin">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>{{islogin}}</span> |
                            <span @click="clearToken">退出登录</span>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myOrder">我的订单</router-link>
                        <router-link to="/ShopCart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/home" class="logo">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" v-model="keyword" id="autocomplete" class="input-error input-xxlarge" />
                        <!-- <router-link to="search"> -->
                            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                        <!-- </router-link> -->
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'',
    data(){
        return{
            keyword:'',
        }
    },
    mounted(){
        // 通过全局事件总线订阅事件
        this.$bus.$on('clear',()=>{
            this.ttest()
        })
    },
    computed:{
        islogin(){
            return this.$store.state.users.userInfo.name
        }
    },
    methods:{
        ttest(){
            this.keyword=''
        },
        // 收缩的回调函数
        goSearch(){
            //第一种：字符串形式
            // this.$router.push('/search/'+this.keyword)
            // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
            // 第二种模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种最常用的对象写法
            // this.$router.push({name:"search",params:{searchDate:this.keyword},query:{k:this.keyword.toUpperCase()}})
            // 使用params的对象方法传参的话，如果只写了占位符没有传递参数，但是想要params参数可传可不传，可以在占位符后面+一个?,不加的话，url会出问题
            // this.$router.push({name:"search",query:{k:this.keyword.toUpperCase()}})
            // 使用params并且可传可不传，传递的是空字符串，url会出现问题，解决问题+或者underfind？
            // ,query:{k:this.keyword.toUpperCase()}
            // 合并参数
            if(this.$route.query){
                let location={name:"search",params:{keyword:this.keyword || undefined}}
                location.query=this.$route.query
                this.$router.push(location)
            }
            // this.$router.push({name:"search",params:{searchDate:this.keyword}})
            // 路由传参使用props，在路由里面配置props：true，只针对params，和组件传参使用props一样，需要在props里面声明一下，
            // 可以直接把props写成对象模式props:[a:1,b:2]
            // 最常用的是props的函数写法：ex:props(($route)=>{
                // return  {keyword:$route.keyword}   把路由上的参数当做props传过去  好处可以直接写，不用再$route.啥的
            // })

        },
        // 退出
        async clearToken(){
            try {
                await this.$store.dispatch('goLoginOut')      
                this.$router.push('/home') 
            } catch (error) {
                alert(error.message)
            }
             
        }
    }
}
</script>

<style lang="less">
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>