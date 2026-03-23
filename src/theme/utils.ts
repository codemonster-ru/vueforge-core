export {
  createThemePreset,
  resolveThemePresetOptions,
  themePresetToCssText,
  themeTokensToCssVars,
} from "@codemonster-ru/vueforge-theme";
import {
  applyThemeConfig as applyThemeConfigBase,
  resolveThemeConfig as resolveThemeConfigBase,
  resolveThemePreset as resolveThemePresetBase,
} from "@codemonster-ru/vueforge-theme";
import type {
  VfResolvedThemeConfig,
  VfResolvedThemePreset,
  VfThemeConfig,
} from "@/types/theme";
import { defaultThemePreset } from "./default-preset";

export function resolveThemePreset(
  config: VfThemeConfig = {},
): VfResolvedThemePreset {
  return resolveThemePresetBase({
    ...config,
    preset: config.preset ?? defaultThemePreset,
  });
}

export function resolveThemeConfig(
  config: VfThemeConfig = {},
): VfResolvedThemeConfig {
  return resolveThemeConfigBase({
    ...config,
    preset: config.preset ?? defaultThemePreset,
  });
}

export function applyThemeConfig(
  config: VfResolvedThemeConfig,
  targetDocument?: Document,
) {
  return applyThemeConfigBase(config, targetDocument);
}
