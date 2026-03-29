/* eslint-disable vue/one-component-per-file */
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick } from "vue";
import {
  VfAlert,
  VfBadge,
  VfButton,
  VfCard,
  VfCheckbox,
  VfDivider,
  VfIconButton,
  VfInput,
  VfLink,
  VfPanel,
  VfRadio,
  VfSwitch,
  VfThemeSwitch,
  VfTag,
  VfTextarea,
} from "@/components";
import VfThemeProvider from "@/providers/VfThemeProvider.vue";

const SwitchThumbProbe = defineComponent({
  components: {
    VfSwitch,
  },
  data() {
    return {
      value: false,
    };
  },
  template: `
    <VfSwitch v-model="value">
      <template #thumb="{ checked }">
        {{ checked ? 'on' : 'off' }}
      </template>
    </VfSwitch>
  `,
});

const ThemeSwitchProbe = defineComponent({
  components: {
    VfThemeProvider,
    VfThemeSwitch,
  },
  template: `
    <VfThemeProvider default-theme="system">
      <VfThemeSwitch />
    </VfThemeProvider>
  `,
});

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-vf-theme");
});

describe("core primitives", () => {
  it("renders button variants and respects native attributes", async () => {
    const wrapper = mount(VfButton, {
      props: {
        variant: "danger",
        size: "sm",
        disabled: true,
      },
      slots: {
        default: "Save",
      },
    });

    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("vf-button--danger");
    expect(wrapper.classes()).toContain("vf-button--sm");
    expect(wrapper.text()).toBe("Save");
  });

  it("adds safe rel defaults for external links", () => {
    const wrapper = mount(VfLink, {
      props: {
        href: "https://example.com",
        target: "_blank",
        underline: true,
      },
      slots: {
        default: "Docs",
      },
    });

    expect(wrapper.attributes("rel")).toBe("noopener noreferrer");
    expect(wrapper.classes()).toContain("vf-link--underline");
  });

  it("supports router-style links via to prop", () => {
    const wrapper = mount(VfLink, {
      props: {
        to: "/docs",
        underline: true,
      },
      slots: {
        default: "Docs",
      },
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: '<a :data-to="to" :class="$attrs.class"><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.attributes("data-to")).toBe("/docs");
    expect(wrapper.classes()).toContain("vf-link--underline");
  });

  it("renders card title and slots", () => {
    const wrapper = mount(VfCard, {
      props: {
        title: "Overview",
      },
      slots: {
        default: "Body copy",
        footer: "Footer",
      },
    });

    expect(wrapper.find(".vf-card__title").text()).toBe("Overview");
    expect(wrapper.text()).toContain("Body copy");
    expect(wrapper.text()).toContain("Footer");
  });

  it("emits input updates and invalid state", async () => {
    const wrapper = mount(VfInput, {
      props: {
        modelValue: "hello",
        invalid: true,
        placeholder: "Type here",
      },
    });

    expect(wrapper.attributes("aria-invalid")).toBe("true");
    expect(wrapper.attributes("placeholder")).toBe("Type here");

    await wrapper.setValue("world");

    expect(wrapper.emitted("update:modelValue")).toEqual([["world"]]);
  });

  it("emits textarea updates and supports size modifiers", async () => {
    const wrapper = mount(VfTextarea, {
      props: {
        modelValue: "draft",
        size: "lg",
      },
    });

    expect(wrapper.classes()).toContain("vf-textarea--lg");

    await wrapper.setValue("published");

    expect(wrapper.emitted("update:modelValue")).toEqual([["published"]]);
  });

  it("emits checkbox and switch updates", async () => {
    const checkbox = mount(VfCheckbox, {
      props: {
        modelValue: true,
        invalid: true,
      },
      slots: {
        default: "Accept terms",
      },
    });

    const switchControl = mount(VfSwitch, {
      props: {
        modelValue: false,
        size: "lg",
      },
      slots: {
        default: "Enable notifications",
      },
    });

    expect(checkbox.classes()).toContain("vf-checkbox--checked");
    expect(checkbox.classes()).toContain("vf-checkbox--invalid");
    expect(switchControl.classes()).toContain("vf-switch--lg");

    await checkbox.get("input").setValue(false);
    await switchControl.get("input").setValue(true);

    expect(checkbox.emitted("update:modelValue")).toEqual([[false]]);
    expect(switchControl.emitted("update:modelValue")).toEqual([[true]]);
  });

  it("supports thumb slot content with checked state", async () => {
    const wrapper = mount(SwitchThumbProbe);

    expect(wrapper.find(".vf-switch__thumb").text()).toBe("off");

    await wrapper.get("input").setValue(true);

    expect(wrapper.find(".vf-switch__thumb").text()).toBe("on");
  });

  it("switches explicit theme mode based on resolved theme", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => ({
        matches: true,
        media: "(prefers-color-scheme: dark)",
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });

    const wrapper = mount(ThemeSwitchProbe);
    await nextTick();

    const input = wrapper.get(".vf-switch__input");

    expect((input.element as HTMLInputElement).checked).toBe(true);

    await input.setValue(false);

    expect(document.documentElement.getAttribute("data-vf-theme")).toBe(
      "light",
    );
    expect(
      (wrapper.get(".vf-switch__input").element as HTMLInputElement).checked,
    ).toBe(false);

    await wrapper.get(".vf-switch__input").setValue(true);

    expect(document.documentElement.getAttribute("data-vf-theme")).toBe("dark");
  });

  it("emits radio updates and reflects checked state", async () => {
    const radio = mount(VfRadio, {
      props: {
        modelValue: "a",
        value: "b",
        invalid: true,
      },
      attrs: {
        name: "plan",
      },
      slots: {
        default: "Pro plan",
      },
    });

    expect(radio.classes()).toContain("vf-radio--invalid");
    expect(radio.get("input").attributes("name")).toBe("plan");

    await radio.get("input").setValue(true);

    expect(radio.emitted("update:modelValue")).toEqual([["b"]]);
  });

  it("renders divider orientation and decorative default semantics", () => {
    const wrapper = mount(VfDivider, {
      props: {
        orientation: "vertical",
      },
    });

    expect(wrapper.attributes("aria-orientation")).toBe("vertical");
    expect(wrapper.attributes("role")).toBe("separator");
    expect(wrapper.classes()).toContain("vf-divider--vertical");
  });

  it("renders badge tone and panel content", () => {
    const badge = mount(VfBadge, {
      props: {
        tone: "help",
      },
      slots: {
        default: "Stable",
      },
    });

    const panel = mount(VfPanel, {
      props: {
        title: "Quick notes",
        subtle: true,
      },
      slots: {
        default: "Panel content",
      },
    });

    expect(badge.classes()).toContain("vf-badge--help");
    expect(badge.text()).toBe("Stable");
    expect(panel.classes()).toContain("vf-panel--subtle");
    expect(panel.text()).toContain("Quick notes");
    expect(panel.text()).toContain("Panel content");
  });

  it("renders icon button with accessible label and icon stub", () => {
    const wrapper = mount(VfIconButton, {
      props: {
        icon: "gear",
        "aria-label": "Open settings",
        variant: "help",
      },
    });

    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("aria-label")).toBe("Open settings");
    expect(wrapper.classes()).toContain("vf-icon-button--help");
    expect(wrapper.find(".vif-icon").exists()).toBe(true);
  });

  it("renders alert and tag tones", () => {
    const alert = mount(VfAlert, {
      props: {
        tone: "warn",
        title: "Attention",
      },
      slots: {
        default: "Alert content",
      },
    });

    const tag = mount(VfTag, {
      props: {
        tone: "contrast",
      },
      slots: {
        default: "Preview",
      },
    });

    expect(alert.classes()).toContain("vf-alert--warn");
    expect(alert.text()).toContain("Attention");
    expect(alert.text()).toContain("Alert content");
    expect(alert.find(".vif-icon").exists()).toBe(true);
    expect(tag.classes()).toContain("vf-tag--contrast");
    expect(tag.text()).toBe("Preview");
  });
});
