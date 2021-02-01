import index from "@/views/index";
import blog from "@/views/blog";
import login from "@/views/login";
import user from "@/views/user";
import setting from "@/views/user/setting";
import star from "@/views/user/star";
import editor from "@/views/user/editor";
import register from "@/views/register";
import pageNotFound from "@/views/components/pageNotFound";
import home from "@/views/home";
import userBlogs from "@/views/user/blogs"
const config = require('@/config/index')
let routes = [
    {
        path: '/',  //博客内容
        component: index,
        meta:{ title: config.title },
        name:'index',
    },
    {
        path: '/index',  //博客内容
        component: index,
        name:'index',
        meta:{ title:config.title }
    },
    {
        path: "/blog/:uid",  //博客内容
        component: blog,
        name:'blog',
        meta:{ title: "文章-趣博客" }
    },
    {
        path: "/login", //登录
        component: login,
        name:'login',
        meta:{ title: "登录-趣博客" }
    },
    {
        path: "/user",  //用户页
        redirect:'/user/blogs',
        name:'user',
        component: user,
        meta:{ title: "个人中心-趣博客" },
        children:[
            {
                path: "blogs",  //收藏
                name:'user-blogs',
                component: userBlogs,
                meta: {
                    title: '全部文章',
                    breadcrumb:[
                        {
                            name:'收藏',
                            path:'/user/star'
                        },
                        {
                            name:'分栏',
                            path:'/user/ca'
                        },
                    ]
                },
            },
            {
                path: "star",  //收藏
                name:'user-star',
                component: star,
                meta:{ title: "个人收藏-趣博客" }
            },
            {
                path: "setting",   //设置
                name:'user-setting',
                component: setting,
                meta:{ title: "个人设置-趣博客" }
            }
        ]
    },

    {
        path: "/user/editor",    //写博客页
        name:'editor',
        component: editor,
        meta:{ title: "写博客-趣博客" }
    },
    {
        path: "/register",  //用户页
        name:'register',
        component: register,
        meta:{ title: "注册-趣博客" }
    },
    {
        path: '/error',
        name:'error',
        component: pageNotFound,
        meta:{ title: "找不到页面-趣博客" }
    },
    {
        path: '/:name',
        component: home,
        name:'home',
        meta:{ title: "个人首页-趣博客" }
    },
    {
        path: '*',
        component: pageNotFound
    },

]

export  default  routes