import App from './App'

import store from './store/index'
// import Vue from 'vue'
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import router from './router'
const event = require('events')
const emitter = new event.EventEmitter()

console.log("store",store)

// import 'ant-design-vue/dist/antd.css';

Vue.use(antd);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$emitter = emitter


export  default new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
