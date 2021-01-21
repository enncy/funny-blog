<template>
  <a-row style="display: flex;" class="adapt-item-wrap">
    <a-col class="adapt-item-width"  :span="5" style="min-width: 300px" >
      <a-row  >
        <a-card >
          <user-avatar :user-info="userInfo"></user-avatar>
          <a-divider/>
          <user-profile :show-data="true" :show-profile="true" :user-info="userInfo"></user-profile>
        </a-card>
      </a-row>

      <a-row  class="card-item">
        <a-card size="small" title="搜索文章"  >
          <a-input-search placeholder="搜索此页面的文章"   @search="onSearch" />
        </a-card>
      </a-row>

      <a-row class="adapt-item-big-show card-item"  >
        <a-card title="置顶文章"  size="small">
          暂无
        </a-card>
      </a-row>

      <a-row class="adapt-item-big-show card-item" >
        <a-card title="文章分类"  size="small">
          暂无
        </a-card>
      </a-row>

      <a-row class="adapt-item-big-show card-item"  >
        <a-card title="热门文章"  size="small">
          暂无
        </a-card>
      </a-row>



    </a-col>
    <a-col :span="18"    class="blog-list adapt-item-width " >
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

        <user-pagination :user-info="userInfo" @listUpdate="listUpdate"  @sendApi="sendApi" @finishSendApi="finishSendApi"></user-pagination>

      </a-card>

    </a-col>

  </a-row>
</template>

<script>
import  UserData from '@/views/user/components/UserData';
import UserProfile from "@/views/user/components/UserProfile";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserPagination from "@/views/user/components/UserPagination";
import BlogCard from "@/views/components/BlogCard";
import blogApi from "@/api/blog"
import utils from '@/utils/index'

export default {
  components:{
    UserAvatar,
    UserData,UserProfile,UserPagination,
    BlogCard
  },

  data(){
    return {
      utils,
      list:[],
      userInfo: this.$store.state.userInfo,
      //发送请求中
      sending:false,
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

    //文章更新
    listUpdate(list){
      this.list = list
    },
    //发送 api监听
    sendApi(){
      this.sending = true
    },
    // api 发送完成监听
    finishSendApi(){
      this.sending = false
    },
    //搜索文章
    onSearch(){

    }
  },

  mounted() {

  }

}
</script>

<style scoped>
.card-item{
  margin: 5px 0px 5px 0px;
}
.blog-list{
  margin: 0px 0px 0px 10px
}


@media screen and (max-width: 800px) {
  .blog-list{
    margin: 0px 0px 0px 0px
  }
}

</style>