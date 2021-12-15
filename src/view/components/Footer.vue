<template>
    <div class="row col-12 col-lg-6 m-auto flex-wrap pt-5 pb-5 text-start">
        <div class="col-6   col-lg-3">
            <Logo />
            <div  class="pt-4 font-v3">
                <div>开源博客网站</div>
                <div>趣博客 © 2021 enncy</div>
                <div>联系我们</div>
            </div>
        </div>

        <div class="col-6 col-lg-3 links  text-lg-center">
            <div class="bold">友链</div>
            <div>xxx</div>
            <div>xxxxx</div>
            <div>xx</div>
            <div>xxxx</div>
        </div>
        <div class="col-6 col-lg-3 links text-lg-center">
            <div class="bold">友链</div>
            <div>xxx</div>
            <div>xxxxx</div>
            <div>xx</div>
            <div>xxxx</div>
        </div>
        <div class="col-6  col-lg-3 links text-lg-center">
            <div class="bold">友链</div>
            <div>xxx</div>
            <div>xxxxx</div>
            <div>xx</div>
            <div>xxxx</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import Logo from "./Logo.vue";
</script>

<style scope lang="less">
.links div {
    line-height: 2rem;
}
 

.bold {
    font-weight: bold;
}
</style>
