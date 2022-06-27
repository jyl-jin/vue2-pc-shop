<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)" :class="{active:pageNo==1}">上一页</button>
    <button @click="$emit('getPageNo',pageNo-1)">1</button>
    <button v-if="starNumAndendNum.start>2">···</button>
    <!-- 中间部分 -->
    <button v-for="(page,index) in starNumAndendNum.end" :key="index" @click="$emit('getPageNo',page)" v-if="page>=starNumAndendNum.start" :class="{active:pageNo==page}">{{page}}</button>
    
    <button v-if="starNumAndendNum.end<totalPage-1">···</button>
    <button v-if="starNumAndendNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
<script>
export default {
  name:'Pagination',
  props:['pageNo','pageSize','total','continues'],
  // pageNo:当前第几页数
  // pageSize：每页多少个
  // total：总共多少页
  // continues：代表分页连续页码个数
  data(){
    return{

    }
  },
  computed:{
    // 总共多少项
    totalPage(){
      // 向上取整
      return Math.ceil(this.total/this.pageSize)
    },
    // 计算出来连续的页码开始和结束的数字（连续的页码数，至少是5）
    starNumAndendNum(){
      // 解构下
      const {totalPage,pageNo,continues} =this
      // 先定义俩变量用来存储开始与结束的数据
      let start=0,end=0
      // 不正常情况下，页码数没有连续页码数多
      if(continues>totalPage){
        start=1,end=totalPage
      }else{
        // 正常情况下，页码数没有连续页码数多
        start=pageNo-parseInt(continues/2)
        end=pageNo+parseInt(continues/2)
        // 还会出现不正常的现象，start为负数
        if(start<1){
          start=1,
          end=continues
        }
        // end数大于总页码
        if(end>totalPage){
          end=totalPage
          start=totalPage-continues+1

        }
      }
      return {start,end}
    }


  }

}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>