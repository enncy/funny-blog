<template>
  <a-row  >

    <a-col>
      <div style="font-weight: 900;font-size: 24px">
        {{blogInfo.title}}
      </div>
    </a-col>

    <a-col style="display:flex;flex-wrap: wrap;width: 100%;">
      <a-col :span="12"  >
          {{getTime(blogInfo.date)}}
      </a-col >
      <a-col :span="12" style="display: flex;justify-content: flex-end">
        <template v-if="blogInfo">
          <blog-card-info    :blogInfo="blogInfo"></blog-card-info>
        </template>

      </a-col>

    </a-col>

  </a-row>
</template>

<script>

import BlogCardInfo from "@/views/components/BlogCardInfo";

export default {
  name: "BlogHeader",
  props:{
    blogInfo:Object
  },
  components:{BlogCardInfo},
  data(){
    return{
      blogInfo:this.blogInfo,
      userInfo: this.blogInfo.author
    }
  },
  methods:{

    //格式化时间
    getTime(t) {
      let  date=new Date(parseInt(t));
      let year=date.getFullYear();
      let mon = date.getMonth()+1;
      let day = date.getDate();
      let hours = date.getHours();
      let minu = date.getMinutes();
      return year+'年'+mon+'月'+day+'日  '+hours+':'+minu;
    }
  },
  mounted() {
    console.log(new Date(this.blogInfo.date).getTime())
  }
}
</script>

<style scoped>

</style>