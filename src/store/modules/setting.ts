import { defineStore } from "pinia";
import { ref } from "vue";
import { useDark, useStorage, useToggle } from '@vueuse/core'
import Color from "color";

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useSettingStore = defineStore("setting",()=>{
    //是否显示设置
    let settingsVisible = ref(false)
    // 主题颜色
    let themeColor = ref((JSON.parse(localStorage.getItem('setting')||'{}').themeColor) || '#409EFF' )
    
    watch(themeColor,(newThemeColor,oldThemeColor)=>{
        if(newThemeColor!=oldThemeColor){
            document.documentElement.style.setProperty('--el-color-primary', newThemeColor);
            document.documentElement.style.setProperty('--el-color-primary-dark-2', newThemeColor);
            for (let i = 1; i < 10; i++) {
                document.documentElement.style.setProperty(
                  `--el-color-primary-light-${i}`,
                  `${Color(newThemeColor).alpha(1 - i * 0.1)}`
                );
              }
        }
    },{
        immediate:true
    })
    //打开设置弹窗
    function openSetting(){
        settingsVisible.value = true
    }
    //切换主题
    function themeChange(){
        toggleDark()
    }
    //切换主题颜色
    function changeThemeColor(color:string){
        themeColor.value = color
    }
    return {
        settingsVisible,
        themeColor,
        openSetting,
        themeChange,
        changeThemeColor,
    }
},
{persist:true})