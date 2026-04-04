import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VfTabs from "./VfTabs.vue";

const items = [
  { value: "overview", label: "Overview" },
  { value: "settings", label: "Settings" },
  { value: "billing", label: "Billing", disabled: true },
];

describe("VfTabs", () => {
  it("renders active tab and panel content from uncontrolled state", async () => {
    const wrapper = mount(VfTabs, {
      attachTo: document.body,
      props: {
        items,
        defaultValue: "settings",
      },
      slots: {
        panel: ({ activeValue }: { activeValue: string }) =>
          h("div", `panel:${activeValue}`),
      },
    });

    const activeTab = wrapper.get('[role="tab"][aria-selected="true"]');
    const panel = wrapper.get('[role="tabpanel"]');

    expect(activeTab.text()).toBe("Settings");
    expect(panel.text()).toBe("panel:settings");
    expect(panel.attributes("aria-labelledby")).toBe(
      activeTab.attributes("id"),
    );

    await wrapper.findAll('[role="tab"]')[0].trigger("click");
    expect(wrapper.get('[role="tabpanel"]').text()).toBe("panel:overview");
  });

  it("supports arrow navigation across enabled tabs", async () => {
    const wrapper = mount(VfTabs, {
      attachTo: document.body,
      props: {
        items,
        defaultValue: "overview",
      },
      slots: {
        panel: ({ activeValue }: { activeValue: string }) =>
          h("div", activeValue),
      },
    });

    const tabs = wrapper.findAll('[role="tab"]');
    await tabs[0].trigger("keydown", { key: "ArrowRight" });
    await nextTick();

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe(
      "Settings",
    );
    expect(document.activeElement?.textContent).toBe("Settings");

    await tabs[1].trigger("keydown", { key: "ArrowRight" });
    await nextTick();

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe(
      "Overview",
    );
  });

  it("supports controlled mode through v-model updates", async () => {
    const wrapper = mount(
      defineComponent({
        components: { VfTabs },
        setup() {
          const value = ref("overview");

          return () =>
            h(
              VfTabs,
              {
                items,
                modelValue: value.value,
                "onUpdate:modelValue": (nextValue: string) => {
                  value.value = nextValue;
                },
              },
              {
                panel: ({ activeValue }: { activeValue: string }) =>
                  h("div", `active:${activeValue}`),
              },
            );
        },
      }),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findAll('[role="tab"]')[1].trigger("click");
    await nextTick();

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe(
      "Settings",
    );
    expect(wrapper.get('[role="tabpanel"]').text()).toBe("active:settings");
  });

  it("renders a moving indicator for the active tab", async () => {
    const wrapper = mount(VfTabs, {
      attachTo: document.body,
      props: {
        items,
        defaultValue: "overview",
      },
      slots: {
        panel: ({ activeValue }: { activeValue: string }) =>
          h("div", activeValue),
      },
    });

    await nextTick();

    const indicator = wrapper.get(".vf-tabs__indicator");
    expect(indicator.attributes("aria-hidden")).toBe("true");

    await wrapper.findAll('[role="tab"]')[1].trigger("click");
    await nextTick();

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe(
      "Settings",
    );
    expect(wrapper.find(".vf-tabs__indicator").element).toBeTruthy();
  });
});
