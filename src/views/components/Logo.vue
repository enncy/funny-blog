<template>
  <a :href="'/'">
      <span class="blog-logo">
        <span style="color: #1890ff;font-size: 26px ">趣</span>
        <span :style="{color:color?color:'black'}">博客</span>
     </span>
  </a>


</template>

<script>
export default {
  name: "Logo",
  props:{
    color:String,
  },
  mounted() {
    // console.log(this.theme.less)
  }
}
</script>

<style scoped>
.blog-logo {
  cursor: pointer;
  font-size: 20px;
  z-index: 9999;
}
</style>