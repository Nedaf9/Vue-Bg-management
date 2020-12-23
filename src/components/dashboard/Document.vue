<template>
  <div id="Document">
    <div class="container">
      <div class="root">
        <div class="root-path">
          <i class="el-icon-caret-left"></i>
          <div class="path-content">C:/</div>
          <input type="text" />
          <i class="el-icon-refresh"></i>
        </div>
        <div class="document-size">
          (共17个目录与17个文件,大小:1.44 GB<span>获取</span>)
        </div>
        <div class="document-search">
          <div class="search-all"><input type="checkbox" />包含子目录</div>
          <input type="text" class="search-content" />
          <button class="search">
            <i class="el-icon-search" style="color: #fff"></i>
          </button>
        </div>
      </div>
      <div class="document-action">
        <div class="fl">
          <button>上传</button>
          <button>远程下载</button>
          <button>新建</button>
          <button>◀</button>
          <button>刷新</button>
          <button>分享列表</button>
          <button>收藏夹</button>
          <p>🔲C:/(25.28GB)</p>
        </div>
        <div class="fr">
          <button>🔳回收站</button>
        </div>
      </div>
      <div class="document-index">
        <table class="index-head">
          <tr>
            <th width="30">
              <input type="checkbox" class="select-all" name="" id="" />
            </th>
            <th width="429">文件名</th>
            <th width="209">大小</th>
            <th width="384">修改时间</th>
            <th width="115">权限</th>
            <th width="149">所有者</th>
            <th width="300">操作</th>
          </tr>
        </table>
        <div class="document-content">
          <table
            class="index-head"
            style="margin-top: -40px; box-shadow: none"
            height="1000px"
          >
            <thead>
              <tr class="d-item-height">
                <th width="30">
                  <input type="checkbox" class="select-all" name="all" id="" />
                </th>
                <th width="429">文件名</th>
                <th width="209">大小</th>
                <th width="384">修改时间</th>
                <th width="115">权限</th>
                <th width="149">所有者</th>
                <th width="300">操作</th>
              </tr>
            </thead>

            <!-- 循环root根目录 -->
            <tbody>
              <tr class="d-item-height">
                <td>
                  <input type="checkbox" class="select-all" name="" id="" />
                </td>
                <td>
                  <img src="../../assets/ftp/index.png" alt="" /><span
                    class="file-name"
                    >秩序</span
                  >
                </td>
                <td>100MB</td>
                <td>2020:12:22-2020:12:23</td>
                <td>--</td>
                <td>--</td>
                <td>暂无</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <input type="file"> -->
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="less" scoped>
#Document {
  color: #333;
  background-color: #f2f2f2;
  .container {
    padding: 15px;
    width: 100%;
    height: 100vh;
    .root {
      display: flex;
      height: 60px;
      padding: 15px;
      background-color: #ffffff;
      .root-path {
        display: flex;
        width: 60%;
        height: 30px;
        line-height: 30px;
        border: 1px solid rgb(214, 211, 211);
        i {
          display: block;
          line-height: 30px;
          height: 30px;
          width: 3%;
          text-align: center;
          &:hover {
            background-color: #10952a;
            color: #fff;
          }
        }
        .path-content {
          display: block;
          height: 30px;
          width: 94%;
          margin-top: -1px;
          text-indent: 1rem;
          border: 1px solid rgb(214, 211, 211);
          background-color: #f3f3f3;
        }
        input {
          display: none;
          height: 30px;
          width: 94%;
          background-color: #fff;
          border: 1px solid rgb(214, 211, 211);
          margin-top: -1px;
          // border: none;
        }
      }

      .document-size {
        text-indent: 1rem;
        width: 20%;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        span {
          color: #10952a;
        }
      }

      .document-search {
        width: 20%;
        height: 30px;
        border: 1px solid #10952a;
        position: relative;

        .search-all {
          position: absolute;
          top: 10%;
          right: 13%;
          input {
            line-height: 30;
            margin-right: 5px;
          }
        }

        .search-content {
          float: left;
          display: block;
          width: 90%;
          height: 28px;
        }

        .search {
          float: left;
          width: 10%;
          height: 28px;
          border: 1px solid #10952a;
          background-color: #10952a;
        }
      }
    }

    .document-action {
      height: 50px;
      padding: 10px;
      border-top: 1px solid rgb(221, 221, 221);
      border-bottom: 1px solid rgb(221, 221, 221);
      background-color: #fff;
      .fl {
        line-height: 30px;
        display: flex;
        width: 50%;
        float: left;
        button {
          border: 1px solid #eee;
          height: 30px;
          padding: 0 10px;
          margin-right: 10px;
          background-color: #fff;
          &:hover {
            background-color: #10952a;
            color: #fff;
          }
        }
      }
      .fr {
        width: 100px;
        float: right;
        button {
          height: 30px;
          padding: 0 10px;
        }
      }
    }
    .document-index {
      height: 730px;
      // border: 1px solid rgb(207, 207, 207);
      padding: 15px;
      font-size: 12px;
      background-color: #fff;
      .index-head {
        border: 1px solid rgb(207, 207, 207);
        text-align: left;
        width: 100%;
        height: 40px;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: #f6f6f6;
        box-shadow: rgb(207, 207, 207) 0 4px 5px -2px;
        .select-all {
          margin-left: 5px;
        }
      }
      .document-content {
        border: 1px solid rgb(207, 207, 207);
        height: 660px;
        overflow: auto;
        .d-item-height {
          height: 40px;
          background-color: #fff;
          border-bottom: 1px solid rgb(207, 207, 207);
          img {
            display: inline-block;
            vertical-align: middle;
          }
          .file-name {
            display: inline-block;
            line-height: 49px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
