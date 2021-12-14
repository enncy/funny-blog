<template>
    <div class="col-12 col-lg-8 m-auto row gx-2">
        <!-- 图标 logo -->
        <div class="col-6 col-md-3 col-lg-1 d-flex justify-content-start">
            <logo class="ms-3 ms-lg-0" />
        </div>

        <div class="col-lg-4 d-none d-lg-flex">
            <BorderItem
                v-for="item of navigationInfos"
                position="bottom"
                style="height: 64px"
                class="ps-3 pe-3 d-flex align-items-center font-v2 pointer"
                @click="goto(item.path)"
            >
                <span>{{ item.title }} </span>
            </BorderItem>
        </div>
        <!-- 间隔 -->
        <div class="col-md-3 col-lg-2 d-none d-md-block"></div>

        <div class="col-md-4 col-lg-3 d-none d-md-block">
            <!-- 搜索框 -->
            <SearchItem />
        </div>

        <div class="col-2 col-lg-2 d-none d-md-block">
            <!-- 用户菜单 -->
            <UserMenuItem :menu="defaultUserMenus" @goto="goto" />
        </div>

        <!-- 小屏幕的特殊 trigger -->
        <div
            class="col-6 d-block d-md-none d-flex justify-content-end align-items-center"
        >
            <a-button class="me-3" link type="text" @click="showDrawer">
                <MenuOutlined />
            </a-button>
        </div>

        <!-- 手机端侧边栏显示 -->
        <a-drawer
            title="趣博客"
            placement="right"
            v-model:visible="visible"
            :body-style="{ padding: '0px' }"
            class="d-md-none"
        >
            <SideBar
                :user-menus="defaultUserMenus"
                :default-menus="navigationInfos"
                @goto="goto"
            ></SideBar>
        </a-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import Logo from "./Logo.vue";
import { MenuData } from "./navigation/interface";
import SideBar from "./navigation/SideBar.vue";
import UserMenuItem from "./navigation/UserMenuItem.vue";
import SearchItem from "./navigation/SearchItem.vue";
import BorderItem from "./BorderItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigationInfos = ref<MenuData[]>([
    { title: "首页", path: "/", icon: "icon-home" },
    { title: "推荐", path: "/recommend", icon: "icon-star" },
    { title: "分类", path: "/category", icon: "icon-folder-open" },
    { title: "专栏", path: "/", icon: "icon-tags" },
]);

const userMenus = ref<MenuData[]>([
    { title: "个人中心", path: "/user", icon: "icon-user" },
    { title: "个人设置", path: "/user/setting", icon: "icon-setting" },
    { title: "退出", path: "/", icon: "icon-logout" },
]);

const defaultUserMenus = ref<MenuData[]>([
    { title: "登录", path: "/login", icon: "icon-login" },
    { title: "注册", path: "/register", icon: "icon-edit-square" },
]);

const visible = ref<boolean>(false);

function showDrawer() {
    visible.value = true;
}

function goto(path: string) {
    visible.value = false;
    router.push(path);
}
</script>

<style scope lang="less">
#navigation {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
