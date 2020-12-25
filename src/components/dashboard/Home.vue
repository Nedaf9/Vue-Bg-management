<template>
  <div class="app-home">
    <div class="app-home-header">
      <div class="header-left">
        <div>
          <span class="userName" v-text="userData.username"></span>
        </div>
        <div>
          <span>系统：</span>
          <span class="systemType" v-text="systemStatus.system"></span>
        </div>
        <div>
          <span>已不间断运行：</span>
          <span class="runTime" v-text="systemStatus.runTime"></span>
        </div>
      </div>
      <div class="header-right">
        <div class="versions">
          <div class="versions-left">
            <span class="specialty"></span>
            <span class="gratis">免费版</span>
          </div>
          <div class="versions-right"><span>6.9.0</span></div>
        </div>
        <a href="javascript:;">更新</a>
        <a href="javascript:;">修复</a>
        <a href="javascript:;">重启</a>
      </div>
    </div>
    <div class="app-home-body">
      <!-------------------------------------------------  状态  -------------------------------------------------------------->
      <div class="status">
        <el-row class="common-hd">状态</el-row>
        <el-row>
          <el-col :span="4" :offset="0">
            <p>CPU使用率</p>
            <el-progress
              type="circle"
              :percentage="parseInt(systemStatus.CPURate)"
              status="success"
              :stroke-width="6"
            ></el-progress>
            <p v-text="systemStatus.CPURate"></p>
          </el-col>
          <el-col :span="4" :offset="0">
            <p>内存使用率</p>
            <el-progress
              type="circle"
              :percentage="50"
              status="success"
              :stroke-width="6"
            ></el-progress>
            <p v-text="systemStatus.RAMRate"></p>
          </el-col>
          <el-col :span="4" :offset="0">
            <p>C:/</p>
            <el-progress
              type="circle"
              :percentage="30"
              status="success"
              :stroke-width="6"
            ></el-progress>
            <p v-text="systemStatus.driver"></p>
          </el-col>
        </el-row>
      </div>
      <!-------------------------------------------------  概览  -------------------------------------------------------------->
      <div class="overview">
        <el-row class="common-hd">概览</el-row>
        <el-row>
          <el-col :span="3">
            <p>网站</p>
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>FTP</p>
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>数据库</p>
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>安全风险</p>
            <p>6</p>
          </el-col>
        </el-row>
      </div>
      <!-------------------------------------------------  底部两栏  -------------------------------------------------------------->
      <div class="bd-bottom">
        <el-row>
      <!-------------------------------------------------  软件  -------------------------------------------------------------->
          <el-col class="software">
            <el-row class="common-hd">软件</el-row>
            <el-row class="software-bd">
              <el-row>
                <el-col :span="6" v-for="item in software" :key="item.id">
                  <el-image :src="item.imgUrl" style="height: 50px;margin: 30px 0 20px;"></el-image>
                  <p v-text="item.name"></p>
                </el-col>
                <el-col :span="6"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
              </el-row>
            </el-row>
          </el-col>
      <!-------------------------------------------------  流量  -------------------------------------------------------------->
          <el-col class="flux">
            <el-row class="common-hd">流量</el-row>
            <el-row class="flux-bd">
              <app-flux></app-flux>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import flux from "../charts/flux";
import {   
  getUserData,
  getSystemStatus,
  getSoftware } from '../../api/api'
export default {
  components: {
    "app-flux": flux,
  },
  mounted () {
    Promise.all([getUserData(),getSystemStatus(),getSoftware()])
    .then(res => {
      this.userData = res[0]
      this.systemStatus = res[1]
      this.software = res[2]
    })
  },
  data() {
    return {
      userData: {
      },
      systemStatus: {
        CPURate: 0
      },
      software: [
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.app-home {
  width: 100%;
  padding: 0 15px;

  .app-home-header {
    height: 52px;
    width: 100%;
    margin: 15px 0;
    background: #fff;
    font-size: 12px;
    padding: 0 15px;
    line-height: 52px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .header-left {
      float: left;

      > :nth-of-type(1),
      > :nth-of-type(2) {
        padding-left: 20px;
      }

      > :nth-of-type(1) {
        background: url("../../assets/home/user.png") no-repeat 0 15px;
      }
      > :nth-of-type(2) {
        background: url("../../assets/home/win.png") no-repeat 0 17px;
      }

      > div {
        float: left;
        margin-right: 20px;
      }
    }

    .header-right {
      float: right;

      > div,
      a {
        float: left;
        margin-right: 15px;

        > div {
          float: left;
          margin-left: 10px;
        }
      }

      .versions {
        .versions-left {
          .specialty {
            background: url("../../assets/home/specialty.png") no-repeat;
            padding: 2px 0 2px 64px;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .app-home-body {
    > div {
      background: #fff;
      margin-bottom: 15px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .common-hd {
      height: 50px;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }

    .status {
      > .el-row {
        padding: 15px;

        > .el-col {
          text-align: center;

          > span {
          }

          .el-progress {
          }
        }
      }
    }

    .overview {
      > .el-row {
        padding: 15px;

        > .el-col {
          width: 200px;
          height: 100px;
          text-align: center;
          line-height: 45px;
          padding: 0 15px;
          margin-left: 20px;
          border: 1px solid #f0f0f0;
          color: #999;
          background: #f9f9f9;

          > :last-child {
            font-size: 26px;
            color: #20a53a;
          }
        }
      }
    }

    .bd-bottom {
      background: #f2f2f2;
      box-shadow: 0 0 0 0 #0000;

      .software {
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: calc(50% - 7.5px);
        .software-bd {
          .el-row .el-col {
            height: 140px;
            text-align: center;
            cursor: pointer;
            border-left: 1px solid #ececfb;
            border-bottom: 1px solid #ececfb;

            > p {
              font-size: 12px;
            }
          }
        }
      }

      .flux {
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-left: 15px;
        width: calc(50% - 7.5px);
        height: 470px;

        .flux-bd {
          height: 100%;
        }
      }
    }
  }
}
</style>