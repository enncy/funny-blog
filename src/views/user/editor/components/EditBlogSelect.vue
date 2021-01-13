<template>
  <a-select mode="tags" style="width: 100%" placeholder="输入分类回车创建，或者选择分类加入" @change="handleChange"   :value="list">
    <a-select-option v-for="(item,index) in category" :key="index">
      {{item}}
    </a-select-option>
  </a-select>

</template>
<script>
export default {

  props:{
    category:Array
  },

  data(){
    return {
      list: this.category || [],

    }
  },

  mounted() {
    console.log("category",this.category)
  },

  methods: {
    handleChange(value) {

      if(value.length>3){

        this.$message.warn("最多选择3个分类")
      }else{
        this.list = value
        this.$emit('categoryChange',value)
      }
    },

  },
};
</script>