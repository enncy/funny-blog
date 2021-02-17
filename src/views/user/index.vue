<template>
  <a-row   v-if="userInfo" style="display: flex;" class="adapt-item-wrap user-index">
    <a-col class="adapt-item-width"  :span="4" :offset="2" style="min-width: 250px">

      <div style="min-width: 250px" >
        <a-row>
          <blog-section title="个人信息" color="black">
            <div class="div-card">
              <user-avatar  :user-info="userInfo"></user-avatar>
              <a-divider style="margin-top: 10px"/>
              <user-profile :show-data="true" :show-profile="true" :user-info="userInfo"></user-profile>
            </div>
          </blog-section>
        </a-row>

        <a-row>
          <!--数据统计-->
          <blog-section :padding="6">
            <user-simple-data v-if="userInfo" :data="userInfo"></user-simple-data>
          </blog-section>
        </a-row>

        <a-row  class="card-item">
          <blog-section   title="搜索文章"  color="blue">
            <a-input-search placeholder="搜索此页面的文章"   @search="onSearch" />
          </blog-section>
        </a-row>

        <a-row class="adapt-item-big-show card-item"  >
          <blog-section title="置顶文章"  color="orange" >
            暂无
          </blog-section>
        </a-row>

        <a-row class="adapt-item-big-show card-item" >
          <blog-section title="文章分类"  color="volcano">
            暂无
          </blog-section>
        </a-row>

        <a-row class="adapt-item-big-show card-item"  >
          <blog-section title="热门文章"   color="red">
            暂无
          </blog-section>
        </a-row>
      </div>





    </a-col>
    <a-col :span="14"    class="blog-list adapt-item-width " >
        <transition name="page-fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>

    </a-col>

  </a-row>
</template>

<script>
import  UserData from '@/views/user/components/UserData';
import UserProfile from "@/views/user/components/UserProfile";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserBlogs from '@/views/user/blogs/index'
import blogApi from "@/api/blog"
import utils from '@/utils/index'
import BlogSection from "@/views/components/BlogSection";
import UserSimpleData from "@/views/user/components/UserSimpleData";

export default {
  name:"user",
  components:{
    UserAvatar,
    UserData,UserProfile,BlogSection,UserBlogs,UserSimpleData
  },

  data(){
    return {
      utils,
      userInfo: this.$store.state.userInfo,
    }
  },

  beforeCreate() {
    if (! this.$store.state.userInfo) {
      this.$message.warn("您还未登录！")
      // this.$router.push('/login')
    }
  },

  methods:{


    //搜索文章
    onSearch(){

    }
  },

  mounted() {
    if(!this.userInfo){
      this.$router.push({
        name:'404',
        params:{
          title:'您还未登录',
        }
      })
    }
  }

}
</script>

<style scoped>

@import "./assets/index.css";

.card-item{
  margin: 5px 0px 5px 0px;
}
.blog-list{
  margin: 0px 0px 0px 10px
}


@media screen and (max-width: 800px) {
  .blog-list{
    margin: 0px 0px 0px 0px
  }
}

</style>