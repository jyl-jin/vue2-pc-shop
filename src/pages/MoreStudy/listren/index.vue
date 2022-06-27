<template>
  <div>
    <HitButton type="primary" icon="el-icon-plus" size="mini" title="测试ssss" @click="leo"></HitButton>
  </div>
</template>

<script>
import HitButton from './hitButton/index.vue'
export default {
  components:{HitButton},
  methods:{
    leo(){
      alert(666)
    }
  }
}
</script>

<style>

</style>