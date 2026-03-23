# VueForge Theme API

This document describes the current theme runtime for `@codemonster-ru/vueforge-core`.

The shared theme engine now lives in `@codemonster-ru/vueforge-theme`, while `vueforge-core` re-exports the stable preset-facing API that component consumers already use.

## Current Model

VueForge now has two theme layers:

- `theme mode`: `light | dark | system`
- `theme preset`: the token set that defines colors, radius, spacing, sizes, and semantic values

The canonical source of theme values is the default preset in [src/theme/default-preset.ts](../src/theme/default-preset.ts).

Static CSS files still exist as the package baseline:

- [src/styles/tokens.css](../src/styles/tokens.css)
- [src/styles/theme.css](../src/styles/theme.css)

These are fallback defaults for consumers who import the package CSS. Runtime theme configuration should be treated as the primary API.

## Installation

```ts
import { createApp } from "vue";
import VueForge from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForge);
```

This installs VueForge with the built-in default preset.

If you want to customize the design tokens, pass a `theme` object explicitly.

## Theme Config

```ts
app.use(VueForge, {
  theme: {
    preset,
    extend,
    light,
    dark,
    options,
  },
});
```

### `preset`

Base theme definition. For now the default workflow is to start from the built-in preset and extend it inside the same app.

```ts
import {
  createThemePreset,
  defaultThemePreset,
} from "@codemonster-ru/vueforge-core";

const customPreset = createThemePreset({
  name: "custom",
  tokens: {
    ...defaultThemePreset.tokens,
    colorPrimary: "#0f766e",
  },
  dark: {
    colorPrimary: "#5eead4",
  },
});
```

### `extend`

Shared overrides applied to both light and dark.

```ts
app.use(VueForge, {
  theme: {
    preset: defaultThemePreset,
    extend: {
      radius: "0.875rem",
      controlHeightMd: "2.375rem",
    },
  },
});
```

### `light`

Overrides only for the light theme.

```ts
app.use(VueForge, {
  theme: {
    preset: defaultThemePreset,
    light: {
      colorSurface: "#ffffff",
      colorSurfaceMuted: "#f8fafc",
    },
  },
});
```

### `dark`

Overrides only for the dark theme.

```ts
app.use(VueForge, {
  theme: {
    preset: defaultThemePreset,
    dark: {
      colorSurface: "#111827",
      colorBorder: "#334155",
    },
  },
});
```

### `options`

Controls how runtime CSS variables are written.

```ts
app.use(VueForge, {
  theme: {
    preset: defaultThemePreset,
    options: {
      prefix: "vf",
      rootSelector: ":root",
      darkModeSelector: ":root[data-vf-theme='dark']",
      attribute: "data-vf-theme",
      storageKey: "vf-theme",
      styleId: "vf-theme-preset",
    },
  },
});
```

## Theme Mode

`VfThemeProvider` and `useTheme()` still manage the mode layer:

```vue
<VfThemeProvider>
  <App />
</VfThemeProvider>
```

```ts
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

`VfThemeProvider` now respects plugin-level `attribute` and `storageKey` if they are not passed directly as props.

## Public Theme API

Stable public theme API for `1.0.0`:

- `VueForge`
- `createVueForge`
- `defaultThemePreset`
- `createThemePreset`
- `VfThemeProvider`
- `useTheme`
- theme types such as `VfThemeConfig`, `VfThemePreset`, and `VfThemeTokens`

Lower-level runtime helpers stay internal for now so we do not freeze too much implementation detail in `1.0.0`.

## Current Boundary

Current behavior:

- presets are defined in TS
- CSS variables are generated at runtime
- the plugin injects a `<style>` tag with light and dark token values

Current scope for `1.0`:

- one built-in default preset inside `@codemonster-ru/vueforge-core`
- runtime theme configuration through the Vue plugin
- no separate theme packages required
- no dedicated Vite plugin required
