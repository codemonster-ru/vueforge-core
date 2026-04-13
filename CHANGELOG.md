# Changelog

## 1.16.0 - 2026-04-13

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- Introduced typography and content utility classes, including:
  - heading scale utilities (`vf-heading`, `vf-heading-h1` … `vf-heading-h6`)
  - text utilities (`vf-text-body`, `vf-text-label`, `vf-text-caption`, tone helpers, and link/code helpers)
  - content utilities (`vf-list-*`, `vf-blockquote`, `vf-prose`, `vf-sr-only`, truncation and wrapping helpers)
- Added dedicated theme tokens for typography/content utilities so heading, link, code, list, blockquote, and prose rhythm can be customized via tokens.
- Expanded demo coverage with a dedicated Typography section and examples for all new utilities.

### Changed

- Switched theme token injection to a single runtime source via plugin application (removed static token/theme CSS side-effect imports from package entry).
- Moved base color-scheme/form-font defaults into component base styles so default behavior remains stable with single-source theme injection.
- Added TypeScript module declaration support for side-effect CSS imports (`declare module "*.css"`).

## 1.15.0 - 2026-04-13

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- `VfDrawer` now supports:
  - `dividers`
  - `drawerHeaderMinHeight` and `drawerFooterMinHeight` theme tokens
- `VfDialog` now supports:
  - `dividers`
  - `dialogDividerColor`, `dialogHeaderMinHeight`, and `dialogFooterMinHeight` theme tokens
- `VfThemeSwitch` button mode now supports `buttonVariant="secondary" | "ghost"`

### Changed

- Aligned `VfDialog` section layout with `VfDrawer` so header, body, and footer manage their own padding instead of relying on container padding
- Updated dialog and drawer dividers to use inset separators aligned with section padding
- Increased the default close-button size in `VfDialog` and `VfDrawer` headers to `md`
- Expanded demo coverage for:
  - dialog and drawer footers
  - dialog and drawer divider presentation
  - `VfThemeSwitch` ghost button variants

## 1.14.0 - 2026-04-11

Minor release for `@codemonster-ru/vueforge-core`.

### Changed

- Applied `border-box` sizing consistently across VueForge component elements and internal parts
- Rebalanced `VfSwitch`, `VfCheckbox`, and `VfRadio` sizing after the sizing-model update to preserve their intended visual scale
- Refined inverse-thumb presentation in `VfSwitch` and `VfThemeSwitch`
- Reduced default `VfAlert` icon size for a calmer text-to-icon balance
- Simplified demo table content so `VfTable` examples use regular text instead of inline code styling

## 1.13.0 - 2026-04-11

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- `VfThemeSwitch` now supports:
  - `variant="button"` alongside the default switch presentation
  - `static` as an explicit typed prop
  - `thumbContrast="auto" | "inverse"` as an explicit typed prop
- `VfSwitch` now supports `thumbContrast="auto" | "inverse"` for controlling thumb contrast independently from track behavior
- Expanded demo coverage for:
  - `VfThemeSwitch` switch, static, inverse-thumb, and button variants
  - `VfThemeSwitch` button sizes
  - `VfSwitch` inverse-thumb static presentation

### Changed

- Updated `@codemonster-ru/vueiconify` to `^1.1.1`
- Refined `VfThemeSwitch` behavior so visual state tracks resolved theme more predictably during theme changes
- Improved `VfSwitch` thumb theming with dedicated inverse-thumb tokens for better contrast tuning across light and dark themes
- Theme-change transitions are now handled more consistently across VueForge components by preventing color-transition interpolation during `vf-theme-transitioning`

## 1.12.0 - 2026-04-11

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- Expanded theme-token coverage so styles can now be customized independently for:
  - form controls
  - navigation and menu components
  - overlays and surfaces
  - feedback and disclosure components
- Expanded demo coverage for form states, including:
  - disabled inputs and selection controls
  - disabled active states for `VfCheckbox`, `VfSwitch`, and `VfRadio`
  - invalid static-state coverage for `VfSwitch`

### Changed

- Refactored form, navigation, surface, overlay, and feedback styling to use component-specific tokens that still default to shared semantic tokens
- Updated `VfSwitch` API so `static` is now a dedicated boolean prop instead of a `variant`
- Refined `VfSwitch` state behavior across:
  - `static`
  - `invalid`
  - `disabled`
  - light and dark themes
- Disabled form states now preserve neutral border colors and rely on muted backgrounds for clearer blocked-state presentation

## 1.11.0 - 2026-04-11

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- `VfAlert` now supports icon customization through:
  - `icon` prop
  - `hideIcon` prop
  - `icon` slot override

### Changed

- Updated `@codemonster-ru/vueiconify` to `^1.1.0`
- Refined `VfAlert` icon semantics and visuals:
  - tone-based default icons now use a more consistent circular icon set
  - warning alerts now use `alertCircle`
  - danger alerts now use `xCircle`
  - decorative icon rings were removed so custom icons render cleanly
- Expanded alert demo coverage for:
  - custom icon usage
  - text-first alerts without an icon

## 1.10.0 - 2026-04-07

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- External-link indicators for leaf items with `target="_blank"` in:
  - `VfMenuBar`
  - `VfNavMenu`
- Expanded demo coverage for external links on:
  - top-level menu-bar items
  - nested menu-bar submenu items
  - nested nav-menu items

### Changed

- Refined navigation spacing and interaction polish across:
  - `VfMenuBar`
  - `VfNavMenu`
  - `VfTableOfContents`
  - `VfDropdown`
  - `VfSelect`
- Active and selected states no longer shift layout by increasing font weight in:
  - `VfMenuBar`
  - `VfNavMenu`
  - `VfDropdown`
  - `VfSelect`
- `VfMenuBar` top-level items are now more compact, and the `pills` variant now uses filled hover and active states on the top level to better match the rest of the navigation system
- `VfTableOfContents` `pills` variant now uses a denser item height and padding balance for a less button-like presentation

## 1.9.0 - 2026-04-06

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- New `variant` support for docs and navigation components:
  - `VfNavMenu`: `default | pills`
  - `VfTableOfContents`: `default | pills`
  - `VfMenuBar`: `default | pills`
  - `VfDropdown`: `default | pills`
- Expanded theme-token coverage for:
  - `VfNavMenu`
  - `VfTableOfContents`
  - `VfMenuBar`
  - dropdown menu-item states

### Changed

- Navigation state semantics are now aligned across:
  - `VfNavMenu`
  - `VfTableOfContents`
  - `VfMenuBar`
  - `VfDropdown`
- `VfNavMenu` now uses a calmer default presentation:
  - tighter vertical rhythm
  - no filled hover or active background in `default`
  - pill-like styling moved into the `pills` variant
- `VfTableOfContents` now mirrors the same variant model as `VfNavMenu`:
  - compact text-first `default`
  - accent background states in `pills`
- `VfMenuBar` variants now separate top-level and submenu behavior:
  - top-level items stay text-first in both variants
  - submenu items gain filled hover and active states in `pills`
- `VfDropdown` can now opt into the same state-color semantics as the navigation system while keeping its overlay layout intact
- Demo coverage was reorganized and expanded for:
  - navigation variants
  - dropdown variants
  - form controls with separate cards per component
  - invalid `VfSelect` and `VfTextarea` examples

## 1.8.0 - 2026-04-04

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- New navigation components:
  - `VfMenuBar`
  - `VfBreadcrumbs`
- New form component:
  - `VfSelect`
- New data-display component:
  - `VfTable`
- New docs-oriented primitives in the demo and navigation flow:
  - smoother `VfTableOfContents` anchor scrolling
  - initial hash handling for table-of-contents pages

### Changed

- VueForge typography is now body-first:
  - application `body` styles define the baseline font family and text rhythm
  - components inherit that baseline and size around it
  - control sizing is now driven by the shared typography scale
- Navigation and selection patterns were unified across:
  - `VfNavMenu`
  - `VfTableOfContents`
  - `VfMenuBar`
  - `VfSelect`
  - `VfDropdown`
- `VfTabs` was redesigned as an underline-style tabs component with:
  - animated active indicator
  - calmer hover and active states
  - improved reload behavior without first-render indicator flicker
- Theme switching and theme-mode persistence were refined:
  - no-flash initial theme setup in `index.html`
  - `VfThemeProvider` now resolves stored/system theme synchronously
  - `VfThemeSwitch` interaction was stabilized during theme changes
- Visual language was simplified and made more consistent across:
  - buttons and links
  - cards and panels
  - dropdown, popover, tooltip, dialog, and drawer surfaces
  - alerts, badges, tags, forms, and navigation states
- Demo was refocused into a utilitarian component test surface instead of a showcase layout
- Updated docs guidance for docs pages to prefer semantic HTML content with:
  - `VfTableOfContents`
  - `useTableOfContents()`

### Removed

- Removed typography primitives from `core`:
  - `VfHeading`
  - `VfText`
  - `VfProse`
- Removed bundled typography/content styling layer tied to those primitives

### Migration Notes

- `VfHeading`, `VfText`, and `VfProse` are no longer exported from `@codemonster-ru/vueforge-core`
- Typography usage now assumes semantic HTML and app-level/body typography as the default baseline
- Docs/content integrations should migrate away from `VfProse` and render long-form content with normal HTML markup
- Consumers relying on the old typography primitive exports should migrate before upgrading
- Updated dependency on `@codemonster-ru/vueforge-theme` to `^1.2.0`

## 1.7.0 - 2026-03-29

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- New typography primitives:
  - `VfHeading`
  - `VfText`
  - `VfProse`
- New typography documentation:

### Changed

- Added a full typography token layer with:
  - base font scale
  - semantic text roles
  - semantic heading roles
- `VfTableOfContents` now works as part of a documented docs/content pattern together with:
  - `VfProse`
  - `useTableOfContents()`
- More components now use semantic typography roles, including:
  - buttons and links
  - inputs and textareas
  - tabs and accordion
  - dropdown and overlay content
  - badges, tags, alerts, cards, and panels
- Component customization is now more token-driven for:
  - switch and radio visuals
  - prose spacing and inline/code blocks
  - button hover treatments
- Token cleanup refined the typography scale further:
  - `headingFontSizeXl` now maps to the shared scale
  - `fontSize3xl` was added
  - legacy line-height aliases remain only as compatibility tokens
- Demo showcase now includes:
  - typography primitives
  - prose/content examples
  - table-of-contents integration with real scrollspy state

## 1.6.0 - 2026-03-29

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- New page navigation component:
  - `VfTableOfContents`
- New scrollspy composable:
  - `useTableOfContents`

### Changed

- `VfTableOfContents` now has its own theme-token namespace while staying visually aligned with `VfNavMenu` by default
- Table of contents navigation was polished for:
  - indentation by level
  - active item styling
  - title sizing and spacing
- Navigation rhythm was refined further across `VfNavMenu` and `VfTableOfContents`
- Core demo now includes:
  - `VfTableOfContents`
  - deeper navigation examples for `VfNavMenu`

## 1.5.0 - 2026-03-29

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- New convenience theme component:
  - `VfThemeSwitch`
- `VfSwitch` now supports a `#thumb` slot with the current `checked` state

### Changed

- `VfThemeSwitch` now uses built-in `sun` / `moon` thumb icons by default
- Core demo now includes:
  - `VfThemeSwitch`
  - `VfSwitch` thumb slot example with icon content
- Theme-switching patterns are easier to reuse across VueForge packages without introducing extra theme widget variants

## 1.4.0 - 2026-03-28

Minor release for `@codemonster-ru/vueforge-core`.

### Changed

- Unified the theme story so plugin setup, theme mode, persistence, and system sync read as one theme system
- `VueForgeCore` is now the canonical plugin export name for `@codemonster-ru/vueforge-core`
- The Vue plugin can now provide theme-mode defaults:
  - `defaultTheme`
  - `themeStorageKey`
  - `themeAttribute`
- `VfThemeProvider` now reads plugin-level theme-mode defaults when its own props are omitted
- README and theme documentation were updated to reflect the new recommended theme setup flow

## 1.3.3 - 2026-03-27

Patch release for `@codemonster-ru/vueforge-core`.

### Changed

- Refined the built-in token scale to use cleaner whole-pixel spacing and sizing steps
- Kept the stricter token rhythm visually aligned across the demo in both light and dark themes
- Finalized the generated theme CSS pipeline around `.generated/theme`

## 1.3.2 - 2026-03-26

Patch release for `@codemonster-ru/vueforge-core`.

### Changed

- Moved generated theme CSS artifacts out of `src/styles` and into `.generated/theme`
- Centralized CSS artifact generation in a shared internal build helper used by Vite and Vitest
- Kept `tokens.css`, `theme.css`, and breakpoint CSS generation aligned across `dev`, `test`, and `build`
- Simplified the source tree by removing generated CSS files from versioned source directories

## 1.3.1 - 2026-03-26

Patch release for `@codemonster-ru/vueforge-core`.

### Changed

- Updated `@codemonster-ru/vueforge-theme` dependency to `^1.1.0`
- Refreshed theme architecture documentation to reflect the split between the neutral theme engine and the built-in core preset
- Stabilized foundation contract tests against formatting-only CSS import changes

## 1.3.0 - 2026-03-23

Minor release for `@codemonster-ru/vueforge-core`.

### Added

- Published shared theme engine dependency:
  - `@codemonster-ru/vueforge-theme`
- Dedicated engine runtime tests now live in the theme package

### Changed

- `vueforge-core` now consumes the published `@codemonster-ru/vueforge-theme` package instead of a local file dependency
- Theme runtime helpers and shared theme types continue to be exposed through `core` bridge APIs for backward-compatible consumption
- `defaultThemePreset` remains in `vueforge-core` as the built-in opinionated design language
- Development and release setup were aligned with the published theme package and refreshed dependency trees

## 1.2.0 - 2026-03-22

Feature release for `@codemonster-ru/vueforge-core`.

### Added

- New navigation component:
  - `VfNavMenu`
- New selection controls:
  - `VfCheckbox`
  - `VfSwitch`
  - `VfRadio`
- Shared overlay teleport contract for:
  - `VfDialog`
  - `VfDrawer`
  - `VfDropdown`
  - `VfPopover`
  - `VfTooltip`
- New overlay API documentation
- New z-index theme tokens for overlay and floating layers
- New shared neutral theme engine package:
  - `@codemonster-ru/vueforge-theme`

### Changed

- Theme runtime helpers, mode helpers, motion tokens, and shared theme types now come from `@codemonster-ru/vueforge-theme`
- `defaultThemePreset` remains in `vueforge-core` as the package's built-in design language
- `VfDrawer` now has a stronger embedding contract for downstream shell/layout use cases:
  - `offsetTop`
  - `bodyPadding`
  - root attr/class/style forwarding
  - drawer radius CSS variables
- `VfNavMenu` now supports:
  - grouped navigation
  - leading icons
  - `single` and `multiple` expand modes
  - automatic compact styling for simple menu trees
- Demo showcase now includes richer navigation comparisons and selection control coverage
- Selection controls and navigation visuals were polished across light and dark themes

## 1.1.1 - 2026-03-15

Patch release for `@codemonster-ru/vueforge-core`.

### Fixed

- Improved TypeScript consumer resolution for `@codemonster-ru/vueforge-core/foundation`
- Foundation and theme subpath exports now point directly at their stable declaration entry files
- Added `typesVersions` mappings for `foundation` and `theme` to make downstream `tsc` and `vue-tsc` resolution more reliable

## 1.1.0 - 2026-03-15

Foundation-focused minor release for `@codemonster-ru/vueforge-core`.

### Added

- Stable foundation layer with:
  - `vfBreakpoints`
  - `toMinWidthQuery`
  - `toMaxWidthQuery`
  - `useBreakpoint`
  - `useBreakpoints`
  - `useBreakpointValue`
  - `useScrollLock`
- New subpath exports:
  - `@codemonster-ru/vueforge-core/foundation`
  - `@codemonster-ru/vueforge-core/theme`
  - `@codemonster-ru/vueforge-core/tokens.css`
  - `@codemonster-ru/vueforge-core/foundation.css`
- Foundation API documentation
- Foundation contract and responsive helper tests
- Breakpoint tokens in both TS and CSS layers

### Changed

- Breakpoints now come from a single canonical source and are synchronized into CSS tokens
- `VfDialog` now uses the shared `useScrollLock` foundation helper
- Package build now includes foundation and theme entry points for downstream packages

### Notes

- This release is intended to make `@codemonster-ru/vueforge-core` a cleaner dependency for `vueforge-layouts`
- Public UI and theme APIs remain compatible with `1.0.0`

## 1.0.0 - 2026-03-15

First stable release of `@codemonster-ru/vueforge-core`.

### Added

- Foundation Vue 3 library setup with Vite, TypeScript, Vitest, and ESLint
- Core primitives:
  - `VfButton`
  - `VfIconButton`
  - `VfLink`
  - `VfCard`
  - `VfPanel`
  - `VfDivider`
  - `VfBadge`
  - `VfTag`
  - `VfAlert`
  - `VfInput`
  - `VfTextarea`
  - `VfTabs`
  - `VfAccordion`
  - `VfDialog`
  - `VfDropdown`
  - `VfTooltip`
  - `VfPopover`
- Theme mode support with `VfThemeProvider` and `useTheme()`
- Runtime theme preset system with:
  - `VueForge` plugin
  - `defaultThemePreset`
  - token overrides via `preset`, `extend`, `light`, `dark`, and `options`
- Overlay positioning through `@codemonster-ru/floater.js`
- Icon integration through `@codemonster-ru/vueiconify`
- Demo showcase page for local visual verification
- Visual baseline documentation
- Theme API documentation

### Notes

- Theme support is runtime-based and ships with one built-in default preset.
- The stable `1.0.0` scope intentionally keeps theme support inside `@codemonster-ru/vueforge-core`.
- Separate theme packages and a dedicated Vite theme plugin are out of scope for this release.
