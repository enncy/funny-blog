<template>
  <div style="  background-color: ghostwhite;">
    <logo style="position: absolute;z-index: 999;color: white;font-size: 25px;top: 10px;left: 20px" ></logo>
    <template v-if="sending">
      <a-card>
        <a-skeleton></a-skeleton>
      </a-card>

    </template>

    <template v-else>
      <a-row style="text-align: center;padding: 140px 0px 140px 0px"   :style="{backgroundImage}"  class="adapt-item-width background-image" >
        <a-col    >
          <user-avatar style="color: white"  size="large" :user-info="userInfo"  :text-style="{textShadow:'1px 1px 6px rgba(0,0,0,0.5)'}"></user-avatar>
        </a-col>
        <a-col style="display: flex;justify-content: center;margin-top: 10px">
          <blog-section style="width: 300px">
            <user-simple-data :data="userInfo" ></user-simple-data>
          </blog-section>
        </a-col>

      </a-row>

      <a-row>
        <a-col  :span="14" :offset="5" class="adapt-item-width card-container" style="position: relative;top: -100px" >
          <a-tabs  type="card"  default-active-key="1" @change="callback">
            <a-tab-pane key="0" tab="他的文章">
              <template v-if="sendingGetBlog">
                <a-card>
                  <a-skeleton></a-skeleton>
                </a-card>
              </template>
              <template v-else-if="blogInfo===undefined||blogInfo.length===0">
                <a-empty  description="暂无文章"/>
              </template>

              <template v-if="blogInfo">
                <blog-card v-for="(item,index) in blogInfo"   :blog-info="item"  :index="index"></blog-card>
              </template>
            </a-tab-pane>

            <a-tab-pane key="1" tab="资料">
              <home-user-profile :user-info="userInfo"></home-user-profile>
              <!--<blog-section>-->
              <!--  <a-empty v-if="!userInfo"  description="暂无资料"/>-->
              <!--  <a-row v-else>-->
              <!--    <a-col   style="margin-left: 10px;margin-top: 10px"  class="adapt-item-width">-->
              <!--      <user-profile :show-profile="true" :show-data="false" :user-info="userInfo"></user-profile>-->
              <!--    </a-col>-->

              <!--    <a-col    style="margin-top: 10px"  class="adapt-item-width">-->
              <!--      <user-data size="small" :data="userInfo" :theme="'twoTone'"></user-data>-->
              <!--    </a-col>-->
              <!--  </a-row>-->
              <!--</blog-section>-->

            </a-tab-pane>

            <a-tab-pane key="2" tab="收藏">
              <blog-section><a-empty  description="暂无收藏"/></blog-section>

            </a-tab-pane>

            <a-tab-pane key="3" tab="关注">
              <blog-section><a-empty  description="暂无关注"/></blog-section>

            </a-tab-pane>


            <a-tab-pane key="4" tab="分栏">
              <blog-section><a-empty  description="暂无分栏"/></blog-section>

            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </template>
  </div>

</template>

<script>

import UserAvatar from "@/views/user/components/UserAvatar";
import UserData from "@/views/user/components/UserData";
import BlogCard  from "@/views/components/BlogCard";
import BlogSection from "@/views/components/BlogSection";
import HomeUserProfile from "@/views/home/components/HomeUserProfile";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import Logo from "@/views/components/Logo";
import utils from '@/utils/index'

import userApi from '@/api/user'
import blogApi from '@/api/blog'

export default {
  name: "index",
  components:{
     UserData , BlogCard ,UserAvatar,BlogSection,HomeUserProfile,Logo,UserSimpleData
  },
  data(){
    return{
      //基本信息
      userInfo:undefined,
      blogInfo:undefined,
      sending:false,
      sendingGetBlog:false,
      name:this.$route.params.name,

      //背景样式
      backgroundImage: `url('https://cdn.jsdelivr.net/gh/klskeleton/cdn/src/img/bg3.png')`
    }
  },
  methods:{
    getInfo(){
      userApi.getUserByNmae(this.name).then((r) => {

        if(r.data.status){
          this.userInfo = r.data.data
          console.log(this.userInfo)
          this.getBlog()
        }else{
          this.$message.error(r.data.msg)
          this.$router.push('/error')
        }
        this.sending = false
      }).catch((err) => {
        console.error(err)
      })
    },
    getBlog(){
      this.sendingGetBlog = true
      blogApi.getByAuthorAndPage(this.name,0,10).then((r) => {
        this.sendingGetBlog  = false
        if(r.data.status){
          this.blogInfo = r.data.data
        }else{
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    callback(key) {
      console.log(key);
    },
  },
  mounted() {
    this.sending = true
    this.getInfo()


  }
}
</script>

<style scoped>
body,html{
  background-color: white;

}

.background-image{
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-color: ghostwhite;
  background-size:100% 60%;

  background-attachment: fixed;
}
</style>

<style>
.card-container {
  overflow: hidden;
  padding: 24px;

}


.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-bottom: 0px;
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top:  50px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar  .ant-tabs-tab-prev-icon {
  color: white;
  font-weight: bold;
}
.card-container > .ant-tabs-card > .ant-tabs-bar  .ant-tabs-tab-next-icon {
  color: white;
  font-weight: bold;
}


.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-radius:  4px;
  color: white;
  border-color: transparent;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.5);
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab-active {
  color: #1890ff;
  text-shadow: 1px 1px 6px white;
  border-color: #fff;
  background: #fff;
}
</style>