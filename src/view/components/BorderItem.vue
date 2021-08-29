<template>
  <span class="padding-10px font-nowrap" ref="borderItem">
    <slot name="body"/>
  </span>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, toRefs } from "vue";

export default defineComponent({
  name: "BorderItem",
  props: {
    position: {
      type:String
    },
  },
  setup(props) {
    const borderItem = ref<HTMLElement | null>(null);
    console.log(props);

    onMounted(() => {
      let value = borderItem.value
      if (value) {
        const { position }: any = toRefs(props);

        value.className = value.className.replaceAll("border-item", "").replaceAll(position.value, "");
        value.className += " border-item " + position.value;
        console.log(value.className);
        
      }
    });

    return {
      borderItem,
    };
  },
});
</script>

<style scope lang='less'>
</style>