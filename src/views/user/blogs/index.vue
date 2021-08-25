<template>
  <div>
    <div class="div-card">
      <a-breadcrumb>
        <a-breadcrumb-item>全部文章</a-breadcrumb-item>
      </a-breadcrumb>
    </div>


    <template v-if="sending">
      <a-skeleton/>
    </template>

    <template v-else-if="list.length===0">
      <a-empty description="空空如也~"/>
    </template>

    <template v-for="(item,index) in list">
      <blog-card  show-operation="true"  :blogInfo="item" :index="index" @remove="remove"></blog-card>
    </template>

    <user-pagination :user-info="userInfo" @listUpdate="listUpdate"  @sendApi="sendApi" @finishSendApi="finishSendApi"></user-pagination>
  </div>
</template>

<script>
import UserPagination from "@/views/user/components/UserPagination";
import BlogCard from "@/views/components/BlogCard";
export default {
  name:'user-blogs',
  components:{
    UserPagination,BlogCard
  },

  data(){
    return {
      list:[],
      userInfo:this.$store.state.userInfo,
      //发送请求中
      sending:false,
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
 }
}
</script>

<style scoped>

</style>