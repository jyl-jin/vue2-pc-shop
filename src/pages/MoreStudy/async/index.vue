<template>
  <div>
      <h1>小明爸爸有{{money}}元</h1>
      <sync :money.sync="money" />
      <!-- 修饰符相当于把money传过去，而且还传过去了一个自定义事件update:money -->
  </div>
</template>

<script>
import sync from './sync/sync.vue'
export default {
    components:{sync},
    data(){
        return{
            money:10000,
        }
    }

}
</script>

<style>

</style>