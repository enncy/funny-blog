<template>
  <div>
    <a-row>
      <a-textarea placeholder="发表你的看法" v-model="title" :rows="1" :autosize="false">
      </a-textarea>
    </a-row>
    <a-row style="margin-top: 5px;display:flex;align-items: center; ">
      <a-col :span="12" class="font-small">
        代码块可使用 pre 标签
      </a-col>
      <a-col :span="12">
        <a-row  style="display:flex;justify-content: flex-end;align-items: center;">
          <span :style="{'color':title.length>1000?'red':'gray'}"> {{ title.length }}/{{ 1000 }} 字 </span>
          <a-button type="primary" @click="publishComment" style="margin-left: 10px">
            评论
          </a-button>
        </a-row>
      </a-col>
    </a-row>

  </div>


</template>

<script>
export default {
  name: "PublishComments",
  data() {
    return {
      title: '',
    }
  },
  methods: {
    publishComment() {
      console.log("publishComment")
    }
  }
}
</script>

<style scoped>

</style>