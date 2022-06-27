<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(item, index) in dataList" :key="index">
        <ul class="cart-list">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="upChange(item.skuId,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type='number'
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', +1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="delOne(item.skuId)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @click="allCheck"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ subPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')" >结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {throttle} from 'lodash'
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(["cartList"]),
    dataList() {
      return this.cartList.cartInfoList || [];
    },
    // 总价
    subPrice() {
      let sum = 0;
      this.dataList.map((item) => [(sum += item.skuNum * item.cartPrice)]);
      return sum;
    },
    // 全选
    allChecked() {
      return this.dataList.every((item) => item.isChecked == 1) && this.dataList.length;
    },
  },
  methods: {
    getData(){
      this.$store.dispatch("getShopCartList");
    },
    // 修改个数
    // Input 传递的是最终的数字
    //
    // _.throttle(function(index){
    //       this.currentIndex=index
      
     handler:throttle(async function(type, disnum, cart) {
      console.log("派发的事件", type, disnum, cart);
      switch (type) {
        case "add":
          disnum = 1;
          break;
        case "minus":
          // 判断产品的数量是否大于1，如果大于1的话，可以给-1，如果小于等于1，就给0
          disnum=cart.skuNum>1?-1:0
          break;
          // 用户输入的最终数据，判断是否为数字，如果不为数字或者小于0，让disnum=0
          case 'change':
            if(isNaN(disnum)|| disnum<1){
              disnum=0
            }else(
              disnum=parseInt(disnum)-cart.skuNum
            )
      }
      // 派发事件
      try {
        await this.$store.dispatch("getCarData", {
          skuId: cart.skuId,
          skuNum: disnum,
        });
        this.getData()
      } catch (error) {
        alert(error.message);
      }
    },1000),
    // 删除数据
    async delOne(skuId){
      console.log(skuId);
      try {
        await this.$store.dispatch('deleteOne',skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 切换选中状态
    async upChange(skuId,event){
      try {
        // console.log(event.target.checked);
      // 传递过去的参数，真的时候为选中1，假的为没选中0
      let isChecked=event.target.checked?1:0
      // key   value  一样可以省略
      await this.$store.dispatch('updateCheck',{skuId,isChecked})
      this.getData()
      } catch (error) {
         alert(error.message)
      }
      
    },
    // 删除选中的对个
    async deleteAll(){
      try {
        await this.$store.dispatch('deleteAllCheck')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
    },
    // 点击 全选
    async allCheck(event){
      try {
        let isChecked=event.target.checked?1:0
        await this.$store.dispatch('allCheck',isChecked)
        this.getData()

      } catch (error) {
         alert(error.message)
      }
      
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>