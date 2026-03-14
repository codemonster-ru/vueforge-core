import './styles/tokens.css'
import './styles/theme.css'
import './styles/components.css'

export { default, VueForge, createVueForge } from './plugin'
export { default as VfThemeProvider } from './providers/VfThemeProvider.vue'
export {
  VfAccordion,
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfDialog,
  VfDivider,
  VfDropdown,
  VfIconButton,
  VfInput,
  VfLink,
  VfPanel,
  VfPopover,
  VfTag,
  VfTabs,
  VfTextarea,
  VfTooltip
} from './components'
export { useClickOutside, useDisclosure, useEscapeKey, useFloating, useFocusTrap, useId, useTheme } from './composables'
export { createThemePreset, defaultThemePreset } from './theme'
export type {
  VfBadgeTone,
  VfButtonVariant,
  VfControlSize,
  VfDialogSize,
  VfDividerOrientation,
  VfDropdownPlacement,
  VfFeedbackTone,
  VfTabItem,
  VfTooltipPlacement,
  VfLinkTone
} from './types/components'
export type {
  VfResolvedTheme,
  VfThemeConfig,
  VfThemeContext,
  VfThemeMode,
  VfThemePreset,
  VfThemePresetOptions,
  VfThemeProviderProps,
  VfThemeTokens,
  VfVueForgeOptions
} from './types/theme'
