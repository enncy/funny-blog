<template>
  <div class="div-card" style="text-align: center">


    <img class="adapt-item-width  error-img" src="/static/resource/404.png" />

    <h1 style="color: gray">{{msg || '此页面走丢了...'}}</h1>

    <a-row >
      <a-button   @click="back">
        返回上一页
      </a-button>
      <a-button    style="margin-left: 20px" type="primary" @click="index">
        首页
      </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "pageNotFound",
  props:{
    title:String,
    href:'',
  },

  data(){
    return{
      msg: this.title
    }
  },
  mounted() {

    console.log(this.$route)
    this.msg  = this.$route?.params?.title
  },
  methods:{
    index(){
      this.$router.push('/')
    },
    back(){
      window.history.back();
    }
  }
}
</script>

<style scoped>
.error-img{
  width: 40%;
}
</style>