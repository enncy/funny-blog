import App from "./App.vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import router from "./route";
import { createApp } from "vue";

import SignLayout from "@/view/components/layout/SignLayout.vue";
import BaseLayout from "@/view/components/layout/BaseLayout.vue";

const Icon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3013134_pc3mmckqy1.js", // 在 iconfont.cn 上生成
});

const app = createApp(App);
app.use(router)
    .component("SignLayout", SignLayout)
    .component("BaseLayout", BaseLayout)
    .component("Icon", Icon)
    .mount("#app");
