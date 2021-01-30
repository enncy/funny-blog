<template>
  <div>
    <template v-if="sendingGetBlog">
      <a-card>
        <a-skeleton></a-skeleton>
      </a-card>
    </template>
    <template v-else-if="list===undefined||list.length===0">
      <a-empty  description="暂无文章"/>
    </template>

    <template v-if="list">
      <blog-card v-for="(item,index) in list"   :blog-info="item"  :index="index"></blog-card>
    </template>

    <!--分页组件-->
    <user-pagination v-if="userInfo" style="margin-top: 20px" @listUpdate="listUpdate"  :user-info="userInfo" ></user-pagination>
  </div>
</template>

<script>
import BlogCard  from "@/views/components/BlogCard";
import UserPagination from "@/views/user/components/UserPagination";
export default {
  components:{
    BlogCard,UserPagination
  },
  props:{
    userInfo:Object,
  },
  data(){
    return{
      sendingGetBlog:false,
      //文章列表
      list:undefined,
    }
  },
  methods:{
    //博客页变化
    listUpdate(list){
      this.list = list;
    },
  }
}
</script>

<style scoped>

</style>