import type { InjectionKey, Ref } from 'vue'

export type VfThemeMode = 'light' | 'dark' | 'system'
export type VfResolvedTheme = 'light' | 'dark'

export interface VfThemeTokens {
  colorBg: string
  colorSurface: string
  colorSurfaceMuted: string
  colorText: string
  colorMuted: string
  colorBorder: string
  colorPrimary: string
  colorPrimaryContrast: string
  colorPrimarySoft: string
  colorPrimaryBorderSoft: string
  colorFocusRing: string
  colorSuccess: string
  colorDanger: string
  colorSuccessSoft: string
  colorDangerSoft: string
  colorSuccessBorderSoft: string
  colorDangerBorderSoft: string
  radius: string
  radiusControl: string
  radiusControlTight: string
  radiusSurface: string
  radiusOverlay: string
  controlHeightSm: string
  controlHeightMd: string
  controlHeightLg: string
  controlFontSizeSm: string
  controlFontSizeMd: string
  controlFontSizeLg: string
  buttonPaddingSm: string
  buttonPaddingMd: string
  buttonPaddingLg: string
  buttonGap: string
  fieldPaddingSm: string
  fieldPaddingMd: string
  fieldPaddingLg: string
  textareaMinHeightSm: string
  textareaMinHeightMd: string
  textareaMinHeightLg: string
  overlayPadding: string
  overlayGap: string
  overlayViewportPadding: string
  menuPadding: string
  menuGap: string
  menuMinWidth: string
  surfacePadding: string
  surfaceGap: string
  surfacePaddingCompact: string
  surfaceGapCompact: string
  sectionPadding: string
  sectionGap: string
  tabsGap: string
  tabsListGap: string
  tabsListPadding: string
  tabsTabPaddingInline: string
  tabsPanelPaddingTop: string
  badgeHeight: string
  badgePadding: string
  badgeGap: string
  badgeRadius: string
  badgeFontSize: string
  badgeLineHeight: string
  tagHeight: string
  tagPadding: string
  tagFontSize: string
  tagLineHeight: string
  tooltipPadding: string
  tooltipMaxWidth: string
  tooltipFontSize: string
  tooltipLineHeight: string
  dialogWidthSm: string
  dialogWidthMd: string
  dialogWidthLg: string
  dialogMaxHeight: string
  dialogTitleFontSize: string
  dialogHeaderGap: string
  dialogActionsGap: string
  popoverWidth: string
  floatingArrowSize: string
  overlayBackdrop: string
  overlayBackdropBlur: string
  alertPrimarySoft: string
  alertPrimaryBorderSoft: string
  alertContentGap: string
  alertTitleFontSize: string
  cardTitleFontSize: string
  panelTitleFontSize: string
  textLineHeight: string
  headingLineHeight: string
  tabsLineHeight: string
  spacing: string
  shadow: string
}

export interface VfThemePreset {
  name?: string
  tokens: VfThemeTokens
  dark?: Partial<VfThemeTokens>
}

export interface VfResolvedThemePreset {
  name?: string
  light: VfThemeTokens
  dark: VfThemeTokens
}

export interface VfThemePresetOptions {
  prefix?: string
  rootSelector?: string
  darkModeSelector?: string
  attribute?: string
  storageKey?: string
  styleId?: string
}

export interface VfResolvedThemePresetOptions {
  prefix: string
  rootSelector: string
  darkModeSelector: string
  attribute: string
  storageKey: string
  styleId: string
}

export interface VfThemeConfig {
  preset?: VfThemePreset
  extend?: Partial<VfThemeTokens>
  light?: Partial<VfThemeTokens>
  dark?: Partial<VfThemeTokens>
  options?: VfThemePresetOptions
}

export interface VfResolvedThemeConfig {
  preset: VfResolvedThemePreset
  options: VfResolvedThemePresetOptions
}

export interface VfVueForgeOptions {
  theme?: VfThemeConfig
}

export interface VfThemeContext {
  mode: Ref<VfThemeMode>
  resolvedTheme: Ref<VfResolvedTheme>
  setTheme: (value: VfThemeMode) => void
  toggleTheme: () => void
}

export interface VfThemeProviderProps {
  defaultTheme?: VfThemeMode
  storageKey?: string
  attribute?: string
}

export type VfThemeInjectionKey = InjectionKey<VfThemeContext>
