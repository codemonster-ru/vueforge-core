import { afterEach, describe, expect, it } from "vitest";
import {
  applyThemeConfig,
  defaultThemePreset,
  resolveThemeConfig,
} from "@/theme";

describe("theme bridge", () => {
  afterEach(() => {
    document.getElementById("vf-test-theme")?.remove();
  });

  it("uses core defaultThemePreset when preset is omitted", () => {
    const config = resolveThemeConfig({
      extend: {
        colorPrimary: "#ff5a36",
      },
      options: {
        styleId: "vf-test-theme",
      },
    });

    expect(config.preset.name).toBe(defaultThemePreset.name);
    expect(config.preset.light.colorPrimary).toBe("#ff5a36");
    expect(config.preset.light.controlHeightMd).toBe(
      defaultThemePreset.tokens.controlHeightMd,
    );
  });

  it("applies resolved theme variables through the bridge API", () => {
    const style = applyThemeConfig(
      resolveThemeConfig({
        extend: {
          colorPrimary: "#ff5a36",
        },
        options: {
          styleId: "vf-test-theme",
        },
      }),
    );

    expect(style.id).toBe("vf-test-theme");
    expect(style.textContent).toContain("--vf-color-primary: #ff5a36;");
    expect(document.getElementById("vf-test-theme")).toBe(style);
  });
});
