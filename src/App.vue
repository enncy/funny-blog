<template>

  <div id="app">
    <template >
      <!--首页铺满展示-->
      <div v-if="this.$route.name==='home' && !readMode">
        <router-view style="width: 100%;height: 100%;" ></router-view>
        <!--底部footer-->
        <a-layout-footer style="background-color: white;  margin-top: 50px;">
          <index-footer></index-footer>
        </a-layout-footer>
      </div>


      <a-layout v-else id="components-layout-demo-top" class="layout">
        <!--固定导航栏-->
        <a-affix style="    width: 100%;" v-if="!readMode" >
          <a-layout-header class="index-header">
              <span class="logo  pointer text-shadow-dark" style="z-index: 9999;">
                <logo></logo>
              </span>

            <!--导航-->
            <navigation  class="index-menu"></navigation>
          </a-layout-header>
        </a-affix>

        <a-layout-content class="index-content">

          <!--  router-views  网页内容显示 -->
          <keep-alive  include="index,user,login,register">
            <router-view  @openReadMode="openReadMode" style="min-height: 700px"></router-view>
          </keep-alive>
          <!--<router-view></router-view>-->

        </a-layout-content>
        <!--底部footer-->
        <a-layout-footer v-if="!readMode" style="background-color: white;  margin-top: 50px;">
          <index-footer></index-footer>
        </a-layout-footer>
      </a-layout>
    </template>


  </div>
</template>

<script>

import Navigation from "@/views/components/Navigation";
import IndexFooter from "@/views/components/IndexFooter";
import Logo from "@/views/components/Logo";
import userApi from '@/api/user'
import Index from "@/views/register";
import utils from '@/utils/index'
import config from "@/config/index"
const api = require('@/api/index')

export default {
  name: 'App',
  components: {
    Index,
    Navigation, IndexFooter, Logo
  },
  data(){
    return {
      //阅读模式
      readMode:false,
    }
  },
  //监听路由
  watch:{
    $route(to,from){
      utils.setMeta(to)
    }
  },
  created() {
    utils.setMeta(this.$route)
  },
  mounted() {
    this.checkUser()
    //监听刷新，刷新前保存数据
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

  methods: {
    //检测用户是否存在，不存在则删除本地信息
    checkUser() {
      userApi.checkLogin().then((r) => {
        console.log(r)
        if (r.data.status) {
          this.$store.dispatch('setUserInfo', r.data.data)
          // this.$message.warn("您还未登录")
          // this.$store.dispatch('setUserInfo', undefined)
        } else {

          this.$store.dispatch('setUserInfo', undefined)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    //阅读模式
    openReadMode(readMode){
      this.readMode = readMode
      if(readMode){
        utils.fullScreen()
      }else{
        utils.exitScreen()
      }
    }
  },
  //以 json 的方式储存数据，以防丢失
  beforeCreate() {
    let store = localStorage.getItem('store')
    if (store) {
      this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(store)))
      // 不保存博客数据
      this.$store.dispatch('clearBlog')
    }
  },

}
</script>

<style>
@import "./assets/app.css";
@import "./assets/common.css";
@media screen and  (min-width: 801px){
  .index-menu{
    margin-left: 300px;
  }
}
@media screen and  (max-width: 800px){
  .index-menu{
    margin-left:100px;
  }
}


</style>
