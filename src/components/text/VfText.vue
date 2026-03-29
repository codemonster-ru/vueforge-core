<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cx } from "@/utils/classes";
import type { VfTextSize, VfTextTone } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

interface VfTextProps {
  as?: "p" | "span" | "div" | "label" | "small";
  size?: VfTextSize;
  tone?: VfTextTone;
}

const props = withDefaults(defineProps<VfTextProps>(), {
  as: "p",
  size: "body",
  tone: "default",
});

const attrs = useAttrs();
const classes = computed(() =>
  cx(
    "vf-text",
    `vf-text--${props.size}`,
    props.tone !== "default" && `vf-text--${props.tone}`,
  ),
);
</script>

<template>
  <component :is="props.as" :class="classes" v-bind="attrs">
    <slot />
  </component>
</template>
