<template>
    <!--博客文章的按钮-->
  <blog-section :ghost="readMode" class="adapt-item-width  adapt-item-big-show">
    <a-row :gutter="10" class="d-flex">

      <template v-if="!readMode">

        <!--编辑按钮，不是本人不显示-->
        <a-col v-if="userInfo && userInfo.name ===blogInfo.author">
          <tips title="编辑">
            <a-button  size="large"   shape="circle" @click="edit">
              <a-icon type="edit" theme="filled"></a-icon>
            </a-button>
          </tips>
        </a-col>

        <template v-else>
          <!--点赞按钮-->
          <a-col  >
            <tips title="点赞">
              <a-button  size="large" type="primary" shape="circle" >
                <a-icon type="like" theme="filled"></a-icon>
              </a-button>
            </tips>
          </a-col>

          <!--收藏 按钮-->
          <a-col  >
            <tips title="收藏">
              <a-button   size="large" type="primary" shape="circle" >
                <a-icon type="star" theme="filled"></a-icon>
              </a-button>
            </tips>
          </a-col>
        </template>



        <!--评论按钮-->
        <a-col>
          <tips title="评论">
            <a-button   size="large"  shape="circle" @click="openComments">
              <a-icon    type="message" theme="filled"></a-icon>
            </a-button>
          </tips>
        </a-col>
      </template>



      <!--其他操作按钮-->
      <a-col  class="adapt-item-big-show">
        <!--沉浸阅读-->
        <tips title="沉浸阅读">
          <a-button  size="large" shape="circle" v-if="!readMode"   type="primary"   @click="openReadMode">
            <a-icon type="read" theme="filled"></a-icon>
          </a-button>
        </tips>

        <tips  title="退出沉浸阅读">
          <a-button size="large" shape="circle"  v-if="readMode"     @click="openReadMode">
            <a-icon type="read" theme="filled"></a-icon>
          </a-button>
        </tips>

      </a-col>


      <a-col>
        <tips  title="删除文章">
          <a-button size="large"  type="danger" shape="circle" v-if="!readMode && userInfo && userInfo.name ===blogInfo.author">
            <a-icon type="delete" theme="filled"></a-icon>
          </a-button>
        </tips>
      </a-col>

    </a-row>
  </blog-section>

</template>

<script>

import Tips from "@/views/components/Tips";
import BlogSection from "@/views/components/BlogSection";

export default {
  name: "BlogOperation",
  props:{
    blogInfo: Object,

  },
  components:{
    Tips,BlogSection
  },
  data(){
    return{
      //阅读模式
      readMode:false,
      //夜间模式
      dark:false,
      //用户数据
      userInfo:this.$store.state.userInfo,


    }
  },
  mounted() {

  },


  methods:{
    openComments(){
      window.scrollTo({
        top: document.querySelector('#comments').offsetTop,
        behavior:'smooth'
      })

    },
    //打开阅读模式
    openReadMode(){

      this.readMode = !this.readMode

      this.$emit('openReadMode',this.readMode)
    },

    //修改文章
    edit() {
      if(this.userInfo){
        this.$router.push({
          name: 'editor',
          params: {
            blogInfo: this.blogInfo
          }
        })
      }

    },
  }
}
</script>

<style scoped>

</style>