<template>
  <div>

    <comment-layout :child="child">

      <template slot="avatar">
        <a-avatar icon="user" :size="32"></a-avatar>
      </template>

      <template slot="info">
        <a class="text-color" :href="'/'+comment.author" target="_blank">
          <span style="font-weight: bold" >{{ comment.author }}</span>
        </a>
      </template>

      <template slot="body">
        <span style="line-height: 32px">
          <template v-if="child">
            <span v-if="parent.author===comment.author" class="font-small"> (楼主):</span>
            <span v-else class="font-small"> 回复
              <a-popover placement="top">
                <template slot="title">
                  <a-avatar icon="user" :src="comment.parent.avatar"/>
                  <a class="text-color offset-small" :href="'/'+comment.parent.author" target="_blank">
                    <span style="font-weight: bold">{{comment.parent.author }}</span>
                  </a>
                </template>
                <template slot="content">
                  <span>{{comment.parent.body}}</span>
                </template>
                <a :href="'#'+comment.parent.uid" ref="nofollow">@{{ comment.parent.author }}</a>:
              </a-popover>

            </span>
          </template>
          <span>
            {{ comment.body }}
          </span>
        </span>
      </template>

      <template slot="operation">
        <a-row class="font-small d-flex-nowrap" :gutter="20">
          <a-col>{{ utils.getElapsedTime(comment.date, true) }}</a-col>
          <a-col @click="onLike" class="pointer">
            <a-icon  type="like"  :theme="like?'twoTone':''"/>
            <span v-if="comment.like_num">{{comment.like_num}}</span>
          </a-col>
          <a-col ><a @click="replyComment" class="text-color font-small">回复</a></a-col>
        </a-row>
      </template>

      <template slot="reply" v-for="(reply,index) in comment.reply">
        <div style="margin: 10px 0px 10px 0px">
          <comment @replyComment="replyChildComment" :comment="reply" :child="true" :parent="comment"> </comment>
        </div>
      </template>

    </comment-layout>
  </div>


</template>

<script>

import CommentLayout from "@/views/blog/components/comment/CommentLayout";
import utils from '@/utils/index'

export default {
  name: "Comment",
  components: {
    CommentLayout
  },
  data() {
    return {
      utils,
      like:false,
    }
  },
  props: {
    parent: Object,
    comment: Object,
    child: Boolean,
  },
  methods: {
    replyComment( ){
      this.$emit('replyComment',  this.parent,this.comment)
    },
    replyChildComment(parent,child){
      this.$emit('replyComment', parent,child)
    },
    onLike(){
      this.like=!this.like;
      if(this.like) this.comment.like_num++;
      else  this.comment.like_num--;

    }
  }
}
</script>

<style scoped>

</style>