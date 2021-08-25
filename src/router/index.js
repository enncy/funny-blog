// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

import routes from  '@/config/router.config'

const router = new VueRouter({
    mode:'history',
    routes
})

export default router










