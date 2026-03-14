import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { VfThemeProvider } from '@/index'
import ShowcasePage from './ShowcasePage.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ShowcasePage', () => {
  it('opens the dialog from the demo button', async () => {
    const wrapper = mount(VfThemeProvider, {
      attachTo: document.body,
      slots: {
        default: ShowcasePage
      }
    })

    await wrapper.get('[data-test="open-dialog"]').trigger('click')
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
  })
})
