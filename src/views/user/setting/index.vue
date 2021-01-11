<template>
  <a-card>
    setting
  </a-card>
</template>

<script>

export default {
name: "setting",
  beforeCreate() {
    if (! this.$store.state.userInfo) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>