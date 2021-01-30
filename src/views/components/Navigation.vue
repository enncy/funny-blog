<template>
  <div style="box-shadow: 1px 1px 1px rgba(0,0,0,0.1)">
    <navigation-menu :list="list"> </navigation-menu>
  </div>
</template>

<script>
import NavigationMenu from "./menu/Menu";
import config from "@/config";


export default {
  name: "Navigation",
  components: {
    NavigationMenu
  },
  data(){
    return {
      list: [
        {
          path: '/',
          icon: 'home',
          title: '首页',
        },
        {
          path: '/',
          title: '推荐',
          icon: 'star',

        },
      ],
    }
  }
}
</script>

<style scoped>

</style>