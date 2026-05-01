<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
  type CSSProperties,
} from "vue";
import { useId } from "@/composables";
import type { VfTabItem } from "@/types/components";

interface VfTabsProps {
  items: VfTabItem[];
  modelValue?: string;
  defaultValue?: string;
}

const props = withDefaults(defineProps<VfTabsProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();
const slots = useSlots();

const baseId = useId({ prefix: "vf-tabs" });
const listRef = ref<HTMLElement | null>(null);
const tabRefs = ref<Array<HTMLElement | null>>([]);
const indicatorReady = ref(false);
const indicatorStyle = ref<CSSProperties>({
  opacity: "0",
  transform: "translateX(0)",
  width: "0px",
});

const fallbackValue = computed(
  () => props.items.find((item) => !item.disabled)?.value,
);
const internalValue = ref(props.defaultValue ?? fallbackValue.value);
const isControlled = computed(() => props.modelValue !== undefined);
const activeValue = computed(
  () => props.modelValue ?? internalValue.value ?? fallbackValue.value,
);

let listResizeObserver: ResizeObserver | null = null;

watch(
  () => props.items,
  (items) => {
    const hasActiveItem = items.some(
      (item) => item.value === activeValue.value && !item.disabled,
    );

    if (!hasActiveItem && fallbackValue.value) {
      setActiveValue(fallbackValue.value);
    }
  },
  { deep: true },
);

function setActiveValue(value: string) {
  if (!isControlled.value) {
    internalValue.value = value;
  }

  emit("update:modelValue", value);
  emit("change", value);
}

function activateTab(item: VfTabItem) {
  if (!item.disabled) {
    setActiveValue(item.value);
  }
}

function getEnabledItems() {
  return props.items.filter((item) => !item.disabled);
}

function focusTabByValue(value: string) {
  const index = props.items.findIndex((item) => item.value === value);
  tabRefs.value[index]?.focus();
}

function handleKeydown(event: KeyboardEvent, currentItem: VfTabItem) {
  const enabledItems = getEnabledItems();
  const currentIndex = enabledItems.findIndex(
    (item) => item.value === currentItem.value,
  );

  if (currentIndex === -1) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    const nextItem = enabledItems[(currentIndex + 1) % enabledItems.length];
    activateTab(nextItem);
    focusTabByValue(nextItem.value);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    const nextItem =
      enabledItems[
        (currentIndex - 1 + enabledItems.length) % enabledItems.length
      ];
    activateTab(nextItem);
    focusTabByValue(nextItem.value);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    const firstItem = enabledItems[0];
    activateTab(firstItem);
    focusTabByValue(firstItem.value);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    const lastItem = enabledItems[enabledItems.length - 1];
    activateTab(lastItem);
    focusTabByValue(lastItem.value);
  }
}

function tabId(value: string) {
  return `${baseId.value}-tab-${value}`;
}

function panelId(value: string) {
  return `${baseId.value}-panel-${value}`;
}

function updateIndicator() {
  const activeIndex = props.items.findIndex(
    (item) => item.value === activeValue.value,
  );
  const activeTab = activeIndex >= 0 ? tabRefs.value[activeIndex] : null;

  if (!activeTab) {
    indicatorStyle.value = {
      opacity: "0",
      transform: "translateX(0)",
      width: "0px",
    };
    return;
  }

  indicatorStyle.value = {
    opacity: "1",
    transform: `translateX(${activeTab.offsetLeft}px)`,
    width: `${activeTab.offsetWidth}px`,
  };
}

watch(
  () => [activeValue.value, props.items],
  async () => {
    await nextTick();
    updateIndicator();
  },
  { deep: true, immediate: true },
);

onMounted(async () => {
  await nextTick();
  updateIndicator();
  requestAnimationFrame(() => {
    indicatorReady.value = true;
  });

  if (typeof ResizeObserver !== "undefined" && listRef.value) {
    listResizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });
    listResizeObserver.observe(listRef.value);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateIndicator);
  }
});

onBeforeUnmount(() => {
  listResizeObserver?.disconnect();

  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateIndicator);
  }
});
</script>

<template>
  <div class="vf-tabs">
    <div
      ref="listRef"
      class="vf-tabs__list"
      role="tablist"
      aria-orientation="horizontal"
    >
      <button
        v-for="(item, index) in items"
        :id="tabId(item.value)"
        :key="item.value"
        :ref="
          (element) => {
            tabRefs[index] = element as HTMLElement | null;
          }
        "
        :aria-controls="panelId(item.value)"
        :aria-selected="activeValue === item.value"
        :disabled="item.disabled"
        :tabindex="activeValue === item.value ? 0 : -1"
        class="vf-tabs__tab"
        role="tab"
        type="button"
        @click="activateTab(item)"
        @keydown="handleKeydown($event, item)"
      >
        {{ item.label }}
      </button>

      <span
        aria-hidden="true"
        class="vf-tabs__indicator"
        :class="indicatorReady && 'vf-tabs__indicator--ready'"
        :style="indicatorStyle"
      />
    </div>

    <div
      v-if="activeValue && slots.panel"
      :id="panelId(activeValue)"
      :aria-labelledby="tabId(activeValue)"
      class="vf-tabs__panel"
      role="tabpanel"
      tabindex="0"
    >
      <slot name="panel" v-bind="{ activeValue }" />
    </div>
  </div>
</template>
