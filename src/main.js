import App from './App'
// import Vue from 'vue'
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import router from './router'


// import 'ant-design-vue/dist/antd.css';

Vue.use(antd);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
