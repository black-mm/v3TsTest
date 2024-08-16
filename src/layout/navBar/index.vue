<template>
    <div class="box">
        <!-- 折叠按钮 -->
        <div class="common-flex h-extend">
            <el-icon v-if="sideBarStatus" @click="iconClick"> <Fold /></el-icon>
            <el-icon v-else @click="iconClick"><Expand /></el-icon>
            <span>首页</span>
        </div>

        <!-- 头像 -->
        <el-dropdown trigger="click" class="ml-auto h-extend">
            <!-- 头像 -->
            <div class="common-flex">
                <el-avatar :size="24" :src="userStore.userInfo.avatar" />
                <span>{{ userStore.userInfo.username }}</span>
            </div>
            <template #dropdown>
                <div class="exit" @click="exit">注销登出</div>
            </template>
        </el-dropdown>

        <!-- 设置 -->
        <div class="common-flex ml-10px">
            <el-icon @click="settingDrawer = true"><Setting /></el-icon>
        </div>
        
        <setting :settingDrawer="settingDrawer"  @drawClose="drawClose"/>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useAppStore, useUserStore } from '@/store'
import setting from '../setting/index.vue'

let settingDrawer = ref(false)

let AppStore = useAppStore()
let userStore = useUserStore()
 
let sideBarStatus = computed(() => {
    return AppStore.sidebarStatus
})

let iconClick = () => {
    AppStore.sideBarChange()
}
let exit = () => {
    userStore.exit()
}
let drawClose = ()=>{
    settingDrawer.value = false
}

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #606266;
}

.el-icon {
    font-size: 16px;
    cursor: pointer;
}

.el-dropdown:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.common-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.h-extend {
    height: 100%;
    padding: 0 10px;
}

.exit {
    padding: 10px 20px;
    color: #606266;
    cursor: pointer;
}

</style>