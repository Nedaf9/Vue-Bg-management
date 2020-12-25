<!--  -->
<template>
  <div class="">
    <el-row class="tac">
      <el-col :style="{ width: '160px' }">
        <el-menu
          default-active="dashboard"
          class="el-menu-vertical-demo"
          text-color="#fff"
          background-color="#353d44"
          :style="menuStyle"
          router
        >
          <div index="IP" class="itemheight IPblue" >
            <i class="el-icon-monitor ml10"></i>
            <span slot="title" class="ft14">47.112.172.46</span>
             <b type="text" class="msgBox" @click="dialogVisible = true">{{this.$store.state.showTotal}}</b>
             <el-dialog
                title="消息盒子"
                :visible.sync="dialogVisible"
                width="600px"
                style="dialog"
               >
               <span class="msglistTotal">({{this.$store.state.showTotal}})</span>
                  <el-tabs 
                  :tab-position="tabPosition"
                   type="border-card" 
                   style="height: 400px;">
                  <el-tab-pane label="任务列表">当前没有任务！</el-tab-pane>
                  <el-tab-pane label="消息列表" class="msgPosition">
                   
                     <el-table
                         ref="multipleTable"
                         :data="tableData"
                         tooltip-effect="dark"
                         style="width: 100%"
                        >
                         <el-table-column
                           type="selection"
                           width="40"
                          >
                         </el-table-column>
                         <el-table-column
                         class="msglist"
                           label="名称"
                           width="350"
                           prop="msgname"
                          >
                          <template slot-scope="scope">{{ scope.row.msgname}}</template>
                         </el-table-column>
                         <el-table-column
                           prop="time"
                           label="时间"
                           width="80">
                           <template slot-scope="scope">{{ scope.row.time}}</template>
                         </el-table-column>
  
                   </el-table>
          <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
            

                  </el-tab-pane>
                  <el-tab-pane label="执行日志">暂无日志</el-tab-pane>
                </el-tabs>

             </el-dialog>
             
        </div>

           <el-menu-item index="dashboard" class="itemheight">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="Website" class="itemheight">
            <i class="el-icon-orange"></i>
            <span slot="title">网站</span>
          </el-menu-item>
          <el-menu-item index="FTP" class="itemheight">
            <i class="el-icon-sunset"></i>
            <span slot="title">FPP</span>
          </el-menu-item>
          <el-menu-item index="database" class="itemheight">
            <i class="el-icon-coin"></i>
            <span slot="title">数据库</span>
          </el-menu-item>
          <el-menu-item index="control" class="itemheight">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">监控</span>
          </el-menu-item>
          <el-menu-item index="safe" class="itemheight">
            <i class="el-icon-s-claim"></i>
            <span slot="title">安全</span>
          </el-menu-item>
          <el-menu-item index="file" class="itemheight">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">文件</span>
          </el-menu-item>
          <el-menu-item index="planTask" class="itemheight">
            <i class="el-icon-date"></i>
            <span slot="title">计划任务</span>
          </el-menu-item>
          <el-menu-item index="softwareManagement" class="itemheight">
            <i class="el-icon-menu"></i>
            <span slot="title">软件管理</span>
          </el-menu-item>
          <el-menu-item index="setting" class="itemheight">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
           <!-- 退出开始 -->
          <el-menu-item 
           class="itemheight"
           >
            <i class="el-icon-remove"></i>
            <span slot="title" @click="handlerExit">退出</span>
          </el-menu-item>
          <!-- 退出结束 -->
          <el-menu-item index="plus" class="itemheight">
            <i class="el-icon-plus ml50" ></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { logout } from "@/api/api";
import Axios from 'axios';
import store from "@/store/index";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
       
      tableData:[],//存放消息列表数据
      showTotal:0, //保存数据的条数
      tabPosition: 'left',
      menuStyle:{
         height: '100vh', 
         fontFamily:"Arial",
      },
       dialogVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   退出的事件
   handlerExit: async function(){
       let result = await logout();
       if(result.status === 1){
          this.$message("退出成功");
          localStorage.removeItem("is_login");
          this.$router.push("/");
       }
   },

   toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    
    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let _this=this; //保存一个外部的this
   Axios.get("http://rap2api.taobao.org/app/mock/273920/admin/msg")
    .then(function (res) {
      console.log(res.data.msg);
    //  console.log(res.data.msg.length);
   _this.tableData=res.data.msg;
   //将值存入vuex里面的state中
   _this.$store.state.showTotal=res.data.msg.length;  
  console.log(_this.$store.state.showTotal) //打印vuex里面的值
    
  })
  .catch(function (error) {
    console.log(error);
  })


  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.defaultActive = location.hash.slice(2) || "dashboard";
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
/* 侧边菜单的每一个的高度 */
.itemheight{
  height: 44px;
  line-height: 44px;
}

/* IP菜单的样式 */
.IPblue{
  cursor: pointer;
  padding-left:10px ;
  color: #ffff;
  height: 50px;
  font-family: Arial, Helvetica, sans-serif;
  .msgBox{
    background: #fc6d26;
    color: #ffff;
    border: none;
    display: inline-block;
    line-height: 18px;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    margin-left: 10px;
    cursor: pointer;
  }
}
 .ml10{
    margin-right: 10px;
  }
.IPblue:hover{
   background: #409eff;
}
.el-table td, .el-table th{
  padding:0px 0px;
}

.el-table .cell{
  line-height: 0px;
  padding-right: 0;
}

.el-table .cell{
  padding-left: 0;
}
.el-table td, .el-table th{
  padding: 0;
}


.el-table.cell{
  padding-right:0px;
  line-height: 0;
}



/* plus 标签位置设置 */
.ml50{
    margin-left: 50px;
}

/* 字体大小 */
.ft14{
  font-size: 14px;
}

</style>

<style >
/* 消息盒样式 */
.el-dialog__body{
  padding: 0;
}
.el-dialog__header{
  padding: 0;
  padding-left: 10px;
 
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}

.el-table td, .el-table th{
  padding:0px;
}

.el-button{
  padding: 4px 2px;
}



.msgPosition{
  position: relative;
}

.msglistTotal{
  position: absolute;
  left: 80px;
  top: 82px;
  z-index: 100;
  color: #409eff;

}

/* 消息盒子字体样式 */
.el-dialog__title{
   font-size: 14px;
}



.el-table__header-wrapper{
  height: 40px;
  line-height: 40px;
}
.el-table__row{
  height: 15px;
  line-height: 20px;
}


</style>