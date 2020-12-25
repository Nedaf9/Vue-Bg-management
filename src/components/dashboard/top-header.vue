<template>
    <!-- 头部面包屑开始 -->
    <el-breadcrumb class="myadmin-project-header">
      <el-breadcrumb-item :to="{path:'/'}">
        <i class="el-icon-house"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>计划任务</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {

};
</script>

<style lang='less' scoped>
.myadmin-project-header {
  height: 50px;
  background-color: #fff;
  padding-left: 10px;
  span {
    line-height: 50px;
    font-size: 16px;
  }
}
</style>