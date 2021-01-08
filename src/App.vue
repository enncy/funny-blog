<template>
  <div id="app">
    <index>
      <template slot="router">
        <router-view></router-view>
      </template>
    </index>

  </div>
</template>

<script>

import index from "@/views/index/index";


const api = require('@/api/index')

export default {
  name: 'App',
  components: {index},
  mounted() {

  }
}
</script>

<style>

body,html{
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;

}
</style>
