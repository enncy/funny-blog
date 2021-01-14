<template>
  <a-menu
      mode="horizontal"
  >
    <a-sub-menu>
      <span slot="title">
        <a-icon type="user"/>
        {{userInfo?userInfo.name:'未登录'}}
      </span>
      <template v-if="userInfo">

        <a-menu-item @click="home()" :key="'个人首页'">
          <a-icon type="home"/>
          <span>个人首页</span>
        </a-menu-item>

        <a-menu-item @click="open(config.router.user.path)" :key="'个人中心'">
          <a-icon type="user"/>
          <span>个人中心</span>
        </a-menu-item>

        <a-menu-item @click="open(config.router.user.editor.path)" :key="'写博客'">
          <a-icon type="edit"/>
          <span>写博客</span>
        </a-menu-item>

        <a-menu-item @click="open(config.router.user.star.path)"  :key="'我的收藏'">
          <a-icon type="star"/>
          <span>我的收藏</span>
        </a-menu-item>

        <a-menu-item @click="quit()"  :key="'注册'">
          <a-icon type="logout"/>
          <span>退出</span>
        </a-menu-item>

      </template>

      <template v-else>
        <a-menu-item @click="open(config.router.login.path)" :key="'登录'">
          <a-icon type="login"/>
          <span>登录</span>
        </a-menu-item>
        <a-menu-item @click="open(config.router.register.path)"  :key="'注册'">
          <a-icon type="form"/>
          <span>注册</span>
        </a-menu-item>
      </template>

    </a-sub-menu>
  </a-menu>
</template>
<script>
import config from "@/config";
import userApi from '@/api/user'
export default {
  name: "UserMenu",
  data() {
    return {
      config,
      userInfo: this.$store.state.userInfo
    }
  },
  mounted() {
    this.$emitter.on('login',userInfo=>{
      console.log("用户登录：",userInfo)
      this.userInfo = userInfo
    })
  },
  methods: {
    open(path) {
      this.$router.push(path)
    },
    quit(){
      this.$store.dispatch('setUserInfo',undefined)
      this.userInfo = undefined
      userApi.quit().then((r) => {
        if(r.data.status){
          this.$message.success(r.data.msg)
          this.$router.push('/login')
        }else{
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })

    },
    //个人首页
    home(){
      this.$router.push('/'+this.userInfo.name)
    }
  }
}
</script>

<style scoped>

</style>