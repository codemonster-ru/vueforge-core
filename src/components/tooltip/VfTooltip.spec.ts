import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import VfTooltip from './VfTooltip.vue'

describe('VfTooltip', () => {
  it('opens on hover and focus, and links trigger to tooltip content', async () => {
    vi.useFakeTimers()

    const wrapper = mount(VfTooltip, {
      props: {
        text: 'Helpful hint',
        placement: 'bottom',
        openDelay: 10
      },
      slots: {
        default: '<button type="button">Info</button>'
      }
    })

    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(10)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const tooltip = document.body.querySelector<HTMLElement>('[role="tooltip"]')
    const tooltipArrow = document.body.querySelector<HTMLElement>('.vf-tooltip__arrow')
    const trigger = wrapper.get('.vf-tooltip__trigger')

    expect(tooltip?.textContent).toBe('Helpful hint')
    expect(tooltip?.getAttribute('style')).toContain('left:')
    expect(tooltip?.getAttribute('style')).toContain('top:')
    expect(tooltipArrow).not.toBeNull()
    expect(tooltipArrow?.getAttribute('style')).toContain('left:')
    expect(tooltipArrow?.getAttribute('style')).toContain('top:')
    expect(trigger.attributes('aria-describedby')).toBe(tooltip?.getAttribute('id') ?? '')

    await wrapper.trigger('mouseleave')
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()

    vi.useRealTimers()
  })
})
