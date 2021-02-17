<template>
  <div id="comments">
    <div class="div-card">
      <a-row>
        <a-textarea :placeholder="placeholder||'发表你的看法'" v-model="body" :rows="1" :autosize="false">
        </a-textarea>
      </a-row>
      <a-row style="margin-top: 5px;display:flex;align-items: center; ">
        <a-col :span="12" class="font-small">
          代码块可使用 pre 标签
        </a-col>
        <a-col :span="12">
          <a-row  style="display:flex;justify-content: flex-end;align-items: center;">
            <span :style="{'color':body.length>1000?'red':'gray'}"> {{ body.length }}/{{ comments_max }} 字 </span>
            <a-button type="primary" @click="publishComment" style="margin-left: 10px">
              发表评论
            </a-button>
          </a-row>
        </a-col>
      </a-row>
    </div>


  </div>


</template>

<script>

const commentsApi = require('@/api/comments')
import utils from '@/utils'
export default {
  name: "PublishComments",

  props:{

    //上一级的 uid ，可以为文章，也可以是一个评论的 uid
    topUid:String,
    //评论类型，create 文章评论，reply 回复评论
    commentType:String,
    //placeholder
    placeholder:String,

  },
  data() {
    return {
      body: '',
      userInfo:this.$store.state.userInfo,
      //字数限制
      comments_max :1000,

    }
  },
  mounted() {

  },

  methods: {
    publishComment() {
      console.log("publishComment")
      if(!this.userInfo){ this.$message.warn("请先登录再发表评论")}
      else if(this.body.length===0){
        this.$message.warn("不能发表空的评论")
      }else if(this.body.length >this.comments_max){
        this.$message.warn("评论太长了！")
      }
      else{
        let targetEvent = undefined
        if(this.commentType==='create')targetEvent = commentsApi.create
        else if(this.commentType==='reply') targetEvent = commentsApi.reply
        else{
          throw "未指定评论类型！！！"
        }
        targetEvent(this.topUid ,this.body).then((r) => {
          console.log(r)
          if(r.data.status){
            this.$message.success(r.data.msg)
            this.body = ''
            this.$emit('publishComment',r.data.data)
          }else{
            this.$message.error(r.data.msg)
          }
        }).catch((err) => {
          console.error(err)
        })

      }
    },

  }
}
</script>

<style scoped>

</style>