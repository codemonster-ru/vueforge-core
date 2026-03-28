# VueForge Theme API

This document describes the current theme runtime for `@codemonster-ru/vueforge-core`.

The shared theme engine now lives in `@codemonster-ru/vueforge-theme`, while `vueforge-core` owns the built-in default preset and Vue integration layer.

## Current Model

VueForge now has two theme layers:

- `theme mode`: `light | dark | system`
- `theme preset`: the token set that defines colors, radius, spacing, sizes, and semantic values

In package terms:

- `@codemonster-ru/vueforge-theme` provides:
  - theme types
  - preset resolution helpers
  - CSS variable serialization helpers
  - mode helpers
  - shared motion tokens
- `@codemonster-ru/vueforge-core` provides:
  - `defaultThemePreset`
  - `VueForgeCore` / `createVueForgeCore`
  - `VfThemeProvider`
  - `useTheme()`

The canonical built-in VueForge design language still lives in [src/theme/default-preset.ts](../src/theme/default-preset.ts).

Static CSS files still exist as the package baseline:

- generated token CSS in [.generated/theme](../.generated/theme)
- the narrow baseline entry in [src/styles/foundation.css](../src/styles/foundation.css)

These are fallback defaults for consumers who import the package CSS. Runtime theme configuration should be treated as the primary API.

## Installation

```ts
import { createApp } from "vue";
import VueForgeCore from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForgeCore);
```

This installs VueForge with the built-in default preset.

If you want to customize the design tokens, pass a `theme` object explicitly.

## Recommended Setup

VueForge theme setup is one system with two layers:

- token preset configuration in `app.use(VueForgeCore, { theme })`
- mode selection in `VfThemeProvider` and `useTheme()`

```ts
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
<VfThemeProvider>
  <App />
</VfThemeProvider>
```

## Theme Config

```ts
app.use(VueForgeCore, {
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

Base theme definition. The default workflow in `core` is to start from the built-in preset and extend it inside the same app.

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
app.use(VueForgeCore, {
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
app.use(VueForgeCore, {
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
app.use(VueForgeCore, {
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
app.use(VueForgeCore, {
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

Provider behavior:

- `defaultTheme`, `themeStorageKey`, and `themeAttribute` can be passed through the Vue plugin
- `VfThemeProvider` uses those plugin defaults when its own props are omitted
- provider props still win when you need a local override
- mode state still supports `light`, `dark`, and `system`
- resolved mode still syncs to `localStorage`, `matchMedia`, and `data-vf-theme`

## Public Theme API

Stable public theme API for `1.x`:

- `VueForgeCore`
- `createVueForgeCore`
- `defaultThemePreset`
- `createThemePreset`
- `VfThemeProvider`
- `useTheme`
- theme types such as `VfThemeConfig`, `VfThemePreset`, and `VfThemeTokens`

Lower-level engine helpers live in `@codemonster-ru/vueforge-theme`. `vueforge-core` does not need to re-export every runtime helper just because the engine supports it.

## Current Boundary

Current behavior:

- presets are defined in TS
- CSS variables are generated at runtime
- the plugin injects a `<style>` tag with light and dark token values

Current scope for `core`:

- one built-in default preset inside `@codemonster-ru/vueforge-core`
- runtime theme configuration through the Vue plugin
- shared neutral engine in `@codemonster-ru/vueforge-theme`
- higher-level packages may build on the same engine without making `core` aware of them
