import App from './App'

import store from './store/index'
// import Vue from 'vue'
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import MavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'


import router from './router'
const event = require('events')
const emitter = new event.EventEmitter()

console.log("store",store)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(MavonEditor)
Vue.use(antd);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$emitter = emitter


export  default new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
