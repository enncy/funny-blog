<template>
    <div class="p-4">
        <div class="col-12 text-center">
            <a-avatar :size="64">U</a-avatar>
        </div>
        <div class="col-12 mt-2 font-v2 text-center font-nowrap">未登录</div>
    </div>

    <!-- 用户菜单 -->
    <BorderItem
        v-for="item of userMenus"
        style="height: 48px"
        class="d-flex align-items-center font-v2 pointer"
        @click="emits('goto', item.path)"
    >
        <div class="d-flex align-items-center ms-5">
            <Icon :type="item.icon"></Icon>
            <span class="ms-2"> {{ item.title }} </span>
        </div>
    </BorderItem>
    <!-- 分割线 -->
    <a-divider></a-divider>
    <!-- 公共菜单 -->
    <BorderItem
        v-for="item of defaultMenus"
        style="height: 48px"
        class="d-flex align-items-center font-v2 pointer"
        @click="emits('goto', item.path)"
    >
        <div class="d-flex align-items-center ms-5">
            <Icon :type="item.icon"></Icon>
            <span class="ms-2"> {{ item.title }} </span>
        </div>
    </BorderItem>
    <div class="p-2 mt-4">
        <SearchItem />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { MenuData } from "./interface";
import BorderItem from "../BorderItem.vue";
import SearchItem from "./SearchItem.vue";

interface SideBarProps {
    userMenus: MenuData[];
    defaultMenus: MenuData[];
}
const emits = defineEmits<{
    (e: "goto", path: string): void;
}>();
const props = withDefaults(defineProps<SideBarProps>(), {});
const { userMenus, defaultMenus } = toRefs(props);


</script>

<style scope lang="less"></style>
