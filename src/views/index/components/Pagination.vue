<template>
  <a-row style="text-align: center;margin: 40px 0px 40px 0px">
    <a-pagination

        style="margin-top: 40px"
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
import blogApi from "@/api/blog";

export default {
  name: "pagination",
  data() {
    return {
      //分页
      skip: 0,
      limit: 10,
      count: 0,
    }
  },
  methods: {
    //分页组件数据改变
    pageChange(page, pageSize) {
      console.log(page, pageSize);
      this.skip = page * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.getPage()

    },

    onShowSizeChange(current, pageSize) {
      this.skip = current * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.getPage()
    },

    //获取文章总数
    getCount() {
      blogApi.getCount().then((r) => {
        if (r.data.status) {
          console.log(r)
          this.count = r.data.data
        } else {
          this.$message.error(r.data.msg)
          this.count = 0
        }
      }).catch((err) => {
        console.error(err)
      })
    },

    //获取文章
    getPage() {
      this.$emit('sendApi')
      blogApi.getByPage(this.skip, this.limit).then((r) => {
        console.log(r)
        if (r.data.status) {
          this.$emit('listUpdate', r.data.data)
          this.$emit('finishSendApi')
        }
        this.getCount()
      }).catch((err) => {
        console.error(err)
      })
    }

  },
  mounted() {
    this.getPage()
  }
}
</script>

<style scoped>

</style>