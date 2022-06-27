const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave:false,


  // 关闭map
  productionSourceMap:false,
  // 代理跨域
  

  // 自动打开浏览器
  devServer:{
    host:'127.0.0.1',
    port:8081,
    open:true,
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {"^/api" : ""}
      }
    },
  },
})
