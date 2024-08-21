<template>
  <el-menu :default-active="defaultActive" :background-color="variables['menu-background']"
    :text-color="variables['menu-text']" :active-text-color="variables['menu-active-text']" class="el-menu-layout"
    :router="true" :collapse="!appStore.sidebarStatus">
    <el-menu-item index="/dashboard" class="logo-container">
      <img src="@/assets/logo.png" alt="" class="logo">
      <span class="logo-title">vue3-element-admin</span>
    </el-menu-item>
    <el-menu-item index="/dashboard">
      <i class="el-icon"><svg-icon icon-class="homepage" /></i>
      <span>首页</span>
    </el-menu-item>
    <menuList :menus="menus"></menuList>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/index";
import menuList from "./menuList.vue";
import { useAppStore } from "@/store";
import variables from '@/styles/variables.module.scss'

let userStore = useUserStore();
let appStore = useAppStore();

let route = useRoute();
let menus = ref();
let defaultActive = ref();

onMounted(async () => {
  menus.value = await userStore.generateRoutes()
  defaultActive.value = route.path;
});

</script>

<style scoped lang="scss">
.logo-container {
  background-color: var(--sidebar-logo-background);
  .logo {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .logo-title {
    color: #fff;
    font-weight: bold;
  }
  .logo-title:hover{
    color: pink;
  }
}
.el-menu-item:hover {
  background-color: var(--menu-hover);
}
</style>
