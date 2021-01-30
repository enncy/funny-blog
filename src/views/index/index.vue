<template>
  <a-row class="d-flex-nowrap  big-no-warp" :gutter="20">

    <a-col :span="16"  :offset="2" class="adapt-item-width"  >
      <a-row class="d-flex-nowrap"  >
        <a-col class="adapt-item-big-show"  :span="3" >
          <a-affix :offset-top="60" style="min-width: 130px">
            <blog-section   title="热门标签" color="orange">
              <template v-for="(item,index) in hot_tags">
                <a-row>
                  <a-button  type="link" size="small" :key="index">{{item}}</a-button>
                </a-row>
              </template>
            </blog-section>
            <blog-section  title="排行榜" color="yellow">
              <template v-for="(item,index) in hot_user">
                <a-row>
                  <a-button  type="link" size="small" :key="index">{{item}}</a-button>
                </a-row>
              </template>
            </blog-section>
          </a-affix>
        </a-col>

        <a-col :span="20" class="adapt-item-width  offset-large" >

          <a-row :gutter="[0,10]">
            <!--走马灯-->
            <a-col>
              <carousel ></carousel>
            </a-col>
            <!--面包屑-->
            <a-col>
              <breadcrumb></breadcrumb>
            </a-col>

            <a-col>
              <!--遍历博客-->
              <template v-for="(item,index) in list">
                <blog-card :blogInfo="item" :index="index"></blog-card>
              </template>
            </a-col>


            <a-col>
              <template v-if="list.length===0">
                <a-skeleton v-if="sending" active/>
                <a-empty v-else description="暂无博客文章"></a-empty>
              </template>
            </a-col>

            <a-col>
              <!--分页组件-->
              <index-pagination @listUpdate="listUpdate" @sendApi="sendApi" @finishSendApi="finishSendApi"></index-pagination>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>


    <a-col class="index-section adapt-item-width " style="min-width: 270px;" :span="4">
      <blog-section  title="个人信息" color="black">
        <div  class="div-card">
          <user-avatar  :user-info="userInfo"></user-avatar>
          <user-simple-data style="margin-top: 10px" :data="userInfo"></user-simple-data>
        </div>
      </blog-section>

      <blog-section title="热门文章" color="volcano">
        暂无
      </blog-section>
      <blog-section title="你的喜欢" color="blue">
        暂无
      </blog-section>

      <blog-section   color="red" title="网抑云">
          <span slot="operation">
            <a-button type="link" icon="redo" @click="changeMusic"></a-button>
          </span>
        <cloud-music :indexEmitter="indexEmitter"></cloud-music>
      </blog-section>

      <a-affix :offset-top="60">
        <blog-section title="趣博客"  style="min-width: 240px;">
          <div class="div-card font-small">
            <website-info></website-info>
          </div>
        </blog-section>
      </a-affix>



    </a-col>
  </a-row>
</template>

<script>
import BlogCard from "@/views/components/BlogCard";
import IndexPagination from "@/views/index/components/IndexPagination";
import BlogSection from "@/views/components/BlogSection";
import Carousel from "@/views/index/components/Carousel";
import Breadcrumb from "@/views/index/components/Breadcrumb";
import CloudMusic from "@/views/index/components/CloudMusic";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import UserAvatar from "@/views/user/components/UserAvatar";
import WebsiteInfo from "@/views/index/components/WebsiteInfo";

const events = require('events')
const indexEmitter = new events.EventEmitter();

export default {
  name:"index",
  components: {
    BlogCard, IndexPagination, BlogSection, Carousel,Breadcrumb,CloudMusic,UserSimpleData,UserAvatar,WebsiteInfo
  },
  data() {

    let hot_tags = ['java','js','vue','spring','express','springboot']
    let hot_user = ['klskeleton','skeleton','张三','李四','王五']

    return {
      indexEmitter,

      //全部文章
      list: [],
      //热门标签
      hot_tags,
      //热门文章
      hot_blog: [],
      //你喜欢的文章
      fav_blog: [],
      //等级排行榜
      hot_user,

      sending: false,

      //用户信息
      userInfo:this.$store.state.userInfo,


    }
  },

  mounted() {
  },

  methods: {
    //监听分页组件的 文章列表更新时间
    listUpdate(list) {
      this.list = list
    },
    //监听分页组件的请求发送事件
    sendApi() {
      this.sending = true
    },
    finishSendApi() {
      this.sending = false
    },
    //换音乐
    changeMusic(){
      indexEmitter.emit('changeMusic')
      console.log("changeMusic")
    }

  },

}
</script>

<style scoped>



</style>