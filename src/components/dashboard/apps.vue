<!--  -->
<template>
  <div>
    <div class="my-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/', name: 'home' }"
          ><span class="el-icon-s-home"></span>首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>软件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="search">
        <div class="clearfix search-out">
          <label for="">
            <span class="search-title">应用搜索</span>
            <input type="text" class="search-input" v-model="search" ref="search"/>
          </label>
          <button class="search-btn" @click="searchIt"></button>
        </div>
        <div class="appType clearfix" @click="handleChangeType">
          <span class="search-title">应用分类</span>
          <div class="appItem active" typeId="1">全部</div>
          <div class="appItem" typeId="2">已安装</div>
          <div class="appItem" typeId="3">运行环境</div>
          <div class="appItem" typeId="4">系统工具</div>
          <div class="appItem" typeId="5">宝塔插件</div>
          <div class="appItem" typeId="6">专业版插件</div>
          <div class="appItem" typeId="7">企业版插件</div>
          <div class="appItem" typeId="8">第三方应用</div>
          <div class="appItem" typeId="9">一键部署</div>
          <div class="updateList" @click="updateList">更新软件列表</div>
        </div>
      </div>
      <div class="ads">
        <div class="top-ads">
          <div class="ad"><a href="#" class="a">这里是广告</a></div>
          <div class="ad"><a href="#" class="a">这里是广告</a></div>
          <div class="ad"><a href="#" class="a">这里是广告</a></div>
        </div>
        <div class="bottom-ad"><a href="#" class="a">这里是广告</a></div>
      </div>
      <div class="table">
        <el-table
          style="width: 100%"
          header-cell-class-name="tableStyle"
          :data="tableData"
          cell-class-name="cellStyle"
        >
          <el-table-column
            label="软件名称"
            width="168"
            prop="title"
          ></el-table-column>
          <el-table-column
            label="开发商"
            width="92"
            prop="author"
          ></el-table-column>
          <el-table-column label="说明" width="937" prop="ps"></el-table-column>
          <el-table-column
            label="价格"
            width="72"
            prop="price"
          ></el-table-column>
          <el-table-column
            label="到期时间"
            width="120"
            prop="endtime"
          ></el-table-column>
          <el-table-column
            label="位置"
            width="44"
            prop="install_checks"
          ></el-table-column>
          <el-table-column
            label="状态"
            width="44"
            prop="status"
          ></el-table-column>
          <el-table-column label="首页显示" width="70" prop="show">
            <template slot-scope="props">
              <el-switch
                v-model="props.row.show"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" prop="setup">
            <template>
              <span class="install" @click="dialogVisible = true">安装</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="安装软件" :visible.sync="dialogVisible" width="30%">
        <p>是否确认安装？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
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
import { apps } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      getData: [],
      tableData: [],
      dialogVisible: false,
      typeId:'',
      search:""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChangeType: function (e) {
      if (e.target.className === "appItem") {
        document.querySelectorAll(".appItem").forEach(function (item) {
          item.classList.remove("active");
        });
        e.target.classList.add("active");
        this.typeId = e.target.getAttribute("typeId");
        switch (this.typeId) {
          case "1":
            this.tableData = this.getData;
            break;
          case "2":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 1) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "3":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 2) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "4":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 3) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "5":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 4) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "6":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 5) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "7":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 6) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "8":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 7) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "9":
            var newArr = [];
            this.tableData = newArr;
            break;
        }
      }
    },
    updateList: async function () {
      this.getData = (await apps()).all;
      this.tableData = this.getData;
      switch (this.typeId) {
          case "1":
            this.tableData = this.getData;
            break;
          case "2":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 1) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "3":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 2) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "4":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 3) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "5":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 4) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "6":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 5) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "7":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 6) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "8":
            var newArr = [];
            this.getData.map(function (item) {
              if (item.type == 7) {
                newArr.push(item);
              }
            });
            this.tableData = newArr;
            break;
          case "9":
            var newArr = [];
            this.tableData = newArr;
            break;
        }
    },
    searchIt:function(){
        let newArr = []
        let _this = this
        this.getData.map(function(item){          
            if(item.title.indexOf(_this.search.trim())!==-1){
                newArr.push(item)
            }
        })
        this.tableData = newArr
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.getData = (await apps()).all;
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
<style>
.tableStyle {
  padding: 8px 0 !important;
  font-size: 12px;
}
.cellStyle {
  font-size: 12px;
}
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
</style>
<style lang='less' scoped>

.search-title {
  font-size: 14px;
  margin-right: 20px;
  float: left;
  display: block;
  height: 28px;
  line-height: 28px;
}
.my-header {
  height: 52px;
  margin: 15px;
  background: #fff;
  line-height: 52px;
  font-size: 12px;
  padding: 0 15px;
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
.active {
  background: #20a53a !important;
  color: #fff;
}

.main {
  margin: 0 15px;
  background-color: #fff;
  .search {
    height: 121px;
    padding: 20px 15px;
    border-bottom: 1px solid #ccc;
    .search-out {
      margin-bottom: 20px;
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
    .appType {
      .appItem {
        height: 30px;
        padding: 0 20px;
        background-color: #ededed;
        font-size: 12px;
        float: left;
        line-height: 30px;
        margin-right: 15px;
        cursor: pointer;
      }
      .updateList {
        height: 30px;
        padding: 0 10px;
        border-radius: 2px;
        border: 1px solid #ccc;
        float: right;
        font-size: 12px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          background-color: #20a53a;
          color: #fff;
        }
      }
    }
  }
  .ads {
    padding: 0 15px;
    margin-top: 15px;
    .top-ads {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .ad {
        height: 60px;
        background: #cae2bf;
        border-radius: 4px;
        border: 1px solid #c2d8ae;
        width: 32%;
        .a {
          height: 100%;
          width: 100%;
          display: block;
          line-height: 58px;
          font-size: 24px;
          color: #fff;
          text-align: center;
        }
      }
    }
    .bottom-ad {
      height: 60px;
      background: #cae2bf;
      border-radius: 4px;
      border: 1px solid #c2d8ae;
      .a {
        height: 100%;
        width: 100%;
        display: block;
        line-height: 58px;
        font-size: 24px;
        color: #fff;
        text-align: center;
      }
    }
  }
  .table {
    box-sizing: content-box;
    margin: 0 15px;
    margin-top: 15px;
    border: 1px solid #ccc;
    .install {
      font-size: 12px;
      color: #20a53a;
      cursor: pointer;
    }
  }
}
</style>