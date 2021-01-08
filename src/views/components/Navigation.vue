<template>
  <navigation-menu :list="list">

  </navigation-menu>
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
          path: config.router.blog.path,
          icon: 'home',
          title: '首页',
        },
        {
          path: config.router.star.path,
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