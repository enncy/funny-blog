<template>
  <a :href="'/'">
      <span class="blog-logo">
        <span style="color: #1890ff; ">趣</span>
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
    // console.log(this.color)
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