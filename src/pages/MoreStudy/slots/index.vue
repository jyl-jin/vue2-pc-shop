<template>
  <div>
      <h1>显示todo列表时，已经完成的是绿色</h1>
      <!-- 子组件 -->
      <slotSon :todos="todos">
        <!-- 子组件决定不了外观和结构 -->
        <template v-slot="todo">
          <span :style="{color:todo.todo.isflag?'green':'red'}">{{todo.todo.text}}</span>
        </template>
      </slotSon>


      <h1>显示todo列表时，带序号颜色位蓝绿搭配</h1>
      <slotDou :todos="todos">
        <template v-slot="{dou,ind}">
          <h1 :style="{color:dou.isflag?'green':'red'}">{{dou.text}}---{{ind}}</h1>
        </template>
      </slotDou>
  </div>
</template>
最新动态 PRIME ACCESS 版本说明
<script>
import slotSon from './slotSon'
import slotDou from './slotDou'

export default {
components:{slotSon,slotDou},
  data(){
    return{
      todos:[
        {id:1,text:'AAA',isflag:false},
        {id:2,text:'BBB',isflag:true},
        {id:3,text:'CCC',isflag:false},
        {id:4,text:'DDD',isflag:false}
      ]
    }
  }

}
</script>

<style>

</style>