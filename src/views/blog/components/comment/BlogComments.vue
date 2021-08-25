<template >
  <div class="div-card"  >
    <template v-if="comments_list.length===0">
      <a-empty description="暂无评论"/>
    </template>
    <template v-for="(comment,index) in comments_list"  >
      <a-divider v-if="index!==0" style="margin: 10px 0"/>
      <comment @replyComment="replyComment" :comment="comment"  :child="false" :parent="comment"> </comment>

      <publish-comments
          :placeholder="'回复 '+reply.comment.author+' 说的 : '+reply.comment.body"
          @publishComment="publishComment"
          v-if="reply.parent.uid===comment.uid"
          comment-type="reply"
          :top-uid="reply.comment.uid">
      </publish-comments>

    </template>
  </div>
</template>

<script>

import commentsApi from '@/api/comments'
import Comment from "@/views/blog/components/comment/Comment";
import PublishComments from "@/views/blog/components/comment/PublishComments";

export default {
name: "BlogComments",
  components:{
    Comment,PublishComments
  },
  data(){
    return{
      comments_list:[],

      //回复的参数
      reply:{
        //正在回复的评论的父评论，如果父评论是一样的，则一起显示同一个评论框
        parent:Object,
        //正在回复的评论
        comment:Object
      }
    }
  },
  props:{
    blogInfo:Object
  },
  methods:{
    //获取评论
    getComments(){
      commentsApi.getByBlog(this.blogInfo.uid,0,10).then((r)=>{
          if(r.data.status){
            console.log(r.data)
            this.comments_list = r.data.data
          }
      }).catch((err)=>{
          console.err(err)
      })
    },
    //监听回复发布事件
    publishComment(comment){
      this.reply?.parent?.reply?.push(comment)
    },
    //点击回复的事件
    replyComment(parent,comment){
      //如果重复回复同一个评论，那么则视为关闭回复
      if(this.reply.comment.uid===comment.uid){
        this.reply.parent  = {}
        this.reply.comment  = {}
      }else{
        this.reply.parent  = parent
        this.reply.comment  = comment
      }

    }

  },
  mounted(){
    this.comments_list = this.blogInfo.comments
    console.log("[评论]",this.blogInfo.comments)
  }
}
</script>

<style scoped>

</style>