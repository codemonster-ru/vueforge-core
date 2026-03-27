# Changelog

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
