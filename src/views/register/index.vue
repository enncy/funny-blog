<template>
  <a-row style="display: flex;justify-content: center">
    <a-col>
      <a-card title="注册"  :bordered="false">
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