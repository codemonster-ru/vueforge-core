import "../.generated/theme/tokens.css";
import "../.generated/theme/theme.css";
import "./styles/components.css";

export { default, VueForgeCore, createVueForgeCore } from "./plugin";
export { default as VfThemeProvider } from "./providers/VfThemeProvider.vue";
export {
  VfAccordion,
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfCheckbox,
  VfDrawer,
  VfDialog,
  VfDivider,
  VfDropdown,
  VfIconButton,
  VfInput,
  VfLink,
  VfNavMenu,
  VfPanel,
  VfPopover,
  VfRadio,
  VfSwitch,
  VfThemeSwitch,
  VfTag,
  VfTabs,
  VfTextarea,
  VfTooltip,
} from "./components";
export {
  useClickOutside,
  useDisclosure,
  useEscapeKey,
  useFloating,
  useFocusTrap,
  useId,
  useTheme,
} from "./composables";
export {
  vfBreakpoints,
  toMaxWidthQuery,
  toMinWidthQuery,
  useBreakpoint,
  useBreakpoints,
  useBreakpointValue,
  useScrollLock,
} from "./foundation";
export { createThemePreset, defaultThemePreset } from "./theme/public";
export type {
  VfBadgeTone,
  VfButtonVariant,
  VfControlSize,
  VfDialogSize,
  VfDrawerPlacement,
  VfDividerOrientation,
  VfDropdownPlacement,
  VfFeedbackTone,
  VfNavMenuItem,
  VfTabItem,
  VfTooltipPlacement,
  VfLinkTone,
} from "./types/components";
export type {
  VfResolvedTheme,
  VfThemeConfig,
  VfThemeContext,
  VfThemeMode,
  VfThemePreset,
  VfThemePresetOptions,
  VfThemeProviderProps,
  VfThemeTokens,
  VfVueForgeOptions,
} from "./types/theme";
export type {
  UseBreakpointOptions,
  UseScrollLockOptions,
  VfBreakpointName,
  VfBreakpointValue,
  VfBreakpointValues,
} from "./foundation";
