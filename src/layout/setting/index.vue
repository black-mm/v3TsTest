<template>
    <el-drawer v-model="settingStore.settingsVisible" title="项目配置" direction="rtl" >
        <el-divider content-position="center">主题设置</el-divider>
        <div class="common-flex justify-center">
            <el-switch v-model="themeDefault" @change="themeChange" active-icon="Moon" inactive-icon="Sunny" />
        </div>
        <el-divider content-position="center">界面设置</el-divider>
        <el-divider content-position="center">导航设置</el-divider>
    </el-drawer>
</template>

<script setup lang='ts'>
import {useSettingStore} from '@/store'

let settingStore = useSettingStore()
let themeDefault = ref(false)   //主题 false默认模式，true为暗黑模式

let themeChange = ()=>{
    settingStore.themeChange()
}

onMounted(()=>{
    let scheme = localStorage.getItem('vueuse-color-scheme')
    if(scheme =='dark'){
        themeDefault.value = true
    }
})
</script>

<style scoped lang="scss">
.common-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
</style>