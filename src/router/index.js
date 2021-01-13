// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const config = require('@/config/index')

import index from '@/views/index/index'
import pageNotFound from "@/views/components/pageNotFound";
import blog from "@/views/blog/index";
import login from "@/views/login/index";
import setting from "@/views/user/setting/index";
import star from "@/views/user/star/index";
import user from "@/views/user/index";
import register from "@/views/register/index";
import editor from "@/views/user/editor/index";
import home  from "@/views/home/index";



const router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',  //博客内容
            component: index
        },
        {
            path: '/index',  //博客内容
            component: index
        },
        {
            path: config.router.blog.path+"/:uid",  //博客内容
            component: blog
        },
        {
            path: config.router.login.path, //登录
            component: login
        },
        {
            path: config.router.user.setting.path,   //设置
            component: setting
        },
        {
            path: config.router.user.star.path,  //收藏
            component: star
        },
        {
            path:config.router.user.editor.path,    //写博客页
            name:'editor',
            component: editor
        },
        {
            path: config.router.user.path,  //用户页
            component: user
        },
        {
            path: config.router.register.path,  //用户页
            component: register
        },

        {
            path: '/error',
            component: pageNotFound
        },
        {
            path: '*',
            component: pageNotFound
        },

    ]
})

export default router










