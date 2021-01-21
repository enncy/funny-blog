<template>

  <a-row style="text-align: center;margin: 40px 0px 40px 0px">
    <a-pagination
        size="small"
        :total="count"
        show-size-changer
        :show-total="total => `共 ${total} 个文章`"

        :default-current="1"
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

import blogApi from '@/api/blog'

export default {
  props:{
    userInfo:Object
  },
  name: "UserPagination",
  data(){
    return{
      //分页
      skip: 0,
      limit: 10,
      count: 0,
    }
  },
  methods:{
    pageChange(page,pageSize){
      console.log(page, pageSize);
      this.skip = page * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.getPage()
    },
    onShowSizeChange(current, pageSize){
      console.log("onShowSizeChange",current, pageSize)
      this.skip = current * pageSize - pageSize
      this.limit = pageSize
      this.sending = true
      this.getPage()
    },
    getCount(){
      blogApi.getCountByAuthor(this.userInfo.name).then((r) => {
        if (r.data.status) {
          console.log(r)
          this.count = r.data.data
        } else {
          this.count = 0
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    getPage(){
      blogApi.getByAuthorAndPage(this.userInfo.name,this.skip,this.limit).then((r) => {
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
  mounted(){
    this.getPage()
  }
}
</script>

<style scoped>

</style>