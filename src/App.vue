<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <transition name="fade">
                <component :is="layout || BaseLayout">
                    <component :is="Component" />
                </component>
            </transition>
        </keep-alive>
    </router-view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, useSSRContext, watch } from "vue";
import { useRoute } from "vue-router";
import BaseLayout from "./view/components/layout/BaseLayout.vue";

const route = useRoute();

// 动态布局
const layout = computed(() => route.meta.layout);
// // 等待 meta 加载
// const show = computed(() => Reflect.ownKeys(route.meta).length !== 0);
</script>

<style lang="less">
@import "@/assets/css/common.css";
@import "@/assets/css/bootstrap.css";
</style>
