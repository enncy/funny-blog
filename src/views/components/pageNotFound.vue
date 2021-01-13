<template>
  <a-card style="text-align: center">
    <a-empty description="找不到页面"/>
    <h1 style="font-size: xxx-large">404 not found</h1>

    <a-row >
      <a-button @click="back">
        返回上一页
      </a-button>
      <a-button style="margin-left: 20px" type="primary" @click="index">
        首页
      </a-button>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: "pageNotFound",
  methods:{
    index(){
      this.$router.push('/')
    },
    back(){
      window.history.back();
    }
  }
}
</script>

<style scoped>

</style>