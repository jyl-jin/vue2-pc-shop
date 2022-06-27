<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'" /> -->
    <Footer v-show="$route.meta.show" />

  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
},
created(){
  console.log(this.$route.meta);
},
mounted(){
  //   通知vuex获取数据
      this.$store.dispatch('categoryList')
}

}
</script>

<style>
#app {
  
}
</style>
