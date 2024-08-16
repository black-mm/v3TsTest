import { defineStore } from "pinia";
import { ref } from "vue";
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useSettingStore = defineStore("setting",()=>{
    //设置弹窗
    let settingsVisible = ref(false)
    //打开设置弹窗
    function openSetting(){
        settingsVisible.value = true
    }
    //切换主题
    function themeChange(){
        toggleDark()
    }
    return {settingsVisible,openSetting,themeChange}
},
{persist:true})