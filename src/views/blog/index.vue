<template>
  <div>
    <a-row class="d-flex-wrap" style="justify-content: center">

      <!--      <a-col class="adapt-item-big-hide adapt-item-width"  >-->
      <!--        <a-card v-if="blogInfo">-->
      <!--      -->
      <!--          <blog-user v-if="blogInfo" :blogInfo="blogInfo"></blog-user>-->
      <!--        </a-card>-->
      <!--      </a-col>-->

      <a-col :offset="3" :span="13"  class="adapt-item-width  index-blog-col">
        <div class="blog-card-body">
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
            <mavon-editor

                ref="md"
                :codeStyle="'gruvbox-dark'" class="blog-markdown" :value="blogInfo.body"
                :subfield="false" :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :boxShadow="false"
                :ishljs="true"
            />
          </template>
        </div>
      </a-col>

      <!--作者信息展示-->
      <a-col  v-if="blogInfo" :span="4" style=" min-width: 260px" class=" adapt-item-width offset-small">
        <blog-section  title="作者" color="black" class="adapt-item-big-show ">
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
          <blog-section title="趣博客"  >
            <div class="div-card font-small">
              <website-info></website-info>
            </div>
          </blog-section>
        </a-affix>

      </a-col>
      <a-col v-else>
        <div class="div-card">
          <a-skeleton  avatar/>
        </div>
      </a-col>

      <a-back-top/>
    </a-row>
  </div>

</template>

<script>

import BlogHeader from "@/views/blog/components/BlogHeader";
import BlogSection from "@/views/components/BlogSection";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import UserProfile from "@/views/user/components/UserProfile";
import blogApi from '@/api/blog'
import utils from '@/utils/index'
import WebsiteInfo from "@/views/index/components/WebsiteInfo";

export default {
  name: "blog",
  components: {
    BlogHeader,BlogSection,UserProfile,UserAvatar,UserSimpleData,WebsiteInfo
  },
  data() {
    return {
      blogInfo: undefined,
      error: false,
      body: '',

    }
  },
  mounted() {
    this.getBlogInfo(this.$route.params.uid)

  },

  methods: {
    getBlogInfo(uid) {
      let blogInfo = this.getBlogInfoByStore(uid)
      if (blogInfo) {
        console.log("读取缓存信息：", blogInfo)
        this.blogInfo = blogInfo
        this.getFormatBlogBody()
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
          this.getFormatBlogBody()
          //保存信息
          this.$store.dispatch('addBlog', this.blogInfo)
          console.log("读取服务器信息：", this.blogInfo)
        } else {
          this.error = true
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    //格式化获取文章内容
    getFormatBlogBody(){
      this.$nextTick(() => {
        this.body = utils.formatBlogBody(this?.$refs?.md?.$el)
        console.log(this.body)
      })
    }


  },
}
</script>



<style scoped>


.blog-card-body {
  padding: 15px;
  background-color: white;
}

.blog-markdown {
  z-index: 0;
  min-height: 500px;
}

@media screen and (max-width: 801px) {
  .index-blog-col{

  }
}

@media screen and (min-width: 801px) {
  .index-blog-col{
    min-width: 600px;
  }
}
</style>