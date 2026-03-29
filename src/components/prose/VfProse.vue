<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cx } from "@/utils/classes";

defineOptions({
  inheritAttrs: false,
});

interface VfProseProps {
  as?: string;
}

const props = withDefaults(defineProps<VfProseProps>(), {
  as: "article",
});

const attrs = useAttrs();
const classes = computed(() => cx("vf-prose"));
</script>

<template>
  <component :is="props.as" :class="classes" v-bind="attrs">
    <slot />
  </component>
</template>
