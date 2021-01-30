<template>
  <a-row class="d-flex-wrap" :gutter="20">

    <a-col :span="14"  :offset="3" class="adapt-item-width" style="min-width: 570px">
      <a-row lass="d-flex-wrap"  >
        <a-col class="adapt-item-big-show"  :span="4" >
          <a-affix :offset-top="60">
            <blog-section style="min-width: 110px" title="热门标签" color="orange">
              <template v-for="(item,index) in hot_tags">
                <a-row>
                  <a-button  type="link" size="small" :key="index">{{item}}</a-button>
                </a-row>
              </template>
            </blog-section>
          </a-affix>
        </a-col>

        <a-col :span="19" class="adapt-item-width" :offset="1" >

          <a-row :gutter="[0,10]">
            <!--走马灯-->
            <a-col>
              <carousel></carousel>
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
              <pagination @listUpdate="listUpdate" @sendApi="sendApi" @finishSendApi="finishSendApi"></pagination>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>


    <a-col class="index-section adapt-item-width " style="min-width: 270px;" :span="5">
      <blog-section  title="个人信息">
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
      <blog-section   color="red" >
          <span slot="title">
            网抑云 <a-button type="link" icon="redo" @click="changeMusic"></a-button>
          </span>
        <cloud-music :indexEmitter="indexEmitter"></cloud-music>
      </blog-section>
    </a-col>
  </a-row>
</template>

<script>
import BlogCard from "@/views/components/BlogCard";
import Pagination from "@/views/index/components/Pagination";
import BlogSection from "@/views/components/BlogSection";
import Carousel from "@/views/index/components/Carousel";
import Breadcrumb from "@/views/index/components/Breadcrumb";
import CloudMusic from "@/views/index/components/CloudMusic";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import UserAvatar from "@/views/user/components/UserAvatar";

const events = require('events')
const indexEmitter = new events.EventEmitter();

export default {
  name:"index",
  components: {
    BlogCard, Pagination, BlogSection, Carousel,Breadcrumb,CloudMusic,UserSimpleData,UserAvatar
  },
  data() {

    let hot_tags = ['java','js','vue','spring','express','springboot']

    return {
      //全部文章
      list: [],
      //热门标签
      hot_tags:hot_tags,
      //热门文章
      hot_blog: [],
      //你喜欢的文章
      fav_blog: [],

      indexEmitter,
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

<style>

.blog-col {

}


</style>