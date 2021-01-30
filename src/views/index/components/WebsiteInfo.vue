<template>
  <div>
    <!--站点信息-->
    <a-row>
      建站时间 ： {{ utils.getTime(new Date(config.createTime).getTime(), true) }}
    </a-row>
    <a-row>
      稳定运行 ： {{ utils.getElapsedTime(new Date(config.createTime).getTime()) }}
    </a-row>
    <a-row>
      累计用户 ： 0
    </a-row>
    <a-row>
      在线人数 ： 0
    </a-row>
  </div>
</template>

<script>

import config from "@/config/index"
import utils from "@/utils/index"

export default {
  name: "WebsiteInfo",
  data(){
    return {
      config,utils
    }
  }
}
</script>

<style scoped>

</style>