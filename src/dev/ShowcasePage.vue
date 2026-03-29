<script setup lang="ts">
import { computed, ref } from "vue";
import { VueIconify, icons } from "@codemonster-ru/vueiconify";
import {
  VfAccordion,
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfCheckbox,
  VfDrawer,
  VfDialog,
  VfDivider,
  VfDropdown,
  VfHeading,
  VfIconButton,
  VfInput,
  VfLink,
  VfNavMenu,
  VfPanel,
  VfPopover,
  VfProse,
  VfRadio,
  VfSwitch,
  VfTableOfContents,
  VfText,
  VfThemeSwitch,
  VfTag,
  VfTabs,
  VfTextarea,
  VfTooltip,
  useTableOfContents,
  useTheme,
} from "@/index";
import type { VfNavMenuItem, VfTableOfContentsItem } from "@/index";

const { setTheme, toggleTheme } = useTheme();

const dialogOpen = ref(false);
const drawerOpen = ref(false);
const dropdownControlled = ref(false);
const popoverOpen = ref(false);
const inputValue = ref("");
const textareaValue = ref("A compact foundation for the ecosystem.");
const checkboxValue = ref(true);
const switchValue = ref(true);
const iconSwitchValue = ref(true);
const radioValue = ref("pro");
const activeTab = ref("overview");
const activeMenuValue = ref("button");
const activeSimpleMenuValue = ref("button");

const releaseTabs = [
  { value: "overview", label: "Overview" },
  { value: "api", label: "API" },
  { value: "status", label: "Status" },
];

const docsMenuItems: VfNavMenuItem[] = [
  {
    value: "getting-started",
    label: "Getting Started",
    leadingIcon: "info",
    children: [
      { value: "installation", label: "Installation" },
      { value: "quick-start", label: "Quick Start" },
      { value: "migration", label: "Migration" },
      { value: "faq", label: "FAQ" },
    ],
  },
  {
    value: "components",
    label: "Components",
    leadingIcon: "gear",
    children: [
      {
        value: "actions-group",
        kind: "group",
        label: "Actions",
        children: [
          { value: "button", label: "Button" },
          { value: "icon-button", label: "Icon Button" },
          { value: "link", label: "Link" },
        ],
      },
      {
        value: "navigation-group",
        kind: "group",
        label: "Navigation",
        children: [
          {
            value: "tabs",
            label: "Tabs",
            children: [
              {
                value: "overview-tab",
                label: "Overview Tab",
                children: [
                  { value: "overview-anatomy", label: "Anatomy" },
                  { value: "overview-accessibility", label: "Accessibility" },
                ],
              },
              { value: "status-tab", label: "Status Tab" },
              { value: "usage-tab", label: "Usage Tab" },
            ],
          },
          { value: "accordion", label: "Accordion" },
          { value: "nav-menu", label: "Nav Menu" },
        ],
      },
      {
        value: "overlay-group",
        kind: "group",
        label: "Overlay",
        children: [
          { value: "dialog", label: "Dialog" },
          { value: "drawer", label: "Drawer" },
          { value: "dropdown", label: "Dropdown" },
          { value: "popover", label: "Popover" },
          { value: "tooltip", label: "Tooltip" },
        ],
      },
      {
        value: "forms-group",
        kind: "group",
        label: "Forms",
        children: [
          { value: "input", label: "Input" },
          { value: "textarea", label: "Textarea" },
          { value: "checkbox", label: "Checkbox" },
          { value: "radio", label: "Radio" },
          { value: "switch", label: "Switch" },
        ],
      },
    ],
  },
  {
    value: "foundation",
    label: "Foundation",
    leadingIcon: "checkCircle",
    children: [
      { value: "tokens", label: "Tokens" },
      { value: "theme", label: "Theme" },
      { value: "breakpoints", label: "Breakpoints" },
      { value: "motion", label: "Motion" },
    ],
  },
];

const docsMenuSimpleItems: VfNavMenuItem[] = [
  {
    value: "getting-started",
    label: "Getting Started",
    children: [
      { value: "installation", label: "Installation" },
      { value: "quick-start", label: "Quick Start" },
      { value: "migration", label: "Migration" },
      { value: "faq", label: "FAQ" },
    ],
  },
  {
    value: "components",
    label: "Components",
    children: [
      { value: "button", label: "Button" },
      { value: "icon-button", label: "Icon Button" },
      {
        value: "tabs",
        label: "Tabs",
        children: [
          {
            value: "overview-tab",
            label: "Overview Tab",
            children: [
              { value: "overview-anatomy", label: "Anatomy" },
              { value: "overview-accessibility", label: "Accessibility" },
            ],
          },
          { value: "status-tab", label: "Status Tab" },
        ],
      },
      { value: "accordion", label: "Accordion" },
      { value: "dialog", label: "Dialog" },
      { value: "drawer", label: "Drawer" },
      { value: "popover", label: "Popover" },
      { value: "tooltip", label: "Tooltip" },
    ],
  },
  {
    value: "foundation",
    label: "Foundation",
    children: [
      { value: "tokens", label: "Tokens" },
      { value: "theme", label: "Theme" },
      { value: "breakpoints", label: "Breakpoints" },
      { value: "motion", label: "Motion" },
    ],
  },
];

const tocItems: VfTableOfContentsItem[] = [
  { id: "getting-started", label: "Getting started", level: 1 },
  { id: "installation", label: "Installation", level: 2 },
  { id: "theme-api", label: "Theme API", level: 2 },
  { id: "theme-provider", label: "Theme provider", level: 3 },
  { id: "nav-menu", label: "Navigation", level: 2 },
  { id: "table-of-contents", label: "Table of contents", level: 2 },
  { id: "release-notes", label: "Release notes", level: 1 },
];

const { activeId: activeHeadingId } = useTableOfContents({
  items: tocItems,
  offset: 96,
});

const tabContent = computed<Record<string, string>>(() => ({
  overview: "Overview content.",
  api: "API content.",
  status: "Status content.",
}));
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
          <h2>Typography</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-item">
            <p class="demo-label">vf-heading, vf-text</p>
            <div class="demo-stack">
              <VfHeading as="h1" size="xl">Page Title</VfHeading>
              <VfText tone="muted">
                Semantic heading and text primitives for short-form UI content.
              </VfText>
              <VfHeading size="sm">Section Title</VfHeading>
              <VfText size="label">Form Section Label</VfText>
              <VfText as="small" size="caption" tone="muted">
                Caption and metadata text.
              </VfText>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-prose</p>
            <VfProse>
              <h2 id="getting-started">Getting started</h2>
              <p>
                VueForge Core now ships with a small prose layer for guides,
                docs, and other long-form content.
              </p>
              <h3 id="installation">Installation</h3>
              <p>
                Use <code>@codemonster-ru/vueforge-core</code> together with
                generated theme tokens for a consistent foundation.
              </p>
              <ul>
                <li>Semantic typography roles</li>
                <li>Predictable spacing for content</li>
                <li>Reusable heading rhythm</li>
              </ul>
              <blockquote>
                Keep content typography opt-in, not global.
              </blockquote>
            </VfProse>
          </div>

        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Theme</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">vf-theme-provider</p>
            <div class="demo-inline">
              <VfButton size="sm" variant="secondary" @click="setTheme('light')"
                >Light</VfButton
              >
              <VfButton size="sm" variant="secondary" @click="setTheme('dark')"
                >Dark</VfButton
              >
              <VfButton
                size="sm"
                variant="secondary"
                @click="setTheme('system')"
                >System</VfButton
              >
              <VfButton size="sm" @click="toggleTheme">Toggle</VfButton>
            </div>
          </div>
          <div class="demo-example">
            <p class="demo-label">vf-theme-switch</p>
            <div class="demo-inline">
              <VfThemeSwitch />
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Actions and Links</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">vf-button</p>
            <div class="demo-inline">
              <VfButton>Primary</VfButton>
              <VfButton variant="secondary">Secondary</VfButton>
              <VfButton variant="success">Success</VfButton>
              <VfButton variant="info">Info</VfButton>
              <VfButton variant="warn">Warn</VfButton>
              <VfButton variant="help">Help</VfButton>
              <VfButton variant="danger">Danger</VfButton>
              <VfButton variant="contrast">Contrast</VfButton>
              <VfButton variant="ghost">Ghost</VfButton>
              <VfButton disabled>Disabled</VfButton>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-icon-button</p>
            <div class="demo-inline">
              <VfIconButton
                :icon="icons.gear"
                aria-label="Primary settings"
                variant="primary"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Secondary settings"
                variant="secondary"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Success settings"
                variant="success"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Info settings"
                variant="info"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Warn settings"
                variant="warn"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Help settings"
                variant="help"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Danger settings"
                variant="danger"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Contrast settings"
                variant="contrast"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Ghost settings"
                variant="ghost"
              />
              <VfIconButton
                :icon="icons.gear"
                aria-label="Disabled settings"
                disabled
              />
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-link</p>
            <div class="demo-stack">
              <VfLink href="https://example.com" target="_blank" underline>
                External Docs Link
              </VfLink>
              <p class="demo-text">
                Supports regular links, new-tab links, and router-style
                navigation.
              </p>
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
            <VfTooltip
              text="Tooltip is opened by hover and focus."
              placement="bottom"
            >
              <VfButton variant="secondary">Tooltip</VfButton>
            </VfTooltip>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-dropdown</p>
            <VfDropdown v-model:open="dropdownControlled">
              <template #trigger="{ open }">
                <VfButton tabindex="-1" variant="secondary">{{
                  open ? "Close menu" : "Open menu"
                }}</VfButton>
              </template>

              <button class="vf-dropdown__item" role="menuitem">
                Action one
              </button>
              <button class="vf-dropdown__item" role="menuitem">
                Action two
              </button>
            </VfDropdown>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-popover</p>
            <VfPopover v-model:open="popoverOpen">
              <template #trigger="{ open }">
                <VfButton tabindex="-1" variant="secondary">{{
                  open ? "Close popover" : "Open popover"
                }}</VfButton>
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

        <div class="demo-grid demo-grid--three">
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
              <VfAlert tone="info" title="FYI">Info content.</VfAlert>
              <VfAlert tone="warn" title="Warning">Warn content.</VfAlert>
              <VfAlert tone="help" title="Need help?">Help content.</VfAlert>
              <VfAlert tone="danger" title="Error">Danger content.</VfAlert>
              <VfAlert tone="contrast" title="Contrast"
                >Contrast content.</VfAlert
              >
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-badge, vf-tag</p>
            <div class="demo-stack">
              <div class="demo-inline">
                <VfBadge>Neutral</VfBadge>
                <VfBadge tone="primary">Primary</VfBadge>
                <VfBadge tone="success">Success</VfBadge>
                <VfBadge tone="info">Info</VfBadge>
                <VfBadge tone="warn">Warn</VfBadge>
                <VfBadge tone="help">Help</VfBadge>
                <VfBadge tone="danger">Danger</VfBadge>
                <VfBadge tone="contrast">Contrast</VfBadge>
              </div>
              <VfDivider />
              <div class="demo-inline">
                <VfTag>Neutral</VfTag>
                <VfTag tone="primary">Primary</VfTag>
                <VfTag tone="success">Success</VfTag>
                <VfTag tone="info">Info</VfTag>
                <VfTag tone="warn">Warn</VfTag>
                <VfTag tone="help">Help</VfTag>
                <VfTag tone="danger">Danger</VfTag>
                <VfTag tone="contrast">Contrast</VfTag>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Forms</h2>
        </div>

        <div class="demo-grid demo-grid--three">
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
              <VfTextarea
                v-model="textareaValue"
                placeholder="Describe the release..."
              />
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-checkbox, vf-switch, vf-radio</p>
            <div class="demo-stack">
              <VfCheckbox v-model="checkboxValue">Accept terms</VfCheckbox>
              <VfCheckbox invalid>Invalid choice</VfCheckbox>
              <VfSwitch v-model="switchValue">Enable notifications</VfSwitch>
              <VfSwitch v-model="iconSwitchValue">
                <template #thumb="{ checked }">
                  <VueIconify
                    :icon="checked ? icons.check : icons.xmark"
                    size="0.5rem"
                  />
                </template>
                Icon thumb
              </VfSwitch>
              <VfSwitch size="sm">Compact toggle</VfSwitch>
              <VfRadio v-model="radioValue" name="demo-plan" value="free"
                >Free plan</VfRadio
              >
              <VfRadio v-model="radioValue" name="demo-plan" value="pro"
                >Pro plan</VfRadio
              >
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Navigation and Disclosure</h2>
        </div>

        <div class="demo-grid demo-grid--three">
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
              <VfAccordion title="Section One" default-open
                >Accordion content.</VfAccordion
              >
              <VfAccordion title="Section Two">Accordion content.</VfAccordion>
              <VfAccordion title="Section Three"
                >Accordion content.</VfAccordion
              >
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-nav-menu</p>
            <div class="demo-stack">
              <div class="demo-stack">
                <p class="demo-text">Complex</p>
                <VfNavMenu v-model="activeMenuValue" :items="docsMenuItems" />
              </div>

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Simple</p>
                <VfNavMenu
                  v-model="activeSimpleMenuValue"
                  :items="docsMenuSimpleItems"
                />
              </div>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-table-of-contents</p>
            <VfTableOfContents
              label="On This Page"
              aria-label="Page navigation"
              :items="tocItems"
              :active-id="activeHeadingId"
            />
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2>Dialog</h2>
        </div>

        <div class="demo-grid demo-grid--two">
          <div class="demo-example">
            <p class="demo-label">vf-dialog</p>
            <div class="demo-stack">
              <p class="demo-text">
                Modal dialog with focus trap, keyboard support, and semantic
                actions.
              </p>
              <div class="demo-inline">
                <VfButton data-test="open-dialog" @click="dialogOpen = true"
                  >Open Dialog</VfButton
                >
              </div>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-drawer</p>
            <div class="demo-stack">
              <p class="demo-text">
                Side sheet for settings, filters, and contextual workflows.
              </p>
              <div class="demo-inline">
                <VfButton
                  data-test="open-drawer"
                  variant="secondary"
                  @click="drawerOpen = true"
                  >Open Drawer</VfButton
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <VfDialog v-model:open="dialogOpen" title="Dialog">
      <template #default="{ close }">
        <div class="demo-stack">
          <p>Dialog content.</p>
          <div class="demo-inline">
            <VfButton data-autofocus @click="close">Looks good</VfButton>
            <VfButton variant="secondary" @click="dialogOpen = false"
              >Close</VfButton
            >
          </div>
        </div>
      </template>
    </VfDialog>

    <VfDrawer v-model:open="drawerOpen" title="Drawer">
      <template #default="{ close }">
        <div class="demo-stack">
          <p>Drawer content.</p>
          <VfInput placeholder="Search in drawer" />
          <div class="demo-inline">
            <VfButton data-autofocus @click="close">Apply</VfButton>
            <VfButton variant="secondary" @click="drawerOpen = false"
              >Close</VfButton
            >
          </div>
        </div>
      </template>
    </VfDrawer>
  </div>
</template>
