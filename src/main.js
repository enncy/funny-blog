import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from "@/router/index";

import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
