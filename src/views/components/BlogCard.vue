<template>
  <div class="blog-card" >

    <a-row style="padding: 5px; " :style="{'border-top': index!==0?'1px solid #e8e8e8':''}">
      <a-col style="display: flex;flex-wrap: nowrap;  cursor: pointer;" @click="openBlog" >
        <span style="font-weight: 900;font-size: 15px" >{{ blogInfo.title }}</span>

      </a-col>
      <a-col style="margin-top: 5px;  cursor: pointer;" @click="openBlog">
        <a-avatar  icon="user"  :src="blogInfo.author.avatar"/>
        <span style="font-weight: bold"> {{ blogInfo.author.name }}</span>
        <span>: <span style="font-size:8px">{{ formatBody(blogInfo.body) }}</span></span>
      </a-col>
      <a-col style="margin-top: 5px">
        <a-row style="display:flex;flex-wrap: nowrap">
          <a-col :span="6" style="  cursor: default;">
            <blog-card-info :blogInfo="blogInfo"></blog-card-info>
          </a-col>
          <a-col :span="18" style="display:flex;justify-content: flex-end" v-if="showOperation">
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
      blogInfo:this.blogInfo,
    }
  },

  methods: {
    //格式化博客内容
    formatBody(body) {
      let newBody = body.length > 100 ? body.substr(0, 100) + ' ...' : body
      //消除 markdown 字体
      newBody = newBody.replace(/(#|-|\*|>|)/g, "").replace(/@\[TOC\]\(.*\)/, "")
      return newBody
    },
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