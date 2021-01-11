<template>
  <a-card>
    <a-row>
      <a-col>
        <a-avatar :size="64" icon="user" />
        {{userInfo.name}}
      </a-col>
    </a-row>
  </a-card>
</template>

<script>


export default {

  beforeCreate() {
    if (! this.$store.state.userInfo) {
      this.$router.push('/login')
    }

  },

  data() {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  mounted() {
    console.log(this.$store)

  }

}
</script>

<style scoped>

</style>