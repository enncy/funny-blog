import { createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import("@/view/login/index.vue"),
        meta: {
            title: "登录",
            layout: "SignLayout",
        },
    },
    {
        path: "/register",
        component: () => import("@/view/register/index.vue"),
        meta: {
            title: "注册",
            layout: "SignLayout",
        },
    },
    {
        path: "/forget",
        component: () => import("@/view/forget/index.vue"),
        meta: {
            title: "忘记密码",
            layout: "SignLayout",
        },
    },
    {
        path: "/index",
        component: () => import("@/view/index.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/",
        component: () => import("@/view/index.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/category",
        component: () => import("@/view/category/index.vue"),
        meta: {
            title: "分类",
        },
    },
    {
        path: "/recommend",
        component: () => import("@/view/recommend/index.vue"),
        meta: {
            title: "推荐",
        },
    },
    {
        path: "/user",
        component: () => import("@/view/user/index.vue"),
        meta: {
            title: "个人中心",
        },
    },
    {
        path: "/user/setting",
        component: () => import("@/view/user/setting/index.vue"),
        meta: {
            title: "用户设置",
        },
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/view/components/NotFound.vue"),
        meta: {
            title: "404",
        },
    },
];

export function createSSRRouter() {
    const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();
  
    return createRouter({
        history: routerHistory,
        routes: routes.map((r) => {
            // 添加默认布局
            r.meta = r?.meta?.layout ? r.meta : Object.assign(r?.meta || {}, { layout: "BaseLayout" });
            return r;
        }),
    });
}

export function routerPush(path: string) {
    window.location.href = path;
}
