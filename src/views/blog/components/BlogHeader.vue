<template>
  <a-row>

    <!--用户头像和名字-->
    <a-col>
      <div style="font-weight: bold;font-size: 24px; margin-bottom: 10px;">
        <!--adapt-item-big-hide 大屏幕隐藏，小屏幕显示-->
        <span class="adapt-item-big-hide " style="margin-bottom: 5px;" @click="$router.push('/'+userInfo.name)">
          <user-avatar style="display: flex;justify-content: start" :user-info="blogInfo.author_info"></user-avatar>
        </span>
        <!--文章标题-->
        <h1 style=" ;font-weight: bold">{{ blogInfo.title }}</h1>
      </div>
    </a-col>






    <!--文章标签-->
    <a-col>

      <a-row class="d-flex-nowrap">

        <a-col :span="16"  >
          <a-icon type="tags" class="font-small" style="margin-right: 5px"/>
          <template v-if="blogInfo.publish">
            <span style="margin-right: 4px;color: orange">#原创</span>
          </template>
          <template v-else>
            <span style="margin-right: 4px;color: gray">#搬运</span>
          </template>
          <span v-if="blogInfo.tags.length!==0">
            <template v-for="(item,index) in blogInfo.tags">
            <a-button type="link" :size="'small'" color="blue">#{{ item }}</a-button>
            </template>
        </span>
        </a-col>

        <a-col class="adapt-item-big-hide" :span="8" >
          <a-row v-if="blogInfo" style="display: flex;justify-content: flex-end">
            <!--文章数据-->
            <blog-card-info class="font-small" :blogInfo="blogInfo"></blog-card-info>
          </a-row>
        </a-col>
      </a-row>

    </a-col>





    <!--文章基本信息-->
    <a-col class="d-flex-nowrap" style=";width: 100%;color: gray">

      <a-col class="blog-font adapt-item-width" :span="18">
        {{ userInfo.name }} 发布于:{{ utils.getTime(blogInfo.date, true) }}
        <a-badge status="default"/>
        最近更新:{{ utils.getElapsedTime(blogInfo.date) }}前
      </a-col>

      <a-col class="adapt-item-big-show" :span="6" >
        <a-row v-if="blogInfo" style="display: flex;justify-content: flex-end">
          <!--文章数据-->
          <blog-card-info class="font-small" :blogInfo="blogInfo"></blog-card-info>
        </a-row>
      </a-col>

    </a-col>

  </a-row>
</template>

<script>
import UserAvatar from "@/views/user/components/UserAvatar";
import BlogCardInfo from "@/views/components/BlogCardInfo";
import utils from '@/utils/index'

export default {
  name: "BlogHeader",
  props: {
    blogInfo: Object
  },
  components: {BlogCardInfo, UserAvatar},
  data() {
    return {
      utils,
      blogInfo: this.blogInfo,
      userInfo: this.blogInfo.author_info
    }
  },
  methods: {},
  mounted() {
    console.log(new Date(this.blogInfo.date).getTime())
  }
}
</script>

<style scoped>

</style>