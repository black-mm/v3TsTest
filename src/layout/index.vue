<template>
  <el-container>
    <el-aside :class="classObj">
      <menus />
    </el-aside>
    <el-container class="contain-right">
      <el-header height="84px">
        <navBar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import menus from "./menus/index.vue";
import navBar from "./navBar/index.vue";
import { useAppStore } from "@/store";

let appStore = useAppStore();
let classObj = computed(()=>{
  return {
    'layout-aside':appStore.sidebarStatus,
    'collapse-aside':!appStore.sidebarStatus,
  }
})
</script>

<style scoped lang="scss">
.contain-right {
  height: 100vh;
  .el-header {
    background-color: #fff;
    padding: 0px;
  }
  .el-main {
    background-color: var(--el-bg-color-page);
    --el-main-padding: 24px;
  }
}
@media screen and (max-width: 1200px) {
  .el-aside {
    width: 0px;
  }
}
</style>
