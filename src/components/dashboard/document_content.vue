<template>
  <div class="document-index">
    <div class="container">
      <el-table :data="fileData" width="100%" height='100%'>
        <el-table-column prop="checked"  width="40" type="selection" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="" label="" width="40">
          <img src="../../assets/ftp/index.png" alt="" />
        </el-table-column>
        <el-table-column
          prop="filename"
          label="文件名"
          width="400"
          size="medium"
          sortable
        >
        </el-table-column>
        <el-table-column prop="filesize" label="大小(KB)" width="200">
        </el-table-column>
        <el-table-column prop="filetime" label="修改时间" width="270" sortable>
        </el-table-column>
        <el-table-column prop="authority" label="权限" width="150">
        </el-table-column>
        <el-table-column prop="owner" label="所有者" width="150">
        </el-table-column>
        <el-table-column prop="action" label="操作" width="">
          <p class="active-action" slot-scope="scope">
            <span @click="fileData[scope.$index].action.Directorykilling = true">目录查杀</span>|
							<el-dialog
								title="目录查杀"
								:visible.sync="fileData[scope.$index].action.Directorykilling"
								width="20%">
								<span>目录查杀将包含子目录中的php文件，是否操作?</span>
								<span slot="footer">
									<el-button type="primary" @click="killing()">OK</el-button>
								</span>
							</el-dialog>	
						<span>复制</span>|
						<span>剪切</span>|
						<span>权限</span>|
            <span @click="fileData[scope.$index].action.rename = true">重命名</span>|
							<el-dialog
								title="重命名"
								:visible.sync="fileData[scope.$index].action.rename"
								width="20%">
								<el-input :value="fileData[scope.$index].filename"  size="small" clearable ></el-input>
								<span slot="footer">
									<el-button type="primary" @click="rename()">OK</el-button>
								</span>
							</el-dialog>
						<span @click="fileData[scope.$index].action.compress = true">压缩</span>|
							<el-dialog
								title="压缩"
								:visible.sync="fileData[scope.$index].action.compress"
								width="30%">
								<span slot="footer">
									<el-button type="primary" @click="killing()">OK</el-button>
								</span>
							</el-dialog>
            <span @click="fileData[scope.$index].action.del = true">删除</span>
							<el-dialog
								title=""
								:visible.sync="fileData[scope.$index].action.del"
								width="30%">
								<span>{{fileData[scope.$index].id}}</span>
								<span slot="footer">
									<el-button type="primary" @click="DEL(scope.$index)">OK</el-button>
								</span>
							</el-dialog>
          </p>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import {getDocument} from '../../api/api'
export default {
  name: "",
  data() {
    return {
      fileData: [
      ],
    };
  },
  created() {},
   mounted () {
        Promise.resolve(getDocument()).then((res)=>{
          console.log(res);
          this.fileData = res.data.data
        })
  
   },
  computed: {},
  watch: {},
  methods: {
    killing: function (index) {
      console.log(index);
      this.fileData.Directorykilling = false;
    },
      DEL: function (index) {
      console.log(index);
      this.fileData[index].action.del = false;
      this.fileData.splice(index,1)
    },
  },
};
</script>

<style lang="less" scoped>
.compress{
	width: 300px;
}
.document-index {
  margin-top: 15px;
  width: 100%;
  height: 730px;

  .container {
    padding: 15px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    .el-table {
      border: 1px solid rgb(207, 207, 207);
      // height: 700px;
      .el-table__row {
        &:hover {
          .active-action {
            display: block;
          }
        }
        .active-action {
          width: 100%;
          height: 100%;
          display: none;
          span {
            padding: 0 5px;
            color: #10952a;
            cursor: pointer;
            &:hover {
              color: #1c4472;
            }
          }
        }
      }
    }
  }
}
</style>
