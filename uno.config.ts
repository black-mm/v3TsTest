import { defineConfig } from 'unocss'
import { presetUno } from 'unocss'

export default defineConfig({
  shortcuts:{
    "flex-y-center": "flex items-center",
    "wh-full": "w-full h-full",
  },
  presets: [
    presetUno(),
  ],
})