<script setup lang="ts">
import { computed, ref } from "vue";
import { VueIconify, icons } from "@codemonster-ru/vueiconify";
import {
  VfAccordion,
  VfAlert,
  VfBadge,
  VfBreadcrumbs,
  VfButton,
  VfCard,
  VfCheckbox,
  VfDrawer,
  VfDialog,
  VfDivider,
  VfDropdown,
  VfIconButton,
  VfInput,
  VfLink,
  VfMenuBar,
  VfNavMenu,
  VfPanel,
  VfPopover,
  VfRadio,
  VfSelect,
  VfSwitch,
  VfTable,
  VfTableOfContents,
  VfThemeSwitch,
  VfTag,
  VfTabs,
  VfTextarea,
  VfTooltip,
  useTableOfContents,
  useTheme,
} from "@/index";
import type {
  VfBreadcrumbItem,
  VfNavMenuItem,
  VfTableOfContentsItem,
} from "@/index";

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

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
const selectValue = ref("");
const activeTab = ref("overview");
const activeAccordion = ref<string | null>("section-one");
const activeMenuValue = ref("");
const activeSimpleMenuValue = ref("");

const releaseTabs = [
  { value: "overview", label: "Overview" },
  { value: "api", label: "API" },
  { value: "status", label: "Status" },
];

const selectOptions = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
  { value: "team", label: "Team" },
  { value: "business", label: "Business" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
  { value: "plus", label: "Plus" },
  { value: "advanced", label: "Advanced" },
  { value: "premium", label: "Premium" },
  { value: "ultimate", label: "Ultimate" },
  { value: "startup", label: "Startup" },
  { value: "agency", label: "Agency" },
  { value: "platform", label: "Platform" },
  { value: "custom", label: "Custom" },
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
          {
            value: "storybook-nav",
            label: "Storybook",
            href: "https://storybook.js.org",
            target: "_blank",
          },
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

const topMenuItems: VfNavMenuItem[] = [
  {
    value: "products",
    label: "Products",
    children: [
      {
        value: "foundations",
        label: "Foundations",
        children: [
          { value: "tokens", label: "Tokens" },
          { value: "theme", label: "Theme" },
          { value: "motion", label: "Motion" },
        ],
      },
      {
        value: "components-suite",
        label: "Components",
        children: [
          { value: "actions", label: "Actions" },
          { value: "forms-menu", label: "Forms" },
          { value: "navigation-menu", label: "Navigation" },
          {
            value: "storybook-menu",
            label: "Storybook",
            href: "https://storybook.js.org",
            target: "_blank",
          },
        ],
      },
    ],
  },
  {
    value: "docs-top",
    label: "Docs",
    children: [
      { value: "getting-started-top", label: "Getting Started" },
      { value: "api-top", label: "API Reference" },
      {
        value: "guides-top",
        label: "Guides",
        children: [
          { value: "theming-guide", label: "Theming" },
          { value: "composition-guide", label: "Composition" },
        ],
      },
    ],
  },
  { value: "pricing", label: "Pricing" },
  {
    value: "github",
    label: "GitHub",
    href: "https://github.com/codemonster-ru",
    target: "_blank",
  },
  { value: "about", label: "About" },
];

const breadcrumbItems: VfBreadcrumbItem[] = [
  { label: "Docs", href: "#demo-navigation" },
  { label: "Components", href: "#demo-navigation" },
  { label: "Navigation", href: "#demo-navigation" },
  { label: "Menu Bar", current: true },
];

const tocItems: VfTableOfContentsItem[] = [
  { id: "demo-theme", label: "Theme", level: 1 },
  { id: "demo-typography", label: "Typography", level: 1 },
  { id: "demo-actions", label: "Actions and Links", level: 1 },
  { id: "demo-overlay", label: "Overlay", level: 1 },
  { id: "demo-surfaces", label: "Surface Components", level: 1 },
  { id: "demo-feedback", label: "Feedback", level: 1 },
  { id: "demo-forms", label: "Forms", level: 1 },
  { id: "demo-navigation", label: "Navigation and Disclosure", level: 1 },
  { id: "demo-dialog", label: "Dialog", level: 1 },
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
      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-theme">Theme</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">vf-theme-provider</p>
            <div class="demo-stack">
              <div class="demo-inline">
                <VfButton
                  size="sm"
                  variant="secondary"
                  @click="setTheme('light')"
                  >Light</VfButton
                >
                <VfButton
                  size="sm"
                  variant="secondary"
                  @click="setTheme('dark')"
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
              <div class="demo-inline">
                <VfTag tone="primary">mode: {{ theme }}</VfTag>
                <VfTag tone="contrast">resolved: {{ resolvedTheme }}</VfTag>
              </div>
            </div>
          </div>
          <div class="demo-example">
            <p class="demo-label">vf-theme-switch</p>
            <div class="demo-stack">
              <div class="demo-inline">
                <VfThemeSwitch />
                <VfThemeSwitch static />
                <VfThemeSwitch static thumb-contrast="inverse" />
                <VfThemeSwitch variant="button" />
                <VfThemeSwitch variant="button" button-variant="ghost" />
                <VfThemeSwitch variant="button" size="sm" />
                <VfThemeSwitch variant="button">
                  {{ resolvedTheme === "dark" ? "Dark" : "Light" }}
                </VfThemeSwitch>
                <VfThemeSwitch variant="button" button-variant="ghost">
                  {{ resolvedTheme === "dark" ? "Dark" : "Light" }}
                </VfThemeSwitch>
                <VfThemeSwitch variant="button" size="lg">
                  {{ resolvedTheme === "dark" ? "Dark" : "Light" }}
                </VfThemeSwitch>
              </div>
              <p class="demo-text">
                The switch reflects the resolved theme and turns system mode
                into an explicit light or dark choice after interaction.
              </p>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">Theme utilities</p>
            <p class="demo-text">
              Use the controls above to switch theme mode and verify component
              contrast in light, dark, and system states.
            </p>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-typography">Typography</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-example">
            <p class="demo-label">h1-h6 headings</p>
            <div class="demo-stack">
              <h1 class="vf-heading vf-heading-h1">Heading H1</h1>
              <h2 class="vf-heading vf-heading-h2">Heading H2</h2>
              <h3 class="vf-heading vf-heading-h3">Heading H3</h3>
              <h4 class="vf-heading vf-heading-h4">Heading H4</h4>
              <h5 class="vf-heading vf-heading-h5">Heading H5</h5>
              <h6 class="vf-heading vf-heading-h6">Heading H6</h6>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">text utilities</p>
            <div class="demo-stack">
              <p class="vf-text-body demo-m-0">Body text utility</p>
              <p class="vf-text-label demo-m-0">Label text utility</p>
              <p class="vf-text-caption demo-m-0">Caption text utility</p>
              <p class="vf-text-body vf-text-muted demo-m-0">
                Muted body text utility
              </p>
              <p class="vf-text-body vf-text-primary demo-m-0">
                Primary body text utility
              </p>
              <p class="vf-text-body vf-text-success demo-m-0">
                Success body text utility
              </p>
              <p class="vf-text-body vf-text-info demo-m-0">
                Info body text utility
              </p>
              <p class="vf-text-body vf-text-warn demo-m-0">
                Warn body text utility
              </p>
              <p class="vf-text-body vf-text-help demo-m-0">
                Help body text utility
              </p>
              <p class="vf-text-body vf-text-danger demo-m-0">
                Danger body text utility
              </p>
              <p class="vf-text-body vf-text-contrast demo-m-0">
                Contrast body text utility
              </p>
              <p class="vf-text-body demo-m-0">
                Link utility:
                <a href="#demo-typography" class="vf-text-link"
                  >Open typography section</a
                >
              </p>
              <p class="vf-text-body demo-m-0">
                Link utility muted:
                <a
                  href="#demo-typography"
                  class="vf-text-link vf-text-link--muted"
                  >Open typography section</a
                >
              </p>
              <p class="vf-text-body demo-m-0">
                Link utility underline hover:
                <a
                  href="#demo-typography"
                  class="vf-text-link vf-text-link--underline-hover"
                  >Open typography section</a
                >
              </p>
              <p class="vf-text-body demo-m-0">
                Link utility underline always:
                <a
                  href="#demo-typography"
                  class="vf-text-link vf-text-link--underline-always"
                  >Open typography section</a
                >
              </p>
              <p class="vf-text-body demo-m-0">
                Inline code utility:
                <code class="vf-text-code">npm run check</code>
              </p>
              <p class="vf-text-body demo-m-0">
                Mono text utility:
                <span class="vf-text-mono">theme.tokens.headingH1FontSize</span>
              </p>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">content utilities</p>
            <div class="demo-stack">
              <ul class="vf-list-disc">
                <li>Disc list item one</li>
                <li>Disc list item two</li>
              </ul>
              <ol class="vf-list-decimal">
                <li>Decimal list item one</li>
                <li>Decimal list item two</li>
              </ol>
              <ul class="vf-list-reset demo-inline">
                <li><span class="vf-text-code">reset</span></li>
                <li><span class="vf-text-code">list</span></li>
                <li><span class="vf-text-code">utility</span></li>
              </ul>
              <blockquote class="vf-blockquote">
                Utility-driven content rhythm keeps docs and UI copy consistent.
              </blockquote>
              <p class="vf-text-body vf-text-truncate demo-m-0 demo-max-w-16">
                This line demonstrates truncation behavior for long text content
                in constrained UI areas.
              </p>
              <p class="vf-text-body vf-text-nowrap demo-m-0">
                No-wrap utility keeps short status labels on a single line.
              </p>
              <p class="vf-text-body vf-text-balance demo-m-0 demo-max-w-20">
                Balanced wrapping improves heading and summary rhythm in narrow
                content columns.
              </p>
              <p class="vf-text-body demo-m-0">
                <span class="vf-sr-only">Utility text for screen readers.</span>
                <span aria-hidden="true">SR-only utility is active.</span>
              </p>
            </div>
          </div>

          <div class="demo-example">
            <p class="demo-label">vf-prose</p>
            <article class="vf-prose">
              <h3>Prose Heading</h3>
              <p>
                Prose container keeps content rhythm consistent for
                documentation and text-heavy screens.
              </p>
              <p>
                Use <code>vf-prose</code> when regular semantic HTML should look
                polished by default.
              </p>
              <ul>
                <li>Aligned heading scale</li>
                <li>Stable paragraph rhythm</li>
                <li>Styled links and inline code</li>
              </ul>
              <blockquote>
                Typography should feel intentional without manual per-element
                styling.
              </blockquote>
              <p>
                Read more in
                <a href="#demo-typography">typography section</a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-actions">Actions and Links</h2>
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
              <VfLink href="https://example.com">Quiet Product Link</VfLink>
              <VfLink href="https://example.com" underline="hover">
                Hover Underline Link
              </VfLink>
              <VfLink
                href="https://example.com"
                target="_blank"
                underline="always"
              >
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
          <h2 id="demo-overlay">Overlay</h2>
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
            <div class="demo-stack">
              <div class="demo-stack">
                <p class="demo-text">Default</p>
                <VfDropdown v-model:open="dropdownControlled">
                  <template #trigger="{ open }">
                    <VfButton tabindex="-1" variant="secondary">{{
                      open ? "Close menu" : "Open menu"
                    }}</VfButton>
                  </template>

                  <button class="vf-dropdown__item" role="menuitem">
                    Action one
                  </button>
                  <button
                    class="vf-dropdown__item vf-dropdown__item--active"
                    role="menuitem"
                  >
                    Action two
                  </button>
                </VfDropdown>
              </div>

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Pills</p>
                <VfDropdown variant="pills">
                  <template #trigger="{ open }">
                    <VfButton tabindex="-1" variant="secondary">{{
                      open ? "Close menu" : "Open menu"
                    }}</VfButton>
                  </template>

                  <button class="vf-dropdown__item" role="menuitem">
                    Action one
                  </button>
                  <button
                    class="vf-dropdown__item vf-dropdown__item--active"
                    role="menuitem"
                  >
                    Action two
                  </button>
                </VfDropdown>
              </div>
            </div>
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
          <h2 id="demo-surfaces">Surface Components</h2>
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

          <div class="demo-item">
            <p class="demo-label">vf-divider</p>
            <div class="demo-stack">
              <VfDivider />
              <div class="demo-inline">
                <span class="demo-text">Start</span>
                <VfDivider orientation="vertical" />
                <span class="demo-text">Middle</span>
                <VfDivider orientation="vertical" />
                <span class="demo-text">End</span>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-table</p>
            <VfTable>
              <template #header>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </template>

              <tr>
                <td>size</td>
                <td>"sm" | "md" | "lg"</td>
                <td>"md"</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>invalid</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>undefined</td>
              </tr>
            </VfTable>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-table striped</p>
            <VfTable striped>
              <template #header>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </template>

              <tr>
                <td>size</td>
                <td>"sm" | "md" | "lg"</td>
                <td>"md"</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>invalid</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>undefined</td>
              </tr>
            </VfTable>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-feedback">Feedback</h2>
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
              <VfDivider />
              <VfAlert title="Custom icon" icon="gear"
                >Custom icon content.</VfAlert
              >
              <VfAlert title="Without icon" hide-icon
                >Text-first alert content.</VfAlert
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
          <h2 id="demo-forms">Forms</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-item">
            <p class="demo-label">vf-input</p>
            <div class="demo-stack">
              <VfInput v-model="inputValue" placeholder="Project name" />
              <VfInput invalid placeholder="Invalid input" />
              <VfInput disabled placeholder="Disabled input" />
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-textarea</p>
            <div class="demo-stack">
              <VfTextarea
                v-model="textareaValue"
                placeholder="Describe the release..."
              />
              <VfTextarea invalid placeholder="Invalid textarea" />
              <VfTextarea disabled placeholder="Disabled textarea" />
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-select</p>
            <div class="demo-stack">
              <VfSelect
                v-model="selectValue"
                placeholder="Choose a plan"
                :options="selectOptions"
              />
              <VfSelect
                invalid
                placeholder="Invalid select"
                :options="selectOptions"
              />
              <VfSelect
                disabled
                placeholder="Disabled select"
                :options="selectOptions"
              />
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-checkbox</p>
            <div class="demo-stack">
              <VfCheckbox v-model="checkboxValue">Accept terms</VfCheckbox>
              <VfCheckbox invalid>Invalid choice</VfCheckbox>
              <VfCheckbox :model-value="true" disabled>
                Disabled active choice
              </VfCheckbox>
              <VfCheckbox disabled>Disabled choice</VfCheckbox>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-switch</p>
            <div class="demo-stack">
              <VfSwitch v-model="switchValue">Enable notifications</VfSwitch>
              <VfSwitch static>Static track</VfSwitch>
              <VfSwitch static thumb-contrast="inverse">
                Static track inverse thumb
              </VfSwitch>
              <VfSwitch v-model="iconSwitchValue">
                <template #thumb="{ checked }">
                  <VueIconify :icon="checked ? icons.check : icons.xmark" />
                </template>
                Icon thumb
              </VfSwitch>
              <VfSwitch size="sm">Compact toggle</VfSwitch>
              <VfSwitch static invalid>Invalid static toggle</VfSwitch>
              <VfSwitch invalid>Invalid toggle</VfSwitch>
              <VfSwitch :model-value="true" disabled>
                Disabled active toggle
              </VfSwitch>
              <VfSwitch disabled>Disabled toggle</VfSwitch>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-radio</p>
            <div class="demo-stack">
              <VfRadio v-model="radioValue" name="demo-plan" value="free"
                >Free plan</VfRadio
              >
              <VfRadio v-model="radioValue" name="demo-plan" value="pro"
                >Pro plan</VfRadio
              >
              <VfRadio name="demo-invalid-plan" value="enterprise" invalid
                >Invalid option</VfRadio
              >
              <VfRadio
                :model-value="'team'"
                name="demo-disabled-active-plan"
                value="team"
                disabled
              >
                Disabled active option
              </VfRadio>
              <VfRadio name="demo-disabled-plan" value="team" disabled
                >Disabled option</VfRadio
              >
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-navigation">Navigation and Disclosure</h2>
        </div>

        <div class="demo-grid demo-grid--three">
          <div class="demo-item">
            <p class="demo-label">vf-breadcrumbs</p>
            <VfBreadcrumbs :items="breadcrumbItems" />
          </div>

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
              <VfAccordion
                title="Section One"
                :open="activeAccordion === 'section-one'"
                @update:open="
                  (open) => {
                    activeAccordion = open ? 'section-one' : null;
                  }
                "
                >Accordion content.</VfAccordion
              >
              <VfAccordion
                title="Section Two"
                :open="activeAccordion === 'section-two'"
                @update:open="
                  (open) => {
                    activeAccordion = open ? 'section-two' : null;
                  }
                "
                >Accordion content.</VfAccordion
              >
              <VfAccordion
                title="Section Three"
                :open="activeAccordion === 'section-three'"
                @update:open="
                  (open) => {
                    activeAccordion = open ? 'section-three' : null;
                  }
                "
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

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Complex Pills</p>
                <VfNavMenu
                  v-model="activeMenuValue"
                  :items="docsMenuItems"
                  variant="pills"
                />
              </div>

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Simple Pills</p>
                <VfNavMenu
                  v-model="activeSimpleMenuValue"
                  :items="docsMenuSimpleItems"
                  variant="pills"
                />
              </div>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-menu-bar</p>
            <div class="demo-stack">
              <div class="demo-stack">
                <p class="demo-text">Default</p>
                <VfMenuBar :items="topMenuItems" />
              </div>

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Pills</p>
                <VfMenuBar :items="topMenuItems" variant="pills" />
              </div>
            </div>
          </div>

          <div class="demo-item">
            <p class="demo-label">vf-table-of-contents</p>
            <div class="demo-stack">
              <div class="demo-stack">
                <p class="demo-text">Default</p>
                <VfTableOfContents
                  aria-label="Page navigation"
                  smooth
                  :scroll-offset="32"
                  :items="tocItems"
                  :active-id="activeHeadingId"
                />
              </div>

              <VfDivider />

              <div class="demo-stack">
                <p class="demo-text">Pills</p>
                <VfTableOfContents
                  aria-label="Page navigation pills"
                  smooth
                  :scroll-offset="32"
                  :items="tocItems"
                  :active-id="activeHeadingId"
                  variant="pills"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-block">
        <div class="demo-block__header">
          <h2 id="demo-dialog">Dialog</h2>
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

    <VfDialog v-model:open="dialogOpen" title="Dialog" dividers>
      <template #default>
        <div class="demo-stack">
          <p>Dialog content.</p>
        </div>
      </template>
      <template #footer="{ close }">
        <div class="demo-inline">
          <VfButton data-autofocus @click="close">Looks good</VfButton>
          <VfButton variant="secondary" @click="dialogOpen = false"
            >Close</VfButton
          >
        </div>
      </template>
    </VfDialog>

    <VfDrawer v-model:open="drawerOpen" title="Drawer" dividers>
      <template #default>
        <div class="demo-stack">
          <p class="demo-mt-0">Drawer content.</p>
          <VfInput placeholder="Search in drawer" />
        </div>
      </template>
      <template #footer="{ close }">
        <div class="demo-inline">
          <VfButton data-autofocus @click="close">Apply</VfButton>
          <VfButton variant="secondary" @click="drawerOpen = false"
            >Close</VfButton
          >
        </div>
      </template>
    </VfDrawer>
  </div>
</template>
