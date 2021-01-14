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


        <a-pagination
            style="margin-top: 40px"
            show-size-changer
            :default-current="3"
            :show-total="total => `一共 ${total} 个文章`"
            :total="count"
            @showSizeChange="onShowSizeChange"
            @change="pageChange"
        />

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
      //分页
      skip:0,
      limit:10,
      count:0,
    }
  },
  watch: {
    pageSize(val) {
      console.log('pageSize', val);
    },
    current(val) {
      console.log('current', val);
    },
  },
  methods: {
    pageChange(page, pageSize){
      console.log(page, pageSize);
      this.skip = page * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.getPage()

    },

    onShowSizeChange(current, pageSize) {

      // console.log(current, pageSize);
    },

    //获取文章总数
    getCount(){
      blogApi.getCount().then((r) => {
        if(r.data.status){
          console.log(r)
          this.count  =r.data.data
        }else{
          this.$message.error(r.data.msg)
          this.count  = 0
        }
      }).catch((err) => {
        console.error(err)
      })
    },

    //获取文章
    getPage(){
      blogApi.getByPage(this.skip,this.limit).then((r) => {
        console.log(r)
        if(r.data.status){
          this.list = r.data.data
          this.sending = false
        }
        this.getCount()
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.sending = true
    this.getPage()

  }
}
</script>

<style  >

</style>