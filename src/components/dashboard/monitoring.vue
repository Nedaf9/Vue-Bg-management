<!--  -->
<template>
  <div class="app-home">
    <!-- 头部 -->
    <div class="monitoring-header">
      <div class="monitoring-header-left">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-house">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">监控</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 监控选项 -->
    <div class="control">
      <span class="open">启动监控</span>
      <el-switch
        v-model="value1"
        active-color="#13ce66"
        class="select1"
      ></el-switch>
      <span class="day">保存天数:</span>
      <el-input-number
        v-model="num"
        controls-position="right"
        :min="1"
        class="count"
      ></el-input-number>
      <el-button class="but1">更改</el-button>
      <div class="clear">
        <el-button class="but2">清空记录</el-button>
      </div>
    </div>
    <!-- 图表 -->
    <div class="bigbox">
      <!--  -->
      <div class="chart">
        <!-- 图1  -->
        <div class="title">
          <h3>CPU</h3>
          <div class="seartime">
            <span class="gt">昨天</span>
            <span class="gt">今天</span>
            <span class="gt">最近7天</span>
            <span class="gt">最近30天</span>
            <div class="ss">
              <span class="tt">自定义时间</span>
            </div>
          </div>
        </div>
        <!-- 插入图表 -->
        <div
          class="monitoring-chart"
          id="mychart"
          :style="{ width: '100%', minHeight: '300px' }"
        ></div>
      </div>
      <!-- 图2  -->
      <div class="chart">
        <div class="title">
          <h3>内存</h3>
          <div class="seartime">
            <span class="gt">昨天</span>
            <span class="gt">今天</span>
            <span class="gt">最近7天</span>
            <span class="gt">最近30天</span>
            <div class="ss">
              <span class="tt">自定义时间</span>
            </div>
          </div>
        </div>
        <div
          class="monitoring-chart"
          id="mychart1"
          :style="{ width: '100%', minHeight: '300px' }"
        ></div>
      </div>
      <!-- 图3  -->
      <div class="chart2">
        <div class="title">
          <h3>磁盘IO</h3>
          <div class="seartime">
            <span class="gt">昨天</span>
            <span class="gt">今天</span>
            <span class="gt">最近7天</span>
            <span class="gt">最近30天</span>
            <div class="ss">
              <span class="tt">自定义时间</span>
            </div>
          </div>
        </div>
        <div
          class="monitoring-chart"
          id="mychart2"
          :style="{ width: '100%', minHeight: '300px' }"
        ></div>
      </div>
      <!-- 图4  -->
      <div class="chart2">
         <div class="title">
          <h3>网络IO</h3>
          <div class="seartime">
            <span class="gt">昨天</span>
            <span class="gt">今天</span>
            <span class="gt">最近7天</span>
            <span class="gt">最近30天</span>
            <div class="ss">
              <span class="tt">自定义时间</span>
            </div>
          </div>
        </div>
        <div
          class="monitoring-chart"
          id="mychart3"
          :style="{ width: '100%', minHeight: '300px' }"
        ></div>
      </div>
    </div>
    <div class="footer">
         宝塔Windows面板 ©2014-2020 宝塔 (bt.cn)
         <a href="#">论坛求助</a>
         |
         <a href="#">使用手册</a>
         |
         <a href="#" class="picture">
            微信公众号
            <div class="photo"></div> 
         </a>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

// import echarts from "echarts";
// let echarts = require("echarts");
import * as echarts from "echarts";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value1: true,
      num: 30,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let mychart = echarts.init(document.getElementById("mychart"));
    let mychart1 = echarts.init(document.getElementById("mychart1"));
    let mychart2 = echarts.init(document.getElementById("mychart2"));
    let mychart3 = echarts.init(document.getElementById("mychart3"));
    //插入图表
    let options = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      // title: {
      //     left: 'center',
      //     text: '大数据量面积图',
      // },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      series: [
        {
          name: "模拟数据",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(255, 70, 131)",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 158, 68)",
              },
              {
                offset: 1,
                color: "rgb(255, 70, 131)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
    mychart.setOption(options);
    mychart1.setOption(options);
    mychart2.setOption(options);
    mychart3.setOption(options);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  lang="less" scoped>
.app-home {
  width: 100%;
  padding: 0 15px;
  background: #eff2f7;
  .monitoring-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 15px 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .monitoring-header-left {
      line-height: 50px;
      padding-left: 30px;
    }
  }
  .control {
    height: 62px;
    background-color: white;
    margin: 15px 0;
    padding: 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .open {
      font-size: 12px;
      font-style: normal;
      color: #555;
      line-height: 32px;
    }
    .select1 {
      margin: 0 45px 0 15px;
    }
    .day {
      color: #555;
      font-size: 12px;
    }
    .count {
      margin-left: 10px;
      width: 147px;
    }
    .but1 {
      margin-left: 8px;
      margin-right: 55px;
    }
    .but1:hover {
      color: white;
      background: rgb(90, 206, 90);
    }
    .clear {
      float: right;
      padding-left: 80px;
      border-left: 1px solid #ccc;
      margin-right: 600px;
      .but2:hover {
        color: white;
        background: rgb(90, 206, 90);
      }
    }
  }
  //图表
  .bigbox {
    margin: 15px 0;
    background-color:  #eff2f7;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    //   height: 900px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-around;
    // 插入图表
    .chart {
      width: 640px;
      height: 395px;
      background-color: white;
      .title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        padding: 0 15px;
        h3 {
          display: inline-block;
          padding: 0 15px;
          font-weight: 450;
        }
        .seartime {
          position: relative;
          z-index: 999;
          margin-top: 10px;
          float: right;
          .gt {
            font-size: 12px;
            padding: 5px 10px;
            border: #ddd 1px solid;
            margin-right: -1px;
            cursor: pointer;
            float: left;
            line-height: 16px;
          }
          .ss {
            display: inline-block;
            position: relative;
            line-height: 16px;
            float: left;
            .tt {
              font-size: 12px;
              padding: 5px 10px;
              border: #ddd 1px solid;
              margin-right: -1px;
              cursor: pointer;
              float: left;
            }
          }
        }
      }
    }
    .chart2 {
      width: 640px;
      height: 395px;
      background-color: white;
      margin-top: 30px;
      .title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        padding: 0 15px;
        h3 {
          display: inline-block;
          padding: 0 15px;
          font-weight: 450;
        }
        .seartime {
          position: relative;
          z-index: 999;
          margin-top: 10px;
          float: right;
          .gt {
            font-size: 12px;
            padding: 5px 10px;
            border: #ddd 1px solid;
            margin-right: -1px;
            cursor: pointer;
            float: left;
            line-height: 16px;
          }
          .ss {
            display: inline-block;
            position: relative;
            line-height: 16px;
            float: left;
            .tt {
              font-size: 12px;
              padding: 5px 10px;
              border: #ddd 1px solid;
              margin-right: -1px;
              cursor: pointer;
              float: left;
            }
          }
        }
      }
    }
  }
  //底部
  .footer{
    font-size: 12px;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    a{
      margin-left: 10px;
      margin-right: 10px;
      color: #20a53a;
      position: relative;
      
      .photo{
         display: none;
         position: absolute;
         top: -152px;
         left: -42px;
         height: 150px;
         width: 150px;
         background: url("../../assets/bt_wx.jpg") no-repeat;
         border: #ddd 1px solid;
       }
    }
    .picture:hover .photo{
             display: block;
          }
  }
}
</style>