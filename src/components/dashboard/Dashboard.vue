<template>
  <div class="app-dashboard">
    <div class="app-dashboard-left">
      <!-- 菜单写这里 -->
    </div>
    <div class="app-dashboard-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.app-dashboard {
  background: #fff;
  height: 100%;
}
//修改默认滚动条
*::-webkit-scrollbar {
    width: 10px;    
    /*height: 4px;*/
}
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
*::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.app-dashboard-left {
  background: #353D44;
  width: 188px;
  height: 100%;
  float: left;
}
.app-dashboard-right {
  width: calc(100% - 188px);
  height: 100%;
  background: #F2F2F2;
  float: left;
}
</style>