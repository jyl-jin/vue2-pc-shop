<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floorlist.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(liName, index) in floorlist.navList"
              :key="index"
            >
              <a href="#tab1" data-toggle="tab">{{ liName.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul
                class="jd-list"
                v-for="(keywords, index) in floorlist.keywords"
                :key="index"
              >
                <li>{{ keywords }}</li>
              </ul>
              <img :src="floorlist.bigImg" />
            </div>
            <div class="floorBanner">
              <Carousel :list="floorlist.carouselList" />

              <!-- <div class="swiper-container" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="img in floorlist.carouselList"
                    :key="img.id"
                  >
                    <img :src="img.imgUrl" />
                  </div>
                </div>
                如果需要分页器
                <div class="swiper-pagination"></div>

                如果需要导航按钮
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floorlist.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['floorlist'],
  data(){
      return{

      }
  },
  mounted(){
    
  },
  //   watch: {
  //   //   现在是通过watch来监听banerlist里面是否有数据，但不能保证v-for已经循环结束了。v-for循环结束，才有结构，才可以进行轮播图实例化
  //   //  nextTick  就是在dom更新循环结束之后  延时执行的回调
  //   // 初始化swiper实例
  //   floorlist: {
  //     immediate:true,
  //     // 立即监听，因为数据是父组件传过来的，watch是监听不到他的变化的，所以要立即监听
  //     handler(newValue, oldValue) {
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(
  //          this.$refs.mySwiper,
  //           {
  //             loop: true,
  //             // 自动循环 
  //             autoplay:true,//等同于以下设置
  //             // 如果需要分页器
  //             pagination: {
  //               el: ".swiper-pagination",
  //               // 点击小球跳转
  //               clickable: true,
  //             },
  //             // 如果需要前进后退按钮’
  //             navigation: {
  //               nextEl: ".swiper-button-next",
  //               prevEl: ".swiper-button-prev",
  //             },
  //           }
  //         );
  //       });
  //     },
  //   },
  // },
  //  watch: {
  //   //   现在是通过watch来监听banerlist里面是否有数据，但不能保证v-for已经循环结束了。v-for循环结束，才有结构，才可以进行轮播图实例化
  //   //  nextTick  就是在dom更新循环结束之后  延时执行的回调
  //   // 初始化swiper实例
  //   floorlist: {
  //     handler(newValue, oldValue) {
  //       this.$nextTick(() => {
         
  //       });
  //     },
  //   },
  // },
}
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              // padding: 15px 0;
              // overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>