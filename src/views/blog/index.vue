<template>
  <div  >
    <a-row style="display:flex;justify-content: center;flex-wrap: wrap">

      <a-col class="adapt-item-show adapt-item-width"  >
        <a-card>
          <blog-user v-if="blogInfo" :blogInfo="blogInfo"></blog-user>
        </a-card>
      </a-col>

      <a-col :span="16" class="adapt-item-width">


        <a-card >

          <template v-if="error">
            <a-empty description="此文章不存在" />
          </template>

          <template v-else-if="!blogInfo">
            <a-skeleton active />
          </template>


          <template v-else>
            <blog-header :blogInfo="blogInfo"></blog-header>

            <a-divider style="margin-top: 2px"/>


            <mavon-editor
                :codeStyle="'gruvbox-dark'" class="blog-markdown" :value="blogInfo.body"
                :subfield="false" :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :boxShadow="false"

                :ishljs="true"
            />
          </template>
        </a-card>
      </a-col>

      <a-col    :span="5" style="margin-left: 20px;min-width: 260px" class="adapt-item-width">
        <a-card class="adapt-item-hide">
          <template v-if="!blogInfo">
            <a-skeleton avatar :paragraph="{ rows: 4 }" />
          </template>
          <template  v-else>
            <blog-user  :blogInfo="blogInfo"></blog-user>
          </template>

        </a-card>
      </a-col>

      <a-back-top />
    </a-row>
  </div>

</template>

<script>
import BlogHeader from "@/views/blog/components/BlogHeader";
import BlogUser from "@/views/blog/components/BlogUser";
import blogApi from '@/api/blog'

export default {
  name: "index",
  components:{
    BlogHeader, BlogUser
  },
  data() {
    return {
      blogInfo:undefined,
      error:false

    }
  },
  mounted() {
     this.getBlogInfo(this.$route.params.uid)

  },

  methods:{
    getBlogInfo(uid){

      let blogInfo = this.getBlogInfoByStore(uid)
      if(blogInfo){
        console.log("读取缓存信息：",blogInfo)
        this.blogInfo = blogInfo
      }else{
        this.getBlogInfoByApi(uid)
      }

    },
    //通过本地获取博客信息
    getBlogInfoByStore(uid){
      return this.$store.state.blogs.filter(blog=>blog.uid===uid)[0]
    },
    //通过服务器获取博客信息
    getBlogInfoByApi(uid){
      blogApi.getByUid(uid).then((r) => {
        if(r.data.status){
          this.blogInfo = r.data.data
          //保存信息
          this.$store.dispatch('addBlog',this.blogInfo)
          console.log("读取服务器信息：", this.blogInfo)
        }else{
          this.error = true
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
  },

}
</script>

<style scoped>
.blog-markdown {
  z-index: 0;
  min-height: 500px;
}
</style>