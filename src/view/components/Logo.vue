<template>
    <span class="blog-logo" style="width: 66px; display: inline-flex">
        <span :style="{ color: 'rgb(24, 144, 255)', fontSize: size + 'px' }">趣</span>
        <span style="font-size: 20px">博客</span>
    </span>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
interface LogoProps {
    size?: number;
}
const props = withDefaults(defineProps<LogoProps>(), {
    size: 26,
});
let { size } = toRefs(props);
</script>

<style scope lang="less">
.blog-logo {
    cursor: pointer;
    font-size: 20px;
    z-index: 1;
}
</style>
