<template>
    <div class="w-100 h-100">
        <div class="sign-container col-lg-4 col-xl-3 col-md-8 col-12">
            <slot></slot>
        </div>

        <div class="bg">
            <img src="https://images8.alphacoders.com/679/679478.jpg" />
        </div>

        <div class="footer">
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import Footer from "../Footer.vue";
</script>

<style scope lang="less">
.bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    z-index: -1;
    top: 0px;
}
img {
    max-width: 2000px;
    min-width: 100%;
    min-height: 100%;
    position: relative;

    left: 50%;
    transform: translate(-50%);
}

.footer {
    color: white !important;
    position: relative;
    bottom: 0px;
}

.sign-container {
    height: 100%;
    margin: 0 auto;
}
</style>
