<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cx } from '@/utils/classes'
import type { VfLinkTone } from '@/types/components'

defineOptions({
  inheritAttrs: false
})

interface VfLinkProps {
  href?: string
  target?: string
  rel?: string
  underline?: boolean
  tone?: VfLinkTone
}

const props = withDefaults(defineProps<VfLinkProps>(), {
  href: undefined,
  target: undefined,
  rel: undefined,
  underline: false,
  tone: 'default'
})

const attrs = useAttrs()

const resolvedRel = computed(() => {
  if (props.rel) {
    return props.rel
  }

  return props.target === '_blank' ? 'noopener noreferrer' : undefined
})

const classes = computed(() =>
  cx(
    'vf-link',
    props.underline && 'vf-link--underline',
    props.tone === 'muted' && 'vf-link--muted'
  )
)
</script>

<template>
  <a
    :class="classes"
    :href="props.href"
    :target="props.target"
    :rel="resolvedRel"
    v-bind="attrs"
  >
    <slot />
  </a>
</template>
