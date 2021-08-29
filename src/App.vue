<template>
  <a-layout>
    <a-layout-header  :style="style">
      <navigation />
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script lang="ts">

import { defineComponent, reactive } from "vue";
import navigation from "./view/components/navigation.vue";


export default defineComponent({
  components: { navigation },
  name: "App",
  setup() {
    return {
      style: reactive({ background: "white", padding: "0px", height: "64px" }),
    };
  },
});
</script>

<style  lang="less">
@import "@/assets/css/common.css";
</style>
