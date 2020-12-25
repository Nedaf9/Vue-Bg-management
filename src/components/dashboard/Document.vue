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
          <button @click="upload = true">上传</button>                       <!-----------------------上传 ----------------------->
            <el-dialog
              title="上传"
              :visible.sync="upload"
              width="30%"
              @close="upload">
              <hr style="margin: -30px 0 20px 0" />
              <span></span>
              <span slot="footer">
                <el-button @click="upload = false">Cancel</el-button>
                <el-button @click="uploading">OK</el-button>
              </span>
            </el-dialog>
            
          <button @click="remote_download = true">远程下载</button>            <!-----------------------远程下载 ----------------------->
            <el-dialog
              title="远程下载"
              :visible.sync="remote_download"
              width="30%"
              @close="remote_download">
              <hr style="margin: -30px 0 20px 0" />
              <el-form  label-width="100px" :inline="false" size="normal">
                <el-form-item label="URL地址：">
                  <el-input value="http://"></el-input>
                </el-form-item>
                <el-form-item label="下载到：">
                  <el-input  value="C:/Users/Administrator"></el-input>
                </el-form-item>
                <el-form-item label="文件名：">
                  <el-input  placeholder="保存文件名"></el-input>
                </el-form-item>
              </el-form>
              
              <span slot="footer">
                <el-button @click="remote_download = false">Cancel</el-button>
                <el-button @click="remoteDownload">OK</el-button>
              </span>
            </el-dialog>
          <button class="new" @click="newList1">新建                                   <!----------------------新建 ----------------------->
              <ul v-show='newlist' class="newlist">
                <li>新建空白文件</li>
                <li>新建目录</li>
              </ul>
          </button>
          
          
          <button>◀</button>
          <el-button @click="openFullScreen2" >刷新</el-button>                                                     <!-----------------------刷新 ----------------------->                                 
          <button @click="share_list = true">分享列表</button>
            <el-dialog
              title="分享列表"
              :visible.sync="share_list"
              width="30%"
              @close="share_list">
              <span></span>
              <span slot="footer">
                <el-button @click="share_list = false">Cancel</el-button>
                <el-button @click="shareList">OK</el-button>
              </span>
            </el-dialog>
          <button class="new" @click="Favorite">收藏夹
            <ul v-show='favorite' class="newlist">
                <li class="listclass">💠默认分类 ▶
                  <div class="list-tip">暂无分类</div> <!--分类列表数据-->
                </li>
                <li>+ 管理</li>
            </ul>
          </button>
          <p>🔲C:/(25.28GB)</p>
        </div>
        <div class="fr">
          <button>🔳回收站</button>
        </div>
      </div>
      <document_content></document_content>
    </div>
    
  </div>
</template>

<script>
import document_content from './document_content'
export default {
  name: "",
  data() {
    return {
      openFullScreen:false,
      upload:false,    //上传   
      remote_download:false, //远程下载
      new:false,      //新建
      newlist:false,
      share_list:false,   //分享列表
      favorite:false,  //收藏夹
    };
  },
  created() {},
  mounted() {
    
  },
  computed: {

  },
  watch: {},
  methods: {
     openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
     },

    newList1:function(){
      this.newlist = !this.newlist  
        let _this = this
        document.onclick = function(e){
        if(e.target.className != 'new'){
        _this.newlist = false  
        }  
      }

    },
    Favorite:function(){
      this.favorite = !this.favorite
      let _this = this
      document.onclick = function(e){
        if(e.target.className != 'new'){
        _this.favorite = false  
        }  
      }
    },
    

    uploading:function(){
      console.log('上传');
    },
    remoteDownload:function(){
      console.log('下载');
    },
    shareList:function(){
      console.log('分享');
    },
  },
  components:{
    document_content
  }
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
        .new{
          position: relative;
          .newlist{
            background-color: #fff;
            z-index: 99;
            border: 1px solid rgb(221, 221, 221);
            width: 140px;
            height: 60px;
            position: absolute;
            top: 32px;
            left: 0px;
            border-radius: 4px;
              box-shadow: rgb(156, 154, 154) 0 0px 0px 0px;
            .listclass{
              position: relative;
              .list-tip{
                display: none;
                background-color: #fff;
                z-index: 99;
                border: 1px solid  rgb(221, 221, 221);
                position: absolute;
                top: 0;
                left: 140px;
                width: 100px;
                min-height: 30px;
              }
              &:hover{
                .list-tip{
                  display:block;
                }
              }
            };
            li{
              list-style: none;
              text-align: left;
              text-indent: 1rem;
              font-size: 14px;
              line-height: 30px;
              color: rgb(156, 154, 154);
              
              &:hover {
           
              color: #10952a;
              }
            }
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
    
  }
}
</style>
