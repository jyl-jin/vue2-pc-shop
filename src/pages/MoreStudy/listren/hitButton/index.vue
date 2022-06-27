<template>
  <div>
      <a :title="title">
        <el-button v-bind="$attrs" v-on="$listeners">测试</el-button>
      </a>
  </div>
</template>

<script>
export default {
    props:['title'],
    mounted(){
        console.log(this.$attrs);
        console.log(this.$listeners);
    }

}
</script>

<style>

</style>