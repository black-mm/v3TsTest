<template>
    <el-card shadow="never">
        dash
        <!-- <el-avatar :size="50" :src="userInfo.avatar" /> -->
    </el-card>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { useStorage } from '@vueuse/core'

let userInfo = ref()
// userInfo.value = JSON.parse(localStorage.getItem("userInfo")|| '')


</script>

<style scoped lang='scss'>

</style>