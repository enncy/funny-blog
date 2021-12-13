<template>
    <a-layout>
        <a-layout-header :style="style">
            <navigation />
        </a-layout-header>
        <a-layout-content class="bg-light">
            <router-view />
        </a-layout-content>
        <a-layout-footer class="bg-white"> </a-layout-footer>
    </a-layout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import navigation from "./view/components/Navigation.vue";

const style = reactive({ background: "white", padding: "0px", height: "64px" });
</script>

<style lang="less">
@import "@/assets/css/common.css";
@import "@/assets/css/bootstrap.css";
</style>
