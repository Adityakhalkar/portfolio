import { MagneticButtonDemo, magneticButtonCode } from "./ui/magnetic-button";
import { TiltCardDemo, tiltCardCode } from "./ui/tilt-card";
import { TextRevealDemo, textRevealCode } from "./ui/text-reveal";
import { HoldToConfirmDemo, holdToConfirmCode } from "./ui/hold-to-confirm";
import { FlipLinkDemo, flipLinkCode } from "./ui/flip-link";
import { TabSwitcherDemo, tabSwitcherCode } from "./ui/tab-switcher";
import { NumberCounterDemo, numberCounterCode } from "./ui/number-counter";
import { StaggerListDemo, staggerListCode } from "./ui/stagger-list";
import { ScrambleTextDemo, scrambleTextCode } from "./ui/scramble-text";
import { ElasticSliderDemo, elasticSliderCode } from "./ui/elastic-slider";
import { DockDemo, dockCode } from "./ui/dock";
import { ImageTunnelDemo, imageTunnelCode } from "./ui/image-tunnel";

export type ComponentCategory =
  | "Buttons & Interactions"
  | "Cards"
  | "Text Effects"
  | "Navigation"
  | "Data Display";

export interface ComponentEntry {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  component: React.ComponentType;
  code: string;
}

export const CATEGORIES: ComponentCategory[] = [
  "Buttons & Interactions",
  "Cards",
  "Text Effects",
  "Navigation",
  "Data Display",
];

export const registry: ComponentEntry[] = [
  {
    id: "magnetic-button",
    name: "Magnetic Button",
    description:
      "Button that follows your cursor within its bounds. Fast on track, ease-out cubic on release.",
    category: "Buttons & Interactions",
    component: MagneticButtonDemo,
    code: magneticButtonCode,
  },
  {
    id: "hold-to-confirm",
    name: "Hold to Confirm",
    description:
      "Press and hold to trigger an action. Linear fill for time visualization. Instant release snaps back.",
    category: "Buttons & Interactions",
    component: HoldToConfirmDemo,
    code: holdToConfirmCode,
  },
  {
    id: "tilt-card",
    name: "Tilt Card",
    description:
      "3D perspective tilt on hover. Each child layer can have independent translateZ depth.",
    category: "Cards",
    component: TiltCardDemo,
    code: tiltCardCode,
  },
  {
    id: "text-reveal",
    name: "Text Reveal",
    description:
      "Words translate up from a clipped container on scroll enter. Staggered with ease-out cubic.",
    category: "Text Effects",
    component: TextRevealDemo,
    code: textRevealCode,
  },
  {
    id: "flip-link",
    name: "Flip Link",
    description:
      "Hover slides the text out upward while a clone slides in from below. Pure CSS via Tailwind group — no JS.",
    category: "Navigation",
    component: FlipLinkDemo,
    code: flipLinkCode,
  },
  {
    id: "tab-switcher",
    name: "Tab Switcher",
    description:
      "Sliding indicator that morphs between tabs using getBoundingClientRect. Two variants: underline and pill. Keyboard navigable.",
    category: "Navigation",
    component: TabSwitcherDemo,
    code: tabSwitcherCode,
  },
  {
    id: "number-counter",
    name: "Number Counter",
    description:
      "Counts from a start value to a target when scrolled into view. ease-out-quart, tabular-nums. Supports prefix, suffix, decimals, separator.",
    category: "Data Display",
    component: NumberCounterDemo,
    code: numberCounterCode,
  },
  {
    id: "stagger-list",
    name: "Stagger List",
    description:
      "Children animate in sequentially on scroll enter. Direct DOM writes, no per-item state. Wraps any markup.",
    category: "Text Effects",
    component: StaggerListDemo,
    code: staggerListCode,
  },
  {
    id: "scramble-text",
    name: "Scramble Text",
    description:
      "Characters cycle through random glyphs before resolving left to right. Trigger on mount or hover. Custom charset supported.",
    category: "Text Effects",
    component: ScrambleTextDemo,
    code: scrambleTextCode,
  },
  {
    id: "elastic-slider",
    name: "Elastic Slider",
    description:
      "Drag past min/max and the thumb stretches elastically then snaps back with an overshoot spring. Pointer capture for smooth mobile drag.",
    category: "Buttons & Interactions",
    component: ElasticSliderDemo,
    code: elasticSliderCode,
  },
  {
    id: "dock",
    name: "Dock",
    description:
      "macOS-style icon row with gaussian magnification around the cursor. transform-origin bottom so items grow upward. Direct DOM writes.",
    category: "Navigation",
    component: DockDemo,
    code: dockCode,
  },
  {
    id: "image-tunnel",
    name: "Image Tunnel",
    description:
      "Images arranged in a 3D helix that flies toward you on scroll. Pure CSS perspective + translate3d. Infinite wrap, lerped scroll, touch support.",
    category: "Cards",
    component: ImageTunnelDemo,
    code: imageTunnelCode,
  },
];
