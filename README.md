# @codemonster-ru/vueforge-core

[![npm](https://img.shields.io/npm/v/@codemonster-ru/vueforge-core)](https://www.npmjs.com/package/@codemonster-ru/vueforge-core)
[![downloads](https://img.shields.io/npm/dw/@codemonster-ru/vueforge-core)](https://www.npmjs.com/package/@codemonster-ru/vueforge-core)
[![license](https://img.shields.io/npm/l/@codemonster-ru/vueforge-core)](LICENSE)

Stable foundation layer for the VueForge design system.

## Current scope

Version `1.0.0` focuses on:

- Vue 3 library build with Vite
- TypeScript declarations
- Vitest + Vue Test Utils
- Theme provider and `useTheme`
- CSS design tokens and theme variables

## Installation

```ts
import { createApp } from "vue";
import VueForge from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForge);
```

## Theme Overrides

```ts
import { createApp } from "vue";
import VueForge, { defaultThemePreset } from "@codemonster-ru/vueforge-core";

const app = createApp(App);

app.use(VueForge, {
  theme: {
    preset: defaultThemePreset,
    extend: {
      colorPrimary: "#ff5a36",
    },
  },
});
```

For the full theme runtime and preset API, see [Theme API](./docs/theme-api.md).

## Development

```bash
npm install
npm run build
npm run test
```

## Visual Baseline

- [Visual Baseline 1.0](./docs/visual-baseline.md)
- [Theme API](./docs/theme-api.md)
- [Release Checklist](./docs/release-checklist.md)

## License

[MIT](LICENSE)

## Author

[@KolesnikovKirill](https://github.com/kolesnikovKirill)
