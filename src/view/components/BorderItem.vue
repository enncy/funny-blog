<template>
    <span class="font-nowrap" ref="borderItem" @click="ClickNavItem">
        <slot />
    </span>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue";

interface BorderItemProps {
    position?: string;
}

const props = withDefaults(defineProps<BorderItemProps>(), {
    position: "left",
});

const borderItem = ref<HTMLElement | null>(null);

onMounted(() => {
    let value = borderItem.value;
    if (value) {
        const { position } = toRefs(props);
        let name = "border-item";
        let contains = value.classList.contains(name);
        if (!contains) {
            value.classList.add(name);
            value.classList.add(position.value);
        }
    }
});

// 点击链接
function ClickNavItem(e: any) {
 
    // 排他
    document.querySelectorAll(".border-item.active").forEach((el) => {
        el.classList.remove("active");
    });
    // 设置活动链接
    let target = e.path.find((el: HTMLDivElement) =>
        el?.classList?.contains("border-item")
    );

    if (target) {
        target.classList.add("active");
    }
}
</script>

<style scope lang="less"></style>
