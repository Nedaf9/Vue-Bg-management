<template>
  <div class="myadmin-project">
    <!-- 头部面包屑开始 -->
       <top-header></top-header> 
    <!-- 头部面包屑结束 -->
    <!-- 中间内容部分开始 -->
    <div class="myadmin-project-content">
        <div class="project-content-title">添加计划任务</div>
        <el-form class="form" ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="任务类型" size="normal" class="project-content-form">
                <!-- 任务类型开始 -->
                    <el-select class="form-select" v-model='form.selectName'>
                        <el-option
                            v-for='(item,index) in form.options1'
                            :key='index'
                            :value='item.name'
                        ></el-option>
                    </el-select>
                    <span>任务类型包含以下部分：Shell脚本、备份网站、备份数据库、日志切割、释放内存、访问URL</span>
            </el-form-item>
                <!-- 任务类型结束 -->
            <!-- 任务名称开始 -->
            <el-form-item label="任务名称" size="normal"  prop='name'>
                <el-input class="form-taskName" v-model='form.taskName' :disabled='form.selectName==="备份网站"'></el-input>
            </el-form-item>
            <!-- 任务名称结束 -->
            <!-- 执行周期开始 -->
            <el-form-item label="执行周期" size="normal">
                <el-select v-model='form.execute' class="form-execute">
                    <el-option
                        v-for='(item,index) in form.options2'
                        :key='index'
                        :value='item.name'
                    ></el-option>
                </el-select>
                <el-select v-model='form.day' class="form-execute" style='margin-left:30px' :class="[{hidden:form.execute!=='每星期'}]">
                    <el-option
                        v-for='(item,index) in form.week'
                        :key='index'
                        :value='item.name'
                    ></el-option>
                </el-select>
                <input type='number' class="execute-input" v-model="form.value4" :class="{hidden:form.execute!=='每月'}">
                <span  :class="[{unit:true},{hidden:form.execute!=='每月'}]">日</span>
                <input type='number' class="execute-input" v-model="form.value3" :class="{hidden:form.execute!=='N天'}">
                <span  :class="[{unit:true},{hidden:form.execute!=='N天'}]">天</span>
                <input type='number' v-model="form.value1" :class="[{hidden:form.execute=='每小时'||form.execute=='N分钟'}]" class="execute-input">
                <span :class="[{unit:true},{hidden:form.execute=='每小时'||form.execute=='N分钟'}]">小时</span>
                <input type='number' class="execute-input" v-model="form.value2">
                <span class="unit">分钟</span>
            </el-form-item>
            <!-- 执行周期结束 -->
            <!-- shell脚本开始 -->
            <el-form-item label="脚本内容" size="normal" prop='textarea' :class="{hidden:form.selectName!=='shell脚本'}">
                <el-input type='textarea' :rows='8' class="form-textarea" v-model="form.textarea"></el-input>
            </el-form-item>
            <!-- shell脚本结束 -->
            <!-- 备份网站开始 -->
            <el-form-item label="备份网站" size="normal" :class="{hidden:form.selectName!=='备份网站'}">
                <el-select v-model='form.backupsWebVal'>
                    <el-option
                        v-for='(item,index) in form.backupsWeb'
                        :key='index'
                        :value='item.name'
                    ></el-option>
                </el-select>
                <span style='margin-left:30px;margin-right:10px'>备份到</span>
                <el-select value='服务器磁盘' style='width:120px'>
                    <el-option value='服务器磁盘'></el-option>
                </el-select>
                <span >保留最新</span>
                <input type='number' class="execute-input" v-model="form.newestVal">
                <span class="unit">份</span>
            </el-form-item>
            <el-form-item label="排除规则" size="normal" :class="{hidden:form.selectName!=='备份网站'}">
                <el-input type='textarea' :rows='8'  v-model="form.exclusiveRule"  class="form-textarea"></el-input>
            </el-form-item>
            
            <!-- 备份网站结束 -->
            <el-button type="success" class='button' @click.stop='handleAddTask'>添加任务</el-button>
        </el-form>
    </div>
    <!-- 中间内容部分结束 -->
    <!-- 任务列表开始 -->
    <div class="myadmin-project-footer">
        <div class="project-footer-title">任务列表</div>
        <div class="project-footer-table">
            <el-table :data=tableData>
                <el-table-column type='selection'></el-table-column>
                <el-table-column label='任务名称' prop='name'></el-table-column>
                <el-table-column label='状态' prop='state'>
                    <template>
                        <el-button @click.stop='handleState' class="state" type='text' ref='state'>正常</el-button>
                    </template>
                </el-table-column>
                <el-table-column label='周期' prop='period'></el-table-column>
                <el-table-column label='执行时机' prop='opportunity'></el-table-column>
                <el-table-column label='保存数量' prop='num'></el-table-column>
                <el-table-column label='备份到' prop='backups'></el-table-column>
                <el-table-column label='添加时间' prop='time'></el-table-column>
                <el-table-column label='操作' width='300'>
                    <template slot-scope="scope">
                        <el-button type='text' class="state">执行|</el-button>
                        <el-button type='text' class="state" @click.stop='handleCompile(scope.row)'>编辑|</el-button>
                        <el-button type='text' class="state" @click.stop='handleLog'>日志|</el-button>
                        <el-button type='text' class="state" @click='handleRemoveTodo(scope.$index,scope.row)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 任务列表结束 -->
    <home-footer></home-footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
    import TopHeader from '@/components/dashboard/top-header'
    import HomeFooter from './home-footer'
export default {
    updated(){
        if(this.form.selectName==='备份网站'){
            this.backups = '本地磁盘'
            if(this.form.backupsWebVal==='所有'){
                this.form.taskName = '备份网站[all]'
            }else{
                this.form.taskName = '备份网站[nevergiveup.icu]'
            }
        }
    },
    components:{
        "top-header":TopHeader,
        'home-footer':HomeFooter
    },
    computed:{

    },
    data(){
        return {
            form:{
                selectName:'shell脚本',
                taskName:'',
                execute:'每天',
                textarea:'',
                value1:1,
                value2:30,
                value3:3,
                value4:3,
                newestVal:3,
                backupsWebVal:'nevergiveup.icu[nevergiveup.icu]',
                exclusiveRule:'',
                day:'周一',
                options1:[
                    {
                        id:'1',
                        name:'shell脚本'
                    },
                    {
                        id:'2',
                        name:'备份网站'
                    },
                    {
                        id:'3',
                        name:'备份数据库'
                    },
                    {
                        id:'4',
                        name:'日志切割'
                    },
                    {
                        id:'5',
                        name:'备份目录'
                    },
                    {
                        id:'6',
                        name:'释放内存'
                    },
                    {
                        id:'7',
                        name:'木马查杀'
                    },
                    {
                        id:'8',
                        name:'访问URL'
                    },
                ],
                options2:[
                    {
                        id:1,
                        name:'每天'
                    },
                    {
                        id:2,
                        name:'N天'
                    },
                    {
                        id:3,
                        name:'每小时'
                    },
                    {
                        id:4,
                        name:'N小时'
                    },
                    {
                        id:5,
                        name:'N分钟'
                    },
                    {
                        id:6,
                        name:'每星期'
                    },
                    {
                        id:7,
                        name:'每月'
                    },
                ],
                backupsWeb:[
                    {
                        id:1,
                        name:'所有'
                    },
                    {
                        id:2,
                        name:'nevergiveup.icu[nevergiveup.icu]'
                    },
                ],
                week:[
                    {
                        id:1,
                        name:'周一'
                    },
                    {
                        id:2,
                        name:'周二'
                    },
                    {
                        id:3,
                        name:'周三'
                    },
                    {
                        id:4,
                        name:'周四'
                    },
                    {
                        id:5,
                        name:'周五'
                    },
                    {
                        id:6,
                        name:'周六'
                    },
                    {
                        id:7,
                        name:'周日'
                    },
                ]
            },
            state:'正常',
            stateBoolean:true,
            rules:{
                textarea:[
                    {required:true,message:'脚本内容不能为空',trigger:'blur'}
                ]
            },
            tableData:[],
            saveNum:'',
        }
    },
    methods:{
        handleAddTask:function (){
            if(this.form.taskNmae === ''){
                    this.$message({
                    type:'error',
                    message:'任务名称不能为空',
                })
            }else{
                let date = new Date();
                this.$message({
                    type:'success',
                    message:'添加成功',
                })
                this.tableData.push({
                    name:this.form.taskName,
                    period:this.form.execute,
                    opportunity:this.form.execute + ',' + this.form.value1 + '点' + this.form.value2 + '分' + ' 执行',
                    num:'-',
                    backups:'--',
                    time:date.toLocaleString()
                })
            }
        },
        handleState:function (){
            if(this.stateBoolean){
                this.$confirm('计划任务暂停后将无法继续运行，您真的要停用这个计划任务吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.stateBoolean = !this.stateBoolean
                    this.$message({
                    type: 'success',
                    message: '设置成功'
                });
                 }).catch(() => {});
            }else{
                this.$confirm('该计划任务已停用，是否要启用这个计划任务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.stateBoolean = !this.stateBoolean
                    this.$message({
                    type: 'success',
                    message: '设置成功'
                });
                 }).catch(() => {});
            }
            // if(this.stateBoolean){
            //     this.state = '正常'
            //     console.log(this.state)
            // }else{
            //     this.state = '已停止'
            //     console.log(this.state)
            // }
        },
        handleRemoveTodo:function (index,row){
             this.$confirm('您确定要删除该任务吗?', '删除'+ '[' + row.name + ']', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1)
                    this.$message({
                    type: 'success',
                    message: '删除成功'
                });
                 }).catch(() => {});
        },
        handleLog:function (){
           this.$message({
                type:'error',
                message:'当前日志为空',
            })
        },
        handleCompile:function (){
           
        }
    }
};
</script>

<style lang='less' scoped>
.myadmin-project {
    .unit{
    display: inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    vertical-align: middle;
    border-radius: 4px;
    text-align: center;
    background-color: #F5F5F5;
}
  .hidden{
      display: none;
  }
  padding-bottom: 100px;
  min-height: 100%;
  position: relative;
  padding-left: 10px;
  padding-top: 20px;
  .myadmin-project-content {
      margin-top: 10px;
      background-color: #fff;
      .project-content-title{
          padding-left: 10px;
          height: 50px;
          border-bottom: 1px solid #ddd;
          font-size: 18px;
          line-height: 50px;
          color: #333;
      }
     .form{
         padding-bottom: 50px;
          padding-top: 20px;
          padding-left: 70px;
          .project-content-form{
          font-size: 14px;
          .form-select{
              width: 120px;
          }
          span{
                  margin-left: 20px;
                  color: #aaa
              }
          }
          .form-taskName{
              width: 400px;
          }
          .form-execute{
              width: 120px;
          }
          .form-textarea{
              width: 500px;
          }
          .form-button{
              margin-top: 30px;
          }
          .execute-input{
              width: 60px;
              border:1px solid #dddddd;
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              border-radius: 4px;
              margin-left: 30px;
              text-align: center;
          }
          .button{
                background-color: #20a53a;
                border-color: #20a53a;
                margin-left:77px;
                width: 155px;
                font-size: 13px;
                height: 45px;;
          }
     }
  }
}
.myadmin-project-footer {
      margin-top: 20px;
      font-size: 20px;
      color: #333333;
      background-color: #fff;
      .project-footer-title{
          padding-left: 10px;
          border-bottom: 1px solid #ddd;
          height: 80px;
          line-height: 80px;
      }
      .state{
          cursor: pointer;
          color: green;
      }
  }
</style>