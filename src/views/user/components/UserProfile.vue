<template>
  <div v-if="userInfo" >


    <!--          简介-->
    <a-row v-if="showProfile"   >

      <a-descriptions size="small" :column="1"   >

        <a-descriptions-item >
          <template slot="label">
            <a-icon style="font-size: 13px" type="form" />
          </template>
          <span title="注册时间" >
            {{utils.getTime(userInfo.date,true)}}
          </span>
        </a-descriptions-item>
        <a-descriptions-item  >
          <template slot="label">
            <a-icon style="font-size: 13px" type="tag" />
          </template>
          <span title="称号" >
            入门新手
          </span>

        </a-descriptions-item>
        <a-descriptions-item  >
          <template slot="label">
            <a-icon  style="font-size: 13px" type="profile" />
          </template>
          <span  title="简介">
            用一句话介绍你自己~
          </span>
        </a-descriptions-item>
      </a-descriptions>
    </a-row>

    <!--<a-row v-if="showData" style="margin-top: 10px;text-align: center">-->
    <!--  <user-data  :data="userInfo" theme="" size="small"></user-data>-->
    <!--</a-row>-->
  </div>

  <div v-else>
    <a-skeleton active/>
  </div>

</template>

<script>
import utils from '@/utils/index'
import UserData from "@/views/user/components/UserData";


export default {

  components:{
    UserData
  },

  data(){
    return {
      utils
    }
  },
  props:{
    userInfo:Object,
    showData:Boolean,
    showProfile:Boolean,
  }
}
</script>

<style scoped>

</style>