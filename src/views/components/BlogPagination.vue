<template>
  <!--深度封装分页组件，公共分页组件-->

  <a-row style="text-align: center; margin-bottom: 20px">
    <a-pagination
        show-size-changer
        :default-current="1"
        :show-total="total => `共 ${total} 个文章`"
        :total="count"
        @showSizeChange="onShowSizeChange"
        @change="pageChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span>{{ props.value }}篇/页</span>
      </template>
    </a-pagination>
  </a-row>
</template>

<script>
/**
     此组件负责分页逻辑
     子组件负责业务处理
     父组件负责数据展示

     1.任意页面使用此组件的时候，需要定义一个子组件，名字为  "页面+Pagination"
     2.子组件只需要传递给 BlogPagination 2个方法 get-count-event 获取数量的 api 请求方法
     和 get-page-event 获取文章的 api 请求方法，即可，
     3. 子组件通过 emitter 绑定 listUpdate 事件， 吧 list 文章列表传递给父组件即可
 */


export default {
  props:{
    count:Number,
  },
  data() {
    return {
      //分页
      skip: 0,
      limit: 10,
    }
  },
  methods: {
    //分页组件数据改变
    pageChange(page, pageSize) {
      console.log(page, pageSize);
      this.skip = page * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.$emit('getPage',this.skip, this.limit)

    },
    onShowSizeChange(current, pageSize) {
      this.skip = current * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.$emit('getPage',this.skip, this.limit)
    },
  },
  mounted() {
    this.$emit('getPage',this.skip, this.limit)
  }
}
</script>