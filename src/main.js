import App from './App'

import store from './store/index'
// import Vue from 'vue'
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import MavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'


import MetaInfo from 'vue-meta-info'
import router from './router'

console.log("store",store)

//防止路由重复点击的报错信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//seo优化
Vue.use(MetaInfo)
Vue.use(MavonEditor)
Vue.use(antd);
Vue.config.productionTip = false
// vuex
Vue.prototype.$store = store
//全局事件总栈，不能多次使用，否则容易造成项目冗余
const event = require('events')
Vue.prototype.$emitter =new  event.EventEmitter()


export  default new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
