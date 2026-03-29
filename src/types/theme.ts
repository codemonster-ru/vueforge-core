import type { InjectionKey, Ref } from "vue";
import type {
  VfResolvedTheme as BaseVfResolvedTheme,
  VfResolvedThemeConfig as BaseVfResolvedThemeConfig,
  VfResolvedThemePreset as BaseVfResolvedThemePreset,
  VfResolvedThemePresetOptions,
  VfThemeConfig as BaseVfThemeConfig,
  VfThemeMode as BaseVfThemeMode,
  VfThemePreset as BaseVfThemePreset,
  VfThemePresetOptions,
  VfThemeTokens as BaseVfThemeTokens,
} from "@codemonster-ru/vueforge-theme";

export type VfResolvedTheme = BaseVfResolvedTheme;
export type VfThemeMode = BaseVfThemeMode;
export type { VfResolvedThemePresetOptions, VfThemePresetOptions };

export interface VfThemeTokens extends BaseVfThemeTokens {
  fontFamilyBase: string;
  fontFamilyHeading: string;
  fontFamilyMono: string;
  fontWeightRegular: string;
  fontWeightMedium: string;
  fontWeightSemibold: string;
  fontWeightBold: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSize2xl: string;
  fontSize3xl: string;
  lineHeightTight: string;
  lineHeightNormal: string;
  lineHeightRelaxed: string;
  textBodyFontSize: string;
  textBodyLineHeight: string;
  textBodyFontWeight: string;
  textCaptionFontSize: string;
  textCaptionLineHeight: string;
  textCaptionFontWeight: string;
  textLabelFontSize: string;
  textLabelLineHeight: string;
  textLabelFontWeight: string;
  headingFontSizeSm: string;
  headingFontSizeMd: string;
  headingFontSizeLg: string;
  headingFontSizeXl: string;
  headingFontWeight: string;
  buttonSecondaryHoverBackground: string;
  buttonSecondaryHoverBorderColor: string;
  buttonGhostHoverBackground: string;
  buttonGhostHoverBorderColor: string;
  buttonPrimaryHoverFilter: string;
  buttonSuccessHoverFilter: string;
  buttonInfoHoverFilter: string;
  buttonWarnHoverFilter: string;
  buttonHelpHoverFilter: string;
  buttonDangerHoverFilter: string;
  buttonContrastHoverFilter: string;
  radioControlBackground: string;
  radioHoverBorderColor: string;
  switchTrackBackground: string;
  switchTrackHoverBackground: string;
  switchTrackCheckedBackground: string;
  switchTrackCheckedHoverBackground: string;
  switchThumbBackground: string;
  switchThumbBorderColor: string;
  switchThumbShadow: string;
  switchThumbColor: string;
  switchThumbIconSize: string;
  switchThumbCheckedBackground: string;
  switchThumbCheckedBorderColor: string;
  switchThumbCheckedShadow: string;
  proseHeadingMargin: string;
  proseHeadingGap: string;
  proseBlockSpacing: string;
  proseListPaddingInlineStart: string;
  proseListItemSpacing: string;
  proseLinkHoverColor: string;
  proseBlockquotePaddingInlineStart: string;
  proseBlockquoteBorderWidth: string;
  proseInlineCodeFontSize: string;
  proseInlineCodePadding: string;
  proseCodeBlockPadding: string;
  proseHrMargin: string;
}

export interface VfThemePreset extends Omit<
  BaseVfThemePreset,
  "tokens" | "dark"
> {
  tokens: VfThemeTokens;
  dark?: Partial<VfThemeTokens>;
}

export interface VfResolvedThemePreset extends Omit<
  BaseVfResolvedThemePreset,
  "light" | "dark"
> {
  light: VfThemeTokens;
  dark: VfThemeTokens;
}

export interface VfThemeConfig extends Omit<
  BaseVfThemeConfig,
  "preset" | "extend" | "light" | "dark"
> {
  preset?: VfThemePreset;
  extend?: Partial<VfThemeTokens>;
  light?: Partial<VfThemeTokens>;
  dark?: Partial<VfThemeTokens>;
}

export interface VfResolvedThemeConfig extends Omit<
  BaseVfResolvedThemeConfig,
  "preset"
> {
  preset: VfResolvedThemePreset;
}

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
