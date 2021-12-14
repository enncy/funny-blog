import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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

console.log(routes);

export default createRouter({
    history: createWebHistory(),
    routes: routes.map((r) => {
        // 添加默认布局
        r.meta = r?.meta?.layout ? r.meta : Object.assign(r?.meta || {}, { layout: "BaseLayout" });
        return r;
    }),
});
