<template>
  <a-card>
    <a-row style="display: flex; flex-wrap: wrap">


      <a-col class="adapt-item" :span="18">

        <!--遍历博客-->
        <template v-for="(item,index) in list">
          <blog-card :blogInfo="item" :index="index"></blog-card>
        </template>


        <template v-if="list.length===0">
          <a-skeleton v-if="sending" active/>
          <a-empty v-else description="暂无博客文章"></a-empty>
        </template>

        <!--分页组件-->
        <pagination @listUpdate="listUpdate"  @sendApi="sendApi" @finishSendApi="finishSendApi"></pagination>


      </a-col>
      <a-col style="min-width: 150px" :offset="1" :span="5" class="adapt-item-width">
        <a-card size="small" title="热门文章">
          暂无
        </a-card>
        <a-card style="margin-top: 20px" size="small" title="你的喜欢">
          暂无
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import BlogCard from "@/views/components/BlogCard";
import Pagination from "@/views/index/components/Pagination";


export default {
  components: {
    BlogCard,Pagination
  },
  data() {
    return {
      list: [],
      hot_blog: [],
      fav_blog: [],

      sending : false,
    }
  },

  methods: {
    //监听分页组件的 文章列表更新时间
    listUpdate(list) {
      this.list = list
    },
    //监听分页组件的请求发送事件
    sendApi(){
      this.sending = true
    },
    finishSendApi(){
      this.sending = false
    }
  },

}
</script>

<style>

</style>