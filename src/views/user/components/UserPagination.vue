<template>
  <!--index 分页子组件-->
  <blog-pagination
      :count="count"
      @getPage="getPage"
      :color="color"
  />
</template>

<script>
import BlogPagination from "@/views/components/BlogPagination";
import blogApi from "@/api/blog";
export default {
  props:{
    userInfo:Object,
    color:String,
  },
  components:{
    BlogPagination
  },
  data() {
    return {
      blogApi,
      count:0,
    }
  },
  methods:{
    //获取文章总数
    getCount() {
      blogApi.getCountByAuthor(this.userInfo.name).then((r) => {
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
    getPage(skip,limit) {
      this.$emit('sendApi')
      blogApi.getPageByAuthor(this.userInfo.name,skip, limit).then((r) => {
        console.log(r)
        if (r.data.status) {
          this.$emit('listUpdate', r.data.data)
          this.$emit('finishSendApi')
        }
        this.getCount()
      }).catch((err) => {
        console.error(err)
      })
    },
  }
}
</script>
