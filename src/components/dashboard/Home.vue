<template>
  <div class="app-home">
    <div class="app-home-header">
      <div class="header-left">
        <div class="userName">a</div>
        <div class="systemType">s</div>
        <div class="runTime">d</div>
      </div>
      <div class="header-right">
        <div class="versions">
          <div class="versions-left">
            <span class="specialty">专业版</span>
            <span class="gratis">免费版</span>
          </div>
          <div class="versions-right"><span>6.9.0</span></div>
        </div>
        <a href="javascript:;">更新</a>
        <a href="javascript:;">修复</a>
        <a href="javascript:;">重启</a>
      </div>
    </div>
    <div class="app-home-body">
      <h1>哈哈哈</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
  
}
</script>

<style lang="less" scoped>
.app-home{
  width: 100%;
  padding: 0 15px;

  .app-home-header{
    height: 52px;
    width: 100%;
    margin: 15px 0;
    background: #fff;
    font-size: 12px;
    padding: 0 15px;
    line-height: 52px;


    .header-left {
      float: left;

      >div{
        float: left;
        margin-right: 20px;
      }
    }

    .header-right {
      float: right;

      >div,a{
          float: left;
          margin-right: 15px;

        >div{
          float: left;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>