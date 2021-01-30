<template>
  <div class="index-footer"  >
    <a-row class="d-flex-wrap-ali-center" style="justify-content: center" :gutter="100">
      <a-col :span="12"  class="adapt-item-width">
        <a-row>
          <logo></logo>
          <div class="footer-text">
            <div>{{config.profile}}</div>
            <div class="div-card">
              <span class="pointer"  @click="qq"> 联系站长<a-icon type="qq" style="font-size: 20px" /> </span>
              <a-divider type="vertical"/>
              <span class="pointer" @click="issue"> BUG反馈<a-icon type="github" style="font-size: 20px" /> </span>
              <a-divider class="adapt-item-big-hide"/>
            </div>
          </div>
        </a-row>
      </a-col>

      <a-col>
        <a-row class="footer-text" style="margin-top: 10px">
          <div>
            Copyright ©2021 趣博客 Created by <a href="https://github.com/klskeleton/" target="_blank">klskeleton</a>
          </div>
          <div>
            在线演示地址：<a href="https://funny.klweb.top/" target="_blank">https://funny.klweb.top/</a>
          </div>
          <div>
            网站源码：<a href="https://github.com/klskeleton/funny-blog" target="_blank">https://github.com/klskeleton/funny-blog</a>
            <a-icon style="font-size: 20px" type="github" theme="filled" />
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
    issue(){
      window.open('https://github.com/klskeleton/funny-blog/issues','_target')
    },
    qq(){
      window.open('http://wpa.qq.com/msgrd?v=3&uin=877526278&site=qq&menu=yes&from=message&isappinstalled=0','_target')
    }
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