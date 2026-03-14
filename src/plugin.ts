import type { App, Plugin } from 'vue'
import { vueForgeConfigKey } from '@/providers/vueForgeConfig'
import type { VfVueForgeOptions } from '@/types/theme'
import { applyThemeConfig, resolveThemeConfig } from '@/theme'

export function createVueForge() {
  const plugin: Plugin = {
    install(app: App, options: VfVueForgeOptions = {}) {
      const theme = resolveThemeConfig(options.theme)

      app.provide(vueForgeConfigKey, { theme })

      if (typeof document !== 'undefined') {
        applyThemeConfig(theme)
      }
    }
  }

  return plugin
}

export const VueForge = createVueForge()

export default VueForge
