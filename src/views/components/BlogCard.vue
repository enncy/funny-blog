<template>

  <a-row   class=" adapt-item-width blog-card shadow"  style="margin-bottom: 10px;padding: 10px">
    <!--博客卡片的标题-->
    <a :href="'/blog/' + blogInfo.uid">
      <a-col class="d-flex-nowrap" style="cursor: pointer;"  >
        <span   class="adapt-item-title title font-large" >{{ blogInfo.title }}</span>
      </a-col>

      <!--博客简介-->
      <a-col  class="profile">
        <!--<img src="https://cdn.jsdelivr.net/gh/enncy/cdn/src/img/bg3.png" width="270"  height="150"/>-->
        <span class="adapt-item-text text-color" >{{ utils.mdToText(blogInfo.body) }}</span>
      </a-col>
    </a>







    <!--博客卡片标签-->
    <a-col >
      <a-row  class="d-flex-nowrap-ali-center font-small" >
        <a-icon type="tags" style="margin-right: 5px"/>
        <template v-if="blogInfo.publish" >
          <span style="margin-right: 4px;">原创 </span>
          <a-badge  color="orange" />
        </template>
        <template v-else>
          <span style="margin-right: 4px;">搬运 </span>
          <a-badge/>
        </template>
        <span v-if="blogInfo.tags.length!==0">
                          <template  v-for="(item,index) in blogInfo.tags">
              <a-badge v-if="index!==0" color="blue"/>
              <span style="margin-right: 4px;"  :key="index"> {{item}}</span>
            </template>
            </span>
      </a-row>
    </a-col>






    <!--博客卡片底部内容-->
    <a-col>
      <a-row class="d-flex-nowrap-ali-center">

        <!--博客作者，以及更新时间-->
        <a-col class="detail"  :span="platform==='pc'?18:12"  >
          <a-row style="display: flex" :gutter="10">
            <a-col>
              <a-icon type="user"/>
              <a class="font-small" :href="'/'+blogInfo.author"> {{ showOperation?"我":blogInfo.author }}</a>
            </a-col>
            <a-col>
              <span><a-badge status="default"/>{{ utils.getElapsedTime(blogInfo.update_date) }}前</span>
            </a-col>
          </a-row>
        </a-col>

        <!--博客点赞，收藏，评论-->
        <a-col  :span="platform==='pc'?6:12" class="data">
          <a-row class="d-flex-nowrap-ali-center">
            <!--博客点赞，收藏，评论-->
            <a-col>
              <blog-card-info :blogInfo="blogInfo"></blog-card-info>
            </a-col>
            <!--博客置顶，编辑，删除-->
            <a-col   class="operation" v-if="showOperation">
              <a-button type="link">置顶</a-button>
              <a-button type="link" @click="edit">编辑</a-button>
              <a-popconfirm
                  title="你确认删除此文章吗，删除后将不能还原！"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="remove"
              >
                <a-button type="link">删除</a-button>
              </a-popconfirm>
            </a-col>
          </a-row>
        </a-col>


      </a-row>
    </a-col>


  </a-row>

</template>

<script>

import Pagination from "@/views/index/components/IndexPagination";
import BlogCardInfo from "@/views/components/BlogCardInfo";
import blogApi from '@/api/blog'

import utils from '@/utils/index'

export default {
  props: {
    blogInfo: Object,
    index: Number,
    //是否显示操作按钮
    showOperation: Boolean,

  },
  components: {
    BlogCardInfo,Pagination
  },
  created() {
    window.addEventListener('resize',()=>{
      this.platform = document.documentElement.clientWidth<800?'mobile':'pc';
    })
  },

  data() {
    return {
      utils,
      blogInfo: this.blogInfo,
      //设备类型
      platform: document.documentElement.clientWidth<800?'mobile':'pc',

    }
  },
  mounted() {

     // utils.listenResize((p)=>{
     //   this.platform = p;
     //   console.log( this.platform)
     // })
  },

  methods: {

    //打开博客
    openBlog() {
      console.log(this.blogInfo)
      this.$router.push({
        path: '/blog/' + this.blogInfo.uid,
        params: {
          blogInfo: this.blogInfo
        }
      })
    },
    //修改文章
    edit() {
      this.$router.push({
        name: 'editor',
        params: {
          blogInfo: this.blogInfo
        }
      })
    },
    //删除文章
    remove() {
      blogApi.remove(this.blogInfo.uid).then((r) => {
        console.log(r)
        if (r.data.status) {
          this.$message.success(r.data.msg)
          //发出删除信息
          this.$store.dispatch('removeBlog', this.blogInfo)
          this.$emit('remove', this.blogInfo)
        } else {
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })

    }
  }
}
</script>

<style scoped>
@import "./assets/blog-card.css";
</style>