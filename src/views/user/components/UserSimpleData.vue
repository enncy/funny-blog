<template>
  <div>

    <a-row class="d-flex-nowrap-ali-center">
      <a-col :span="24/statistics.length" v-for="(item,index) in statistics" class="font-small" style="text-align: center">
        <a-row>
          <a-col>
            {{item.data}}
          </a-col>
          <a-col>
            {{item.title}}
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,//总数据

  },

  data() {


    return {

      statistics: [
        {title: "文章", data: this.data?.fav_num},
        {title: "访客", data: this.data?.blog_num},
        {title: "收藏", data: this.data?.fans_num},
        {title: "获赞", data: this.data?.like_num},
        {title: "评论", data: this.data?.read_num},
        {title: "粉丝", data: this.data?.comments_num},
      ],

      font: {'font-size': this.size === 'small' ? '13px' : '16px'},
    }
  },
  mounted() {
    console.log(this.statistics)
  }
}
</script>

<style scoped>

</style>