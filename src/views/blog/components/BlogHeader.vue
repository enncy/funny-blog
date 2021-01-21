<template>
  <a-row>

    <a-col>
      <div style="font-weight: 900;font-size: 24px; ">
        <span  class="adapt-item-big-hide " style="margin-bottom: 5px;" @click="$router.push('/'+userInfo.name)">
          <user-avatar  style="display: flex;justify-content: start" :user-info="blogInfo.author_info"></user-avatar>
        </span>
        {{ blogInfo.title }}
      </div>
    </a-col>

    <a-col style="display:flex;flex-wrap: wrap;width: 100%;">
      <a-col :span="12">
        {{ utils.getTime(blogInfo.date) }}
      </a-col>
      <a-col :span="12" style="display: flex;justify-content: flex-end">
        <template v-if="blogInfo">
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