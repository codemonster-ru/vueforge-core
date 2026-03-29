<script setup lang="ts">
import { computed, useAttrs } from "vue";
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
const { resolvedTheme, setTheme } = useTheme();

const checked = computed({
  get: () => resolvedTheme.value === "dark",
  set: (value: boolean) => {
    setTheme(value ? "dark" : "light");
  },
});
</script>

<template>
  <VfSwitch
    v-bind="attrs"
    v-model="checked"
    :size="props.size"
    :disabled="props.disabled"
    :label="props.label"
  >
    <template #thumb="{ checked: thumbChecked }">
      <slot name="thumb" :checked="thumbChecked">
        <VueIconify
          :icon="thumbChecked ? icons.moon : icons.sun"
          size="0.5rem"
        />
      </slot>
    </template>
    <slot v-if="$slots.default || props.label">{{ props.label }}</slot>
  </VfSwitch>
</template>
