<template>
    <el-drawer v-model="settingStore.settingsVisible" title="项目配置" direction="rtl">
        <el-divider content-position="center">主题设置</el-divider>
        <div class="common-flex justify-center">
            <el-switch v-model="themeDefault" @change="themeChange" active-icon="Moon" inactive-icon="Sunny" />
        </div>
        <el-divider content-position="center">界面设置</el-divider>
        <div class="common-flex between">
            <span>主题颜色</span>
            <el-color-picker v-model="color" :predefine="predefineColors" @change="changeThemeColor" />
        </div>
        <div class="common-flex between">
            <span>固定 Header</span>
            <el-switch v-model="headerFix" @change="fixHeaderChange"/>
        </div>
        <div class="common-flex between">
            <span>固定 Tags-view</span>
            <el-switch v-model="tagsViewfix" @change="fixTagsViewChange"/>
        </div>
        <div class="common-flex between">
            <span>侧边栏Logo</span>
            <el-switch v-model="siderbarLogo" @change="siderbarLogoChange"/>
        </div>
        <div class="common-flex between">
            <span>开启水印</span>
            <el-switch v-model="watermark" @change="watermarkChange"/>
        </div>
        <el-divider content-position="center">导航设置</el-divider>
    </el-drawer>
</template>

<script setup lang='ts'>
import { useSettingStore } from '@/store'

let settingStore = useSettingStore()
let themeDefault = ref(false)   //主题 false默认模式，true为暗黑模式
const color = ref()
const predefineColors = ref([
    "#409EFF",
    "#ff4500",
    "#ff8c00",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsva(120, 40, 94)",
])
let headerFix = ref(settingStore.headerFix)
let tagsViewfix = ref(settingStore.tagsViewfix)
let siderbarLogo = ref(settingStore.siderbarLogo)
let watermark = ref(settingStore.watermark)
// 业务代码
let themeChange = () => {
    settingStore.themeChange()
}
let changeThemeColor = () => {
    settingStore.changeThemeColor(color.value)
}
let fixHeaderChange = ()=>{
    settingStore.headerFixChange()
}
let fixTagsViewChange = ()=>{
    settingStore.tagsViewfixChange()
}
let siderbarLogoChange = ()=>{
    settingStore.siderbarLogoChange()
}
let watermarkChange = ()=>{
    settingStore.watermarkChange()
}
onMounted(() => {
    let scheme = localStorage.getItem('vueuse-color-scheme')
    if (scheme == 'dark') {
        themeDefault.value = true
    }
    color.value = settingStore.themeColor
})
</script>

<style scoped lang="scss">
.common-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.between{
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>