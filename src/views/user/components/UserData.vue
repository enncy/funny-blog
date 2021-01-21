<template>
  <a-row class="statistic-group  adapt-item-justify" style="display: flex;flex-wrap: wrap;"  >

    <a-col v-if="userInfo.blog_num!==undefined" >
      <a-statistic class="data-statistic"   :valueStyle="{'font-size':size==='small'?'4px':'16px'}"  title="文章数"
                   :value="userInfo.blog_num" >
        <template #suffix>
          <a-icon type="book"  :theme="theme"  />
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="userInfo.read_num!==undefined">
      <a-statistic class="data-statistic" :valueStyle="{'font-size':size==='small'?'4px':'16px'}" title="总访问"
                   :value="userInfo.read_num"  >
        <template #suffix>
          <a-icon type="eye" :theme="theme"/>
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="userInfo.star_num!==undefined">
      <a-statistic class="data-statistic" :valueStyle="{'font-size':size==='small'?'4px':'16px'}" title="收藏"
                   :value="userInfo.star_num"  >
        <template #suffix>
          <a-icon type="star"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col    v-if="userInfo.like_num!==undefined">
      <a-statistic class="data-statistic" :valueStyle="{'font-size':size==='small'?'4px':'16px'}" title="获赞"
                   :value="userInfo.like_num"  >
        <template #suffix>
          <a-icon type="like"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col   v-if="userInfo.comments_num!==undefined">
      <a-statistic class="data-statistic" :valueStyle="{'font-size':size==='small'?'4px':'16px'}" title="评论"
                   :value="userInfo.comments_num"  >
        <template #suffix>
          <a-icon type="message"  :theme="theme" />
        </template>
      </a-statistic>
    </a-col>

    <a-col     v-if="userInfo.fans_num!==undefined">
      <a-statistic class="data-statistic" :valueStyle="{'font-size':size==='small'?'4px':'16px'}" title="粉丝"
                   :value="userInfo.fans_num"  >
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

  },

  data(){
    return{
      userInfo: this.data || {
        star_num:this.star_num,//收藏数
        blog_num:this.blog_num,//文章数
        fans_num:this.fans_num,//粉丝量
        like_num:this.like_num, //点赞量
        read_num:this.read_num,//阅读量
        comments_num:this.comments_num,  //评论数量
      }
    }
  },
  mounted() {
    console.log(this.userInfo)
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