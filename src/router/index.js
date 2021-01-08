// import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const config = require('@/config/index')

import pageNotFound from "@/views/components/pageNotFound";
import blog from "@/views/blog/index";
import editor from "@/views/editor/index";
import login from "@/views/login/index";
import setting from "@/views/setting/index";
import star from "@/views/star/index";
import user from "@/views/user/index";
import register from "@/views/register/index";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: config.router.blog.path,  //博客内容
            component: blog
        },
        {
            path: config.router.blog.path,  //博客内容
            component: blog
        },
        {
            path: config.router.blog.path,  //博客内容
            component: blog
        },
        {
            path: config.router.editor.path,    //写博客
            component: editor
        },
        {
            path: config.router.login.path, //登录
            component: login
        },
        {
            path: config.router.setting.path,   //设置
            component: setting
        },
        {
            path: config.router.star.path,  //收藏
            component: star
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
            path: '*',
            component: pageNotFound
        },
    ]
})

export default router










