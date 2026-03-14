export type VfButtonVariant = 'primary' | 'secondary' | 'ghost'
export type VfControlSize = 'sm' | 'md' | 'lg'
export type VfLinkTone = 'default' | 'muted'
export type VfBadgeTone = 'neutral' | 'primary' | 'success' | 'danger'
export type VfFeedbackTone = 'neutral' | 'primary' | 'success' | 'danger'
export type VfDividerOrientation = 'horizontal' | 'vertical'
export type VfDialogSize = 'sm' | 'md' | 'lg'
export type VfDropdownPlacement = 'bottom-start' | 'bottom-end'
export type VfTooltipPlacement = 'top' | 'bottom'

export interface VfTabItem {
  value: string
  label: string
  disabled?: boolean
}
