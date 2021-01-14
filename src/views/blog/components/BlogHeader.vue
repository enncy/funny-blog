<template>
  <a-row  >

    <a-col>
      <div style="font-weight: 900;font-size: 24px">
        {{blogInfo.title}}
      </div>
    </a-col>

    <a-col style="display:flex;flex-wrap: wrap;width: 100%;">
      <a-col :span="12"  >
          {{utils.getTime(blogInfo.date)}}
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
import utils from '@/utils/index'

export default {
  name: "BlogHeader",
  props:{
    blogInfo:Object
  },
  components:{BlogCardInfo},
  data(){
    return{
      utils,
      blogInfo:this.blogInfo,
      userInfo: this.blogInfo.author
    }
  },
  methods:{


  },
  mounted() {
    console.log(new Date(this.blogInfo.date).getTime())
  }
}
</script>

<style scoped>

</style>