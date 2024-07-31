<template>
  <el-container>
    <el-aside>
      <menus />
    </el-aside>
    <el-container>
      <el-header height="84px">
        <navBar />
      </el-header>
      <el-main >
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import menus from "./menus/index.vue";
import navBar from "./navBar/index.vue";

</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
  .el-header {
    background-color: #fff;
    padding: 0px;
  }
}
.el-main {
  background-color: var(--el-bg-color-page);
  --el-main-padding: 24px;
}
</style>
