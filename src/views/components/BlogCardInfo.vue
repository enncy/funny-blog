<template>
  <span class="d-flex-nowrap" style="align-items: baseline;text-align: center">
       <template v-if="blogInfo">
        <span title="点赞" class="blog-info" >
          <a-icon  style="margin-top: 3px"  type="like"/>
          <span style="margin-left: 4px">{{ blogInfo.like }}</span>
        </span>
        <a-divider type="vertical"></a-divider>
        <span title="收藏" class="blog-info">
          <a-icon  style="margin-top: 3px"  type="star"/>
           <span style="margin-left: 4px">{{ blogInfo.fav_num }}</span>

        </span>
        <a-divider type="vertical"></a-divider>
        <span title="评论" class="blog-info">
          <a-icon style="margin-top: 3px" type="message"/>
           <span style="margin-left: 4px">{{ blogInfo.comments.length }}</span>
        </span>
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