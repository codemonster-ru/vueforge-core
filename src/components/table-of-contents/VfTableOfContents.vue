<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from "vue";
import { cx } from "@/utils/classes";
import type { VfTableOfContentsItem } from "@/types/components";

defineOptions({
  inheritAttrs: false,
});

interface VfTableOfContentsProps {
  items: VfTableOfContentsItem[];
  activeId?: string;
  ariaLabel?: string;
  label?: string;
}

const props = withDefaults(defineProps<VfTableOfContentsProps>(), {
  activeId: undefined,
  ariaLabel: "Table of contents",
  label: undefined,
});

const attrs = useAttrs();

const rootClasses = computed(() =>
  cx("vf-table-of-contents", attrs.class as string | undefined),
);
const rootStyles = computed<StyleValue>(() => attrs.style as StyleValue);
const navAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== "class" && key !== "style"),
  ),
);

function normalizeLevel(level?: number) {
  if (!level || level < 1) {
    return 1;
  }

  return Math.min(level, 6);
}

function itemHref(item: VfTableOfContentsItem) {
  return item.href ?? `#${item.id}`;
}
</script>

<template>
  <nav
    :class="rootClasses"
    :style="rootStyles"
    :aria-label="props.ariaLabel"
    v-bind="navAttrs"
  >
    <p v-if="props.label || $slots.label" class="vf-table-of-contents__title">
      <slot name="label">{{ props.label }}</slot>
    </p>

    <ol class="vf-table-of-contents__list">
      <li
        v-for="item in props.items"
        :key="item.id"
        class="vf-table-of-contents__item"
        :style="{ '--vf-toc-level': String(normalizeLevel(item.level)) }"
      >
        <a
          :href="itemHref(item)"
          :class="[
            'vf-table-of-contents__link',
            props.activeId === item.id && 'vf-table-of-contents__link--active',
          ]"
          :aria-current="props.activeId === item.id ? 'location' : undefined"
        >
          {{ item.label }}
        </a>
      </li>
    </ol>
  </nav>
</template>
