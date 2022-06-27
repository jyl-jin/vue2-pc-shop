<template>
  <div>
      <div class="hea">
        <router-link to="/moreStudy/event"><h1>event</h1></router-link>
        <router-link to="/moreStudy/model"><h1>model</h1></router-link>
        <router-link to="/moreStudy/listren"><h1>listren</h1></router-link>
        <router-link to="/moreStudy/async"><h1>async</h1></router-link>
        <router-link to="/moreStudy/childrenParent"><h1>childrenParent</h1></router-link>
        <router-link to="/moreStudy/slots"><h1>slots</h1></router-link>

      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:"moreStudy",
    data(){
        return{}
    },
    mounted(){},
    methods:{

    }
}
</script>

<style lang="less">
    .hea{
        height: 30px;
        width: 100%;
        text-align: center;
        h1{
            display: inline-block;
            margin: 0 20px;
        }
    }
</style>
