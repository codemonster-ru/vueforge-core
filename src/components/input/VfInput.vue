<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cx } from '@/utils/classes'
import type { VfControlSize } from '@/types/components'

defineOptions({
  inheritAttrs: false
})

interface VfInputProps {
  modelValue?: string
  size?: VfControlSize
  invalid?: boolean
}

const props = withDefaults(defineProps<VfInputProps>(), {
  modelValue: '',
  size: 'md',
  invalid: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const classes = computed(() =>
  cx(
    'vf-input',
    props.size !== 'md' && `vf-input--${props.size}`,
    props.invalid && 'vf-input--invalid'
  )
)

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :class="classes"
    :value="props.modelValue"
    :aria-invalid="props.invalid || undefined"
    v-bind="attrs"
    @input="handleInput"
  />
</template>
