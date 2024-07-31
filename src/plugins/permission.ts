import router from "@/router/index";
import { useUserStore } from "@/store/index";

export function setPermission() {
   router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("accessToken");
    const userStore = useUserStore();
    if (token) {
      if (to.path == "login") {
        next({ path: "/" });
      } else {
        if (!userStore.hasAddAsyncRoute) {
         let res =  await userStore.generateRoutes()
          for (let i of res) {
            router.addRoute(i);
          }  
          next({ path: to.path, replace: true });
        } else {
          next();
        }
      }
    } else {
      if (to.name == "login") {
        next();
      } else {
        next({ path: "login" });
      }
    }
  })
}