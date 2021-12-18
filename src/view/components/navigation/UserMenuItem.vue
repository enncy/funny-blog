<template>
    <a-dropdown placement="bottomCenter" :trigger="['hover', 'click']">
        <div class="pointer d-flex align-items-center h-100" @click.prevent>
            <a-avatar>U</a-avatar>
            <span class="ms-2 font-nowrap">未登录</span>
        </div>
        <template #overlay>
            <a-menu>
                <a-menu-item v-for="item of menu">
                    <a   :href="item.path">
                        <div class="d-flex align-items-center">
                            <Icon :type="item.icon"></Icon>
                            <span   class="ms-3 text-black" >
                                {{ item.title }}
                            </span>
                        </div>
                    </a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { MenuData } from "./interface";
interface UserMenuItemProps {
    menu: MenuData[];
}
 
const props = withDefaults(defineProps<UserMenuItemProps>(), {});
const {} = toRefs(props);
</script>

<style scope lang="less"></style>
