<template>
  <span  v-if="blogInfo" class="d-flex-nowrap blog-card-info" >


          <span title="阅读" class="blog-info">
            <a-icon class="icon"    type="eye"/>
             <span class="text" >{{ blogInfo.read_num }}</span>
          </span>


          <a-divider type="vertical"></a-divider>
          <span title="点赞" class="blog-info" >
            <a-icon class="icon"   type="like"/>
            <span  class="text">{{ blogInfo.like_num }}</span>
          </span>

          <a-divider type="vertical"></a-divider>
          <span title="收藏" class="blog-info">
            <a-icon class="icon"  type="star"/>
             <span class="text" >{{ blogInfo.fav_num }}</span>
          </span>
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

@import "./assets/blog-card-info.css";


</style>