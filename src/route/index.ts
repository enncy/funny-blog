import { createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import("@/view/login/index.vue"),
        meta: {
            layout: "SignLayout",
        },
    },
    {
        path: "/register",
        component: () => import("@/view/register/index.vue"),
        meta: {
            layout: "SignLayout",
        },
    },
    {
        path: "/forget",
        component: () => import("@/view/forget/index.vue"),
        meta: {
            layout: "SignLayout",
        },
    },
    {
        path: "/index",
        component: () => import("@/view/index.vue"),
    },
    {
        path: "/",
        component: () => import("@/view/index.vue"),
    },
    {
        path: "/category",
        component: () => import("@/view/category/index.vue"),
    },
    {
        path: "/recommend",
        component: () => import("@/view/recommend/index.vue"),
    },
    {
        path: "/user",
        component: () => import("@/view/user/index.vue"),
    },
    {
        path: "/user/setting",
        component: () => import("@/view/user/setting/index.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/view/components/NotFound.vue"),
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
