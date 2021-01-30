<template>
  <a-row>
    <div>
      <!--头像和名字-->
      <a-row >
        <a-col  v-if="userInfo" class="pointer" @click="$router.push('/'+userInfo.name)">
          <a-avatar  :size="avatarSize" icon="user" style="margin-right: 10px"/>
          <span :style="Object.assign({fontSize:fontSize+'px'},textStyle)" style="font-weight: bold;"   >{{userInfo.name}}</span>
        </a-col>
        <a-col  v-else class="pointer" >
          <a-avatar  :size="avatarSize" icon="user" style="margin-right: 10px"/>
          <span :style="Object.assign({fontSize:fontSize+'px'},textStyle)" style="font-weight: bold;"   >未登录</span>
        </a-col>
      </a-row>
    </div>

    <!--<div class="adapt-item-big-show">-->
    <!--  &lt;!&ndash;          头像和名字&ndash;&gt;-->
    <!--  <a-row  style="text-align: center; ">-->
    <!--    <a-col >-->
    <!--      <a-avatar  :size="80" icon="user" />-->
    <!--    </a-col>-->
    <!--    <a-col style=" ">-->

    <!--      <span class="user-name"  > {{ userInfo.name}}</span>-->
    <!--    </a-col>-->
    <!--  </a-row>-->
    <!--</div>-->
  </a-row>
</template>

<script>
export default {
  name: "UserAvatar",
  props:{
    size:String,
    textStyle:Object,
  },
  data(){
    return {
      avatarSize:40,
      fontSize:16,
      userInfo:this.$store?.state?.userInfo
    }
  },
  mounted() {
    if(this.size==='large'){
      this.avatarSize=80
      this.fontSize=30
    }
    if(this.size==='middle'){
      this.avatarSize=60
      this.fontSize=20
    }
    if(this.size==='small'){
      this.avatarSize=40
      this.fontSize=16
    }
  }
}
</script>

<style scoped>
.user-name{
  font-weight: bold;
  font-size: 20px;
  text-shadow: 1px 1px 2px gray;

}
</style>