<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from "vue";
import { cx } from "@/utils/classes";
import type { VfControlSize } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

interface VfSwitchProps {
  modelValue?: boolean;
  size?: VfControlSize;
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<VfSwitchProps>(), {
  modelValue: false,
  size: "md",
  disabled: false,
  label: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() =>
  cx(
    "vf-switch",
    `vf-switch--${props.size}`,
    props.modelValue && "vf-switch--checked",
    props.disabled && "vf-switch--disabled",
    attrs.class as string | undefined,
  ),
);

const rootStyles = computed<StyleValue>(() => attrs.style as StyleValue);
const inputAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== "class" && key !== "style"),
  ),
);

function handleChange(event: Event) {
  const nextValue = (event.target as HTMLInputElement).checked;
  emit("update:modelValue", nextValue);
  emit("change", nextValue);
}
</script>

<template>
  <label :class="rootClasses" :style="rootStyles">
    <input
      class="vf-switch__input"
      type="checkbox"
      role="switch"
      :checked="props.modelValue"
      :disabled="props.disabled"
      v-bind="inputAttrs"
      @change="handleChange"
    />
    <span class="vf-switch__control" aria-hidden="true">
      <span class="vf-switch__thumb">
        <slot name="thumb" :checked="props.modelValue" />
      </span>
    </span>
    <span v-if="label || $slots.default" class="vf-switch__content">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
