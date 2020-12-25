<!--  -->
<template>
  <div class="">
    <div class="my-header">
      <div class="header-left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/', name: 'home' }"
            ><span class="el-icon-s-home"></span>首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>网站管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-right">
        <label for="">
          <input
            type="text"
            class="search-input"
            ref="search"
            v-model="search"
          />
        </label>
        <button class="search-btn" @click="searchIt"></button>
      </div>
    </div>
    <div class="main">
      <div class="tips">
        <span class="warning"></span>
        <p class="tip">
          使用宝塔Windows面板创建站点时会自动创建权限配置，统一使用www用户。建站成功后，请在<a
            href="/#/apps"
            >[计划任务]</a
          >页面添加定时备份任务!
        </p>
      </div>
      <div class="admins clearfix">
        <span class="add" @click="dialogVisible = true">添加站点</span>
        <span class="admin change">修改默认页</span>
        <span class="admin default">默认站点</span>
        <span class="admin type">分类管理</span>
      </div>
      <el-dialog title="添加网站" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="form"
          label-width="80px"
          :label-position="labelPosition"
          style="fontsize: 12px"
          :rules="rules"
          ref="creatForm"
        >
          <el-form-item label="域名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.mark"></el-input>
          </el-form-item>
          <el-form-item label="根目录" prop="root">
            <el-input v-model="form.root"></el-input>
          </el-form-item>
          <el-form-item label="程序类型" prop="type">
            <div class="dropdownBox">
              <el-select placeholder="程序类型" v-model="form.type">
                <el-option label="PHP-54" value="PHP-54"></el-option>
                <el-option label="ASP" value="ASP"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('creatForm')"
              >立即创建</el-button
            >
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="table">
        <el-table
          header-cell-class-name="pageTableStyle"
          :data="tableData"
          cell-class-name="cellStyle"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column label="网站名" width="150" prop="name">
          </el-table-column>
          <el-table-column label="状态" width="100" prop="status">
          </el-table-column>
          <el-table-column label="备份" width="90">
            <a @click="dialogVisible2 = true" class="backup">点击备份</a>
          </el-table-column>
          <el-table-column label="程序类型" width="90" prop="type">
          </el-table-column>
          <el-table-column label="根目录" width="450" prop="root">
          </el-table-column>
          <el-table-column label="到期时间" width="90" prop="time">
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <div class="markBox">
                <p class="mark">{{ scope.row.mark }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="100">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                @click="handleRemove(scope.$index, tableData)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose"
      >
        <span>是否确定备份</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { pages } from "../../api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      getData: [],
      tableData: [],
      search: "",
      dialogVisible: false,
      dialogVisible2:false,
      labelPosition: "left",
      form: {
        name: "",
        mark: "",
        root: "",
        type: "",
      },
      rules: {
        name: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
        root: [{ required: true, message: "请输入节点地址", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleRemove: function (index, list) {
      list.splice(index, 1);
    },
    searchIt: function () {
      let newArr = [];
      let _this = this;
      this.getData.map(function (item) {
        if (item.name.indexOf(_this.search.trim()) !== -1) {
          newArr.push(item);
        }
      });
      this.tableData = newArr;
    },
    cancel: function () {
      this.dialogVisible = false;
      for (var key in this.form) {
        this.form[key] = "";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.time = "永久";
          this.form.status = "未运行";
          let newData = JSON.parse(JSON.stringify(this.form));
          this.tableData.push(newData);
          this.dialogVisible = false;
          for (var key in this.form) {
            this.form[key] = "";
          }
        } else {
          return false;
        }
      });
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.getData = (await pages()).data;
    this.tableData = this.getData;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.cellStyle {
  font-size: 12px;
}
.pageTableStyle {
  font-size: 12px;
  background-color: #ddd !important;
  padding: 0 !important;
}
.markInput {
  display: none;
}
.dropdownBox {
  height: 50px;
  line-height: 50px;
  margin-bottom: 22px;
}
.backup{
  cursor: pointer;
}
</style>
<style lang='less' scoped>
.clearfix:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.clearfix {
  zoom: 1;
}
.my-header {
  height: 52px;
  margin: 15px;
  background: #fff;
  line-height: 52px;
  font-size: 12px;
  padding: 0 15px;
  .header-left {
    float: left;
    .el-breadcrumb {
      height: 52px;
      line-height: 52px;
      .el-icon-s-home {
        font-size: 20px;
        display: block;
        float: left;
        margin-top: 15px;
      }
    }
  }
  .header-right {
    float: right;
    margin-top: 12px;
    .search-input {
      width: 214px;
      height: 28px;
      line-height: 28px;
      padding: 0 8px;
      border: 1px solid #20a53a;
      outline: none;
      float: left;
    }
    .search-btn {
      height: 28px;
      width: 38px;
      border: none;
      outline: none;
      float: left;
      cursor: pointer;
      background: no-repeat #20a53a 10px 6px
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAxAAAAMQBz4pYTAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAE2SURBVDiNndJBS1VRFMXx9UzNQUQD0caFk6YhEUFCOPETiJQfIygQbNQgCCeOGjYLGjRJkPoKoSGIRKADs1nQoEIEfw3cry6v+3oPN2z2ufuu8z/7nruC9ORNvMRXHOIFbrTogjQfOniKX87iR2P9HSv/A1zA+xK/wRwmMYV5vKt3r/sBnpTgcb9R8aw0D3sB1/GzTum3uZsfSnupCVgr8vwQgKXSLnR7I0nuJJFkN4PjY9WZbmMkyXGtx4YAjFY9aQI2knSS3B4CMFd1508HV3CE3QHfP17G2sdo7298UJfzChMtmy9jszTLbT4InpfgCx6Vme5hFd/8jW1cbQME93Hg39jDYmOKT5hGOmi7rNkk15KcJvmcZKv6E0k2k9xNsp1keZBx2vIi3tYkG+cBxJmV13HrN6Szg7ZCfX3NAAAAAElFTkSuQmCC");
    }
  }
}
.main {
  background-color: #fff;
  margin: 15px;
  padding: 15px;
  .tips {
    padding: 0 15px;
    height: 46px;
    line-height: 44px;
    background-color: #fbfbfb;
    border: 1px solid #ddd;
    .warning {
      color: #f39c12;
      margin-right: 10px;
      float: left;
      &:before {
        content: "\26A0";
      }
    }
    .tip {
      font-size: 12px;
      a {
        cursor: pointer;
      }
    }
  }
  .admins {
    margin-top: 15px;
    font-size: 12px;
    .add {
      display: block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: #20a53a;
      border-radius: 4px;
      float: left;
      color: #fff;
      margin-left: 10px;
      cursor: pointer;
    }
    .admin {
      cursor: pointer;
      margin-left: 10px;
      display: block;
      height: 30px;
      line-height: 28px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      float: left;
      &:hover {
        background-color: #20a53a;
        color: #fff;
      }
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>