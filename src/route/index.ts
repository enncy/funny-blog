import { createRouter, createWebHistory } from "vue-router"



const routes = [

    { 
        path: "/login", component: () => import('@/view/login/login.vue')

    },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})