<template>

  <a-card>
    star
  </a-card>

</template>

<script>
export default {
  name: "star",
  beforeCreate() {
    if (! this.$store.state.userInfo) {
      this.$message.error("您还未登录！")
      // this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>