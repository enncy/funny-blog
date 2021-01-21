<template>
  <div class="blog-card" >

    <a-row style="padding: 5px; " :style="{'border-top': index!==0?'1px solid #e8e8e8':''}">
      <a-col style="display: flex;flex-wrap: nowrap;  cursor: pointer;" @click="openBlog" >
        <span style="font-weight: 900;"  class="adapt-item-title" >{{ blogInfo.title }}</span>
      </a-col>

      <a-col style="margin-top: 5px;  cursor: pointer;" @click="openBlog">
<!--        <a-avatar  icon="user"  :src="(blogInfo.author_info&&blogInfo.author_info.avatar) || ''"/>-->
        <span style="font-weight: bold"> {{ blogInfo.author }}</span>
        <span>:
          <span  class="adapt-item-text" >{{ utils.formatBlogBody(blogInfo.body) }}</span>
        </span>
      </a-col>

      <a-col  >
        <a-row style="display:flex;flex-wrap: nowrap;justify-content: flex-end">
          <a-col   style="  cursor: default;padding-top: 6px;">
            <blog-card-info :blogInfo="blogInfo"></blog-card-info>
          </a-col>
          <a-col  style="display:flex;justify-content: flex-end" v-if="showOperation">
            <a-button type="link">置顶</a-button>
            <a-button type="link" @click="edit">编辑</a-button>

            <a-popconfirm
                title="你确认删除此文章吗，删除后将不能还原！"
                ok-text="确认"
                cancel-text="取消"
                @confirm="remove"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>


          </a-col>
        </a-row>
      </a-col>


    </a-row>


  </div>

</template>

<script>


import BlogCardInfo from "@/views/components/BlogCardInfo";
import blogApi from '@/api/blog'
import utils from '@/utils/index'

export default {
  props: {
    blogInfo: Object,
    index: Number,
    //是否显示操作按钮
    showOperation:Boolean,

  },
  components:{
    BlogCardInfo
  },

  data(){
    return {
      utils,
      blogInfo:this.blogInfo,
    }
  },

  methods: {

    //打开博客
    openBlog(){
      console.log(this.blogInfo)
      this.$router.push({
        path:'/blog/'+this.blogInfo.uid,
        params: {
          blogInfo:this.blogInfo
        }
      })
    },
    //修改文章
    edit(){
      this.$router.push({
        name:'editor',
        params:{
          blogInfo:this.blogInfo
        }
      })
    },
    //删除文章
    remove(){
      blogApi.remove(this.blogInfo.uid).then((r) => {
        console.log(r)
        if(r.data.status){
          this.$message.success(r.data.msg)
          //发出删除信息
          this.$store.dispatch('removeBlog',this.blogInfo)
          this.$emit('remove',this.blogInfo)
        }else{
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })

    }
  }
}
</script>

<style scoped>

.blog-card :hover {
  background-color: rgba(250,250,250,0.8);


}

.blog-info{
  cursor: default;
}

@media screen and (min-width: 576px) {
  .blog-card {
    margin-bottom: 10px;
  }
}


@media screen and (max-width: 575px) {
  .blog-card {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>