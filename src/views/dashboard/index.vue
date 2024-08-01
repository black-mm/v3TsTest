<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span="18" class="flex gap-20px">
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/store/index";
import SvgIcon from "@/components/SvgIcon/index.vue";

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
</script>

<style scoped lang="scss">
.mes {
  flex: 1;
}
</style>
