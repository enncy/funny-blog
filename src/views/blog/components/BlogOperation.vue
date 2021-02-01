<template>
    <!--博客文章的按钮-->
    <a-row :gutter="10" style="display: flex;">
      <template v-if="!readMode">

        <!--点赞按钮-->
        <a-col>
          <a-button size="large" type="primary" shape="circle" >
            <a-icon type="like" theme="filled"></a-icon>
          </a-button>
        </a-col>

        <!--收藏 按钮-->
        <a-col>
          <a-button size="large" type="primary" shape="circle" >
            <a-icon type="star" theme="filled"></a-icon>
          </a-button>
        </a-col>

        <!--评论按钮-->
        <a-col>
          <a-button size="large" type="primary" shape="circle" @click="openComments">
            <a-icon type="message" theme="filled"></a-icon>
          </a-button>
        </a-col>
      </template>


      <!--其他操作按钮-->
      <a-col >
        <a-button v-if="!readMode" size="large" type="primary"   @click="openReadMode">
          <a-icon type="read" theme="filled"></a-icon>沉浸阅读
        </a-button>
        <a-button v-if="readMode" size="large"   @click="openReadMode">
          <a-icon type="read" theme="filled"></a-icon>
        </a-button>
      </a-col>

      <!--切换黑夜和白天主题-->
      <a-col v-if="readMode">
        <a-button v-if="!dark" size="large"   shape="circle" @click="changeDarkTheme(true)">
          <a-icon type="bulb" theme="filled"></a-icon>
        </a-button>
        <a-button  v-if="dark" type="primary" size="large"   shape="circle" @click="changeDarkTheme(false)">
          <a-icon type="bulb" theme="filled"></a-icon>
        </a-button>
      </a-col>


    </a-row>
</template>

<script>
export default {
  name: "BlogOperation",
  data(){
    return{
      //阅读模式
      readMode:false,
      //夜间模式
      dark:false,

    }
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
      if(this.dark===true)this.changeDarkTheme(false)
      this.readMode = !this.readMode

      this.$emit('openReadMode',this.readMode)
    },
    changeDarkTheme(theme){
      this.dark = theme
      let all_tags = document.querySelectorAll('div,span,p,body,#app,html,.index-content,h1,h2,h3,h4,h5,h6')
      let a_tags = document.querySelectorAll('a')
      if(this.dark){

        for(let i=0;i<all_tags.length;i++){

          if(all_tags[i]?.className?.indexOf('hljs')===-1){
            all_tags[i].style.backgroundColor = '#0d1117'
            all_tags[i].style.color = '#b1bac4'
          }

        }

        for(let i=0;i<a_tags.length;i++){
          a_tags[i].style.backgroundColor = '#0d1117'
          a_tags[i].style.color = '#1890ff'
        }

      }else{
        for(let i=0;i<all_tags.length;i++){
          if(all_tags[i].className.indexOf('hljs')===-1){
            all_tags[i].style.backgroundColor = ''
            all_tags[i].style.color = ''
          }
        }
        for(let i=0;i<a_tags.length;i++){
          a_tags[i].style.backgroundColor = ''
          a_tags[i].style.color = ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>