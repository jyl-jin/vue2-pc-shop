<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" @click="choose(index)" :class="{accc:index==curr}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    data(){
      return{
        curr:'0'
      }
    },
    mounted(){
    },
    watch:{
      // 监听数据，保证数据一定ok，但是不能保证v-for是否完成，是否有解构
      skuImageList(newValue,oldValue){
        this.$nextTick(()=>{
           new Swiper(this.$refs.mySwiper, {
            // loop: true,
            // 自动循环
            // autoplay: true, //等同于以下设置
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮’
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 显示几个图片
            slidesPerView:3,
          });
        })

      }
    },
    methods:{
      choose(index){
        this.curr=index
        this.$bus.$emit('getChooseIndex',index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;
    
    .swiper-slide {
      width: 56px;
      height: 56px;
      .accc{
      border: 2px solid;
      }
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>