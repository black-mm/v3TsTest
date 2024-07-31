import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const pathSrc = resolve(__dirname, "src");
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
     resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      // 允许IP访问
      host: "0.0.0.0",
      // 应用端口 (默认:3000)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 接口地址
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    }, 
    plugins: [
      vue(),
      UnoCSS(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      })
    ],
}});