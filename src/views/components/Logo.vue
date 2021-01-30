<template>
  <span class="blog-logo" @click="$router.push('/')">
    <span style="color: #1890ff; ">趣</span>博客
  </span>

</template>

<script>
export default {
  name: "Logo"
}
</script>

<style scoped>
.blog-logo{
  cursor: pointer;
  font-size: 20px;
}
</style>