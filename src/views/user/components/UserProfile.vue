<template>
  <div v-if="userInfo">
   <div  class="adapt-item-show">
     <!--         手机版头像和名字-->
     <a-row  style="text-align: center; ">
       <a-col >
         <a-avatar  :size="40" icon="user" />
         <span style="font-weight: bold;font-size: 20px"> {{ userInfo.name}}</span>
       </a-col>

     </a-row>
   </div>

    <div class="adapt-item-hide">
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

    <!--          简介-->

    <a-row  class="adapt-item-hide">
      <a-divider/>

      <a-descriptions size="small" :column="1">

        <a-descriptions-item label="创建时间">
          2017-01-10
        </a-descriptions-item>
        <a-descriptions-item label="称号">
          入门新手
        </a-descriptions-item>
        <a-descriptions-item label="简介">
          用一句话介绍你自己~
        </a-descriptions-item>
      </a-descriptions>
    </a-row>

    <a-row style="margin-top: 10px;text-align: center">
      <user-data :data="userInfo" theme="" size="small"></user-data>
    </a-row>
  </div>

  <div v-else>
    <a-skeleton active/>
  </div>

</template>

<script>

import UserData from "@/views/user/components/UserData";

export default {
  components:{
    UserData
  },
  props:{
    userInfo:Object
  }
}
</script>

<style scoped>

</style>