<template>
  <a-row>

    <!--用户头像和名字-->
    <a-col>
      <div style="font-weight: bold;font-size: 24px; margin-bottom: 10px;">
        <!--adapt-item-big-hide 大屏幕隐藏，小屏幕显示-->
        <span  class="adapt-item-big-hide " style="margin-bottom: 5px;" @click="$router.push('/'+userInfo.name)">
          <user-avatar  style="display: flex;justify-content: start" :user-info="blogInfo.author_info"></user-avatar>
        </span>
        <!--文章标题-->
        <span class="blog-font ">{{ blogInfo.title }}</span>
      </div>
    </a-col>

    <!--文章标签-->
    <a-col>
      <a-icon type="tags" style="margin-right: 5px"/>
      <template v-for="(item,index) in blogInfo.tags">
        <a-button type="link" :size="'small'" color="blue" >#{{item}}</a-button>
      </template>
    </a-col>

    <!--文章基本信息-->
    <a-col class="d-flex-nowrap" style=";width: 100%;color: gray">
      <a-col :span="18"  class="blog-font">
        {{userInfo.name}} 发布于:{{ utils.getTime(blogInfo.date,true) }}
        <a-badge status="default"/>
        最近更新:{{utils.getElapsedTime(blogInfo.date)}}
      </a-col>
      <a-col :span="6" style="display: flex;justify-content: flex-end">
        <template v-if="blogInfo">
          <!--文章数据-->
          <blog-card-info :blogInfo="blogInfo"></blog-card-info>
        </template>
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