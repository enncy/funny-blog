<template>
  <div class="index-footer"  >
    <a-row class="d-flex-wrap-ali-center" style="justify-content: center" :gutter="100">
      <a-col :span="12"  class="adapt-item-width">
        <a-row>
          <logo></logo>
          <div class="footer-text">
            <div>{{config.profile}}</div>
          </div>
        </a-row>
      </a-col>

      <a-col>
        <a-row class="footer-text" style="margin-top: 10px">
          <div>
            ©2021 趣博客  Copyright
          </div>
          <div  >
            <a class="pointer" style="color: gray" rel="nofollow"  href='http://wpa.qq.com/msgrd?v=3&uin=877526278&site=qq&menu=yes&from=message&isappinstalled=0'>
              联系站长
              <a-icon type="qq" style="font-size: 20px" />
            </a>
          </div>
        </a-row>
      </a-col>
    </a-row>



  </div>
</template>

<script>

import config from "@/config/index"
import Logo from "@/views/components/Logo";

export default {
  components:{
    Logo,
  },
  data(){
    return {
      config
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.index-footer{
  background-color: white;

}

.footer-text{
  color: gray;
  font-size: 14px;
}
</style>