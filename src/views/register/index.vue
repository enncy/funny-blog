<template>
  <a-row style="display: flex;justify-content: center;margin-top: 50px">
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

import RegisterForm from "./components/Form";

export default {
  components:{
    RegisterForm
  }
};
</script>
<style scoped>

</style>