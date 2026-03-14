import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfDivider,
  VfIconButton,
  VfInput,
  VfLink,
  VfPanel,
  VfTag,
  VfTextarea
} from '@/components'

describe('core primitives', () => {
  it('renders button variants and respects native attributes', async () => {
    const wrapper = mount(VfButton, {
      props: {
        variant: 'secondary',
        size: 'sm',
        disabled: true
      },
      slots: {
        default: 'Save'
      }
    })

    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('vf-button--secondary')
    expect(wrapper.classes()).toContain('vf-button--sm')
    expect(wrapper.text()).toBe('Save')
  })

  it('adds safe rel defaults for external links', () => {
    const wrapper = mount(VfLink, {
      props: {
        href: 'https://example.com',
        target: '_blank',
        underline: true
      },
      slots: {
        default: 'Docs'
      }
    })

    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.classes()).toContain('vf-link--underline')
  })

  it('renders card title and slots', () => {
    const wrapper = mount(VfCard, {
      props: {
        title: 'Overview'
      },
      slots: {
        default: 'Body copy',
        footer: 'Footer'
      }
    })

    expect(wrapper.find('.vf-card__title').text()).toBe('Overview')
    expect(wrapper.text()).toContain('Body copy')
    expect(wrapper.text()).toContain('Footer')
  })

  it('emits input updates and invalid state', async () => {
    const wrapper = mount(VfInput, {
      props: {
        modelValue: 'hello',
        invalid: true,
        placeholder: 'Type here'
      }
    })

    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.attributes('placeholder')).toBe('Type here')

    await wrapper.setValue('world')

    expect(wrapper.emitted('update:modelValue')).toEqual([['world']])
  })

  it('emits textarea updates and supports size modifiers', async () => {
    const wrapper = mount(VfTextarea, {
      props: {
        modelValue: 'draft',
        size: 'lg'
      }
    })

    expect(wrapper.classes()).toContain('vf-textarea--lg')

    await wrapper.setValue('published')

    expect(wrapper.emitted('update:modelValue')).toEqual([['published']])
  })

  it('renders divider orientation and decorative default semantics', () => {
    const wrapper = mount(VfDivider, {
      props: {
        orientation: 'vertical'
      }
    })

    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.classes()).toContain('vf-divider--vertical')
  })

  it('renders badge tone and panel content', () => {
    const badge = mount(VfBadge, {
      props: {
        tone: 'success'
      },
      slots: {
        default: 'Stable'
      }
    })

    const panel = mount(VfPanel, {
      props: {
        title: 'Quick notes',
        subtle: true
      },
      slots: {
        default: 'Panel content'
      }
    })

    expect(badge.classes()).toContain('vf-badge--success')
    expect(badge.text()).toBe('Stable')
    expect(panel.classes()).toContain('vf-panel--subtle')
    expect(panel.text()).toContain('Quick notes')
    expect(panel.text()).toContain('Panel content')
  })

  it('renders icon button with accessible label and icon stub', () => {
    const wrapper = mount(VfIconButton, {
      props: {
        icon: 'gear',
        'aria-label': 'Open settings',
        variant: 'secondary'
      }
    })

    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-label')).toBe('Open settings')
    expect(wrapper.classes()).toContain('vf-icon-button--secondary')
    expect(wrapper.find('.vif-icon').exists()).toBe(true)
  })

  it('renders alert and tag tones', () => {
    const alert = mount(VfAlert, {
      props: {
        tone: 'danger',
        title: 'Attention'
      },
      slots: {
        default: 'Alert content'
      }
    })

    const tag = mount(VfTag, {
      props: {
        tone: 'primary'
      },
      slots: {
        default: 'Preview'
      }
    })

    expect(alert.classes()).toContain('vf-alert--danger')
    expect(alert.text()).toContain('Attention')
    expect(alert.text()).toContain('Alert content')
    expect(alert.find('.vif-icon').exists()).toBe(true)
    expect(tag.classes()).toContain('vf-tag--primary')
    expect(tag.text()).toBe('Preview')
  })
})
