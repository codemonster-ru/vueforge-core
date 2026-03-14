<script setup lang="ts">
import { computed } from 'vue'
import { VueIconify, icons } from '@codemonster-ru/vueiconify'
import { useDisclosure, useId } from '@/composables'

interface VfAccordionProps {
  open?: boolean
  defaultOpen?: boolean
  title?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<VfAccordionProps>(), {
  open: undefined,
  defaultOpen: false,
  title: undefined,
  disabled: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  openChange: [value: boolean]
}>()

const triggerId = useId({ prefix: 'vf-accordion-trigger' })
const contentId = useId({ prefix: 'vf-accordion-content' })

const disclosure = useDisclosure({
  defaultOpen: props.defaultOpen,
  open: computed(() => props.open),
  onOpenChange: (value) => {
    emit('update:open', value)
    emit('openChange', value)
  }
})
const isOpen = disclosure.isOpen

function toggle() {
  if (!props.disabled) {
    disclosure.toggle()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <section class="vf-accordion">
    <button
      :id="triggerId"
      :aria-controls="contentId"
      :aria-expanded="isOpen"
      :disabled="disabled"
      class="vf-accordion__trigger"
      type="button"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <slot name="trigger" :open="isOpen">
        <span>{{ title }}</span>
      </slot>

      <span
        aria-hidden="true"
        :class="['vf-accordion__icon', isOpen && 'vf-accordion__icon--open']"
      >
        <VueIconify :icon="icons.chevronDown" size="0.875rem" />
      </span>
    </button>

    <div
      v-if="isOpen"
      :id="contentId"
      :aria-labelledby="triggerId"
      class="vf-accordion__content"
      role="region"
    >
      <slot :open="isOpen" />
    </div>
  </section>
</template>
