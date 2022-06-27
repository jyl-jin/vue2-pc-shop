<template>
  <div>
      <input type="text" v-model="msg"/>
      <h1>{{msg}}}</h1>
      <hr>
      <br>
      <h3>v-model原理（v2）</h3>
      <input type="text" :value="msg" @input="value=$event.target.value"/>
      <h1>{{msg}}</h1>

      <modelOne :value='msg' />
  </div>
</template>

<script>
import modelOne from './modelOne/index.vue'
export default {
components:{modelOne},
  data(){
    return{
      msg:'我爱你，你爱谁',
      asdss:'我想吃火锅，阿西吧'

    }
  }

}
</script>

<style>

</style>