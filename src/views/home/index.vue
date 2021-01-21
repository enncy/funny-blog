<template>
  <div  >
    <template v-if="sending">
      <a-card>
        <a-skeleton></a-skeleton>
      </a-card>

    </template>

    <template v-else>
      <a-card>
        <a-row>
          <a-col :span="3" class="adapt-item-width">
            <user-avatar :user-info="userInfo"></user-avatar>
          </a-col>

          <a-col  :span="8"  style="margin-left: 10px;margin-top: 10px"  class="adapt-item-width">
            <user-profile :show-profile="true" :show-data="false" :user-info="userInfo"></user-profile>
          </a-col>

          <a-col  :span="12"  style="margin-top: 10px"  class="adapt-item-width">
            <user-data  :data="userInfo" :theme="'twoTone'"></user-data>
          </a-col>
        </a-row>

        <a-row>
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="他的文章">
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

            <a-tab-pane key="2" tab="收藏">
              <a-empty  description="暂无收藏"/>
            </a-tab-pane>

            <a-tab-pane key="3" tab="关注">
              <a-empty  description="暂无关注"/>
            </a-tab-pane>


            <a-tab-pane key="4" tab="分栏">
              <a-empty  description="暂无分栏"/>
            </a-tab-pane>


          </a-tabs>
        </a-row>

      </a-card>
    </template>
  </div>

</template>

<script>

import UserAvatar from "@/views/user/components/UserAvatar";
import UserProfile from "@/views/user/components/UserProfile";
import UserData from "@/views/user/components/UserData";
import BlogCard  from "@/views/components/BlogCard";

import userApi from '@/api/user'
import blogApi from '@/api/blog'

export default {
  name: "index",
  components:{
    UserProfile , UserData , BlogCard ,UserAvatar
  },
  data(){
    return{
      userInfo:undefined,
      blogInfo:undefined,
      sending:false,
      sendingGetBlog:false,
      name:this.$route.params.name,
    }
  },
  methods:{
    getInfo(){
      userApi.getUserByNmae(this.name).then((r) => {

        if(r.data.status){
          this.userInfo = r.data.data
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
</style>