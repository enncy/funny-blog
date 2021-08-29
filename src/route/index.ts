import { createRouter,  createWebHistory } from "vue-router"
 
import login from '@/view/login/login.vue';
 
const routes = [
   
    { path: "/login",  component:login },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})