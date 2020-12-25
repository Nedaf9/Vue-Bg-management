<template>
  <div class="myadmin-set">
      <!-- 头部开始 -->
          <el-breadcrumb class="myadmin-set-title">
            <el-breadcrumb-item :to="{path:'/'}">
                <i class="el-icon-house"></i>首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>面板设置</el-breadcrumb-item>
          </el-breadcrumb>
      <!-- 头部结束 -->
      <!-- 关闭面板开始 -->
      <div class="myadmin-set-content">
          <el-switch
            style='width:200px'
            v-model='value1'
            active-color="#13ce66"
            inactive-text="关闭面板"
          ></el-switch>
          <el-switch
            style='width:200px'
            v-model='value2'
            active-color="#13ce66"
            inactive-text="API接口"
          ></el-switch>
          <el-switch
            style='width:200px'
            v-model='value3'
            active-color="#13ce66"
            inactive-text="Google身份认证"
          ></el-switch>
          <el-switch
            style='width:200px'
            v-model='value4'
            active-color="#13ce66"
            inactive-text="活动推荐"
          ></el-switch>
      </div>
      <!-- 关闭面板结束 -->
      <!-- 设置开始 -->
      <div class="myadmin-set-footer">
          <div class="set-footer-title">设置</div>
          <div class="set-footer-content">
              <div class="warning">
                  <i class="el-icon-warning" style="color:rgb(243,156,18)"></i>为了提高安全，请修改别名、默认端口、面板用户和密码!
              </div>
              <el-form :model="form" ref="form" label-width="120px" class="set-form">
                  <el-form-item label="别名">
                      <el-input v-model="form.alias" style="width:389px;margin-right:20px"></el-input>
                      <span>给面板取个别名</span>
                  </el-form-item>
                  <el-form-item label="面板端口">
                      <el-input v-model="form.port" style="width:389px;margin-right:20px;" disabled></el-input>
                      <span>建议端口范围8888 - 65535，<span style='color:red'>注意：有安全组的服务器请提前在安全组放行新端口</span></span>
                  </el-form-item>
                  <el-form-item label="安全入口">
                      <el-input v-model="form.entrance" style="width:389px;margin-right:20px;"></el-input>
                      <span>面板管理入口,设置后只能通过指定安全入口登录面板,如: /www_bt_cn</span>
                  </el-form-item>
                  <el-form-item label="BasicAuth认证">
                      <el-input v-model="form.authentication" style="width:389px;margin-right:20px;" disabled></el-input>
                      <span>为面板增加一道基于BasicAuth的认证服务，有效防止面板被扫消息通道</span>
                  </el-form-item>
                  <el-form-item label="域名">
                      <el-input v-model="form.hostName" style="width:389px;margin-right:20px;"></el-input>
                      <span>为面板绑定一个访问域名;注意：一旦绑定域名,只能通过域名访问面板!</span>
                  </el-form-item>
                  <el-form-item label="授权IP">
                      <el-input v-model="form.authorization" style="width:389px;margin-right:20px;"></el-input>
                      <span>设置访问授权IP,多个请使用逗号(,)隔开;注意：一旦设置授权IP,只有指定IP的电脑能访问面板!</span>
                  </el-form-item>
                  <el-form-item label="默认建站目录">
                      <el-input v-model="form.defaultSite" style="width:389px;margin-right:20px;"></el-input>
                      <span>新创建的站点,默认将保存到该目录的下级目录!</span>
                  </el-form-item>
                  <el-form-item label="默认备份目录">
                      <el-input v-model="form.defaultBackups" style="width:389px;margin-right:20px;"></el-input>
                      <span>网站和数据库的备份目录!</span>
                  </el-form-item>
                  <el-form-item label="服务器IP">
                      <el-input v-model="form.serverIP" style="width:389px;margin-right:20px;"></el-input>
                      <span>默认为外网IP,若您在本地虚拟机测试,请填写虚拟机内网IP!!</span>
                  </el-form-item>
                  <el-form-item label="服务器时间">
                      <el-input v-model="form.serverTime" style="width:389px;margin-right:20px;" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="面板用户">
                      <el-input v-model="form.user" style="width:389px;margin-right:20px;" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="面板密码">
                      <el-input v-model="form.password" style="width:389px;margin-right:20px;" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="绑定宝塔账号">
                      <el-input v-model="form.binding" style="width:389px;margin-right:20px;" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="微信小程序">
                      <el-input v-model="form.program" style="width:389px;margin-right:20px;" disabled></el-input>
                  </el-form-item>
                  <el-button type="success" class="button">保存</el-button>
              </el-form>
          </div>
      </div>
      <!-- 设置结束 -->
      <home-footer></home-footer>
  </div>
</template>

<script>
    import HomeFooter from './home-footer'

export default {
    components:{
        'home-footer' : HomeFooter
    },
    data(){
        return {
            value1:false,
            value2:true,
            value3:false,
            value4:true,
            form:{
                alias:'宝塔Windows面板',
                port:'8888',
                entrance:'/',
                authentication:'已关闭',
                hostName:'nevergiveup.icu',
                authorization:'',
                defaultSite:'C:/wwwroot',
                defaultBackups:'C:/backup',
                serverIP:'47.112.172.46',
                serverTime:'2020-12-23 15:42:50',
                user:'739528570',
                password:'******',
                binding:'136****8807',
                program:'当前未绑定微信号'
            }
        }
    }
}
</script>

<style lang='less' scoped>
.myadmin-set {
    position: relative;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 110px;
  .myadmin-set-title {
      padding-left: 20px;
      height: 60px;
      background-color: #fff;
      line-height: 60px;
      span{
          font-size: 20px;
      }
  }
  .myadmin-set-content {
      height: 80px;
      line-height: 80px;
      background-color: #fff;
      margin-top: 20px;
      padding-left: 20px;
  }
  .myadmin-set-footer {
      background-color: #fff;
      margin-top: 20px;
      padding-bottom: 30px;
      .set-footer-title{
          height: 80px;
          line-height: 80px;
          font-size: 20px;
          padding-left: 20px;
          color: #333;
          border-bottom: 1px solid #ddd;
      }
      .set-footer-content{
          .warning{
              height: 50px;
              line-height: 50px;
              padding-left: 10px;
              border:1px solid #ddd;
              background-color: rgb(251,251,251);
              margin-top: 20px;
              margin-left: 30px;
          }
          .set-form{
              margin-top: 30px;
          }
          .button{
                background-color: #20a53a;
                width: 140px;
                height: 34px;
                margin-left: 120px;
          }
      }
  }
}
</style>