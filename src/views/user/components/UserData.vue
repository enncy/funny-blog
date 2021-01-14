<template>
  <a-row class="statistic-group" style="display: flex;flex-wrap: wrap;justify-content: center" >
    <a-col    v-if="blog_num||data">
      <a-statistic class="data-statistic"  :valueStyle="size==='small'?{'font-size': '4px'}:''"   title="文章数" :value="blog_num||data.blog_num" >
        <template #suffix>
          <a-icon type="book"  :theme="theme"  />
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="read_num||data">
      <a-statistic class="data-statistic" :valueStyle="size==='small'?{'font-size': '4px'}:''" title="总访问" :value="read_num||data.read_num"  >
        <template #suffix>
          <a-icon type="eye" :theme="theme"/>
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="star_num||data">
      <a-statistic class="data-statistic" :valueStyle="size==='small'?{'font-size': '4px'}:''" title="收藏" :value="star_num||data.star_num"  >
        <template #suffix>
          <a-icon type="star"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="like_num||data">
      <a-statistic class="data-statistic" :valueStyle="size==='small'?{'font-size': '4px'}:''" title="获赞" :value="like_num||data.like_num"  >
        <template #suffix>
          <a-icon type="like"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col   v-if="comments_num||data">
      <a-statistic class="data-statistic" :valueStyle="size==='small'?{'font-size': '4px'}:''" title="评论" :value="comments_num||data.comments_num"  >
        <template #suffix>
          <a-icon type="message"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col     v-if="fans_num||data">
      <a-statistic class="data-statistic" :valueStyle="size==='small'?{'font-size': '4px'}:''" title="粉丝" :value="fans_num||data.fans_num"  >
        <template #suffix>
          <a-icon type="heart"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>



  </a-row>
</template>

<script>
export default {

  props:{
    data:Object,//总数据
    star_num:Number,//收藏数
    blog_num:Number,//文章数
    fans_num:Number,//粉丝量
    like_num:Number, //点赞量
    read_num:Number,//阅读量
    comments_num:Number,  //评论数量

    size:String,
    theme:String ,

  }
}
</script>

<style>
.statistic-group .ant-statistic-title{
  margin-bottom: 0px;
  color: rgba(0,0,0,.45);
  font-size: 14px;
}
</style>

<style scoped>
.data-statistic{
  margin-bottom: 4px;
  min-width: 50px;
  margin-right: 20px;
}
</style>