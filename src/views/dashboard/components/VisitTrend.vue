<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header flex align-center justify-between">
        <span>访问趋势</span>
        <el-radio-group
          v-model="radioValue"
          size="small"
          @change="getVisitTrend"
        >
          <el-radio-button label="近7天" value="7" />
          <el-radio-button label="近30天" value="30" />
        </el-radio-group>
      </div>
    </template>
    <div id="content" class="w-100% h-400px"></div>
  </el-card>
</template>

<script setup lang="ts">
import LogAPI from "@/api/log";
import * as echarts from "echarts";
import dateFormat from '@/utils/formatDate'

let radioValue = ref("7");
let myChart = null;
let chartsData = ref();

// 获取数据
let getVisitTrend = async () => {
  const { startDate, endDate } = calculateDateRange();
  let res = await LogAPI.getVisitTrend({ startDate, endDate });
  chartsData.value = res;
  initEcharts();
};
let calculateDateRange = () => {
  let currentDate = new Date();
  let startTime = new Date();
  startTime.setDate(currentDate.getDate() - parseInt(radioValue.value));
  return {
    startDate: dateFormat.dateYMD(startTime),
    endDate: dateFormat.dateYMD(currentDate),
  };
};
let initEcharts = () => {
  myChart = echarts.init(document.getElementById("content"));
  myChart.setOption({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["浏览量(PV)", "IP"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      data: chartsData.value.dates,
    },
    yAxis: {},
    series: [
      {
        name: "IP",
        data: chartsData.value.ipList,
        type: "line",
        smooth: true,
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          color: "#67C23A",
        },
      },
      {
        name: "浏览量(PV)",
        data: chartsData.value.pvList,
        type: "line",
        smooth: true,
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        itemStyle: {
          color: "#409EFF",
        },
        lineStyle: {
          color: "#409EFF",
        },
      },
    ],
  });
};
onMounted(() => {
  getVisitTrend();
  window.addEventListener("resize", function () {
    myChart.resize();
  });
});
</script>

<style scoped></style>
