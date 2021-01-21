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
          <a-layout-header class="index-header" >
            <span class="logo" @click="$router.push('/')">
              <span  >
                <span style="color: #1890ff; ">趣</span>博客
              </span>
            </span>
            <!--      导航-->
            <navigation class="index-menu"></navigation>
          </a-layout-header>
        </a-affix>

        <a-layout-content class="index-content">
          <!--      router-views  网页内容显示-->
          <router-view></router-view>

        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <a-row>
            funny blog ©2021 Created by <a href="https://github.com/klskeleton/" target="_blank">klskeleton</a>
          </a-row>

          <a-row>
            在线演示地址：<a href="http://funny.klweb.top/" target="_blank">http://funny.klweb.top/</a>
          </a-row>

          <a-row>
            网站源码：<a href="https://github.com/klskeleton/funny-blog" target="_blank">https://github.com/klskeleton/funny-blog</a> <a-icon style="font-size: 20px" type="github" theme="filled" />
          </a-row>

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

  methods: {
    //检测用户是否存在，不存在则删除本地信息
    checkUser() {
      userApi.checkLogin().then((r) => {
        console.log(r)
        if (r.data.status) {
          this.$store.dispatch('setUserInfo', undefined)
        } else {
          this.$store.dispatch('setUserInfo', r.data.data)
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
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: -10px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 0.2);
  float: left;
  font-size: 20px;
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
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
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
  .index-content {
    padding: 20px 40px 40px 40px;
  }

  /*自适应隐藏效果，大屏幕显示，小屏幕隐藏*/
  .adapt-item-big-show {
    display: block;
  }

  /*自适应隐藏效果，大屏幕隐藏，小屏幕显示*/
  .adapt-item-big-hide {
    display: none;
  }

  /*自适应子元素的排列方式，大屏幕不自动换行，小屏幕自动换行*/
  .adapt-item-wrap{
    flex-wrap: nowrap;
  }

  /*自适应子元素位置，如何屏幕够大则左侧排列，小屏幕则居中显示*/
  .adapt-item-justify{
    justify-content: start;
  }

  /*文字自适应大小*/
  .adapt-item-text{
    font-size: 15px;
  }
  .adapt-item-title{
    font-size: 17px;
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

  .adapt-item-big-show {
    display: none;
  }

  .adapt-item-big-hide {
    display: block;
  }

  .adapt-item-wrap{
    flex-wrap: wrap;
  }

  .adapt-item-justify{
    justify-content: center;
  }


  .adapt-item-text{
    font-size: 14px;
  }

  .adapt-item-title{
    font-size: 15px;
  }

  .index-content {
    padding: 5px;
  }
}
</style>
