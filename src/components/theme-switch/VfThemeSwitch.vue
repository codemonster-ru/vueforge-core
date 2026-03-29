<script setup lang="ts">
import { computed, useAttrs, useSlots } from "vue";
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
    <template v-if="hasContent">
      <slot>{{ props.label }}</slot>
    </template>
  </VfSwitch>
</template>
