import { defineStore } from "pinia";
import { ref } from "vue";
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useSettingStore = defineStore("setting",()=>{
    //设置弹窗
    let settingsVisible = ref(false)

    function settingChange(){
        settingsVisible.value = true
    }
    function themeChange(){
        toggleDark()
    }
    return {settingsVisible,settingChange,themeChange}
},
{persist:true})