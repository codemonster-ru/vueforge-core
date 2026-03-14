import { afterEach, describe, expect, it } from 'vitest'
import {
  applyThemeConfig,
  defaultThemePreset,
  resolveThemeConfig,
  themePresetToCssText,
  themeTokensToCssVars
} from '@/theme'

describe('theme preset runtime', () => {
  afterEach(() => {
    document.getElementById('vf-theme-preset')?.remove()
    document.getElementById('vf-test-theme')?.remove()
  })

  it('serializes theme tokens to css variables', () => {
    const cssVars = themeTokensToCssVars(
      {
        colorPrimary: '#ff5a36',
        controlHeightMd: '2.5rem'
      },
      'vf'
    )

    expect(cssVars['--vf-color-primary']).toBe('#ff5a36')
    expect(cssVars['--vf-control-height-md']).toBe('2.5rem')
  })

  it('builds light and dark css text from a preset', () => {
    const config = resolveThemeConfig({
      preset: defaultThemePreset,
      extend: {
        colorPrimary: '#ff5a36'
      },
      dark: {
        colorPrimary: '#ff8f70'
      },
      options: {
        styleId: 'vf-test-theme'
      }
    })

    const cssText = themePresetToCssText(config)

    expect(cssText).toContain(':root')
    expect(cssText).toContain(":root[data-vf-theme='dark']")
    expect(cssText).toContain('--vf-color-primary: #ff5a36;')
    expect(cssText).toContain('--vf-color-primary: #ff8f70;')
  })

  it('injects a style tag with resolved theme variables', () => {
    const style = applyThemeConfig(
      resolveThemeConfig({
        preset: defaultThemePreset,
        extend: {
          colorPrimary: '#ff5a36'
        },
        options: {
          styleId: 'vf-test-theme'
        }
      })
    )

    expect(style.id).toBe('vf-test-theme')
    expect(style.textContent).toContain('--vf-color-primary: #ff5a36;')
    expect(document.getElementById('vf-test-theme')).toBe(style)
  })
})
