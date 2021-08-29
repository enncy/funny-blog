<template>
  <a-row class="flex jc-center">
    <a-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
      <slot></slot>
    </a-col>
  </a-row>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
 
export default defineComponent({
  name: "Container",
  setup() {},
});
</script>

<style scope lang='less'>
</style>