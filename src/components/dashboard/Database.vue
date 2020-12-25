<template>
  <div class="app-database">
    <el-row class="info-title">
      <p>
        请在添加数据库后，务必到<a href="javascript:;">[计划任务]</a
        >页面添加定时备份任务，以确保您的数据安全。
      </p>
    </el-row>
    <div></div>
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
        <el-table-column prop="dataName" label="数据库名" width="214">
        </el-table-column>
        <el-table-column sortable prop="userName" label="用户名" width="115">
        </el-table-column>
        <el-table-column
          sortable
          prop="databaseType"
          label="数据库类型"
          width="112"
        >
        </el-table-column>
        <el-table-column prop="password" label="密码" width="112">
        </el-table-column>
        <el-table-column label="备份" width="114">
          <template>
            <el-button type="text" size="small">点击备份</el-button>
            <el-button type="text" size="small">导入</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="177"
        ></el-table-column>
        <el-table-column align="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text" size="small">管理</el-button>
            <el-button type="text" size="small" @click="dialogPower = true">权限</el-button>
            <el-dialog
              title="设置数据库权限"
              :visible.sync="dialogPower"
              width="30%"
              center
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
                <el-button @click="dialogPower = false">关闭</el-button>
                <el-button type="primary" @click="dialogPower = false"
                  >提交</el-button
                >
              </span>
            </el-dialog>
            <el-button type="text" size="small" @click="dialogTool = true">工具</el-button>
            <el-dialog
              center
              title="MySQL工具箱【nevergiveup_icu】"
              :visible.sync="dialogTool"
              width="45%">
              <span></span>
              <span slot="footer">
                <el-button @click="dialogTool = false">Cancel</el-button>
                <el-button type="primary" @click="dialogTool = false">OK</el-button>
              </span>
            </el-dialog>
            
            <el-button type="text" size="small" @click="dialogPass = true">改密</el-button>
            <el-dialog
              center
              title="修改数据库密码"
              :visible.sync="dialogPass"
              width="40%"
            >
              <el-form :model="userData" class="userData" label-width="70px">
                <el-form-item label="用户名">
                  <el-input v-model="userData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="userData.password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer">
                <el-button @click="dialogPass = false">关闭</el-button>
                <el-button type="primary" @click="dialogPass = false">提交</el-button>
              </span>
            </el-dialog>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, databaseList)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Database",
  data() {
    return {
      dialogPower: false,
      dialogPass: false,
      dialogTool: false,
      userData: {
        username: 'nevergiveup_icu',
        password: '123456789'
      },
      databaseList: [
        {
          id: "1",
          dataName: "nevergiveup_icu",
          userName: "nevergiveup_icu",
          databaseType: "MySQL",
          password: "123123",
          remarks: "nevergiveup.icu",
          accessRight: "本地服务器",
        },
      ],
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log(index, rows);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less" scoped>
* {
  font-size: 12px;
}
.app-database {
  background: #fff;
  margin: 15px;
  padding: 15px;

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
