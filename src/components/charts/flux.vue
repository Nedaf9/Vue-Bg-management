<template>
  <div id="app-flux" style="width: 100%; height: 370px"></div>
</template>
<script>
import * as echarts from "echarts";
import { getFlux } from "../../api/api";
var myChart
var option = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
    textStyle: {
      color: "#fff",
    },
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  color: ["#52A9FF", "#F7B851"],
  legend: {
    show: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "0%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "上行",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [],
    },
    {
      name: "下行",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [],
    },
  ],
};



export default {
  name: "flux",
  components: {},
  mounted() {
		myChart = echarts.init(document.getElementById("app-flux"),"macarons");

		function getData () {
			Promise.resolve(getFlux()).then((res) => {
				if ( option.xAxis[0].data.length > 8 ) {
					option.xAxis[0].data.shift()
					option.series[0].data.shift()
					option.series[1].data.shift()
				}
				option.xAxis[0].data.push(new Date().toString().split(" ")[4])//获取当前时间
				option.series[0].data.push(res.up)
				option.series[1].data.push(res.down)
			});
		}

		getData();

		setInterval(()=>{//2秒刷新一次获取一次数据
			getData();
			this.drawLine();
		},2000)
    this.drawLine();
  },
  data() {
    return {};
  },
  methods: {
    drawLine() {
      myChart.setOption(option);
    },
  },
};
</script>