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
              <el-input v-model="addFtpForm.ftpName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="addFtpForm.ftpPass"></el-input>
            </el-form-item>
            <el-form-item label="根目录">
              <el-input v-model="addftpRoot"></el-input>
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
            <el-button type="primary" @click="addFtp = false">提交</el-button>
          </span>
        </el-dialog>
        <!-- 添加FTP结束 -->
        <!-- 修改FTP开始 -->
        <button class="modification" @click="modification = true">
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
        <!-- 删除FTP开始 -->
        <button class="delete" @click="del = true">删除选中</button>
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
        <thead>
          <tr style="text-align: left">
            <th width="50"><input type="checkbox" name="" id="" /></th>
            <th>用户名</th>
            <th>密码</th>
            <th>状态</th>
            <th>根目录</th>
            <th>备注</th>
            <th style="text-align: right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in FtpData" :key="item.id">
            <td><input type="checkbox" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.pass }}</td>
            <td>{{ (item.status = 1 ? "已启用" : "已停用") }}</td>
            <td>{{ item.rootDirectory }}</td>
            <td>{{ item.remark }}</td>
            <td style="text-align: right">
              <span @click="administration = true">管理</span>|
              <span @click="ToClose = true">改密</span>|
              <span @click="removeFtp = true">删除</span>
              <!-- 管理*************************************************** -->
              <el-dialog :visible.sync="administration" width="30%">
                <span></span>
                <span slot="footer">
                  <el-button type="primary" @click="administration_1">保存</el-button>
                </span>
              </el-dialog>
              <!-- 改密 ****************************************************-->
              <el-dialog :visible.sync="ToClose" width="30%">
                <span></span>
                <span slot="footer">
                  <el-button type="primary" @click="ToClose">保存</el-button>
                </span>
              </el-dialog>
              <!-- 删除单个ftp***************************************** -->
              <el-dialog :visible.sync="removeFtp" width="30%">
                <span></span>
                <span slot="footer">
                  <el-button type="primary" @click="removeFtp">保存</el-button>
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
export default {
  name: "ftp",
  data() {
    return {
      addFtp: false, //   添加FTP
      modification: false, // 修改FTP
      del: false, //  删除FTP
      addFtpForm: {
        //添加ftp表单
        ftpName: "",
        ftpPass: "",
        ftpRoot: "C:/wwwroot/",
      },
      ModifyPort: {
        //默认端口
        setting: 21,
      },
      num1: "5", //随机数1
      num2: "5", //随机数2
      sum: "", //随机数和
      FtpData: [
        {
          name: "nevergiveup",
          pass: 112335222,
          id: 1,
          status: 1,
          rootDirectory: "C:/inetpub/wwwroot",
          remark: "nevergiveup",
        },
        {
          name: "谁大野去",
          pass: 998998998,
          id: 2,
          status: 1,
          rootDirectory: "C:/inetpub/wwwroot",
          remark: "ad去了",
        },
        {
          name: "谁大野去",
          pass: 998998998,
          id: 3,
          status: 1,
          rootDirectory: "C:/inetpub/wwwroot",
          remark: "ad去了",
        },
      ],
      administration: false,
      ToClose: false,
      removeFtp: false,
      ftp_administration: {
        Download_speed_limit: 1024,
        Upload_speed_limit: 1024,
        IP_blacklist: "",
      },
    };
  },
  created() {},
  // mounted () {},
  computed: {
    addftpRoot: function () {
      return this.addFtpForm.ftpRoot + this.addFtpForm.ftpName;
    },
  },
  watch: {},
  methods: {
    refresh: function () {
      this.num1 = parseInt(Math.random() * 10);
      this.num2 = parseInt(Math.random() * 10);
		},
		administration_1:function(){
			console.log('可以');
			this.administration = false
		}
  },
};
</script>

<style lang="less" scoped>
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
        display: block;
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
              padding: 0 3px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
