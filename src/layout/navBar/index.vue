<template>
    <div class="box">
        <el-icon v-if="sideBarStatus" @click="iconClick"><Fold /></el-icon>
        <el-icon v-else @click="iconClick"><Expand /></el-icon>
        <span>首页</span>
        <span class="quit" @click="quit">退出</span>
    </div>
</template>

<script setup lang='ts'>
import {computed} from 'vue'
import  {useAppStore} from '@/store'
let AppStore = useAppStore()

let sideBarStatus = computed(()=>{
    return AppStore.sidebarStatus
})
let iconClick = ()=>{
    AppStore.sideBarChange()
}
let quit = ()=>{
    
}
</script>

<style scoped lang="scss">
.box{
    width:100%;
    height:50px;
    padding: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #606266;
}
.el-icon{
    margin-right: 20px;
    font-size: 16px;
    cursor: pointer;
}
.quit{
    margin-left: auto;
}
</style>