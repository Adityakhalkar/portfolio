import { MagneticButtonDemo, magneticButtonCode } from "./ui/magnetic-button";
import { TiltCardDemo, tiltCardCode } from "./ui/tilt-card";
import { TextRevealDemo, textRevealCode } from "./ui/text-reveal";
import { HoldToConfirmDemo, holdToConfirmCode } from "./ui/hold-to-confirm";
import { FlipLinkDemo, flipLinkCode } from "./ui/flip-link";

export type ComponentCategory =
  | "Buttons & Interactions"
  | "Cards"
  | "Text Effects"
  | "Navigation";

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
];
