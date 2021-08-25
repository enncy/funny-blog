<template>
  <a-row class="d-flex-nowrap">
    <a-col >
      <slot name="avatar">
        头像
      </slot>
    </a-col>
    <a-col   class="offset-small">
      <a-row>
        <a-col>
          <template v-if="child">
            <slot name="info">
              名字
            </slot>
            <slot name="body">
              子内容
            </slot>
          </template>
          <div v-else>
            <slot name="info">
              名字
            </slot>
            <div>
              <slot name="body">
                父内容
              </slot>
            </div>
          </div>
        </a-col>
        <a-col>
          <slot name="operation">
            时间 点赞 回复
          </slot>
        </a-col>
        <a-col>
          <slot name="reply">
             <!--回复-->
          </slot>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "CommentLayout",
  props:{
    child:Boolean,
  }
}
</script>

<style scoped>

</style>