import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import type { App } from "vue";

const Layout = () => import("@/layout/index.vue");
const user = () => import("@/views/system/user/index.vue");

const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta:{
          icon: "homepage",
        }
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      isHide: true,
    },
    component: () => import("@/views/error/index.vue"),
  },

];

const router = createRouter({
  history: createWebHashHistory(), //跳转刷新
  routes: [...constantRoutes],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
