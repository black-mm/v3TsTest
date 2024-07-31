import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app",()=>{
    //侧边栏状态
    let sidebarStatus = ref(true)

    function sideBarChange(){
        sidebarStatus.value = !sidebarStatus.value
    }
    return {sidebarStatus,sideBarChange}
},
{persist:true})