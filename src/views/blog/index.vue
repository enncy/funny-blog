<template>
  <div  >

    <a-row class="d-flex-nowrap big-no-warp" style="justify-content: center">

      <!--作者信息展示-->
      <a-col  v-if="blogInfo && !readMode" :span="4" style=" min-width: 260px" class=" adapt-item-width adapt-item-big-show ">

        <blog-section  title="作者" color="black" >
          <div    class="div-card">
            <user-avatar :user-info="blogInfo.author_info"></user-avatar>
            <a-divider style="margin-top: 10px"/>
            <user-profile :show-data="true" :show-profile="true"  :user-info="blogInfo.author_info"></user-profile>
          </div>
        </blog-section >

        <!--数据统计-->
        <blog-section :padding="6" class="adapt-item-big-show ">
          <user-simple-data v-if="blogInfo&&blogInfo.author_info" :data="blogInfo.author_info"></user-simple-data>
        </blog-section>

        <blog-section title="搜索" color="blue" >
          <a-input-search   :placeholder="`搜索${blogInfo.author}的文章`"   @search="onSearch" />
        </blog-section>

        <blog-section title="他的文章" color="red" >
          暂无
        </blog-section>

        <a-affix :offset-top="60">
          <blog-section title="趣博客" class="adapt-item-big-show" style=" min-width: 260px" >
            <div class="div-card font-small  ">
              <website-info></website-info>
            </div>
          </blog-section>
        </a-affix>

      </a-col>

      <a-col :span="4" v-else>
        <div  v-if=" !readMode" class="div-card">
          <a-skeleton avatar active />
          <a-skeleton  :paragraph="{ rows: 4 }"   active />
        </div>
      </a-col>


      <!--沉浸模式阅读-->
      <a-col  v-if="readMode" :span="12" class="adapt-item-width" style="height: 100%">
        <!--博客显示内容-->
        <blog-markdown ref="md" :body="blogInfo.body"></blog-markdown>
      </a-col>

      <!--文章显示区域-->
      <a-col v-if=" !readMode"  :span="12"  class="adapt-item-width  index-blog-col offset-small" style="margin-bottom: 10px" >

        <img   src="https://cdn.jsdelivr.net/gh/enncy/cdn@1.0.1/src/img/bg6.png" style="width: 100%;" height="250"/>

        <div class="div-card">
          <!--判空-->
          <template v-if="error">
            <a-empty description="此文章不存在"/>
          </template>
          <!--骨架-->
          <template v-else-if="!blogInfo">
            <a-skeleton active/>
          </template>
          <template v-else>
            <!--博客头部-->
            <blog-header :blogInfo="blogInfo"></blog-header>
            <a-divider style="margin-top: 2px"/>
            <!--博客显示内容-->
            <blog-markdown ref="md" :body="blogInfo.body"></blog-markdown>
          </template>
        </div>

        <blog-section   class="adapt-item-width  adapt-item-big-hide">
          <blog-operation :blog-info="blogInfo" @openReadMode="openReadMode"  v-if="body!==''"></blog-operation>
        </blog-section>

        <!--发表评论-->
        <div >
          <publish-comments @publishComment="publishComment" v-if="blogInfo" comment-type="create" :top-uid="blogInfo.uid"></publish-comments>
        </div>

        <!--博客的评论-->
        <blog-comments   v-if="blogInfo" :blog-info="blogInfo" ></blog-comments>

      </a-col>





      <!--右边栏-->
      <a-col v-if="blogInfo"  :span="4" style="min-width: 260px;" class="offset-small adapt-item-width" >
        <a-affix :offset-top="readMode?20:60">
          <blog-operation :blog-info="blogInfo" @openReadMode="openReadMode"  v-if="body!==''"></blog-operation>


          <blog-catalog  class="adapt-item-big-show"> </blog-catalog>
        </a-affix>

        <template v-if=" !readMode">

          <blog-section    title="相似文章" color="orange" class="adapt-item-width">
            暂无
          </blog-section>
        </template>

      </a-col>
      <a-col :span="4" v-else>
        <div     class="div-card">
          <a-skeleton   :paragraph="{ rows: 8 }"  active />

        </div>
      </a-col>


      <a-back-top/>
    </a-row>
  </div>

</template>

<script>

import BlogOperation from "@/views/blog/components/BlogOperation";
import PublishComments from "@/views/blog/components/comment/PublishComments";
import BlogCatalog from "@/views/blog/components/BlogCatalog";
import BlogMarkdown from "@/views/blog/components/BlogMarkdown";
import BlogHeader from "@/views/blog/components/BlogHeader";
import BlogSection from "@/views/components/BlogSection";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import UserProfile from "@/views/user/components/UserProfile";
import blogApi from '@/api/blog'
import utils from '@/utils/index'
import WebsiteInfo from "@/views/index/components/WebsiteInfo";
import config from '@/config/index'
import BlogComments from "@/views/blog/components/comment/BlogComments";
export default {
  name: "blog",
  components: {
    BlogHeader,BlogComments,BlogSection,UserProfile,UserAvatar,UserSimpleData,WebsiteInfo,BlogMarkdown,BlogCatalog,PublishComments,BlogOperation
  },
  data() {
    return {
      blogInfo: undefined,
      error: false,
      body: '',

      //阅读模式
      readMode:false,

    }
  },
  mounted() {
    this.getBlogInfo(this.$route.params.uid)
  },



  methods: {
    //评论发表监听
    publishComment(comment){
      this.blogInfo.comments.push(comment)
    },

    openReadMode(readMode){
      this.readMode = readMode
      this.$emit('openReadMode',this.readMode)
    },

    getBlogInfo(uid) {
      let blogInfo = this.getBlogInfoByStore(uid)
      if (blogInfo) {
        console.log("读取缓存信息：", blogInfo)
        this.blogInfo = blogInfo
        this.setFormatBlogBody()
      } else {
        this.getBlogInfoByApi(uid)
      }

    },
    //通过本地获取博客信息
    getBlogInfoByStore(uid) {
      return this.$store.state.blogs.filter(blog => blog.uid === uid)[0]
    },
    //通过服务器获取博客信息
    getBlogInfoByApi(uid) {
      blogApi.getByUid(uid).then((r) => {
        if (r.data.status) {
          this.blogInfo = r.data.data
          this.setFormatBlogBody()
          //保存信息
          this.$store.dispatch('addBlog', this.blogInfo)
          console.log("[读取服务器信息]", this.blogInfo)
        } else {
          this.error = true
          this.$message.error(r.data.msg)
          this.$router.push({
            name:'404',
            params:{
              title:r.data.msg,
            }
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    //格式化获取文章内容
    setFormatBlogBody(){
      this.$nextTick(() => {

        this.body = utils.formatBlogBody(this?.$refs?.md?.$el)
        //刷新 seo 信息
        this.$route.meta.description = this.blogInfo.body
        this.$route.meta.title = this.blogInfo.title
        this.$route.meta.keywords = this.blogInfo.title
        this.blogInfo.tags.forEach(tag=>{
          this.$route.meta.keywords+= ','+tag
        })
        this.$route.meta.keywords+= " | " + config.title
        this.$route.meta.title+= " | " + config.title
        utils.setMeta(this.$route)
      })
    },

  },
}
</script>



<style scoped>




.blog-markdown {
  z-index: 0;
  min-height: 200px;
}

@media screen and (max-width: 801px) {
  .index-blog-col{

  }
}

@media screen and (min-width: 801px) {
  .index-blog-col{
    min-width: 500px;
  }
}
</style>