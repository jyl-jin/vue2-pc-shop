<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread" >
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchparams.categoryName">{{searchparams.categoryName}}<i @click="remove">×</i></li>
            <li class="with-x" v-show="searchparams.keyword">{{searchparams.keyword}}<i @click="removekeyword">×</i></li>
            <li class="with-x" v-show="searchparams.trademark">{{searchparams.trademark.split(':')[1]}}<i @click="removetrademark">×</i></li>
            <!-- 属性 -->
            <li class="with-x" v-for="(item,index) in searchparams.props" :key="index">{{item.split(':')[2]}}<i @click="removeattrs(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkData" @attrsInfo="attrsData"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActiveOne}" @click="changeOrder('1')">
                  <a >综合<span v-show="isActiveOne" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
                <li :class="{active:isActiveTwo}" @click="changeOrder('2')">
                  <a >销量<span v-show="isActiveTwo" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list" >
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id" @click="goDetail(goods.id)">
                <div class="list-wrap">
                  <div class="p-img">
                    <a><img v-lazy="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="goods.title">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination :pageNo="searchparams.pageNo" :pageSize="searchparams.pageSize" :total="total"  :continues="5" @getPageNo='getPageName'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters ,mapState} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return {
        searchparams:{
          // "category3Id": "",
          // "categoryName": "",
          "keyword": "",
          // 排序  初始值应该是zonghe/降序
          "order": "1:desc",
          "pageNo": 1,
          "pageSize": 5,
          "props": [],
          "trademark": ""
        }
      }
    },
    components: {
      SearchSelector
    },
    beforeMount(){
      Object.assign(this.searchparams,this.$route.query,this.$route.params)
      // console.log(this.searchparams,"初次");
    },
    mounted(){
      this.getData()
      // console.log(this.searchparams.order.indexOf(1)!=-1);
      
    },
    watch:{
      // 监听route的值得变化，若route参数有变化，就重新掉借口
      $route(newValue,oldValue){
        // 还要重新整理参数
        // 监听不到局开启深度监听
        // console.log("route变化了");
        // console.log(this.$route.query);
        // console.log(this.$route.params);
        Object.assign(this.searchparams,this.$route.query,this.$route.params)
        console.log(this.searchparams,"再次");
        this.getData()
        this.searchparams.category1Id=''
        this.searchparams.category2Id=''
        this.searchparams.category3Id=''
      }
    },
    computed:{
      ...mapGetters(['goodsList']),
      isActiveOne(){
        return this.searchparams.order.indexOf(1)!=-1
      },
      isActiveTwo(){
        return this.searchparams.order.indexOf(2)!=-1
      },
      isDesc(){
        return this.searchparams.order.indexOf("desc")!=-1
      },
      isAsc(){
        return this.searchparams.order.indexOf("asc")!=-1
      },
      ...mapState({
        total:state=>state.search.searchList.total
      })

    },
    methods:{
      // xi详情
      goDetail(idss){
        this.$router.push(`/detail/${idss}`)
        console.log(idss);
      },
      // 点击广告牌
      trademarkData(trademark){
        console.log(trademark,"广告牌的数据");
        this.searchparams.trademark=`${trademark.tmId}:${trademark.tmName}`
         this.getData()
      },
      // 把搜索接口封装成一个函数随时都可以调用
      // 向服务器发起请求获取search模块数据
     getData(){
       // 派发actions事件

      this.$store.dispatch('getSearchList',this.searchparams)
     } ,
     remove(){
       this.searchparams.categoryName=''
       this.searchparams.category1Id=''
        this.searchparams.category2Id=''
        this.searchparams.category3Id=''
       console.log(this.searchparams);
       this.getData()
      //  参数清空（指的是querry参数）后，params参数还是要保留的  地址栏也要清空 可以自己跳自己
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }
     },
     removekeyword(){
       this.searchparams.keyword=''
       this.getData()
       if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query})
      }
      //通知事件
      this.$bus.$emit('clear')
     },
    //  移除广告牌
     removetrademark(){
       this.searchparams.trademark=''
       this.getData()

     },
    // 选择属性
    attrsData(attrs,itww){
      console.log(attrs,itww);
      let props=`${attrs.attrId}:${attrs.attrName}:${itww}`
      // 去重，如果searchparams.props里面没有props就=-1，就可以放进去
      if(this.searchparams.props.indexOf(props)==-1){
        this.searchparams.props.push(props)
      }
      console.log(this.searchparams.props);
      this.getData()
    },
    // 删除属性
    removeattrs(index){
      this.searchparams.props.splice(index,1)
      this.getData()
    },
    // 改变order
    changeOrder(flag){
      // console.log(this.searchparams.order);
      let numflag=this.searchparams.order.split(':')[0]
      let str=this.searchparams.order.split(':')[1]
      let newOrder=''

      if(flag==numflag){
        newOrder=`${numflag}:${str=='desc'?'asc':'desc'}`
        this.searchparams.order=newOrder
        this.getData()
      }else{
        newOrder=`${flag}:${'desc'}`
        this.searchparams.order=newOrder
        this.getData()
      }
      
    },
    // 整理分页
    getPageName(getPage){
      this.searchparams.pageNo=getPage
      this.getData()
    }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          // float: right;
          margin: auto;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>