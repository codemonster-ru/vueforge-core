<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useId } from '@/composables'
import type { VfTabItem } from '@/types/components'

interface VfTabsProps {
  items: VfTabItem[]
  modelValue?: string
  defaultValue?: string
}

const props = withDefaults(defineProps<VfTabsProps>(), {
  modelValue: undefined,
  defaultValue: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const baseId = useId({ prefix: 'vf-tabs' })
const tabRefs = ref<Array<HTMLElement | null>>([])

const fallbackValue = computed(() => props.items.find((item) => !item.disabled)?.value)
const internalValue = ref(props.defaultValue ?? fallbackValue.value)
const isControlled = computed(() => props.modelValue !== undefined)
const activeValue = computed(() => props.modelValue ?? internalValue.value ?? fallbackValue.value)

watch(
  () => props.items,
  (items) => {
    const hasActiveItem = items.some((item) => item.value === activeValue.value && !item.disabled)

    if (!hasActiveItem && fallbackValue.value) {
      setActiveValue(fallbackValue.value)
    }
  },
  { deep: true }
)

function setActiveValue(value: string) {
  if (!isControlled.value) {
    internalValue.value = value
  }

  emit('update:modelValue', value)
  emit('change', value)
}

function activateTab(item: VfTabItem) {
  if (!item.disabled) {
    setActiveValue(item.value)
  }
}

function getEnabledItems() {
  return props.items.filter((item) => !item.disabled)
}

function focusTabByValue(value: string) {
  const index = props.items.findIndex((item) => item.value === value)
  tabRefs.value[index]?.focus()
}

function handleKeydown(event: KeyboardEvent, currentItem: VfTabItem) {
  const enabledItems = getEnabledItems()
  const currentIndex = enabledItems.findIndex((item) => item.value === currentItem.value)

  if (currentIndex === -1) {
    return
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    const nextItem = enabledItems[(currentIndex + 1) % enabledItems.length]
    activateTab(nextItem)
    focusTabByValue(nextItem.value)
    return
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    const nextItem = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length]
    activateTab(nextItem)
    focusTabByValue(nextItem.value)
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    const firstItem = enabledItems[0]
    activateTab(firstItem)
    focusTabByValue(firstItem.value)
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    const lastItem = enabledItems[enabledItems.length - 1]
    activateTab(lastItem)
    focusTabByValue(lastItem.value)
  }
}

function tabId(value: string) {
  return `${baseId.value}-tab-${value}`
}

function panelId(value: string) {
  return `${baseId.value}-panel-${value}`
}
</script>

<template>
  <div class="vf-tabs">
    <div class="vf-tabs__list" role="tablist" aria-orientation="horizontal">
      <button
        v-for="(item, index) in items"
        :id="tabId(item.value)"
        :key="item.value"
        :ref="
          (element) => {
            tabRefs[index] = element as HTMLElement | null
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
    </div>

    <div
      v-if="activeValue"
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
