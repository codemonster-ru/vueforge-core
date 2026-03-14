# Changelog

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
