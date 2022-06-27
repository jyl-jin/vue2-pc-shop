<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="floor in floorList" :key="floor.id" :floorlist='floor' />
      <!-- props父传子传递参数的时候 属性名就去传过去要写的名字，值就是传过去的数据，传过去以数组的方式接受，别忘记带引号 -->
      <Brand/>

<!-- <button @click="add">点击仓库+1</button>
<span>仓库的数字：{{count}}</span>
<button @click="jian">点击仓库-1</button> -->


  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'

export default {
  data(){
    return{

    }
  },
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    this.$store.dispatch('getFloorList')
    // 获取用户信息
    this.$store.dispatch('getUserData')
    this.say()
   
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  },
  methods:{
    say(){
      console.log(name) 
      console.log(age)
      var name='json'
      let age=22
      }
  //   add(){
  //     // dispatch派发actions事件
  //     this.$store.dispatch('add',33)
  //   },
  //   jian(){
  //     this.$store.dispatch("jian")
  // }
  }
}
</script>

<style>

</style>