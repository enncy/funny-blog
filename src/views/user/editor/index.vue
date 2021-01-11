<template>
  <div>
    editor
  </div>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    if (!this.$store.state.userInfo) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>