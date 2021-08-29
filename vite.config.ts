import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import { visualizer } from 'rollup-plugin-visualizer';
import { ExternalImport, VueImport, VueRouterImport, AntDesignVueImport } from 'rollup-plugin-external-import';
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    // 打包体积可视化
    visualizer(),
    // cdn 引入
    ExternalImport({
      options: [
        VueImport,
        VueRouterImport,
        AntDesignVueImport,
        {
          importName: "axios",
          variableName: "windos.axios"
        }
      ]
    }),
    // ViteComponents({
    //   customComponentResolvers: [
    //     // ant design vue icon 打包
    //     AntDesignVueResolver({
    //       resolveIcons: true,
    //       importStyle: false,
    //     })],
    // }),

    // gzip 压缩
    viteCompression()
  ],

})
