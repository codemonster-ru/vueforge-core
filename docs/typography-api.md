# VueForge Typography API

This document describes the typography layer in `@codemonster-ru/vueforge-core`.

## Current Model

VueForge typography now has three layers:

- typography tokens
- short-form typography primitives
- long-form content typography

This keeps typography opt-in and predictable:

- tokens are the source of truth
- `VfHeading` and `VfText` cover short UI copy
- `VfProse` covers article-style content

## Typography Tokens

The typography token layer lives in:

- [src/theme/default-preset-source.ts](../src/theme/default-preset-source.ts)
- [src/types/theme.ts](../src/types/theme.ts)

### Base Scale

- `fontFamilyBase`
- `fontFamilyHeading`
- `fontFamilyMono`
- `fontWeightRegular`
- `fontWeightMedium`
- `fontWeightSemibold`
- `fontWeightBold`
- `fontSizeXs`
- `fontSizeSm`
- `fontSizeMd`
- `fontSizeLg`
- `fontSizeXl`
- `fontSize2xl`
- `fontSize3xl`
- `lineHeightTight`
- `lineHeightNormal`
- `lineHeightRelaxed`

### Semantic Text Roles

- `textBodyFontSize`
- `textBodyLineHeight`
- `textBodyFontWeight`
- `textCaptionFontSize`
- `textCaptionLineHeight`
- `textCaptionFontWeight`
- `textLabelFontSize`
- `textLabelLineHeight`
- `textLabelFontWeight`

### Semantic Heading Roles

- `headingFontSizeSm`
- `headingFontSizeMd`
- `headingFontSizeLg`
- `headingFontSizeXl`
- `headingFontWeight`
- `headingLineHeight`

Compatibility aliases such as `textLineHeight`, `headingLineHeight`, and `tabsLineHeight` may still exist in the token contract for bridge compatibility, but new component work should prefer the semantic and base typography tokens directly.

## Short-Form UI Typography

Use `VfHeading` and `VfText` for titles and supporting copy outside long-form content.

### `VfHeading`

Use for:

- page titles
- section headers
- card-like or table-adjacent headings

```vue
<VfHeading as="h1" size="xl">Page Title</VfHeading>
<VfHeading as="h2" size="md">Section Title</VfHeading>
```

Props:

- `as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span"`
- `size?: "sm" | "md" | "lg" | "xl"`

### `VfText`

Use for:

- body copy near controls
- labels and helper text
- captions and metadata

```vue
<VfText>Body copy.</VfText>
<VfText size="label">Section Label</VfText>
<VfText as="small" size="caption" tone="muted">Updated 2m ago</VfText>
```

Props:

- `as?: "p" | "span" | "div" | "label" | "small"`
- `size?: "body" | "label" | "caption"`
- `tone?: "default" | "muted"`

## Long-Form Content Typography

Use `VfProse` for:

- documentation pages
- guides
- rich text or markdown output
- article-like sections

```vue
<VfProse>
  <h2>Getting started</h2>
  <p>Intro copy.</p>
  <h3>Installation</h3>
  <p>Install the package.</p>
</VfProse>
```

`VfProse` styles:

- headings
- paragraphs
- lists
- blockquotes
- inline code
- `pre`

It should not be used as a global replacement for all app typography.

## Documentation Navigation Pattern

For docs pages, combine `VfProse` with `VfTableOfContents` and `useTableOfContents()`.

```vue
<script setup lang="ts">
import {
  VfProse,
  VfTableOfContents,
  useTableOfContents,
} from "@codemonster-ru/vueforge-core";

const items = [
  { id: "getting-started", label: "Getting started", level: 1 },
  { id: "installation", label: "Installation", level: 2 },
  { id: "theme-api", label: "Theme API", level: 2 },
];

const { activeId } = useTableOfContents({
  items,
  offset: 96,
});
</script>

<template>
  <VfTableOfContents
    label="On This Page"
    aria-label="Page navigation"
    :items="items"
    :active-id="activeId"
  />

  <VfProse>
    <h2 id="getting-started">Getting started</h2>
    <h3 id="installation">Installation</h3>
    <h3 id="theme-api">Theme API</h3>
  </VfProse>
</template>
```

## Guidance

- Use tokens directly when you need CSS-level control in your own components.
- Use `VfHeading` and `VfText` when you want semantic short-form typography without writing classes.
- Use `VfProse` only where content should behave like an article or documentation block.
- Avoid global styling of all raw HTML headings and paragraphs in application code.
