<template>
    <a-input-search
        v-model:value="searchValue"
        placeholder="输入文章标题或者用户名"
        class="background-color border-radius-circle"
        @search="onNavSearch"
    />
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
 
const searchValue = ref("");

// 搜索
function onNavSearch() {}
</script>

<style scope lang="less"></style>
