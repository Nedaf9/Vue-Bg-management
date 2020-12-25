<template>
  <div class="app-database">
    <!---------------------------------------------------------- 提醒栏 ------------------------------------------>
    <el-row class="info-title">
      <p>
        <i class="el-icon-warning-outline"></i>
        请在添加数据库后，务必到<a href="javascript:;">[计划任务]</a
        >页面添加定时备份任务，以确保您的数据安全。
      </p>
    </el-row>
    <!---------------------------------------------------------- 表格上方按钮栏 ------------------------------------------>
    <div class="topButton">
      <div class="topButton-left">
    <!---------------------------------------------------------- 添加数据库 ------------------------------------------>
        <el-button @click="dialogList.dialogAdd = true" type="success" size="small">添加数据库</el-button>
        <el-dialog
          title="添加数据库"
          :visible.sync="dialogList.dialogAdd"
          width="40%"
          @close="dialogList.dialogAdd = false">
          <el-form :model="addDatabaseForm" ref="databaseForm" :rules="databaseFormRules" label-width="100px" :inline="true" size="normal">
            <el-form-item label="数据库名" prop="DatabaseName">
              <el-input size="mini" placeholder="新的数据库名称" style="width: 50%;margin-right: 5px" v-model="addDatabaseForm.DatabaseName"></el-input>
              <el-select size="mini" style="width: 20%" v-model="addDatabaseForm.nameUnicode" placeholder="utf-8">
                <el-option value="utf-8"></el-option>
                <el-option value="utf8mb4"></el-option>
                <el-option value="gbk"></el-option>
                <el-option value="big5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="DatabaseName">
              <el-input size="mini" placeholder="数据库用户" v-model="addDatabaseForm.DatabaseUsername"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Databasepass">
              <el-input style="width: auto" size="mini" v-model="addDatabaseForm.Databasepass"></el-input>
              <el-button icon="el-icon-refresh-right" style="display: inline-block" type="text"></el-button>
            </el-form-item>
            <el-form-item label="类型">
              <el-select size="mini" style="width: 60%" v-model="addDatabaseForm.DatabaseType">
                <el-option value="MySQL"></el-option>
                <el-option value="SQLServer"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联网站">
              <el-select size="mini" style="width: 60%" v-model="addDatabaseForm.DatabaseRelevance">
                <el-option value="不关联"></el-option>
                <el-option value="nevergiveup.ice"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="访问权限">
              <el-select size="mini" style="width: 60%" v-model="addDatabaseForm.DatabasePower">
                <el-option value="本地服务器"></el-option>
                <el-option value="所有人"></el-option>
                <el-option value="指点IP"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <p style="line-height: 30px"> · MySQL:长度3-16位。不能为特殊字符</p>
          <p> · SQL Server:长度8-16位，并包含大写，小写，数字，特殊符号其中任何3项</p>
          <span slot="footer">
            <el-button @click="resetForm">关闭</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </span>
        </el-dialog>
    <!---------------------------------------------------------- root密码 ------------------------------------------>
        <el-button @click="dialogList.dialogRoot = true" size="small">root密码</el-button>
        <el-dialog
          title="修改数据库密码"
          :visible.sync="dialogList.dialogRoot"
          width="40%"
          @close="dialogList.dialogRoot = false">
          <span style="margin-left: 35px;">root密码</span>
          <el-input size="mini" style="width: 60%;margin-left: 15px;" v-model="userData.userRootPass"></el-input>
          <el-button icon="el-icon-refresh-right" style="display: inline-block" type="text"></el-button>
          <span slot="footer">
            <el-button @click="dialogList.dialogRoot = false">关闭</el-button>
            <el-button type="primary" @click="dialogList.dialogRoot = false">提交</el-button>
          </span>
        </el-dialog>
    <!---------------------------------------------------------- 修改sa密码 ------------------------------------------>
        <el-button @click="dialogList.dialogSa = true" size="small">修改sa密码</el-button>
        <el-dialog
          title="修改数据库密码"
          :visible.sync="dialogList.dialogSa"
          width="40%"
          @close="dialogList.dialogSa = false">
          <span style="margin-left: 35px;">sa密码</span>
          <el-input size="mini" style="width: 60%;margin-left: 15px;" v-model="userData.userSaPass"></el-input>
          <el-button icon="el-icon-refresh-right" style="display: inline-block" type="text"></el-button>
          <span slot="footer">
            <el-button @click="dialogList.dialogSa = false">关闭</el-button>
            <el-button type="primary" @click="dialogList.dialogSa = false">提交</el-button>
          </span>
        </el-dialog>

        <el-button size="small">phpMyAdmin</el-button>
      </div>
    <!---------------------------------------------------------- 回收站 ------------------------------------------>
      <div class="topButton-right">
        <el-button @click="dialogList.dialogRecycle = true"  size="small" icon="el-icon-delete">回收站</el-button>
        <el-dialog
          title="回收站"
          :visible.sync="dialogList.dialogRecycle"
          width="70%"
          @close="dialogList.dialogRecycle = false">
          <span></span>
        </el-dialog>
      </div>
    </div>
    <!---------------------------------------------------------- 数据栏 ------------------------------------------>
    <el-row class="databaseList">
      <el-table
        :data="databaseList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column
          show-overflow-tooltip
          type="selection"
          width="40"
        ></el-table-column>
    <!---------------------------------------------------------- 数据库名 ------------------------------------------>
        <el-table-column prop="dataName" label="数据库名" width="214">
        </el-table-column>
    <!---------------------------------------------------------- 用户名 ------------------------------------------>
        <el-table-column sortable prop="userName" label="用户名" width="115">
        </el-table-column>
    <!---------------------------------------------------------- 数据库类型 ------------------------------------------>
        <el-table-column
          sortable
          prop="databaseType"
          label="数据库类型"
          width="112"
        >
        </el-table-column>
    <!---------------------------------------------------------- 密码 ------------------------------------------>
        <el-table-column prop="password" label="密码" width="112" show-password>
          <template slot-scope="scope">
            <span ref="copy">{{databaseList[scope.$index].password|password(databaseList[scope.$index].passFlag)}}</span>
            <i style="margin-left: 5px;cursor: pointer" class="el-icon-view" @click="databaseList[scope.$index].passFlag = !databaseList[scope.$index].passFlag"></i>
            <i style="margin-left: 5px;cursor: pointer" class="el-icon-document-copy" @click="copyText('copy')"></i>
          </template>
        </el-table-column>
    <!---------------------------------------------------------- 备份 ------------------------------------------>
        <el-table-column label="备份" width="124">
          <template slot-scope="scope">
            <el-button  @click="databaseList[scope.$index].dialog.dialogBackup = true" type="text" size="small">点击备份</el-button>
            <el-dialog
              title="数据备份详情"
              :visible.sync="databaseList[scope.$index].dialog.dialogBackup"
              width="50%"
              :append-to-body="true"
              @close="databaseList[scope.$index].dialog.dialogBackup = false">
              <el-button type="success" size="small">备份</el-button>
              <el-table :data="databaseBackup" style="border: 1px solid #ececec;margin: 15px 0">
                <el-table-column label="文件名"></el-table-column>
                <el-table-column label="文件大小"></el-table-column>
                <el-table-column label="备份时间"></el-table-column>
                <el-table-column align="right" label="操作"></el-table-column>
              </el-table>
              <div class="backupLength">
                <div>
                  <span>1</span>
                  <span>共<span>1</span>条数据</span>
                </div>
              </div>
            </el-dialog>
            <el-button @click="databaseList[scope.$index].dialog.dialogImport = true" type="text" size="small">导入</el-button>
            <el-dialog
              title="从文件导入数据库"
              :visible.sync="databaseList[scope.$index].dialog.dialogImport"
              width="45%"
              :append-to-body="true"
              @close="databaseList[scope.$index].dialog.dialogImport = false">
              <el-button size="small">从本地上传</el-button>
              <div style="min-height: 350px">
                <el-table :data="databaseBackup" style="border: 1px solid #ececec;margin: 15px 0">
                  <el-table-column label="文件名"></el-table-column>
                  <el-table-column label="文件大小"></el-table-column>
                  <el-table-column label="备份时间"></el-table-column>
                  <el-table-column align="right" label="操作"></el-table-column>
                </el-table>
              </div>
              <div class="dialogImport-bottom">
                <p> · 仅支持sql、zip. (tar.gzlgzltgz)</p>
                <p> · zip. tar.gz压缩包结构: test.zip或test.tar.gz压缩包内，必需包含test.sql</p>
                <p> · 若文件过大，您还可以使用SFTP工具，将数据库文件上传到C:/backup/database</p>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
    <!---------------------------------------------------------- 备注 ------------------------------------------>
        <el-table-column
          prop="remarks"
          label="备注"
          width="177"
        ></el-table-column>
    <!---------------------------------------------------------- 操作 ------------------------------------------>
        <el-table-column align="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small">管理</el-button>
    <!---------------------------------------------------------- 权限 ------------------------------------------>
            <el-button type="text" size="small" @click="databaseList[scope.$index].dialog.dialogPower = true">权限</el-button>
            <el-dialog
              title="设置数据库权限"
              :visible.sync="databaseList[scope.$index].dialog.dialogPower"
              width="30%"
              center
              @close="databaseList[scope.$index].dialog.dialogPower = false"
            >
              <span>访问权限 </span>
              <el-dropdown>
                <el-button trigger="click">
                  本地服务器<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>所有人</el-dropdown-item>
                  <el-dropdown-item>指点IP</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span slot="footer">
                <el-button @click="databaseList[scope.$index].dialog.dialogPower = false">关闭</el-button>
                <el-button type="primary" @click="databaseList[scope.$index].dialog.dialogPower = false"
                  >提交</el-button
                >
              </span>
            </el-dialog>
    <!---------------------------------------------------------- 工具 ------------------------------------------>
            <el-button type="text" size="small" @click="databaseList[scope.$index].dialog.dialogTool = true">工具</el-button>
            <el-dialog
              center
              title="MySQL工具箱【nevergiveup_icu】"
              :visible.sync="databaseList[scope.$index].dialog.dialogTool"
              width="65%"
              @close="databaseList[scope.$index].dialog.dialogTool = false"
              >
              <el-row>
                <p style="display:inline-block;padding: 5px 8px;background: #ECECEC;font-weight:800;">
                  数据库名称:
                  <span>{{databaseList[scope.$index].dataName}}</span>
                  大小:
                  <span>{{databaseList[scope.$index].databaseSize}}</span>
                </p>
              </el-row>
              <el-row>
                <el-table :data="databaseList[scope.$index].MySQLTool" style="border: 1px solid #ddd;margin: 15px 0">
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column prop="name" label="表名" width="200"></el-table-column>
                  <el-table-column prop="engine" label="引擎" width="80"></el-table-column>
                  <el-table-column prop="charset" label="字符集" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="line" label="行数" width="80"></el-table-column>
                  <el-table-column prop="size" label="大小" width="80"></el-table-column>
                  <el-table-column align="right" label="大小" width="235">
                    <template>
                      <el-button size="small" type="text">修复</el-button>
                      <el-button size="small" type="text">优化</el-button>
                      <el-button size="small" type="text">转为lnnoDB</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <p>•【修复】尝试使用REPAIR命令修复损坏的表，仅能做简单修复，若修复不成功请考虑使用myisamchk工具</p>
                <p>•【优化】执行OPTIMIZE命令，可回收未释放的磁盘空间，建议每月执行一次</p>
                <p>•【转为InnoDB/MylSAM】转换数据表引擎，建议将所有表转为InnoDB</p>
              </el-row>
            </el-dialog>
    <!---------------------------------------------------------- 改密 ------------------------------------------>
            
            <el-button type="text" size="small" @click="databaseList[scope.$index].dialog.dialogPass = true">改密</el-button>
            <el-dialog
              center
              title="修改数据库密码"
              :visible.sync="databaseList[scope.$index].dialog.dialogPass"
              width="40%"
              @close="databaseList[scope.$index].dialog.dialogPass = false"
              @open="templateData.password = databaseList[scope.$index].password"
            >
              <el-form :model="userData" class="userData" label-width="70px">
                <el-form-item label="用户名">
                  <el-input v-model="databaseList[scope.$index].userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="databaseList[scope.$index].password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer">
                <el-button @click="cancelSave(scope.$index)">关闭</el-button>
                <el-button type="primary" @click="databaseList[scope.$index].dialog.dialogPass = false">提交</el-button>
              </span>
            </el-dialog>
    <!---------------------------------------------------------- 删除 ------------------------------------------>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, databaseList)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!---------------------------------------------------------- 表格下方按钮栏 ------------------------------------------>
    <div class="bottomButton">
      <div class="bottomButton-left">
        <el-button size="small" >同步选择</el-button>
        <el-button size="small" >同步所有</el-button>
        <el-button size="small" >从服务器获取</el-button>
      </div>
      <div class="bottomButton-right">
        <div>
          <span>1</span>
          <span>共<span>1</span>条数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase } from '../../api/api'
export default {
  name: "Database",
  mounted () {
    Promise.resolve(getDatabase())
    .then(msg => {
      console.log(msg);
      this.databaseList = msg.databaseList
    })
  },
  data() {
    return {
      databaseFormRules: {
        DatabaseName: [
          {required: true, message: '请输入数据库名称', trigger: 'blur'},
          {min: 3, max: 16, message: '长度为3-16位，不能为特殊字符', trigger: 'blur'}
        ],
        DatabaseUsername: [
          {required: true, message: '请输入数据库用户名', trigger: 'blur'},
          {min: 3, max: 16, message: '长度为3-16位，不能为特殊字符', trigger: 'blur'}
        ],
        Databasepass: [
          {required: true, message: '请输入数据库密码', trigger: 'blur'},
          {min: 3, max: 16, message: '长度为3-16位，不能为特殊字符', trigger: 'blur'}
        ]
      },
      templateData:{
        password: '',
      },
      addDatabaseForm: {//添加数据库
        DatabaseName: '',
        DatabaseUsername: '',
        Databasepass: 'hrtu13x84rkd',
        DatabaseType: 'MySQL',
        DatabaseRelevance: '不关联',
        DatabasePower: '本地服务器',
        nameUnicode: 'utf-8'
      },
      dialogList: {//弹出框状态列表
        dialogRecycle: false,
        dialogAdd: false,
        dialogRoot: false,
        dialogSa: false,
      },
      userData: {//用户信息
        username: 'nevergiveup_icu',
        password: '123456789',
        userRootPass: 'g513d1fre6h51f',
        userSaPass: '',
      },
      databaseBackup: [//备份列表
        {
          id: "1",
        }
      ],
      databaseList: [//数据库信息列表
      ],
    };
  },
  filters: {//密码显示切换
    password (value, flag) {
      return flag ? value : new Array(value.length).join('*')
    }
  },
  methods: {
    deleteRow(index, rows) {//删除行
      rows.splice(index, 1);
      console.log(index, rows);
    },
    handleSelectionChange(val) {//选择行
      this.multipleSelection = val;
    },
    onSubmit () {//添加数据库
      let database = {};
      database.id = Date.now();
      database.dialog = {//弹出框状态列表
            dialogTool: false,        
            dialogPower: false,
            dialogPass: false,
            dialogBackup: false,
            dialogImport: false,
      };
      database.dataName = this.addDatabaseForm.DatabaseName;
      database.userName = this.addDatabaseForm.DatabaseUsername;
      database.databaseType = this.addDatabaseForm.DatabaseType;
      database.password = this.addDatabaseForm.Databasepass;
      database.passFlag = false;
      database.remarks = this.addDatabaseForm.DatabaseUsername;
      database.accessRight = this.addDatabaseForm.DatabasePower;
      database.MySQLTool = [//数据库工具箱
            {
              name: 'wp_commentmeta',
              engine: 'MyISAM',
              charset: 'utf8mb4_unicode_ci',
              line: 0,
              size: '0.00b',
            },
            {
              name: 'wp_comments',
              engine: 'MyISAM',
              charset: 'utf8mb4_unicode_ci',
              line: 0,
              size: '308.00b',
            },
            {
              name: 'wp_links',
              engine: 'MyISAM',
              charset: 'utf8mb4_unicode_ci',
              line: 0,
              size: '0.00b',
            },
            {
              name: 'wp_options',
              engine: 'MyISAM',
              charset: 'utf8mb4_unicode_ci',
              line: 155,
              size: '548.70kb',
            },
      ];
      database.databaseSize = "881.61KB";
      this.databaseList.push(database);
      this.dialogList.dialogAdd = false;//关闭对话框
    },
    cancelSave (index) {//修改密码取消保存还原密码
      this.databaseList[index].password = this.templateData.password;
      this.databaseList[index].dialog.dialogPass = false;
    },
    resetForm () {//添加数据库取消后清空表单
      this.dialogList.dialogAdd = false;
      this.$refs['databaseForm'].resetFields();
    },
    copyText (ele) {//参数为需要复制的文本节点ref
    //window.getSelection返回selection一个对象，表示用户选择的文本范围或光标的当前位置
    let selection = window.getSelection();
    //清楚其他选中状态
    selection.removeAllRanges();
    //Range 接口表示一个包含节点与文本节点的一部分的文档片段
    //这里创建一个range
    let range = document.createRange();
    //获取元素节点内容并选择
    range.selectNodeContents(this.$refs[ele]);
    selection.addRange(range)
    //复制步骤，copy为浏览器命令
    if(document.execCommand('copy', true)){
        this.$message({
            type:'success',
            message:'已成功复制到剪贴板'
        })
    }
    //activeElement 只读属性，用来返回当前在DOM中处于聚焦状态的Element
    document.activeElement.focus();
    //清楚选中状态
    selection.removeAllRanges();
}
  },
};
</script>

<style lang="less" scoped>
* {
  font-size: 12px;
}
.el-button {
  margin-right: 5px;
}

.backupLength {
  text-align: center;
  height: 32px;

  >div{
    padding: 8px 8px 8px 0;
    border: 1px solid #ececec;
    float: right;

    >span:first-child {
      color: #fff;
      width: 30px;
      background: #20A53A;
    }

    >span {
      padding: 8px;
    }
  }
}

.dialogImport-bottom {
  position: absolute;
  bottom: 0;
  left: 15px;
  margin-bottom: 15px;
}


.app-database {
  background: #fff;
  margin: 15px;
  padding: 15px;

  .topButton {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }

  .bottomButton {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .bottomButton-right{
      text-align: center;
      border: 1px solid #ececec;

      >div{
        display: flex;
        justify-content: space-between;

        >span:first-child {
          color: #fff;
          width: 30px;
          background: #20A53A;
        }

        >span {
          padding: 8px;
        }
      }

    }
  }

  .info-title {
    margin-bottom: 15px;
    background-color: #fbfbfb;
    border: 1px solid #eee;
    line-height: 46px;
    padding-left: 10px;
  }

  .databaseList {
    border: 1px solid #e6e6e6;

    .userData {
      padding-right: 25px;
    }
  }
}
</style>
