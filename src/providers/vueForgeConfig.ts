import type { InjectionKey } from "vue";
import type { VfResolvedThemeConfig } from "@/types/theme";

export interface VfVueForgeRuntimeConfig {
  theme: VfResolvedThemeConfig;
}

export const vueForgeConfigKey: InjectionKey<VfVueForgeRuntimeConfig> =
  Symbol("VueForgeConfig");
