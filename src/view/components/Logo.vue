<template>
    <span
        class="blog-logo d-inline-flex align-items-lg-baseline"
        @click="$router.push('/')"
    >
        <span class="font-v1" :style="{ color: 'rgb(24, 144, 255)' }">趣</span>
        <span class="font-v2">博客</span>
    </span>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
</script>

<style scope lang="less">
.blog-logo {
    cursor: pointer;

    z-index: 1;
}
</style>
