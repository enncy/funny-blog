<template>
  <a-menu
      mode="horizontal"
  >
    <a-sub-menu>
      <span slot="title">
        <a-icon type="user"/>未登录
      </span>
      <a-menu-item @click="open(config.router.login.path)" :key="'登录'">
        <a-icon type="login"/>
        <span>登录</span>
      </a-menu-item>
      <a-menu-item @click="open(config.router.logout.path)"  :key="'注册'">
        <a-icon type="form"/>
        <span>注册</span>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import config from "@/config/index";


export default {

  name: "UserMenu",
  data() {
    return {
      config
    }
  },
  methods: {
    open(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>