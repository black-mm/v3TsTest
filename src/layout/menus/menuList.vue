<template>
  <el-sub-menu :index="item.path" v-for="item in menus">
    <template #title>
      <sidebarTitle :icon="item.meta.icon" :title="item.meta.title" />
    </template>
    <div v-if="item.children.length !== 0">
      <el-menu-item v-for="child in item.children" :index="child.meta.fullPath">
        <sidebarTitle :icon="child.meta.icon" :title="child.meta.title" />
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script setup lang="ts">
import sidebarTitle from './sidebarTitle.vue'

interface meta {
  path: string,
  meta: {
    title: string,
    icon: string,
    fullPath: string
  },
}
interface Item extends meta {
  children: meta[]
}
let props = defineProps({
  menus: Array<Item>
})
</script>

<style scoped lang="scss">
.el-sub-menu{
  :deep(.el-sub-menu__title:hover) {
    background-color: var(--menu-hover);
  }
}
.el-menu-item:hover {
  background-color: var(--menu-hover);
}
</style>
