<template>
  <a-row v-if="userInfo">
    <div  class="adapt-item-big-hide">
      <!--         手机版头像和名字-->
      <a-row  style="text-align: center; ">
        <a-col >
          <a-avatar  :size="40" icon="user" />
          <span style="font-weight: bold;font-size: 20px"> {{ userInfo.name}}</span>
        </a-col>

      </a-row>
    </div>

    <div class="adapt-item-big-show">
      <!--          头像和名字-->
      <a-row  style="text-align: center; ">
        <a-col >
          <a-avatar  :size="80" icon="user" />
        </a-col>
        <a-col style=" ">
          <span style="font-weight: bold;font-size: 20px"> {{ userInfo.name}}</span>
        </a-col>
      </a-row>
    </div>
  </a-row>
</template>

<script>
export default {
  name: "UserAvatar",
  props:{
    userInfo:Object
  }
}
</script>

<style scoped>

</style>