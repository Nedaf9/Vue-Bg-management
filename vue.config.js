module.exports = {
     lintOnSave: false,
     productionSourceMap:false, // 关闭源码映射
      publicPath: "./",  //默认 修改成相对路径 ./

     devServer: {
      open: true,
      port: 8080,
      proxy: { //实现跨域
          '/api': {
              target: 'http://127.0.0.1:8888/',  // target host
              ws: true,  // proxy websockets 
              changeOrigin: true,  // needed for virtual hosted sites
              pathRewrite: {
                  '^/api': ''  // rewrite path
              }
          },
      },

      
  }  

}