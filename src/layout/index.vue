<template>
  <el-watermark :font="font" content="vue3-element-admin" class="watermark" v-if="settingStore.watermark">
  </el-watermark>
  <el-container>
    <el-aside :class="classObj">
      <menus />
    </el-aside>
    <div class="contain-right">
      <div class="header" :class="{ 'fix-header': settingStore.headerFix }">
        <navBar />
      </div>
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-container>

  <!-- 左侧布局 -->
  <!-- 顶部布局 -->
  <!-- 混合布局 -->
  <!-- 爱吃萝卜和青菜 -->
  <!-- 不蹦不跳真可爱 -->
</template>

<script setup lang="ts">
import menus from "./menus/index.vue";
import navBar from "./navBar/index.vue";
import { useAppStore, useSettingStore } from "@/store";

let appStore = useAppStore();
let settingStore = useSettingStore()

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

let classObj = computed(() => {
  return {
    'layout-aside': appStore.sidebarStatus,
    'collapse-aside': !appStore.sidebarStatus,
  }
})
onMounted(() => {

})
</script>

<style scoped lang="scss">
.contain-right {
  height: 100vh;
  overflow: auto;
  flex: 1;

  .header {
    background-color: #fff;
  }

  .el-header {
    padding: 0px;
  }

  .el-main {
    background-color: var(--el-bg-color-page);
    --el-main-padding: 24px;
  }
}

.fix-header {
  position: sticky;
  z-index: 100;
  top: 0px;
}

@media screen and (max-width: 1200px) {
  .el-aside {
    width: 0px;
  }
}

.watermark {
  position: initial !important;
}
</style>
