<template>
  <div class="app-home">
    <div class="anquan-header">
      <div class="anquan-header-left">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-house">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">系统安全</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="anquan-header-right">
        <el-input v-model="kt" placeholder="搜索日志" class="sousuo" > </el-input>
        <el-button type="success" icon="el-icon-search" class=""></el-button>
      </div>
    </div>
    <!-- 远程桌面选项 -->
    <div class="safe">
      <span class="open">启动远程桌面</span>
      <!-- 提示启动远程桌面 -->
      <el-switch
        v-model="value1"
        active-color="#13ce66"
        class="select1"
        @change="dialogVisible3 = true"
      ></el-switch>
      <!-- 提示启动开关 -->
      <el-dialog
        title="警告"
        :visible.sync="dialogVisible3"
        width="30%"
      >
        <span class="lol3">{{kuailai1}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible3 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!--  -->
      <span class="inlet">远程桌面端口:</span>
      <el-input v-model="input2" class="input1"></el-input>
      <el-button class="but1" @click="dialogVisible = true">更改</el-button>
      <!-- 提示更改 -->
      <el-dialog
        title="远程端口"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span
          >更改远程端口时，将会注消所有已登录帐户，您真的要更改远程端口吗？</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!--  -->
      <span class="open2">启动禁ping</span>
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        class="select1 bian"
        @change="dialogVisible2 = true"
      ></el-switch>
      <!-- 提示启动禁止 -->
      <!-- 开启提示框 -->
      <el-dialog
        title="是否禁止ping"
        :visible.sync="dialogVisible2"
        width="30%"
      >
        <span class="lol">{{kuailai}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 关闭提示框 -->
      <!-- <el-dialog
             title="是否禁止ping"
             :visible.sync="dialogVisible2"
             width="30%"
             class="efg"
             >
             <span>解除禁PING状态可能会被黑客发现您的服务器，您真的要解禁吗？</span>
             <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible2 = false">取 消</el-button>
                   <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
             </span>
      </el-dialog> -->
      <!--  -->
      <span class="lujin"
        >web日志:<a href="#" class="inter">C:/BtSoft/wwwlogs</a></span
      >
      <span class="neicun">32.48k</span>
      <el-button class="but2">清空</el-button>
      <el-button class="but2">面板错误日志</el-button>
    </div>
    <!-- 防火墙 -->
    <div class="wall">
      <div class="title">
        <h3>防火墙</h3>
      </div>
      <div class="divtable">
        <div class="divtable-header">
          <el-select v-model="value" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="kt1"
            placeholder="端口"
            class="input4"
            style="width: 140px"
          ></el-input>
          <el-input
            v-model="kt2"
            placeholder="备注/说明"
            class="input4"
            style="width: 190px"
          ></el-input>
          <el-button class="but3">放行</el-button>
          <span class="shuoming">说明: 支持放行端口范围，如: 3000:3500</span>
        </div>
        <!-- 防火墙表格 -->
        <div class="biaoge1">
          <el-table :data="filterData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="56">
            </el-table-column>
            <el-table-column prop="action" label="行为" width="394">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="87">
            </el-table-column>
            <el-table-column prop="addtime" label="添加时间" width="331">
            </el-table-column>
            <el-table-column prop="explain" label="说明" width="306">
            </el-table-column>
            <el-table-column prop="handle" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
                  style="color: green"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next,sizes, total"
          :total="tableData.length"
          :page-sizes="[5, 10]"
          :page-size="5"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          class="block"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 面板日志操作 -->
    <div class="black-ip">
      <div class="title">
        <h3>面板操作日志</h3>
        <el-button class="but4" @click="dialogVisible1 = true">清空</el-button>
        <!-- 提示清空 -->
        <el-dialog title="清空日志" :visible.sync="dialogVisible1" width="30%">
          <span class="dialogDiv">即将清空面板日志，继续吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <!--  -->
      </div>
      <!-- 表格2 -->
      <div class="divtable">
        <div class="biaoge2">
          <el-table :data="filterData1" style="width: 100%">
            <el-table-column prop="id1" label="编号" width="106">
            </el-table-column>
            <el-table-column prop="user" label="用户" width="210">
            </el-table-column>
            <el-table-column prop="id2" label="编号" width="87">
            </el-table-column>
            <el-table-column prop="details" label="详情" width="600">
            </el-table-column>
            <el-table-column prop="handletime" label="操作时间">
            </el-table-column>
          </el-table>
        </div>
        <div class="reportfont">
          <el-pagination
            ref="pagination"
            background
            prev-text="上一页"
            next-text="下一页"
            :total="tableData1.length"
            :page-size="5"
            layout="prev, pager, next, slot, total"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            style="display: inline-block; padding-left: 0px"
          >
            <el-button type="button" @click="jumpFirstPage" class="my-btn"
              >首页</el-button
            >
            <el-button
              type="button"
              @click="jumpLastPage"
              class="my-btn"
              style="margin: 0px 5px"
              >尾页</el-button
            >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="footer">
      宝塔Windows面板 ©2014-2020 宝塔 (bt.cn)
      <a href="#">论坛求助</a>
      |
      <a href="#">使用手册</a>
      |
      <a href="#" class="picture">
        微信公众号
        <div class="photo"></div>
      </a>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import { getsecurity,getuselog } from "../../api/api";
export default {
  computed: {
    filterData: function () {
      let filterData = this.tableData.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
      return filterData;
    },
    filterData1: function () {
      let filterData1 = this.tableData1.slice(
        (this.pageNum1 - 1) * this.pageSize1,
        this.pageNum1 * this.pageSize1
      );
      return filterData1;
    },
    kuailai(){
      console.log(this.value2);
      if(this.value2){
        return '禁PING后不影响服务器正常使用，但无法ping通服务器，您真的要禁PING吗？'
      }
      else{
        return '解除禁PING状态可能会被黑客发现您的服务器，您真的要解禁吗？'
      }
    },
    kuailai1(){
      console.log(this.value1);
        if(this.value1){
        return '确定启用远程桌面服务吗？'
      }
      else{
        return '停用远程桌面服务的同时也将注销所有已登录用户,继续吗？'
      }
    }
  },
  data() {
    return {
      value1: true,
      value2: false,
      input2: "3346",
      kt:"",
      kt1:"",
      kt2:"",
      // 提示
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      lol1: "",
      options: [
        {
          value: "1",
          label: "放行端口",
        },
        {
          value: "2",
          label: "屏蔽ID",
        },
      ],
      search: '',
      value: "1",
      tableData: [

      ],
      pageSize: 5,
      pageNum: 1,
      tableData1: [
        // {
        //   id1: 100,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 99,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 98,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 97,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 96,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 95,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 94,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 93,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 92,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
        // {
        //   id1: 91,
        //   user: "739528570",
        //   id2: "用户登录",
        //   details: "登录成功,帐号:739528570,登录IP:113.116.72.187:53591",
        //   handletime: "2020-12-23 11:31:43",
        // },
      ],
      pageSize1: 7,
      pageNum1: 1,
    };
  },
  components: {},
  methods: {
    handleSizeChange: function (pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
    },
    handleCurrentChange: function (pageNum) {
      console.log("当前页面：", pageNum);
      this.pageNum = pageNum;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // // //
    jumpFirstPage() {
      this.$refs.pagination.handleCurrentChange(1);
      this.$emit("handleCurrentChange1", 1);
    },
    jumpLastPage() {
      let font = this.$refs.pagination;
      let cpage = Math.ceil(font.total / font.pageSize);
      font.handleCurrentChange(cpage);
    },
    handleSizeChange1(pagesize1) {
      this.pagesize1 = pagesize1;
    },
    handleCurrentChange1(pageNum1) {
      this.pageNum1 = pageNum1;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
  async created() {
      

  },
  mounted(){
    
    Promise.resolve(getsecurity()).then( msg => {
        console.log(msg);
       this.tableData = msg.tableData
    })

    Promise.resolve(getuselog()).then( msg1 => {
        console.log(msg1);
       this.tableData1 = msg1.tableData1
    })
  }
  
};
</script>

<style lang="less" scoped>
.app-home {
  width: 100%;
  // 9
  padding: 0 15px;
  background: #eff2f7;
  // overflow: hidden;
  .anquan-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 15px 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .anquan-header-left {
      line-height: 50px;
      padding-left: 30px;
    }
    .anquan-header-right {
      padding-right: 30px;
      .sousuo {
        width: 250px;
      }
    }
  }
  //  远程控制桌面
  .safe {
    height: 62px;
    background-color: white;
    margin: 15px 0;
    padding: 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .open {
      font-size: 12px;
      font-style: normal;
      color: #555;
      line-height: 32px;
    }
    .select1 {
      margin: 0 45px 0 15px;
    }
    .inlet {
      color: #555;
      font-size: 12px;
    }
    .input1 {
      margin-left: 10px;
      width: 147px;
    }
    .but1 {
      margin-left: 8px;
      margin-right: 55px;
    }
    .but1:hover {
      color: white;
      background: rgb(90, 206, 90);
    }
    .open2 {
      font-size: 12px;
      font-style: normal;
      color: #555;
      line-height: 32px;
    }
    .bian {
      border-right: 1px solid #ccc;
      padding-right: 30px;
    }
    .lujin {
      font-size: 12px;
      font-style: normal;
      color: #555;
      line-height: 32px;
    }
    .inter {
      color: rgb(34, 155, 34);
      margin-left: 20px;
      font-size: 16px;
    }
    .neicun {
      font-size: 12px;
      margin: 0 15px;
      font-style: normal;
      color: #555;
    }
    .but2:hover {
      color: white;
      background: rgb(90, 206, 90);
    }
  }
  .wall {
    // height: 472px;
    margin: 15px 0;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .title {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      h3 {
        padding: 0 15px;
        font-size: 16px;
      }
    }
    .divtable {
      padding: 15px;
      .divtable-header {
        margin-bottom: 15px;
        .input4 {
          margin-left: 10px;
        }
        .but3 {
          margin: 0 18px 0 10px;
        }
        .but3:hover {
          color: white;
          background: rgb(90, 206, 90);
        }
        .shuoming {
          font-size: 12px;
          font-style: normal;
          color: #555;
        }
      }
      .biaoge1 {
        height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
      .block {
        margin-top: 10px;
        margin-left: 895px;
      }
    }
  }
  .black-ip {
    // height: 500px;
    margin: 15px 0;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .title {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      h3 {
        padding: 0 15px;
        display: inline;
      }
      .but4:hover {
        color: white;
        background: rgb(90, 206, 90);
      }
    }
    // 提示框高度
    .dialogDiv {
      line-height: 10px;
      display: block;
      height: 10px;
    }
    .divtable {
      padding: 15px;
      .biaoge2 {
        height: 280px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
      .reportfont {
        margin-top: 10px;
        margin-left: 895px;
      }
    }
  }
  //底部
  .footer {
    font-size: 12px;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    a {
      margin-left: 10px;
      margin-right: 10px;
      color: #20a53a;
      position: relative;

      .photo {
        display: none;
        position: absolute;
        top: -152px;
        left: -42px;
        height: 150px;
        width: 150px;
        background: url("../../assets/bt_wx.jpg") no-repeat;
        border: #ddd 1px solid;
      }
    }
    .picture:hover .photo {
      display: block;
    }
  }
}
</style>