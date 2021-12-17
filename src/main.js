// @ts-check

// @ts-ignore
import App from "./App.vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { createSSRRouter } from "./route";
import { createSSRApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// @ts-ignore
import SignLayout from "@/view/components/layout/SignLayout.vue";
// @ts-ignore
import BaseLayout from "@/view/components/layout/BaseLayout.vue";

const Icon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3013134_pc3mmckqy1.js", // 在 iconfont.cn 上生成
});

export function createApp() {
    const app = createSSRApp(App);
    const router = createSSRRouter();

    router.beforeEach((to, form, next) => {
        next();
    });

    app.use(router).use(Antd).component("SignLayout", SignLayout).component("BaseLayout", BaseLayout).component("Icon", Icon);

    return { app, router };
}
