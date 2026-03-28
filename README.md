# @codemonster-ru/vueforge-core

[![npm](https://img.shields.io/npm/v/@codemonster-ru/vueforge-core)](https://www.npmjs.com/package/@codemonster-ru/vueforge-core)
[![downloads](https://img.shields.io/npm/dw/@codemonster-ru/vueforge-core)](https://www.npmjs.com/package/@codemonster-ru/vueforge-core)
[![license](https://img.shields.io/npm/l/@codemonster-ru/vueforge-core)](LICENSE)

Stable foundation layer for the VueForge design system.

## Current scope

Version `1.3.x` focuses on:

- Vue 3 library build with Vite
- TypeScript declarations
- Vitest + Vue Test Utils
- Theme provider and `useTheme`
- CSS design tokens and theme variables
- Built-in default theme preset powered by the shared `@codemonster-ru/vueforge-theme` engine

## Installation

```ts
import { createApp } from "vue";
import VueForgeCore from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForgeCore);
```

## Recommended Theme Setup

VueForge theme setup has two layers that work together:

- token preset configuration through `app.use(VueForgeCore, { theme })`
- theme mode selection through `VfThemeProvider` and `useTheme()`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueForgeCore, {
  defaultThemePreset,
} from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForgeCore, {
  theme: {
    preset: defaultThemePreset,
    extend: {
      colorPrimary: "#ff5a36",
    },
  },
  defaultTheme: "system",
  themeStorageKey: "vf-theme",
});
```

```vue
<script setup lang="ts">
import { VfThemeProvider } from "@codemonster-ru/vueforge-core";
</script>

<template>
  <VfThemeProvider>
    <App />
  </VfThemeProvider>
</template>
```

```ts
import { useTheme } from "@codemonster-ru/vueforge-core";

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

setTheme("dark");
setTheme("light");
setTheme("system");
toggleTheme();
```

## Theme Overrides

```ts
import { createApp } from "vue";
import VueForgeCore, {
  defaultThemePreset,
} from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForgeCore, {
  theme: {
    preset: defaultThemePreset,
    extend: {
      colorPrimary: "#ff5a36",
    },
  },
});
```

`VfThemeProvider` reads theme-mode defaults from the plugin config when its own
props are not set. Provider props still win when you need local overrides.

For the full theme runtime and preset API, see [Theme API](./docs/theme-api.md).

## Theme Architecture

VueForge now has two theme layers:

- `@codemonster-ru/vueforge-theme`
  - neutral theme engine
  - token and preset types
  - preset resolution and CSS variable serialization
  - mode helpers and shared motion tokens
- `@codemonster-ru/vueforge-core`
  - built-in `defaultThemePreset`
  - Vue plugin and `VfThemeProvider`
  - component library and package CSS

This means `vueforge-core` is still the easiest way to consume the default VueForge design language, while higher-level packages can share the same engine without depending on `core` runtime helpers.

## Foundation Usage

Use the full package when you need VueForge components, styles, and theme runtime together.

```ts
import VueForgeCore from "@codemonster-ru/vueforge-core";
```

Use foundation-only entry points when another package, such as `vueforge-layouts`, needs shared responsive or platform helpers without depending on the full UI surface.

```ts
import {
  vfBreakpoints,
  useBreakpoint,
  useBreakpoints,
  useBreakpointValue,
  useScrollLock,
} from "@codemonster-ru/vueforge-core/foundation";
```

Available subpaths:

- `@codemonster-ru/vueforge-core`
- `@codemonster-ru/vueforge-core/styles.css`
- `@codemonster-ru/vueforge-core/tokens.css`
- `@codemonster-ru/vueforge-core/foundation.css`
- `@codemonster-ru/vueforge-core/foundation`
- `@codemonster-ru/vueforge-core/theme`

### Stability

- Stable UI API: components exported from the root package
- Stable theme API: `VueForgeCore`, `createVueForgeCore`, `VfThemeProvider`, `useTheme`, `defaultThemePreset`, `createThemePreset`
- Stable foundation API: breakpoint constants and foundation composables from `./foundation`

For the full foundation contract, see [Foundation API](./docs/foundation-api.md).

## Development

```bash
npm install
npm run build
npm run test
```

## Visual Baseline

- [Visual Baseline 1.0](./docs/visual-baseline.md)
- [Theme API](./docs/theme-api.md)
- [Foundation API](./docs/foundation-api.md)
- [Overlay API](./docs/overlay-api.md)
- [Release Checklist](./docs/release-checklist.md)

## License

[MIT](LICENSE)

## Author

[@KolesnikovKirill](https://github.com/kolesnikovKirill)
