<template>
  <div>
    <div class="adapt-item-width blog-card">

      <a-row style="padding: 5px;">
        <!--博客卡片的标题-->
        <a-col class="d-flex-nowrap" style="cursor: pointer;" @click="openBlog">
          <span style="font-weight: bold;" class="adapt-item-title font-large">{{ blogInfo.title }}</span>
        </a-col>

        <!--博客简介-->
        <a-col style="margin-top: 5px;  cursor: pointer;" @click="openBlog">
          <span class="adapt-item-text"  style="color: gray">{{ utils.mdToText(blogInfo.body) }}</span>
        </a-col>


        <!--博客卡片标签-->
        <a-col >
          <a-row v-if="blogInfo.tags.length!==0" class="d-flex-nowrap-ali-center " >
            <a-icon type="tags" style="margin-right: 5px"/>
            <template v-for="(item,index) in blogInfo.tags">
              <a-badge v-if="index!==0" color="blue"/>
              <span style="margin-right: 4px;" class="font-small" :key="index"> {{item}}</span>
            </template>
          </a-row>
        </a-col>


        <!--博客卡片底部内容-->
        <a-col>
          <a-row class="d-flex-nowrap-ali-center">

            <!--博客作者，以及更新时间-->
            <a-col class="blog-card-detail"  :span="platform==='pc'?18:12"  >
              <a-row style="display: flex" :gutter="10">
                <a-col>
                  <a-icon type="user"/>
                  <span> {{ showOperation?"我":blogInfo.author }}</span>
                </a-col>
                <a-col>
                  <span><a-badge status="default"/>{{ utils.getElapsedTime(blogInfo.update_date) }}前</span>
                </a-col>
              </a-row>
            </a-col>

            <!--博客点赞，收藏，评论-->
            <a-col  :span="platform==='pc'?6:12" class="blog-card-blogInfo">
              <a-row class="d-flex-nowrap-ali-center">
                <!--博客点赞，收藏，评论-->
                <a-col>
                  <blog-card-info :blogInfo="blogInfo"></blog-card-info>
                </a-col>
                <!--博客置顶，编辑，删除-->
                <a-col   class="blog-card-operation" v-if="showOperation">
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


    </div>

  </div>

</template>

<script>


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
    BlogCardInfo
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

     // utils.listenResize(window,(p)=>{
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

.blog-card {
  background-color: white;
  padding: 10px 10px 0px 10px;
  margin-bottom: 10px;
  border-radius: 5px;

}

.blog-card :hover {
  background-color: rgba(250, 250, 250, 0.8);
}

.blog-card-detail {
  color: gray;
}

.blog-card-operation {
  display: flex;
  justify-content: flex-end;
}

.blog-card-blogInfo {
  cursor: default;
  padding-top: 6px;
  display: flex;
  color: gray;
  font-size: 13px;
  justify-content: flex-end
}


.blog-info {
  cursor: default;
}

>>> .ant-tag{
  padding: 0 4px;
  font-size: 12px;

  line-height: 16px;
}

</style>