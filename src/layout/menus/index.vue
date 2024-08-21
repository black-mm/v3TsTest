<template>
  <el-menu :default-active="defaultActive" :background-color="variables['menu-background']"
    :text-color="variables['menu-text']" :active-text-color="variables['menu-active-text']" class="el-menu-layout"
    :router="true" :collapse="!appStore.sidebarStatus">
   <!-- logo -->
    <siderbarLogo :collapse="appStore.sidebarStatus" v-if="settingStore.siderbarLogo"/>
    <!-- 首页 -->
    <el-menu-item index="/dashboard">
      <i class="el-icon"><svg-icon icon-class="homepage" /></i>
      <span>首页</span>
    </el-menu-item>
    <menuList :menus="menus"></menuList>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserStore, useAppStore ,useSettingStore } from "@/store/index";
import menuList from "./menuList.vue";
import variables from '@/styles/variables.module.scss'
import siderbarLogo from "./siderbarLogo.vue";

let userStore = useUserStore();
let appStore = useAppStore();
let settingStore = useSettingStore()

let route = useRoute();
let menus = ref();
let defaultActive = ref();

onMounted(async () => {
  menus.value = await userStore.generateRoutes()
  defaultActive.value = route.path;
});

</script>

<style scoped lang="scss">
.el-menu-item:hover {
  background-color: var(--menu-hover);
}
</style>
