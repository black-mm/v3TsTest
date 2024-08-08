<template>
  <el-icon v-if="icon && icon.includes('el-icon-')">
    <component :is="icon.split('el-icon-')[1]"></component>
  </el-icon>
  <i v-else class="el-icon">
    <svg-icon  :icon-class="icon" />
  </i>
  <span>{{title}}</span>
</template>

<script setup lang="ts">

let props = defineProps({
    icon:{
       type:String,
       default:''
    },
    title:String
})
</script>

<style scoped lang="scss">
</style>
