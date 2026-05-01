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
import type { VfControlSize, VfTabItem } from "@/types/components";

interface VfTabsProps {
  items: VfTabItem[];
  modelValue?: string;
  defaultValue?: string;
  size?: VfControlSize;
}

const props = withDefaults(defineProps<VfTabsProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();
const slots = useSlots();

const baseId = useId({ prefix: "vf-tabs" });
const listRef = ref<HTMLElement | null>(null);
const tabRefs = ref<Array<HTMLElement | null>>([]);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const isListScrolling = ref(false);
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
let scrollStopTimeout: ReturnType<typeof setTimeout> | null = null;

function updateScrollState() {
  const list = listRef.value;

  if (!list) {
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  const maxScrollLeft = list.scrollWidth - list.clientWidth;
  canScrollLeft.value = list.scrollLeft > 1;
  canScrollRight.value = maxScrollLeft - list.scrollLeft > 1;
}

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

function updateIndicator(options?: { scrollIntoView?: boolean }) {
  const list = listRef.value;
  const activeIndex = props.items.findIndex(
    (item) => item.value === activeValue.value,
  );
  const activeTab = activeIndex >= 0 ? tabRefs.value[activeIndex] : null;

  if (!activeTab || !list) {
    indicatorStyle.value = {
      opacity: "0",
      transform: "translateX(0)",
      width: "0px",
    };
    return;
  }

  const tabStart = activeTab.offsetLeft - list.scrollLeft;
  const tabEnd = tabStart + activeTab.offsetWidth;
  const visibleStart = Math.max(0, tabStart);
  const visibleEnd = Math.min(list.clientWidth, tabEnd);
  const visibleWidth = Math.max(0, visibleEnd - visibleStart);
  const isVisible = visibleWidth > 0;

  indicatorStyle.value = {
    opacity: isVisible ? "1" : "0",
    transform: `translateX(${visibleStart}px)`,
    width: `${visibleWidth}px`,
  };

  if (
    options?.scrollIntoView &&
    typeof activeTab.scrollIntoView === "function"
  ) {
    activeTab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  updateScrollState();
}

function handleListScroll() {
  isListScrolling.value = true;
  if (scrollStopTimeout) {
    clearTimeout(scrollStopTimeout);
  }
  scrollStopTimeout = setTimeout(() => {
    isListScrolling.value = false;
  }, 120);

  updateScrollState();
  updateIndicator();
}

function handleWindowResize() {
  updateScrollState();
  updateIndicator();
}

watch(
  () => [activeValue.value, props.items],
  async () => {
    await nextTick();
    updateIndicator({ scrollIntoView: true });
  },
  { deep: true, immediate: true },
);

onMounted(async () => {
  await nextTick();
  updateIndicator({ scrollIntoView: true });
  updateScrollState();
  requestAnimationFrame(() => {
    indicatorReady.value = true;
  });

  if (typeof ResizeObserver !== "undefined" && listRef.value) {
    listResizeObserver = new ResizeObserver(() => {
      updateIndicator();
      updateScrollState();
    });
    listResizeObserver.observe(listRef.value);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleWindowResize);
  }
});

onBeforeUnmount(() => {
  listResizeObserver?.disconnect();
  if (scrollStopTimeout) {
    clearTimeout(scrollStopTimeout);
  }

  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleWindowResize);
  }
});
</script>

<template>
  <div class="vf-tabs">
    <div
      class="vf-tabs__list"
      :class="[
        `vf-tabs__list--${size}`,
        {
          'vf-tabs__list--can-scroll-left': canScrollLeft,
          'vf-tabs__list--can-scroll-right': canScrollRight,
        },
      ]"
      role="tablist"
      aria-orientation="horizontal"
    >
      <div
        ref="listRef"
        class="vf-tabs__list-scroller"
        @scroll="handleListScroll"
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
          <slot
            name="tab"
            v-bind="{ item, isActive: activeValue === item.value, index }"
          >
            {{ item.label }}
          </slot>
        </button>
      </div>

      <span
        aria-hidden="true"
        class="vf-tabs__indicator"
        :class="[
          indicatorReady && 'vf-tabs__indicator--ready',
          isListScrolling && 'vf-tabs__indicator--no-transition',
        ]"
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
