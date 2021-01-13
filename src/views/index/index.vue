<template>
  <a-card >
    <a-row style="display: flex; flex-wrap: wrap">
      <a-col class="adapt-item" :span="18"  >
        <template v-for="(item,index) in list">
          <blog-card   :blogInfo="item" :index="index"></blog-card>
        </template>

        <template v-if="list.length===0">

          <a-skeleton v-if="sending" active />
          <a-empty v-else description="暂无博客文章"></a-empty>
        </template>

      </a-col>
      <a-col style="min-width: 150px" :offset="1" :span="5" class="adapt-item-width"  >
        <a-card size="small" title="热门文章">
          暂无
        </a-card>
        <a-card style="margin-top: 20px" size="small"  title="你的喜欢">
          暂无
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import BlogCard from "@/views/components/BlogCard";

import blogApi from '@/api/blog'

export default {
  components:{
    BlogCard
  },
  data(){
    return {
      list:[],
      hot_blog:[],
      fav_blog:[],

      sending:false,
    }
  },
  mounted() {
    this.sending = true
    blogApi.getByPage(0,10).then((r) => {
      console.log(r)
      if(r.data.status){
        this.list = r.data.data
        this.sending = false
      }
    }).catch((err) => {
      console.error(err)
    })
  }
}
</script>

<style scoped>

</style>