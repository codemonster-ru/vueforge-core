import type { InjectionKey, Ref } from "vue";
import type {
  VfResolvedTheme,
  VfThemeConfig,
  VfThemeMode,
} from "@codemonster-ru/vueforge-theme";

export type {
  VfResolvedTheme,
  VfResolvedThemeConfig,
  VfResolvedThemePreset,
  VfResolvedThemePresetOptions,
  VfThemeConfig,
  VfThemeMode,
  VfThemePreset,
  VfThemePresetOptions,
  VfThemeTokens,
} from "@codemonster-ru/vueforge-theme";

export interface VfVueForgeOptions {
  theme?: VfThemeConfig;
  defaultTheme?: VfThemeMode;
  themeStorageKey?: string;
  themeAttribute?: string;
}

export interface VfThemeContext {
  mode: Ref<VfThemeMode>;
  resolvedTheme: Ref<VfResolvedTheme>;
  setTheme: (value: VfThemeMode) => void;
  toggleTheme: () => void;
}

export interface VfThemeProviderProps {
  defaultTheme?: VfThemeMode;
  storageKey?: string;
  attribute?: string;
}

export type VfThemeInjectionKey = InjectionKey<VfThemeContext>;
