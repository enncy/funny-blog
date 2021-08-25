<template>
  <div>

    <template v-for="(tag, index) in blogTags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else color="blue"  :key="tag" :closable="true" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="inputValue"
        @change="handleInputChange"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else  style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> 新建标签
    </a-tag>
  </div>
</template>
<script>
export default {
  props:{
    blogTags:Array
  },
  data() {
    return {
      tags:this.blogTags,
      inputVisible: false,
      inputValue: '',
    };
  },

  mounted() {
    console.log(this.blogTags)
  },
  methods: {
    handleClose(removedTag) {
      const newTags = this.tags.filter(tag => tag !== removedTag);
      this.$emit('tagsChange',newTags)
      this.tags = newTags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      let value = e.target.value
      if(value.length>10){
        this.$message.warn('标签的长度不能大于10')
      }else{
        this.inputValue = value;
      }

    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.$emit('tagsChange',tags)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
  },
};
</script>
