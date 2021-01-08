<template>
  <a-row style="display: flex;justify-content: center">
    <a-col>
      <a-card :bordered="false">
        <login-form></login-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>

import LoginForm from "./components/Form";

export default {
  components:{
    LoginForm
  }
};
</script>
<style scoped>

</style>