import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import VfDropdown from './VfDropdown.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('VfDropdown', () => {
  it('opens from trigger interaction and wires menu accessibility attributes', async () => {
    const wrapper = mount(VfDropdown, {
      attachTo: document.body,
      global: {
        stubs: {
          teleport: true
        }
      },
      slots: {
        trigger: '<button type="button">More</button>',
        default: `
          <button role="menuitem">Edit</button>
          <button role="menuitem">Duplicate</button>
        `
      }
    })

    await wrapper.get('.vf-dropdown__trigger').trigger('click')
    await nextTick()

    const menu = wrapper.get('[role="menu"]')
    expect(menu.attributes('aria-labelledby')).toBeTruthy()
    expect(wrapper.get('.vf-dropdown__trigger').attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2)
    expect(wrapper.find('.vf-dropdown__arrow').exists()).toBe(true)
  })

  it('supports keyboard navigation and closes on escape', async () => {
    const wrapper = mount(VfDropdown, {
      attachTo: document.body,
      global: {
        stubs: {
          teleport: true
        }
      },
      slots: {
        trigger: '<button type="button">Open</button>',
        default: `
          <button role="menuitem">Alpha</button>
          <button role="menuitem">Beta</button>
          <button role="menuitem">Gamma</button>
        `
      }
    })

    await wrapper.get('.vf-dropdown__trigger').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    const items = wrapper.findAll('[role="menuitem"]')
    ;(items[0].element as HTMLElement).focus()
    items[0].element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement?.textContent).toBe('Beta')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()

    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    expect(wrapper.get('.vf-dropdown__trigger').attributes('aria-expanded')).toBe('false')
  })

  it('keeps focus on trigger when opened by click', async () => {
    const wrapper = mount(VfDropdown, {
      attachTo: document.body,
      global: {
        stubs: {
          teleport: true
        }
      },
      slots: {
        trigger: '<button type="button">More</button>',
        default: `
          <button role="menuitem">Edit</button>
          <button role="menuitem">Duplicate</button>
        `
      }
    })

    const trigger = wrapper.get('.vf-dropdown__trigger')

    ;(trigger.element as HTMLElement).focus()
    await trigger.trigger('click')
    await nextTick()

    expect(document.activeElement).toBe(trigger.element)
  })

  it('supports controlled mode and emits open updates', async () => {
    const wrapper = mount(
      defineComponent({
        components: { VfDropdown },
        setup() {
          const open = ref(false)

          return () =>
            h(
              VfDropdown,
              {
                open: open.value,
                'onUpdate:open': (value: boolean) => {
                  open.value = value
                }
              },
              {
                trigger: () => h('button', { type: 'button' }, 'Toggle'),
                default: () => h('button', { role: 'menuitem' }, 'Item')
              }
            )
        }
      }),
      {
        attachTo: document.body,
        global: {
          stubs: {
            teleport: true
          }
        }
      }
    )

    await wrapper.get('.vf-dropdown__trigger').trigger('click')
    await nextTick()
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)

    await wrapper.get('[role="menuitem"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })
})
