<template>
  <mavon-editor

      ref="markdown"
      :codeStyle="'gruvbox-dark'" class="blog-markdown" :value="body"
      :subfield="false" :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :boxShadow="false"
      :ishljs="true"
      :previewBackground="'white'"

  />
</template>

<script>
export default {
name: "BlogMarkdown",
  props:{
    body:String
  },
  methods:{
  //反外联
    nofollow(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          let a = document.querySelectorAll('.blog-markdown a')
          for(let i =0 ;i<a.length;i++){
            a[i].rel='nofollow'
          }
        },100)
      })
    }
  },
  mounted() {
    this.nofollow()
  }
}
</script>

<style scoped>
/*原生样式修改*/


</style>