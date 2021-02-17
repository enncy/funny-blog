<template>
  <a-row class="register-index">
    <a-col>
      <a-card    :bordered="false">
        <template slot="title">
          <h1 style="text-align: center">注册</h1>
        </template>
        <register-form></register-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>

import RegisterForm from "@/views/register/components/Form";

export default {
  name:"register",
  components:{
    RegisterForm
  }
};
</script>
<style scoped>
@import "./assets/index.css";
</style>