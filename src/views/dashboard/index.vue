<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span="18" class="flex gap-20px items-center">
        <el-avatar
          :size="80"
          :src="userStore.userInfo.avatar"
          class="min-w-80px min-h-80px"
        />
        <div>
          <p>{{ helloText }}</p>
          <p class="text-14px text-slate-400">
            今日天气晴朗，气温在15℃至25℃之间，东南风。
          </p>
        </div>
      </el-col>
      <el-col :span="6" :xs="24" class="flex justify-around">
        <div v-for="item in staticData">
          <svg-icon :icon-class="item.iconClass" class="mr-10px"></svg-icon>
          <span>{{ item.title }}</span>
          <p class="text-center text-20px">{{ item.number }}</p>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-row :gutter="10" class="mt-20px">
    <el-col :sm="12" :lg="6">
      <el-card shadow="never">
        <template #header>
          <div class="flex-between">
            <span class="color-[--el-text-color-secondary]">在线用户</span>
            <i><el-tag type="success">-</el-tag></i>
          </div>
        </template>
        <div class="flex-between items-center">
          <div>
            <div>1</div>
            <div class="t14-mt10 color-[--el-text-color-secondary]">总用户数</div>
          </div>
          <div class="text-center">
            <svg-icon icon-class="user" class="text-30px"></svg-icon>
            <div class="t14-mt10">5</div>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :sm="12" :lg="6" v-for="item in visit">
      <el-card shadow="never">
        <template #header>
          <div class="flex-between">
            <span class="color-[--el-text-color-secondary]">{{ item.title }}</span>
           <el-tag type="success">{{ item.granularity }}</el-tag>
          </div>
        </template>
        <div class="flex-between items-center">
          <div>
            <span> {{ item.todayCount }}</span>
            <span :class="[
              'ml-10px',
              'text-12px',
              getGrowthRateClass(item.growthRate)
              ]">
              <el-icon  v-if="item.growthRate>0"><Top /></el-icon>
              <el-icon  v-if="item.growthRate<0"><Bottom /></el-icon>
              {{ formatGrowthRate(item.growthRate) }}
            </span>
            <div class="t14-mt10 color-[--el-text-color-secondary]">总{{ item.title }}</div>
          </div>
          <div class="text-center">
            <svg-icon :icon-class="item.icon" class="text-30px"></svg-icon>
            <div class="t14-mt10 text-[var(--el-text-color-secondary)]">{{ item.totalCount }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/index";
import LogAPI from "@/api/log";

let userStore = useUserStore();
let staticData = ref([
  {
    iconClass: "message",
    title: "消息",
    number: "99",
  },
  {
    iconClass: "todo",
    title: "待办",
    number: "50/100",
  },
  {
    iconClass: "project",
    title: "项目",
    number: "10",
  },
]);
let visit = ref();

// 业务
let helloText = computed(() => {
  let hours = new Date().getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.userInfo.nickname + "！";
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});
let getVisit = async () => {
  const list = await LogAPI.getVisitStats();
  const transformList = list.map((item, index) => {
    return {
      title: item.title,
      todayCount: item.todayCount,
      totalCount: item.totalCount,
      growthRate: item.growthRate,
      granularity: "日",
      icon: item.type,
    };
  });
  visit.value = transformList;
  console.log(visit.value);
};

let getGrowthRateClass = (growthRate:number):string =>{
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
}
let formatGrowthRate = (growthRate:number):string=>{
  if(growthRate == 0){
    return '-'
  }
  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
}

onMounted(() => {
  getVisit();
});
</script>

<style scoped lang="scss">
.mes {
  flex: 1;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.t14-mt10 {
  font-size: 14px;
  margin-top: 10px;
}
</style>
