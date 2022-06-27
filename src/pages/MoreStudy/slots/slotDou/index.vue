<template>
  <div>
    <ul>
      <li v-for="(item,index) in todos" :key="item.id">
      <!-- 再次给父组件传过去， -->
        <slot :dou="item" :ind="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    todos:Array
  }

}
</script>

<style>

</style>