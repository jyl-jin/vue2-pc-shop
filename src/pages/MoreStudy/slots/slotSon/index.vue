<template>
  <div>
    <ul>
      <li v-for="item in todos" :key="item.id">
      <!-- 作用域插槽 子组件回传item给父组件-->
        <slot :todo="item"></slot>  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'slotSon',
  props:{todos:Array},
  data(){
    return{}
  },
  mounted(){
    console.log(this.props);
  }
    

}
</script>

<style>

</style>