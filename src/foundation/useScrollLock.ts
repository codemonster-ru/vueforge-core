import { onBeforeUnmount, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export interface UseScrollLockOptions {
  target?: MaybeRefOrGetter<HTMLElement | null | undefined>
}

export function useScrollLock(
  enabled: MaybeRefOrGetter<boolean>,
  options: UseScrollLockOptions = {}
) {
  let previousOverflow = ''

  const resolveTarget = () => {
    const target = toValue(options.target)

    if (target) {
      return target
    }

    if (typeof document === 'undefined') {
      return null
    }

    return document.body
  }

  const unlock = () => {
    const target = resolveTarget()

    if (!target) {
      return
    }

    target.style.overflow = previousOverflow
  }

  watchEffect((onCleanup) => {
    const isEnabled = toValue(enabled)
    const target = resolveTarget()

    if (!target) {
      return
    }

    if (!isEnabled) {
      unlock()
      return
    }

    previousOverflow = target.style.overflow
    target.style.overflow = 'hidden'

    onCleanup(() => {
      target.style.overflow = previousOverflow
    })
  })

  onBeforeUnmount(() => {
    unlock()
  })

  return {
    unlock
  }
}
