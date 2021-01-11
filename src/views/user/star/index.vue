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
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>