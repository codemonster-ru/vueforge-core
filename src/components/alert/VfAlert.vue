<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { VueIconify, icons } from '@codemonster-ru/vueiconify'
import { cx } from '@/utils/classes'
import type { VfFeedbackTone } from '@/types/components'

defineOptions({
  inheritAttrs: false
})

interface VfAlertProps {
  tone?: VfFeedbackTone
  title?: string
}

const props = withDefaults(defineProps<VfAlertProps>(), {
  tone: 'primary',
  title: undefined
})

const attrs = useAttrs()

const classes = computed(() =>
  cx('vf-alert', props.tone !== 'primary' && `vf-alert--${props.tone}`)
)

const iconName = computed(() => {
  if (props.tone === 'success') {
    return icons.checkCircle
  }

  if (props.tone === 'info') {
    return icons.info
  }

  if (props.tone === 'warn') {
    return icons.warning
  }

  if (props.tone === 'help') {
    return icons.questionCircle
  }

  if (props.tone === 'danger') {
    return icons.warning
  }

  if (props.tone === 'contrast') {
    return icons.info
  }

  return icons.info
})
</script>

<template>
  <section :class="classes" role="alert" v-bind="attrs">
    <div class="vf-alert__icon" aria-hidden="true">
      <VueIconify :icon="iconName" size="2rem" />
    </div>

    <div class="vf-alert__content">
      <p v-if="props.title || $slots.title" class="vf-alert__title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </p>

      <div class="vf-alert__body">
        <slot />
      </div>
    </div>
  </section>
</template>
