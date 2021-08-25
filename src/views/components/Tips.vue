<template>
  <a-tooltip :placement="placement||'top'">
    <template slot="title">
      <span>{{title}}</span>
    </template>
    <slot></slot>
  </a-tooltip>
</template>

<script>
export default {
  name: "Tips",
  props:{
    placement:String,
    title:String,
  }
}
</script>

<style scoped>

</style>