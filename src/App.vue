<template>

  <div id="app">

<!--    沉浸式编辑体验-->
    <template v-if="$route.path==='/user/editor'">
      <router-view></router-view>
    </template>

<!--    <template v-else-if="$route.name==='home'">-->
<!--      <router-view></router-view>-->
<!--    </template>-->


    <template v-else>

      <a-layout id="components-layout-demo-top" class="layout">
        <!--    固定导航栏-->
        <a-affix style="    width: 100%;">
          <a-layout-header class="index-header">
            <div class="logo">
              <img width="150px" style="    margin:0px 0px 20px 10px" src="/logo.png">
            </div>
            <!--      导航-->
            <navigation class="index-menu"></navigation>
          </a-layout-header>
        </a-affix>

        <a-layout-content class="index-content">
          <!--      router-views  网页内容显示-->
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          funy blog ©2021 Created by klskeleton
        </a-layout-footer>
      </a-layout>
    </template>



  </div>
</template>

<script>

import Navigation from "@/views/components/Navigation";
import userApi from '@/api/user'

const api = require('@/api/index')

export default {
  name: 'App',
  components: {
    Navigation
  },
  mounted() {
    // this.checkUser()
    //监听刷新，刷新前保存数据
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

  methods:{
    //检测用户是否存在，不存在则删除本地信息
    checkUser(){
      userApi.checkLogin().then((r) => {
        console.log(r)
        if(r.data.status){
          this.$store.dispatch('setUserInfo',undefined)
        }else{
          this.$store.dispatch('setUserInfo',r.data.data)
        }
      }).catch((err) => {
        console.error(err)
      })
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
#components-layout-demo-top .logo {
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  float: left;
}

.layout {
  height: 100%;
}

.layout .index-header {
  background-color: white;
  height: auto;
  padding: 0px;
}

.layout .index-content {
  height: 100%;

}

/*覆盖 antdv 原生菜单栏样式的边框*/
.layout .index-header {
  border-bottom: 1px solid white;
}

.layout .ant-menu-horizontal > .ant-menu-item-selected {
  border-bottom: 1px solid white;
}

.layout .ant-menu-horizontal {
  border-bottom: 1px solid white;
}


</style>


<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: auto;
  width: 100%;

}

@media screen and (min-width: 801px) {
  .index-content{
    padding: 20px 40px 40px 40px;
  }


  .adapt-item-show {
    display: none;
  }

  .adapt-item-hide {
    display: block;
  }

}

/*自适应*/
@media screen and (max-width: 800px) {
  .adapt-item {
    width: 100%;
  }

  .adapt-item-width {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .adapt-item-show {
    display: block;
  }

  .adapt-item-hide {
    display: none;
  }

  .index-content{
    padding: 5px;
  }
}
</style>
