import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { parse } from 'acorn';

// https://cdn.jsdelivr.net/npm/vue@3.2.10/dist/vue.esm-browser.prod.js
// https://vitejs.dev/config/ 
export default defineConfig({

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },

  },

  plugins: [
    vue(),
 
    // 打包体积可视化
    visualizer(),

    ViteComponents({
      customComponentResolvers: [
        // ant design vue icon 打包
        AntDesignVueResolver({
          resolveIcons: true,
          importStyle: false,
        })],
    }),

    // gzip 压缩
    viteCompression()
  ],

})
