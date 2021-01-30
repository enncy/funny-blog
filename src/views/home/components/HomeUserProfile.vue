<template>
  <div v-if="userInfo" >
    <blog-section title="基本信息" icon="user" color="blue">
      <div class="div-card  ">
        <a-row>
          注册时间 ：  {{utils.getTime(userInfo.date,true)}}
        </a-row>
        <a-row>
          博客等级 ：  {{userInfo.grade}}
        </a-row>
      </div>
    </blog-section>
    <blog-section title="简介" icon="profile" >
      <div class="div-card ">
        <span v-if="userInfo">
          {{userInfo.profile || '此人很懒，什么都没有留下 ~'}}
        </span>
        <span v-else>
          此人很懒，什么都没有留下 ~
        </span>
      </div>
    </blog-section>

  </div>
</template>

<script>
import UserSimpleData from "@/views/user/components/UserSimpleData";
import BlogSection from "@/views/components/BlogSection";
import utils from '@/utils/index'

export default {
  name: "HomeUserProfile",
  components:{
    BlogSection,UserSimpleData
  },
  props:{
    userInfo:Object,
  },
  data(){
    return {
      utils
    }
  },

}
</script>

<style scoped>

</style>