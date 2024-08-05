<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-layout"
    :default-active="defaultActive"
    text-color="#fff"
    :router="true"
    :collapse="!appStore.sidebarStatus"
  >
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

</style>
