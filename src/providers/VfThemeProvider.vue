<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { themeContextKey } from './themeContext'
import { vueForgeConfigKey } from './vueForgeConfig'
import type { VfResolvedTheme, VfThemeMode, VfThemeProviderProps } from '@/types/theme'
import { DEFAULT_ATTRIBUTE, DEFAULT_STORAGE_KEY, isThemeMode, resolveTheme } from '@/utils/theme'

const props = withDefaults(defineProps<VfThemeProviderProps>(), {
  defaultTheme: 'system'
})

const mode = ref<VfThemeMode>(props.defaultTheme)
const systemTheme = ref<VfResolvedTheme>('light')
const mediaQuery = ref<MediaQueryList | null>(null)
const config = inject(vueForgeConfigKey, null)

const resolvedTheme = computed(() => resolveTheme(mode.value, systemTheme.value))
const storageKey = computed(
  () => props.storageKey ?? config?.theme.options.storageKey ?? DEFAULT_STORAGE_KEY
)
const attribute = computed(
  () => props.attribute ?? config?.theme.options.attribute ?? DEFAULT_ATTRIBUTE
)

function readStoredTheme() {
  if (typeof window === 'undefined') {
    return
  }

  const storedTheme = window.localStorage.getItem(storageKey.value)

  if (isThemeMode(storedTheme)) {
    mode.value = storedTheme
  }
}

function updateDocumentTheme(theme: VfResolvedTheme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute(attribute.value, theme)
}

function handleSystemThemeChange(event?: MediaQueryListEvent) {
  if (event) {
    systemTheme.value = event.matches ? 'dark' : 'light'
    return
  }

  systemTheme.value = mediaQuery.value?.matches ? 'dark' : 'light'
}

function setTheme(value: VfThemeMode) {
  mode.value = value
}

function toggleTheme() {
  const nextTheme = resolvedTheme.value === 'dark' ? 'light' : 'dark'
  mode.value = nextTheme
}

watch(mode, (value) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey.value, value)
})

watch(
  resolvedTheme,
  (value) => {
    updateDocumentTheme(value)
  },
  { immediate: true }
)

onMounted(() => {
  readStoredTheme()

  mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
  handleSystemThemeChange()
  mediaQuery.value.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  mediaQuery.value?.removeEventListener('change', handleSystemThemeChange)
})

provide(themeContextKey, {
  mode,
  resolvedTheme,
  setTheme,
  toggleTheme
})
</script>

<template>
  <slot />
</template>
