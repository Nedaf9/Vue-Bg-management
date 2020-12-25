<template>
  <div id="ftp">
    <div class="container">
      <div class="ftp-ip">
        <p class="ftp-ip-content">
          <img
            class="ftp-tip"
            src="../../assets/ftp/ftp-tip.png"
          />当前FTP地址为：<span>ftp://47.112.172.46:21</span>
        </p>
      </div>
      <!-- 添加FTP开始 -->
      <div class="ftp-action">
        <button class="addFtp" @click="addFtp = true">添加FTP</button>
        <el-dialog title="添加FTP" :visible.sync="addFtp" width="25%">
          <el-form
            :model="addFtpForm"
            ref="addFtpForm"
            label-width="80px"
            :inline="false"
            size="normal"
          >
            <el-form-item label="用户名">
              <el-input v-model="addFtpForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="addFtpForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="根目录">
              <el-input v-model="addFtpForm.rootDirectory"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addFtpForm.remark"></el-input>
            </el-form-item>
          </el-form>
          <p class="form-tip">
            ● 如果FTP无法连接，需要开放20, 21, 3000-4000端口
          </p>
          <p class="form-tip">
            ● 如果服务器存在[安全组]，请咨询服务器提供商如何在[安全组]放行端口
          </p>

          <span slot="footer">
            <el-button @click="addFtp = false">关闭</el-button>
            <el-button type="primary" @click="AddFtp">提交</el-button>
          </span>
        </el-dialog>
        <!-- 添加FTP结束 -->
        <button class="modification" @click="modification = true">
          <!-- 修改FTP开始 -->
          修改FTP端口
        </button>
        <el-dialog title="修改FTP" :visible.sync="modification" width="40%">
          <el-form
            :model="ModifyPort"
            ref="ModifyPort"
            label-width="80px"
            :inline="false"
            size="normal"
          >
            <el-form-item label="默认端口">
              <el-input v-model="ModifyPort.setting"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="modification = false">关闭</el-button>
            <el-button type="primary" @click="modification = false"
              >提交</el-button
            >
          </span>
        </el-dialog>
        <!-- 修改FTP结束 -->
        <button class="delete" @click="del = true" v-show="delActive">
          删除选中
        </button>
        <!---删除FTP开始 -->
        <el-dialog
          title="是否批量删除选中的FTP账号?"
          :visible.sync="del"
          width="20%"
          style="color: red"
        >
          <div>
            <p>您共选择了[<span>0</span>]个FTP,删除后将无法恢复真的要删除吗?</p>
            <br />
            <p>
              计算结果 :{{ num1 }} + {{ num2 }} =
              <input type="text" width="20px" v-model="sum" /><span
                @click="refresh"
                >🔄
              </span>
            </p>
          </div>
          <span slot="footer">
            <el-button @click="del = false">取消</el-button>
            <el-button type="primary" @click="del = false">确定</el-button>
          </span>
        </el-dialog>
        <!-- 删除FTP结束 -->
      </div>
      <table class="ftp-content">
        <!-- 表格开始 -->
        <thead>
          <tr style="text-align: left">
            <th width="50">
              <input type="checkbox" v-model="selectAll" @click="select_All" />
            </th>
            <th width="20%">用户名</th>
            <th width="15%">密码</th>
            <th>状态</th>
            <th>根目录</th>
            <th>备注</th>
            <th width="130">操作</th>
          </tr>
        </thead>
        <tbody @change="select()">
          <tr v-for="(item,index) in FtpData" :key="item.id">
            <td><input type="checkbox" v-model="item.checked" /></td>
            <td><span>{{ item.name }}</span></td>
            <td><span>{{item.showpass ?item.pass :'***********'}}</span><i class="el-icon-view" @click="handleclick(index)"></i></td>
            <td :class="{ fcStart: item.status == 1 ? true : false }">
              {{ item.status == 1 ? "已启用" : "已停用" }}<i class="el-icon-loading"></i>
            </td>
            <td><span>{{ item.rootDirectory }}</span></td>
            <td>{{ item.remark }}</td>
            <td>
              <span @click="item.checkAd = true">管理</span>|
              <span @click="item.checkClose = true">改密</span>|
              <span @click="item.checkDel= true">删除</span>
              <!-- ************************************************************************************************** 管理-->
              <el-dialog
                :visible.sync="item.checkAd"
                width="30%"
                title="FTP高级管理"
                
              >
                <hr style="margin: -30px 0 20px 0" />
                <el-form
                  label-width="80px"
                  :inline="false"
                  size="normal"
                >
                  <el-form-item label="下载限速">
                    <el-input-number
                      v-model="item.ftp_administration.Download_speed_limit"
                      controls-position="right"
                    ></el-input-number
                    >KB
                  </el-form-item>
                  <el-form-item label="上传限速">
                    <el-input-number
                      v-model="item.ftp_administration.Upload_speed_limit"
                      controls-position="right"
                    ></el-input-number
                    >KB
                  </el-form-item>
                  <el-form-item label="读写权限">
                    <el-switch
                      v-model="item.ftp_administration.permisson.lead"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                    读取
                    <el-switch
                      v-model="item.ftp_administration.permisson.leadin"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                    写入
                  </el-form-item>
                  <el-form-item label="IP黑名单" size="normal">
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="每行填写-个ip. 例:
192.168.1.1
192.168.2.1/24
输入*.则禁止所有，可配合IP白名单使用
"
                      v-model="item.ftp_administration.IP_blacklist"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="IP白名单" size="normal">
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="每行填写一个ip.例:
192.168.1.1
192.168.2.1/24
"
                      v-model="item.ftp_administration.IP_whitelist"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
                <p>●设置下载、上传限速为[0] KB,则不进行限速</p>
                <span slot="footer">
                  <el-button type="primary" @click="administration_save(item.checkAd)"
                    >保存</el-button
                  >
                </span>
              </el-dialog>
              <!--  *************************************************************************************************改密-->
              <el-dialog
                :visible.sync="item.checkClose"
                width="30%"
                height="20%"
                title="修改FTP用户密码"
              >
                <hr style="margin: -30px 0 50px 0" />
                <el-form label-width="80px" :inline="false" size="normal">
                  <el-form-item label="用户名 " size="normal">
                    <el-input
                      v-model="item.name"
                      size="normal"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码 " size="normal">
                    <el-input
                      v-model="item.pass"
                      size="normal"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-form>

                <span slot="footer">
                  <el-button type="primary" @click="ToClose_save(index)"
                    >保存</el-button
                  >
                </span>
              </el-dialog>
              <!-- ******************************************************************************************* 删除单个ftp-->
              <el-dialog
                :visible.sync="item.checkDel "
                width="30%"
                :title="'删除[' + item.name + ']'"
              >
                <span style="font-size: 20px"
                  >您真的要删除[{{ item.name }}]吗？</span
                >
                <span slot="footer">
                  <el-button type="info" @click="item.checkDel = false"
                    >不了</el-button
                  >
                  <el-button type="primary" @click="removeFtp_save(index)"
                    >确定</el-button
                  >
                </span>
              </el-dialog>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ftp",
  data() {
    return {
      showpass:false,
      addFtp: false, //   添加FTP
      modification: false, // 修改FTP
      del: false, //  删除FTP
      //-----------------------------添加ftp表单
      addFtpForm: {
      },
      ModifyPort: {
        //默认端口
        setting: 21,
      },
      delActive: false, //选中删除按钮状态
      num1: "5", //随机数1
      num2: "5", //随机数2
      sum: "", //随机数和

      selectAll: false,

      showPass: false,
      //---------------------------------------------------FTPData  start
      FtpData: [
        // {
        //   name: "nevergiveup",
        //   pass: 112335222,
        //   id: 1,
        //   status: 1,
        //   rootDirectory: "C:/inetpub/wwwroot",
        //   remark: "nevergiveup",
        //   checked: false,
        //   checkDel:false,
        //   checkAd:false,
        //   checktoClose:false,
        //   ftp_administration: {
        //     Download_speed_limit: 1024,
        //     Upload_speed_limit: 1024,
        //     permission: { read: true, readin: true },
        //     IP_blacklist: "",
        //     IP_whitelist: "",
        //   },
        // },
      ],
      //---------------------------------------------------FTPData  end
      administration: false,
      ToClose: false,
      //removeFtp: false,
    };
  },
  created() {
     
  },
  mounted() {
    axios.get('http://rap2api.taobao.org/app/mock/273678/loadfile').then((res)=>{
      console.log(res.data.data);
       this.FtpData = res.data.data
    })
  },
  computed: {
    // addftpRoot: function () {
    //   return this.addFtpForm.ftpRoot + this.addFtpForm.ftpName;
    // },
      
    
  },
  watch: {
   
  },
  methods: {
    refresh: function () {
      this.num1 = parseInt(Math.random() * 10);
      this.num2 = parseInt(Math.random() * 10);
    },

    //---------------------------------------------------------添加FTP
    AddFtp: function () {
      console.log(this.addFtpForm);
      this.FtpData.push(this.addFtpForm);
      this.addFtp = false;
      },
    open(index){
        console.log(index);
        this.removeFtp = true
    },
    //-------------------------------------------------------------------操作FTP  start*/
    administration_save: function () {
      console.log("管理");
      this.administration = false;
    },
    ToClose_save: function () {
      console.log("改密");
      this.ToClose = false;
    },
    removeFtp_save: function (index) {
      console.log(index);
      this.FtpData[index].checkDel = false
      this.FtpData.splice(index,1)
    },
    //-------------------------------------------------------------------操作FTP  end*/
      //---------------------------------------------显示密码
    handleclick: function (index) {
      this.FtpData[index].showpass = !this.FtpData[index].showpass
      
    },

    select_All: function () {
      //---------------------------------------全选start
      this.FtpData.forEach((item) => {
        item.checked = !this.selectAll;
        if (!this.selectAll) {
          this.delActive = true;
        } else {
          this.delActive = false;
        }
      });
    },
    select() {
      let select = this.FtpData.every((item) => {
        return item.checked;
      });
      this.selectAll = select;
      if (this.selectAll) {
        this.delActive = true;
      } else {
        this.delActive = false;
      }
    },
    //-----------------------------------------------------------------------全选end
  },
};
</script>

<style lang="less" scoped>
// .display-flex{
//   display: flex;
//   line-height: 100%;
// }

.passShow {
  border: none;
  width: 100px;
  height: 40px;
  margin: none;
  padding: 0 2px;
  background-color: #fff;
}
.fcStart {
  color: #10952a;
}
.form-tip {
  color: rgb(149, 145, 145);
  font-size: 12px;
}
#ftp {
  width: 100%;
  height: 100vh;
  padding: 15px;
  background-color: #f2f2f2;
  .container {
    padding: 15px;
    background-color: #fff;
    .ftp-ip {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      border: 1px solid #eeeeee;
      background-color: #fbfbfb;
      .ftp-ip-content {
        text-indent: 1rem;
        line-height: 50px;
        .ftp-tip {
          vertical-align: middle;
          width: 15px;
          height: 15px;
          margin: 0px 10px 0 0;
        }
      }
    }

    .ftp-action {
      height: 60px;
      padding: 15px 15px;
      button {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border: 1px solid #eee;
        cursor: pointer;
      }
      .addFtp {
        float: left;
        background-color: #10952a;
        color: #fff;
      }

      .modification {
        float: left;
        background-color: #fff;
        margin-left: 20px;
      }

      .delete {
        float: right;
      }
    }

    .ftp-content {
      width: 100%;
      border: 1px solid #eee;
      border-spacing: 0;
      border-collapse: collapse;
      font-size: 14px;
      color: rgb(138, 136, 136);
      thead {
        tr {
          background-color: #f6f6f6;
          height: 40px;
          border-bottom: 1px solid #eee;
          th {
            input {
              margin-left: 15px;
              margin-top: 6px;
            }
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #eee;
          height: 40px;
          td {
            input {
              margin-left: 15px;
              margin-top: 6px;
            }
            span {
              color: green;
              padding: 0 3px 0 3px;

              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
