<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, useSlots, watch } from "vue";
import { VueIconify, icons } from "@codemonster-ru/vueiconify";
import { useTheme } from "@/composables";
import VfSwitch from "@/components/switch/VfSwitch.vue";
import type { VfControlSize } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

interface VfThemeSwitchProps {
  size?: VfControlSize;
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<VfThemeSwitchProps>(), {
  size: "md",
  disabled: false,
  label: undefined,
});

const attrs = useAttrs();
const slots = useSlots();
const { resolvedTheme, setTheme } = useTheme();
const hasContent = computed(() => Boolean(props.label || slots.default));
const checked = ref(false);
let pendingThemeFrame: number | null = null;

watch(
  resolvedTheme,
  (value) => {
    checked.value = value === "dark";
  },
  { immediate: true },
);

function handleCheckedChange(value: boolean) {
  checked.value = value;

  if (typeof window === "undefined") {
    setTheme(value ? "dark" : "light");
    return;
  }

  if (pendingThemeFrame !== null) {
    window.cancelAnimationFrame(pendingThemeFrame);
  }

  pendingThemeFrame = window.requestAnimationFrame(() => {
    setTheme(value ? "dark" : "light");
    pendingThemeFrame = null;
  });
}

onBeforeUnmount(() => {
  if (pendingThemeFrame !== null && typeof window !== "undefined") {
    window.cancelAnimationFrame(pendingThemeFrame);
  }
});
</script>

<template>
  <VfSwitch
    v-bind="attrs"
    :model-value="checked"
    :size="props.size"
    :disabled="props.disabled"
    :label="props.label"
    @update:model-value="handleCheckedChange"
  >
    <template #thumb="{ checked: thumbChecked }">
      <slot name="thumb" :checked="thumbChecked">
        <VueIconify :icon="thumbChecked ? icons.moon : icons.sun" />
      </slot>
    </template>
    <template v-if="hasContent">
      <slot>{{ props.label }}</slot>
    </template>
  </VfSwitch>
</template>
