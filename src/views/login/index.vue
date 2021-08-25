<template>
  <a-row style="display: flex;justify-content: center;margin-top: 50px">
    <a-col>
      <a-card :bordered="false">
        <template slot="title">
          <h1 style="text-align: center">登录</h1>
        </template>
        <login-form></login-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>

import LoginForm from "./components/Form";

export default {
  name:"login",
  components:{
    LoginForm
  }
};
</script>
<style scoped>

</style>