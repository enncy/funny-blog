<template>
  <span class="blog-logo" style="width: 66px; display: inline-flex">
    <span :style="{ color: 'rgb(24, 144, 255)', fontSize: size + 'px' }"
      >趣</span
    >
    <span style="font-size: 20px">博客</span>
  </span>
</template>

<script lang='ts'>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "qbklogo",
  props: {
    size: Number,
  },
  setup(props) {
    let { size } = toRefs(props);
    return {
      size: size.value || 26,
    };
  },
});
</script>

<style scope lang='less'>
.blog-logo {
  cursor: pointer;
  font-size: 20px;
  z-index: 9999;
}
</style>