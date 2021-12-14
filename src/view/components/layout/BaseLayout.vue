<template>
 
    <a-layout>
        <a-layout-header :style="style">
            <Navigation />
        </a-layout-header>
        <a-layout-content class="bg-light">
            <slot></slot>
        </a-layout-content>
        <a-layout-footer class="bg-white">
            <Footer />
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import Footer from "../Footer.vue";
import Navigation from "../Navigation.vue";

const style = reactive({ background: "white", padding: "0px", height: "64px" });
</script>

<style scope lang="less"></style>
