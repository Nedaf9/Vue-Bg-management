<template>
  <div id="app-flux" style="width: 100%; height: 370px"></div>
</template>
<script>
import * as echarts from 'echarts'
import "echarts/theme/macarons.js"
export default {
  name: "flux",
  components: {},
  mounted () {
    this.drawLine();
  },
  data () {
    return {
    }
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById("app-flux"),"macarons");
      myChart.setOption({
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['上行', '下行',]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '上行',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '下行',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
        ]
      })
    }
  }
}
</script>