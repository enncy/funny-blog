<template>
  <a-row style="display: flex;flex-wrap: wrap">
    <a-col class="adapt-item-width" :span="5"  >
      <a-row    >
        <a-card >
          <user-profile :show-data="true" :show-profile="true" :user-info="userInfo"></user-profile>
        </a-card>
      </a-row>

      <a-row  class="card-item">
        <a-card size="small" title="搜索文章"  >
          <a-input-search placeholder="搜索此页面的文章"   @search="onSearch" />
        </a-card>
      </a-row>

      <a-row class="adapt-item-hide card-item"  >
        <a-card title="置顶文章"  size="small">
          暂无
        </a-card>
      </a-row>

      <a-row class="adapt-item-hide card-item" >
        <a-card title="文章分类"  size="small">
          暂无
        </a-card>
      </a-row>

      <a-row class="adapt-item-hide card-item"  >
        <a-card title="热门文章"  size="small">
          暂无
        </a-card>
      </a-row>



    </a-col>
    <a-col :span="17" :offset="1" class="adapt-item-width" >
      <a-card>
<!--        <user-profile></user-profile>-->
        <a-breadcrumb>
          <a-breadcrumb-item>全部文章</a-breadcrumb-item>
        </a-breadcrumb>

        <a-divider/>

        <template v-if="sending">
          <a-skeleton/>
        </template>

        <template v-else-if="list.length===0">
          <a-empty description="空空如也~"/>
        </template>

        <template >
          <blog-card show-operation="true" v-for="(item,index) in list" :blogInfo="item" :index="index" @remove="remove"></blog-card>
        </template>
      </a-card>

    </a-col>

  </a-row>
</template>

<script>
import  UserData from '@/views/user/components/UserData';
import UserProfile from "@/views/user/components/UserProfile";

import BlogCard from "@/views/components/BlogCard";
import blogApi from "@/api/blog"
import utils from '@/utils/index'

export default {
  components:{
    UserData,UserProfile,
    BlogCard
  },

  data(){
    return {
      utils,
      list:[],
      userInfo: this.$store.state.userInfo,
      //发送请求中
      sending:false,
      //分页
      skip:0,
      limit:10,
    }
  },

  beforeCreate() {
    if (! this.$store.state.userInfo) {
      this.$message.error("您还未登录！")
      // this.$router.push('/login')
    }
  },

  methods:{

    //删除事件
    remove(blogInfo){
      this.list = this.list.filter(blog=>blog.uid!==blogInfo.uid)
    },


    //获取用户博客
    getUserBlog(skip,limit){
      blogApi.getByAuthorAndPage(this.userInfo.name,skip,limit).then((r) => {
        console.log(r)
        if(r.data.status){
          this.list = r.data.data
        }else{
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
  },

  mounted() {
    console.log(this.$store)
    this.getUserBlog(0,10)
  }

}
</script>

<style scoped>
.card-item{
  margin: 5px 0px 5px 0px;
}
</style>