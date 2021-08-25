<template>
  <a-menu
      mode="horizontal"
  >
    <a-sub-menu>
      <span slot="title">
        <a-icon type="user"/>
        {{ userInfo ? userInfo.name : '未登录' }}
      </span>
      <template v-if="userInfo">

        <a-menu-item @click="open(`/${userInfo.name}`)" :key="'个人首页'">
          <a-icon type="home"/>
          <span>个人首页</span>
        </a-menu-item>

        <template v-for="(item,index) in userMenu">

          <a-menu-item @click="open(item.path)" :key="index">
            <a-icon :type="item.icon"/>
            <span>{{item.name}}</span>
          </a-menu-item>
        </template>

        <a-menu-item @click="quit()" :key="'退出'">
          <a-icon type="logout"/>
          <span>退出</span>
        </a-menu-item>

      </template>

      <template v-else>
        <a-menu-item @click="open('/login')" :key="'登录'">
          <a-icon type="login"/>
          <span>登录</span>
        </a-menu-item>
        <a-menu-item @click="open('/register')" :key="'注册'">
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

    let userMenu = [

      {name: '个人中心', path: '/user/blogs',icon:'user'},
      {name: '写博客', path: '/user/editor',icon:'edit'},
      {name: '我的收藏', path: '/user/star',icon:'star'},
      {name: '设置', path: '/user/setting',icon:'setting'},

    ]


    return {
      config,
      userMenu,
      userInfo: this.$store.state.userInfo
    }
  },
  mounted() {
    this.$emitter.on('login', userInfo => {
      console.log("用户登录：", userInfo)
      this.userInfo = userInfo
    })
  },
  methods: {
    open(path) {
      this.$router.push(path)
    },
    quit() {
      this.$store.dispatch('setUserInfo', undefined)
      this.userInfo = undefined
      userApi.quit().then((r) => {
        if (r.data.status) {
          this.$message.success(r.data.msg)
          this.$router.push('/login')
        } else {
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })

    },

  }
}
</script>

<style scoped>

</style>