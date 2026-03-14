<script setup lang="ts">
import { computed, ref } from 'vue'
import { icons } from '@codemonster-ru/vueiconify'
import {
  VfAccordion,
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfDialog,
  VfDivider,
  VfDropdown,
  VfIconButton,
  VfInput,
  VfLink,
  VfPanel,
  VfPopover,
  VfTag,
  VfTabs,
  VfTextarea,
  VfTooltip,
  useTheme
} from '@/index'

const { setTheme, toggleTheme } = useTheme()

const dialogOpen = ref(false)
const dropdownControlled = ref(false)
const popoverOpen = ref(false)
const inputValue = ref('')
const textareaValue = ref('A compact foundation for the ecosystem.')
const activeTab = ref('overview')

const releaseTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'api', label: 'API' },
  { value: 'status', label: 'Status' }
]

const tabContent = computed<Record<string, string>>(() => ({
  overview: 'Overview content.',
  api: 'API content.',
  status: 'Status content.'
}))
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <header class="demo-header">
        <p class="demo-kicker">VueForge Core Demo</p>
        <h1>Package Components</h1>
      </header>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Theme</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-example">
            <p class="demo-label">vf-theme-provider</p>
            <div class="demo-inline">
              <VfButton size="sm" variant="secondary" @click="setTheme('light')">Light</VfButton>
              <VfButton size="sm" variant="secondary" @click="setTheme('dark')">Dark</VfButton>
              <VfButton size="sm" variant="secondary" @click="setTheme('system')">System</VfButton>
              <VfButton size="sm" @click="toggleTheme">Toggle</VfButton>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Actions and Links</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-example">
            <p class="demo-label">vf-button, vf-icon-button</p>
            <div class="demo-inline">
              <VfButton>Primary</VfButton>
              <VfButton variant="secondary">Secondary</VfButton>
              <VfIconButton :icon="icons.gear" aria-label="Settings" variant="secondary" />
              <VfButton disabled>Disabled</VfButton>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-link</p>
            <VfLink href="https://example.com" target="_blank" underline>
              External Docs Link
            </VfLink>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>States</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">vf-button states</p>
            <div class="demo-state-grid">
              <div class="demo-state">
                <span class="demo-state__label">default</span>
                <VfButton>Primary</VfButton>
              </div>
              <div class="demo-state">
                <span class="demo-state__label">secondary</span>
                <VfButton variant="secondary">Secondary</VfButton>
              </div>
              <div class="demo-state">
                <span class="demo-state__label">disabled</span>
                <VfButton disabled>Disabled</VfButton>
              </div>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-input states</p>
            <div class="demo-state-grid">
              <div class="demo-state">
                <span class="demo-state__label">default</span>
                <VfInput placeholder="Default input" />
              </div>
              <div class="demo-state">
                <span class="demo-state__label">invalid</span>
                <VfInput invalid placeholder="Invalid input" />
              </div>
              <div class="demo-state">
                <span class="demo-state__label">disabled</span>
                <VfInput disabled placeholder="Disabled input" />
              </div>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-feedback states</p>
            <div class="demo-state-grid">
              <div class="demo-state">
                <span class="demo-state__label">neutral</span>
                <div class="demo-inline">
                  <VfBadge>Neutral</VfBadge>
                  <VfTag>Neutral</VfTag>
                </div>
              </div>
              <div class="demo-state">
                <span class="demo-state__label">primary</span>
                <div class="demo-inline">
                  <VfBadge tone="primary">Primary</VfBadge>
                  <VfTag tone="primary">Primary</VfTag>
                </div>
              </div>
              <div class="demo-state">
                <span class="demo-state__label">danger</span>
                <div class="demo-inline">
                  <VfBadge tone="danger">Danger</VfBadge>
                  <VfTag tone="danger">Danger</VfTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Overlay</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">vf-tooltip</p>
            <VfTooltip text="Tooltip is opened by hover and focus." placement="bottom">
              <VfButton variant="secondary">Tooltip</VfButton>
            </VfTooltip>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-dropdown</p>
            <VfDropdown v-model:open="dropdownControlled">
              <template #trigger="{ open }">
                <VfButton tabindex="-1" variant="secondary">{{ open ? 'Close menu' : 'Open menu' }}</VfButton>
              </template>

              <button class="vf-dropdown__item" role="menuitem">Action one</button>
              <button class="vf-dropdown__item" role="menuitem">Action two</button>
            </VfDropdown>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-popover</p>
            <VfPopover v-model:open="popoverOpen">
              <template #trigger="{ open }">
                <VfButton tabindex="-1" variant="secondary">{{ open ? 'Close popover' : 'Open popover' }}</VfButton>
              </template>

              <div class="demo-stack">
                <p class="demo-text">Popover content.</p>
                <div class="demo-inline">
                  <VfButton size="sm">Action</VfButton>
                  <VfButton size="sm" variant="secondary">Secondary</VfButton>
                </div>
              </div>
            </VfPopover>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Surface Components</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-item">
            <p class="demo-label">vf-card</p>
            <VfCard title="Release Summary">
              <p>Card content.</p>
              <template #footer>
                <div class="demo-inline">
                  <VfBadge tone="success">Stable</VfBadge>
                  <VfBadge tone="primary">Core</VfBadge>
                </div>
              </template>
            </VfCard>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-panel</p>
            <VfPanel title="Supporting Context">
              <p>Panel content.</p>
            </VfPanel>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Feedback</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-item">
            <p class="demo-label">vf-alert</p>
            <div class="demo-stack">
              <VfAlert title="Heads up">Alert content.</VfAlert>
              <VfAlert tone="success" title="Saved">Success content.</VfAlert>
              <VfAlert tone="danger" title="Error">Danger content.</VfAlert>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-badge, vf-tag</p>
            <div class="demo-stack">
              <div class="demo-inline">
                <VfBadge>Neutral</VfBadge>
                <VfBadge tone="primary">Primary</VfBadge>
                <VfBadge tone="success">Success</VfBadge>
                <VfBadge tone="danger">Danger</VfBadge>
              </div>
              <VfDivider />
              <div class="demo-inline">
                <VfTag>Neutral</VfTag>
                <VfTag tone="primary">Primary</VfTag>
                <VfTag tone="success">Success</VfTag>
                <VfTag tone="danger">Danger</VfTag>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Forms</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-item">
            <p class="demo-label">vf-input</p>
            <div class="demo-stack">
              <VfInput v-model="inputValue" placeholder="Project name" />
              <VfInput invalid placeholder="Invalid input" />
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-textarea</p>
            <div class="demo-stack">
              <VfTextarea v-model="textareaValue" placeholder="Describe the release..." />
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Navigation and Disclosure</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-item">
            <p class="demo-label">vf-tabs</p>
            <VfTabs v-model="activeTab" :items="releaseTabs">
              <template #panel="{ activeValue }">
                <p class="demo-text">{{ tabContent[activeValue] }}</p>
              </template>
            </VfTabs>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-accordion</p>
            <div class="demo-stack">
              <VfAccordion title="Section One" default-open>Accordion content.</VfAccordion>
              <VfAccordion title="Section Two">Accordion content.</VfAccordion>
              <VfAccordion title="Section Three">Accordion content.</VfAccordion>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Dialog</h2>
        </div>

        <div class="demo-example demo-example--compact">
          <p class="demo-label">vf-dialog</p>
          <VfButton data-test="open-dialog" @click="dialogOpen = true">Open Dialog</VfButton>
        </div>
      </section>
    </div>

    <VfDialog
      v-model:open="dialogOpen"
      title="Dialog"
    >
      <template #default="{ close }">
        <div class="demo-stack">
          <p>Dialog content.</p>
          <div class="demo-inline">
            <VfButton data-autofocus @click="close">Looks good</VfButton>
            <VfButton variant="secondary" @click="dialogOpen = false">Close</VfButton>
          </div>
        </div>
      </template>
    </VfDialog>
  </div>
</template>
