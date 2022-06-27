<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="img in list"
        :key="img.id"
      >
        <img :src="img.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:'Carousel',
    props:['list'],
      watch: {
    //   现在是通过watch来监听banerlist里面是否有数据，但不能保证v-for已经循环结束了。v-for循环结束，才有结构，才可以进行轮播图实例化
    //  nextTick  就是在dom更新循环结束之后  延时执行的回调
    // 初始化swiper实例
    list: {
      immediate: true,
      // 立即监听，因为数据是父组件传过来的，watch是监听不到他的变化的，所以要立即监听
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            // 自动循环
            autoplay: true, //等同于以下设置
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球跳转
              clickable: true,
            },
            // 如果需要前进后退按钮’
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>