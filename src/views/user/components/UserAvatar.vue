<template>
  <a-row v-if="userInfo">
    <div>
      <!--头像和名字-->
      <a-row >
        <a-col>
          <a-avatar  :size="avatarSize" icon="user" />
          <span :style="Object.assign({fontSize:fontSize+'px'},textStyle)" style="font-weight: bold"  > {{ userInfo.name}}</span>
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
    userInfo:Object,
    size:String,
    textStyle:Object,
  },
  data(){
    return {
      avatarSize:40,
      fontSize:16,
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