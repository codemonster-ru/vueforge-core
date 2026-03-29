<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cx } from "@/utils/classes";
import type { VfHeadingSize } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

interface VfHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
  size?: VfHeadingSize;
}

const props = withDefaults(defineProps<VfHeadingProps>(), {
  as: "h2",
  size: "md",
});

const attrs = useAttrs();
const classes = computed(() => cx("vf-heading", `vf-heading--${props.size}`));
</script>

<template>
  <component :is="props.as" :class="classes" v-bind="attrs">
    <slot />
  </component>
</template>
