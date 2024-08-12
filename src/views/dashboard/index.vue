<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span="18" class="flex gap-20px items-center">
        <el-avatar :size="80" :src="userStore.userInfo.avatar" class="min-w-80px min-h-80px" />
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
            <div class="t14-mt10 color-[--el-text-color-secondary]">
              总用户数
            </div>
          </div>
          <div class="text-center">
            <svg-icon icon-class="user" class="text-30px"></svg-icon>
            <div class="t14-mt10">5</div>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :sm="12" :lg="6" v-for="item in visit">
      <el-skeleton :loading="visitStatsLoading" animated>
        <template #template>
          <el-card shadow="never">
            <template #header>
              <div class="flex-between">
                <el-skeleton-item style="width: 30%; margin: 7px 0" />
                <el-skeleton-item style="width: 1em" />
              </div>
            </template>
            <div class="flex justify-between">
              <el-skeleton-item style="width: 30%" />
              <el-skeleton-item variant="circle" style="width: 30px; height: 30px" />
            </div>
            <div class="mt-5 flex justify-between">
              <el-skeleton-item variant="text" style="width: 50%" />
              <el-skeleton-item variant="text" style="width: 1em" />
            </div>
          </el-card>
        </template>

        <template #default>
          <el-card shadow="never">
            <template #header>
              <div class="flex-between">
                <span class="color-[--el-text-color-secondary]">{{
                  item.title
                }}</span>
                <el-tag type="success">{{ item.granularity }}</el-tag>
              </div>
            </template>
            <div class="flex-between items-center">
              <div>
                <span> {{ item.todayCount }}</span>
                <span :class="[
                  'ml-10px',
                  'text-12px',
                  getGrowthRateClass(item.growthRate),
                ]">
                  <el-icon v-if="item.growthRate > 0">
                    <Top />
                  </el-icon>
                  <el-icon v-if="item.growthRate < 0">
                    <Bottom />
                  </el-icon>
                  {{ formatGrowthRate(item.growthRate) }}
                </span>
                <div class="t14-mt10 color-[--el-text-color-secondary]">
                  总{{ item.title }}
                </div>
              </div>
              <div class="text-center">
                <svg-icon :icon-class="item.icon" class="text-30px"></svg-icon>
                <div class="t14-mt10 text-[var(--el-text-color-secondary)]">
                  {{ item.totalCount }}
                </div>
              </div>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </el-col>
  </el-row>

  <el-row :gutter="10" class="mt-20px">
    <el-col :xs="24" :md="16">
      <VisitTrend />
    </el-col>
    <el-col :xs="24" :md="8">
      <el-card shadow="never">
        <template #header>
          <div class="flex-between align-center">
            <span>通知公告</span>
            <el-link type="primary" class="text-12px">查看更多></el-link>
          </div>
        </template>
        <div v-for="item in notices" class="mb-10px">
          <el-tag :type="getNoticeLevelTag(item.level)">{{ getNoticeLabel(item.type) }}</el-tag>
          <span class="text-12px ml-10px !text-[var(--el-text-color-secondary)]">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { useUserStore } from "@/store/index";
import LogAPI from "@/api/log";
import VisitTrend from "./components/VisitTrend.vue";
import { NoticeTypeEnum, getNoticeLabel } from "@/enums/NoticeTypeEnum";

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
])
let visit = ref<VisitStats[] | null>(Array(3).fill({}));
interface VisitStats {
  title: string;
  icon?: string;
  tagType?: "primary" | "success" | "warning";
  growthRate: number;
  granularity: string;
  todayCount: number;
  totalCount: number;
}
let visitStatsLoading = ref(true);

const notices = ref([
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_UPGRADE,
    title: "v2.12.0 新增系统日志，访问趋势统计功能。",
  },
  {
    level: 0,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 7 月 1 日举办年中总结大会，请各部门做好准备。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "端午节假期从 6 月 12 日至 6 月 14 日放假，共 3 天。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
  },
  {
    level: 0,
    type: NoticeTypeEnum.OTHER,
    title: "公司新规章制度发布，请大家及时查阅。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "中秋节假期从 9 月 22 日至 9 月 24 日放假，共 3 天。",
  },
  {
    level: 1,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title:
      "请注意，近期有恶意软件通过即时通讯工具传播，请勿下载不明来源的文件。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于下周日凌晨 3 点进行升级，预计维护时间为 1 小时。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.OTHER,
    title: "公司年度体检通知已发布，请各位员工按时参加。",
  },
]);

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
//访问量
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
  visitStatsLoading.value = false;
};
let getGrowthRateClass = (growthRate: number): string => {
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};
let formatGrowthRate = (growthRate: number): string => {
  if (growthRate == 0) {
    return "-";
  }
  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
};
const getNoticeLevelTag = (type: number) => {
  switch (type) {
    case 0:
      return "danger";
    case 1:
      return "warning";
    case 2:
      return "primary";
    default:
      return "success";
  }
};
onMounted(() => {
  getVisit();
})
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
