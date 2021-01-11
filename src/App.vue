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
    //监听刷新，刷新前保存数据
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

  //以 json 的方式储存数据，以防丢失
  beforeCreate() {
    console.log("app create")
    let store = localStorage.getItem('store')
    if (store) {
      this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(store)))
    }
  },

}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: auto;
  width: 100%;

}
</style>
