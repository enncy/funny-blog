<template>
  <span style="display: flex;flex-wrap: nowrap">
       <template v-if="blogInfo">
        <span title="点赞" class="blog-info" >
          <a-icon type="like"/>
          <span style="margin-left: 4px">{{ blogInfo.like }}</span>
        </span>
        <a-divider type="vertical"></a-divider>
        <span title="收藏" class="blog-info">
          <a-icon type="star"/>
           <span style="margin-left: 4px">{{ blogInfo.fav_num }}</span>

        </span>
        <a-divider type="vertical"></a-divider>
        <span title="评论" class="blog-info">
          <a-icon type="message"/>
           <span style="margin-left: 4px">{{ blogInfo.comments.length }}</span>
        </span>
        <a-divider type="vertical"></a-divider>
       </template>
  </span>
</template>

<script>
export default {

  props: {
    blogInfo: Object,
    active: Boolean
  }
}
</script>

<style scoped>
.blog-info {
  display: flex;
  flex-wrap: nowrap
}
</style>