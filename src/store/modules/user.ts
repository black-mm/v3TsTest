import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AuthAPI, { LoginData } from "@/api/auth";
import UserAPI from "@/api/user";
import MenuAPI from "@/api/menu";
const Layout = () => import("@/layout/index.vue");

export const useUserStore = defineStore( "user", () => {
    let hasAddAsyncRoute = ref(false);
    let userInfo = ref();
    let routeMenu:any[] = [];

    //登录
    function login(loginData: LoginData) {
      return new Promise<void>((resolve, reject) => {
        AuthAPI.login(loginData)
          .then((res) => {
            const { tokenType, accessToken } = res;
            localStorage.setItem("accessToken", tokenType + " " + accessToken);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    //请求用户信息
    async function getUserInfo() {
      let res = await UserAPI.getUserInfo();
      userInfo.value = res
    }
    //获取权限路由
    async function generateRoutes() {
      if (routeMenu.length == 0) {
        let res = await MenuAPI.getRoutes();
        routeMenu =  transformRoutes(res);
      }
      hasAddAsyncRoute.value = true;
      return routeMenu;
    }
    return { hasAddAsyncRoute, userInfo,routeMenu,
      login, getUserInfo, generateRoutes 
    }
  },
  { 
    persist: {
      paths: ['userInfo', 'routeMenu'],
    }
  }
);

function transformRoutes(menuData: any) {
  const modules = import.meta.glob("@/views/**/**.vue");
  menuData.forEach((menuItem) => {
    if (menuItem.component == "Layout") {
      menuItem.component = Layout;
    }
    if (menuItem.children.length > 0) {
      let rootPath = menuItem.path;
      menuItem.children.forEach((child) => {
        child.meta.fullPath = rootPath + "/" + child.path;
        let url = `/src/views/${child.component}.vue`;
        child.component = modules[url];
      });
    }
  });
  return menuData;
}
