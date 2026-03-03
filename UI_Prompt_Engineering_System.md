# Creative SaaS UI — Prompt Engineering System
**Version 1.0 | Built for React Component Generation**

---

## HOW THIS SYSTEM WORKS

Three layers run in sequence. You feed output from each layer into the next.
Never skip a layer. The magic is in the chain.

```
Business Description
       ↓
  [LAYER 1] Brand Extraction
       ↓
  [LAYER 2] Design Direction
       ↓
  [LAYER 3] Component Prompt
       ↓
  React Component
```

---

## ─────────────────────────────────────────
## LAYER 1 — BRAND EXTRACTION PROMPT
## ─────────────────────────────────────────

**Purpose:** Turn a raw business description into structured design intelligence.

**How to use:** Copy this prompt. Replace `[BUSINESS_DESCRIPTION]` with what the client tells you about their product. Paste into Claude.

---

### PROMPT:

```
You are a senior brand strategist with deep expertise in SaaS design systems.

A client has given you this description of their product:
[BUSINESS_DESCRIPTION]

Your job is to extract brand intelligence for a design system. Do not suggest generic answers. 
Think hard about what makes this product specific and different. Be decisive — no "or" options. 
Pick one answer for everything.

Output ONLY the following structured JSON. No prose, no explanation.

{
  "product": {
    "name": "",
    "one_line": "",         // What it does in 8 words max
    "core_action": "",      // The single verb that defines the product (e.g. "track", "automate", "analyze", "connect")
    "user_moment": ""       // Describe the exact moment a user feels relief/success using this product
  },
  "audience": {
    "primary_user": "",     // Job title of the main user
    "sophistication": "",   // "technical" | "business" | "creative" | "mixed"
    "fear": "",             // What keeps this user up at night (one sentence)
    "aspiration": ""        // What success looks like for them (one sentence)
  },
  "market_position": {
    "category": "",         // What market category this sits in
    "against": [],          // 2-3 direct competitors (names only)
    "differentiation": "",  // One honest sentence about what makes it different
    "price_signal": ""      // "budget" | "mid-market" | "premium" | "enterprise"
  },
  "brand_personality": {
    "archetype": "",        // One of: Sage | Hero | Rebel | Creator | Caregiver | Ruler | Explorer | Magician
    "adjectives": [],       // Exactly 3 adjectives that describe the brand voice
    "not_adjectives": [],   // Exactly 3 adjectives that would be WRONG for this brand
    "tone": ""              // "direct" | "warm" | "playful" | "authoritative" | "conversational" | "technical"
  },
  "visual_instinct": {
    "feels_like": "",       // A physical object or place this brand should feel like (e.g. "a machinist's workshop", "a high-end hotel lobby", "a vinyl record store")
    "energy": "",           // "calm" | "urgent" | "focused" | "expansive" | "precise"
    "era": "",              // A decade or era that matches the brand feeling (e.g. "1970s Braun", "1990s print magazine", "2001 Space Odyssey", "current")
    "anti_reference": ""    // One specific type of design this brand must NEVER look like
  }
}
```

---

## ─────────────────────────────────────────
## LAYER 2 — DESIGN DIRECTION GENERATOR
## ─────────────────────────────────────────

**Purpose:** Turn brand intelligence into specific, codeable visual decisions.

**How to use:** Take the JSON from Layer 1. Paste it into this prompt. Run it.

---

### PROMPT:

```
You are a creative director specializing in SaaS interfaces. You have radical taste and strong opinions.
You have zero tolerance for AI slop.

Here is the brand extraction JSON for a client:
[PASTE LAYER 1 JSON OUTPUT]

Your job is to make precise, opinionated visual decisions for a React component library.
You must make SPECIFIC choices, not ranges. No "you could use X or Y". Pick one thing.

You are building in 2026. The following are BANNED from your output — they are AI slop:
- Purple/blue hero gradients (clean, unbanded)
- Generic sans-serif body text with no personality (Inter, Geist used without intention)  
- 3-column feature card grids with icon + title + one line of text
- Floating blob shapes as background decoration
- Teal, indigo, or purple as default "trustworthy tech" color
- Everything centered, no editorial tension
- Perfectly even spacing with no rhythm variation
- Clean flat gradients with no texture or grain

Output ONLY the following structured JSON. Be specific. Be decisive. Explain your reasoning in one sentence per choice.

{
  "color_system": {
    "background": {
      "primary": "",        // Hex. Not white. Not #000. Something with character.
      "secondary": "",      // Hex. A surface color.
      "reasoning": ""
    },
    "accent": {
      "primary": "",        // Hex. The brand's signature color. Earns attention.
      "secondary": "",      // Hex. Supports the primary. Creates tension.
      "reasoning": ""
    },
    "text": {
      "primary": "",        // Hex. High contrast against background.
      "muted": "",          // Hex. For secondary content.
      "reasoning": ""
    },
    "palette_vibe": ""      // One phrase describing the emotional feeling of this palette
  },
  "typography": {
    "display": {
      "family": "",         // Specific Google Font or system font name. Not Inter.
      "weight": "",         // e.g. "900", "700"
      "style": "",          // "normal" | "italic" | "mixed"
      "transform": "",      // "uppercase" | "none" | "capitalize"
      "reasoning": ""
    },
    "body": {
      "family": "",         // Can be different from display. Legible but not boring.
      "weight": "",
      "reasoning": ""
    },
    "type_personality": ""  // One sentence describing what the typography communicates
  },
  "texture_system": {
    "has_grain": true,      // Always true. We use grain. This is 2026.
    "grain_intensity": "",  // "subtle" | "medium" | "heavy"
    "grain_type": "",       // "noise" | "film-grain" | "halftone" | "dither-pattern"
    "grain_application": "",// "full-page" | "hero-only" | "cards-only" | "backgrounds-only"
    "additional_texture": "",// "none" | "scanline" | "paper" | "concrete" | "fabric"
    "reasoning": ""
  },
  "layout_system": {
    "grid": "",             // e.g. "asymmetric 7/5 split" | "editorial magazine flow" | "brutalist single column" | "bento grid"
    "alignment": "",        // "left-dominant" | "centered" | "chaotic-intentional" | "editorial"
    "density": "",          // "airy" | "packed" | "editorial-spacious" | "tight-grid"
    "hero_pattern": "",     // Describe the hero layout pattern specifically (no generic centered text+CTA)
    "reasoning": ""
  },
  "component_style": {
    "border_radius": "",    // Be specific: "0px" | "2px" | "8px" | "9999px" | "mixed"
    "borders": "",          // "none" | "hairline-1px" | "2px-solid" | "dashed" | "mixed"
    "shadows": "",          // "none" | "hard-offset" | "soft-diffuse" | "inset" | "layered"
    "button_style": "",     // Describe specifically. Not just "filled". Shape, weight, behavior.
    "card_style": "",       // Describe specifically. Not just "rounded". Material, depth, edge treatment.
    "reasoning": ""
  },
  "motion_system": {
    "personality": "",      // "snappy" | "weighted" | "elastic" | "cinematic" | "instant"
    "hover_behavior": "",   // Describe what happens on hover for interactive elements
    "page_transitions": "", // "none" | "fade" | "slide" | "scale" | "clip-reveal"
    "reasoning": ""
  },
  "anti_slop_checks": {
    "what_makes_this_different": "",  // One paragraph. What would a designer say when they see this?
    "slop_risks": [],                 // 2-3 things to watch out for during implementation
    "signature_element": ""          // The one design decision that will make this memorable
  }
}
```

---

## ─────────────────────────────────────────
## LAYER 3 — COMPONENT GENERATION PROMPT
## ─────────────────────────────────────────

**Purpose:** Generate actual React components using the design system.

**How to use:** Take the Layer 2 JSON. Pick which component you want. Fill in the template below and run it.

---

### PROMPT:

````
You are an expert React developer and creative UI engineer.
You are building a [COMPONENT_TYPE] component for a SaaS product.

Here is the complete design system for this product:
[PASTE LAYER 2 JSON OUTPUT]

Additional context about what this component should DO:
[DESCRIBE COMPONENT BEHAVIOR AND CONTENT — e.g. "Hero section with headline, subheadline, two CTAs, and a product screenshot"]

HARD RULES — follow every single one:

TECHNOLOGY:
- React functional component with hooks where needed
- Tailwind CSS for all styling
- Inline SVG or CSS for grain/noise texture effects
- Framer Motion for animations if motion is specified in the design system
- No external image dependencies unless explicitly provided
- Export as default

GRAIN/TEXTURE IMPLEMENTATION:
- Apply grain using this SVG filter technique:
  ```
  <svg style="position:fixed;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;z-index:9999;opacity:[GRAIN_OPACITY]">
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)"/>
  </svg>
  ```
- Grain opacity: subtle=0.03, medium=0.06, heavy=0.12
- Always add grain. A component without texture is a 2022 component.

ANTI-SLOP RULES:
- Do NOT center everything. Use the layout_system alignment from the design JSON.
- Do NOT use blue/purple gradients unless explicitly specified in the color system.
- Do NOT use generic placeholder icons. Either use no icons, or use text/symbols.
- Do NOT add hover effects that weren't specified in the motion_system.
- Do NOT add drop shadows that weren't specified in the component_style.
- Do NOT use grid-cols-3 for features unless the layout_system specifies it.
- Do NOT add border-radius unless it matches the exact value in component_style.

TYPOGRAPHY RULES:
- Import the specified Google Fonts using a <style> tag or @import at top of component
- Apply display font to all headings
- Apply body font to all body text
- Respect the specified weight and transform exactly

CONTENT:
- Use realistic, specific placeholder content — not "Lorem ipsum"
- Write copy that matches the brand's tone from the design system
- If content involves numbers/stats, make them believable and specific

STRUCTURE:
- Component must be fully self-contained and render without any props (use sensible defaults)
- Include brief JSDoc comment at top describing what the component is
- Maximum 300 lines of code. If it needs to be longer, tell me and we'll split it.

OUTPUT:
- Return ONLY the React component code
- No explanation before or after
- Start with imports
- End with export default
````

---

## ─────────────────────────────────────────
## COMPONENT MENU
## ─────────────────────────────────────────

Use these as [COMPONENT_TYPE] in Layer 3. Each is a distinct sellable deliverable.

### Landing Page Components
| Component | Description |
|-----------|-------------|
| `HeroSection` | Full-width hero with headline, subheadline, CTA(s), and visual |
| `FeatureShowcase` | 3-6 product features in a non-generic layout |
| `SocialProof` | Logos, testimonials, or stats section |
| `PricingTable` | 2-3 tier pricing with feature comparison |
| `FeatureDeepDive` | Single feature with detailed explanation and visual |
| `CTASection` | Bottom-of-page conversion section |
| `FooterSection` | Full footer with links, newsletter, social |

### SaaS App Components  
| Component | Description |
|-----------|-------------|
| `DashboardShell` | App shell with sidebar navigation and header |
| `MetricCards` | KPI cards row for dashboard |
| `DataTable` | Styled table with sorting/filter UI |
| `EmptyState` | Empty state for when no data exists |
| `OnboardingStep` | Single step in an onboarding flow |
| `CommandPalette` | Cmd+K style command palette |
| `NotificationCenter` | Notification panel/dropdown |

### Marketing Components
| Component | Description |
|-----------|-------------|
| `NavBar` | Top navigation with logo, links, auth CTAs |
| `AnnouncementBanner` | Top banner for sales/launches/news |
| `BlogCard` | Card for a blog/article listing |
| `IntegrationGrid` | Grid showing product integrations |
| `ComparisonTable` | vs competitor feature table |

---

## ─────────────────────────────────────────
## QUALITY CONTROL CHECKLIST
## ─────────────────────────────────────────

Before handing a component to a client, run through this. Each "no" = fix it.

**Texture**
- [ ] Is there grain/noise on the component?
- [ ] Does the grain feel intentional and calibrated — not accidental?

**Color**
- [ ] Is there zero purple/blue/teal slop gradient?
- [ ] Does the palette feel like it was chosen for THIS product?

**Typography**
- [ ] Is the display font loaded and applied to headings?
- [ ] Does the type create visual hierarchy and tension?
- [ ] Is anything in Inter/Geist used without intention?

**Layout**
- [ ] Is the layout breaking at least one expected pattern?
- [ ] Are there intentional variations in spacing (not uniform padding everywhere)?

**Motion**
- [ ] Does motion match the specified personality (not default Tailwind transitions)?

**Content**
- [ ] Is all placeholder content specific and realistic?
- [ ] Does the copy sound like the brand, not like a template?

**Code**
- [ ] Does it render without props?
- [ ] Is it under 300 lines?
- [ ] No external dependencies that'll break?

---

## ─────────────────────────────────────────
## DESIGN AESTHETIC MENU
## ─────────────────────────────────────────

Use this in Layer 2. When the design direction JSON is generated, it should map to ONE primary aesthetic from this list. Each has a name, a visual signature, and the component patterns it implies.

---

### 01 — SURVEILLANCE EDITORIAL
**What it is:** UI vocabulary borrowed from security systems — CCTV overlays, timestamps, biometric HUD elements, monochrome palettes, recognition box borders. Strict grids, utilitarian typography, timestamp structures, and high contrast minimal palettes. Communicates observation, precision, and data flow.

**Visual signature:** Monochrome or two-tone, timestamp overlays on images, thin crosshair or bracket UI elements, all-caps utilitarian type, data readout aesthetics

**Works for:** Dev tools, security/compliance SaaS, data infrastructure, analytics

**Avoid for:** Consumer wellness, children, anything requiring warmth

---

### 02 — GRAINY BLUR
**What it is:** Soft-focus effects combined with textured grainy overlays, creating visuals that feel both nostalgic and modern. Audiences are tired of ultra-sharp "perfect" images — this adds warmth, depth, and authenticity.

**Visual signature:** Gaussian blur on background layers, film grain overlay on top, muted desaturated palette, elements slightly out of focus except for one sharp focal point

**Works for:** Creative tools, content platforms, photography SaaS, design tools

**Avoid for:** Anything requiring precision or trust signals (finance, legal, medical)

---

### 03 — CONTROLLED BRUTALISM
**What it is:** Harsh grids, exposed structure, and awkward spacing — but usability is respected underneath. Rough layouts communicate honesty or resistance, with readability and navigation refined beneath the surface.

**Visual signature:** Border-box everything, exposed grid lines, intentionally uncomfortable spacing, black/white + one color, oversized type breaking the grid, zero border-radius

**Works for:** Developer tools, open source, fintech, anything targeting technical rebels

**Avoid for:** Enterprise, healthcare, anything targeting non-technical buyers

---

### 04 — BARELY-THERE MINIMALISM
**What it is:** Clean layouts, limited color, simple typography, calm spacing. Often one font family, sometimes one weight doing most of the work. Color palettes reduced to two or three tones. White space isn't decorative — it's structural.

**Visual signature:** Maximum 2-3 colors, one typeface, structural whitespace, data visuals as the only decoration, no grain (or extremely subtle), everything earns its place

**Works for:** Enterprise, AI products needing to look serious, B2B tools, anything targeting CFOs/CIOs

**Avoid for:** Consumer, creative, youth audiences

---

### 05 — SOFT MAXIMALISM
**What it is:** Controlled boldness — bigger type, brighter colors, expressive layouts, but done selectively. One oversized headline instead of ten competing elements. One strong color accent. One moment of visual chaos. The goal isn't to overwhelm, but to wake people up.

**Visual signature:** One hero element that breaks scale expectations, restrained everywhere else, expressive display type, bold accent color used sparingly, grain on backgrounds

**Works for:** Marketing SaaS, creative tools, productivity apps, anything competing in a crowded visual market

**Avoid for:** Anything needing to appear calm or stable

---

### 06 — MIXED MEDIA / COLLAGE
**What it is:** Photography, illustration, typography, and texture coexisting within single compositions. Layering creates visuals that feel rich and dimensional — a rejection of flatness both visually and conceptually. Compositions that start with scans and cut-outs but emerge into something dynamic digitally.

**Visual signature:** Scanned textures as backgrounds, ripped paper edges, mix of photography and illustration in one composition, collage-style layering, visible cut lines, heavy grain

**Works for:** Creative platforms, portfolio tools, design/art SaaS, agencies selling to creatives

**Avoid for:** B2B enterprise, anything needing to look "safe"

---

### 07 — UTILITARIAN / WAYFINDING
**What it is:** Influenced by signage systems, industrial graphics, and wayfinding. Values hierarchy, legibility, and efficiency. Its appeal lies in its refusal to over-explain. Clarity becomes the visual language.

**Visual signature:** Bold numbered sections, arrow systems, direction indicators, industrial sans-serif type (Helvetica Neue, Aktiv Grotesk), high contrast, no decoration, function-first

**Works for:** Logistics, operations SaaS, infrastructure tools, anything physical-world adjacent

**Avoid for:** Anything emotional or consumer-focused

---

### 08 — RETRO-FUTURISM
**What it is:** Revisiting past visions of the future through chrome finishes, neon palettes, and sci-fi references. Nostalgia and speculation coexist, executed with contemporary precision.

**Visual signature:** Chrome/metallic UI elements, neon accent on dark background, pixel grid undertones, CRT-inspired typography, grain + scanline overlay, early Mac or Atari aesthetic remixed

**Works for:** AI tools, gaming, developer tools, anything with a "future" narrative

**Avoid for:** Anything conservative, financial, enterprise

---

### 09 — INK TRAP EDITORIAL
**What it is:** Originally a functional print solution, ink traps have evolved into a stylistic choice. Designers amplify these details to introduce rhythm, character, and subtle disruption into typographic systems. Typography that feels engineered yet expressive.

**Visual signature:** Type-forward design, fonts with visible ink trap details (Martian Mono, Recursive, Input), type as the primary visual element, minimal graphic decoration, layouts driven entirely by typographic hierarchy

**Works for:** Editorial SaaS, developer tools, anything where the product is fundamentally about text or writing

**Avoid for:** Anything where users aren't text-literate or design-aware

---

### 10 — MOTION STILL
**What it is:** Even still images suggest movement. Cropped frames, blurred edges, timestamps, and overlays hint at time. The image feels paused rather than frozen — it suggests something happened before and will continue after.

**Visual signature:** Motion blur on UI elements, progress indicators frozen mid-animation, cropped compositions that imply continuation, timestamp overlays, screenshot-within-screenshot aesthetic

**Works for:** Video SaaS, workflow automation, anything about process and time

**Avoid for:** Static product categories with no inherent motion

---

### 11 — ATMOSPHERIC EDITORIAL
**What it is:** Mood-first design where atmosphere precedes information. Deep warm backgrounds with ambient glow effects, luminous accent typography, decorative geometry (arcs, circles), glassmorphism surfaces. Creates an emotional environment rather than presenting data. The page FEELS like something before you read a word.

**Visual signature:** Deep warm dark backgrounds (#0C0A09-range, never cold black), radial gradient "orbs" for ambient light, text-shadow glow on accent headlines, thin SVG decorative arcs/circles, glassmorphism navigation (backdrop-blur + warm transparent borders), extreme typographic scale (hero text 8-10vw), serif italic display type, copper/gold/warm amber accents, single-stat hero moments (one massive number per section, not grids), generous breathing room (200px+ section padding)

**Key techniques:**
- Radial gradient orbs: `radial-gradient(circle, rgba(accent,0.08) 0%, transparent 70%)` with `filter: blur(80px)`
- Luminous text: `text-shadow: 0 0 60px rgba(accent,0.3), 0 0 120px rgba(accent,0.1)`
- Decorative arcs: Animated SVG circles with `pathLength` animation, 0.3-0.5px stroke, 10-15% opacity
- Glassmorphism nav: `backdrop-filter: blur(20px) saturate(1.2)` with rgba background at 0.7 opacity
- Animated line rules: `scaleX: 0 -> 1` with custom cubic-bezier easing
- Scroll indicator: Small "SCROLL" label + animated vertical line at bottom center

**Works for:** Enterprise SaaS wanting luxury positioning, supply chain/logistics, financial platforms, any B2B product competing against boring competitors

**Avoid for:** Consumer apps, playful products, anything that needs to feel fast/scrappy

---

**HOW TO USE THIS MENU IN LAYER 2:**

Add one field to the Layer 2 prompt:
```
"aesthetic_direction": {
  "primary": "",    // Pick ONE from the 11 above (e.g. "Surveillance Editorial", "Atmospheric Editorial")
  "rationale": "",  // One sentence on why this fits the brand extraction
  "hybrid": ""      // Optional: a secondary aesthetic for specific components only
}
```

---

## ─────────────────────────────────────────
## AI SLOP DEFINITION (Reference Card)
## ─────────────────────────────────────────

Keep this visible when reviewing generated components.

**AI Slop** = the visual output of an LLM that received no real design direction.
It is statistically average UI — the median of 2021-2023 SaaS templates.

### The Slop Checklist (avoid all of these)

| Slop Element | What it looks like | The Fix |
|---|---|---|
| Gradient hero | `from-purple-600 to-blue-500`, clean, unbanded | Add grain, change palette, break symmetry |
| Card grid | `grid-cols-3`, icon + title + 1 sentence, equal height | Editorial layout, size variation, texture |
| Blob shapes | Soft amorphous SVG blobs as background decoration | Geometric, dithered, or no background shapes |
| Safe fonts | Inter/Geist/Roboto everywhere, normal weight | Expressive display font, intentional pairing |
| Equal spacing | Same padding/margin on every section | Rhythm variation, editorial density shifts |
| Centered everything | Hero, features, CTA all `text-center` | Left-dominant or editorial alignment |
| Flat shadows | `shadow-md` as default on all cards | No shadow, or hard-offset, or inset — decided |
| Tech colors | Teal, indigo, purple as default "trustworthy" | Colors derived from brand extraction, not defaults |
| Clean gradients | Smooth `bg-gradient-to-r` with no texture | Grainy gradients with SVG noise overlay |
| Generic icons | Lucide/Heroicons used everywhere without customization | Text symbols, custom SVG, or no icons |
| Emojis | Any emoji used as decoration, bullet points, or visual elements | Never. Use typography, color, or geometric shapes instead |
| Sameness | Templates that look like reskins of each other (same structure, different colors) | Vary structure, typography, layout, animation, and information architecture |

---

## ─────────────────────────────────────────
## WHAT HUMANS FIND BEAUTIFUL (Design Psychology)
## ─────────────────────────────────────────

Use this as a creative compass. Every generated template must pass these checks.

### Universal Beauty Principles

Humans find things beautiful when they trigger perceptual fluency — the brain processing visual information efficiently and being rewarded with dopamine. This happens through:

| Principle | What it means in practice | Anti-pattern |
|---|---|---|
| **Organic rhythm** | Spacing varies like a heartbeat — tight, loose, tight. Not uniform padding. | `py-16` on every section |
| **Warmth and texture** | Surfaces feel tactile — paper, stone, fabric, grain. Not flat CSS. | Flat `bg-gray-900` with no depth |
| **Depth and layering** | Elements overlap, cast shadows, exist at different visual planes. | Everything on one flat plane |
| **Natural proportion** | Golden ratio in layout splits (60/40, 62/38), Fibonacci in spacing. | `grid-cols-2` everything |
| **Scale drama** | One element is absurdly large next to something small. Creates visual tension. | All text within 14-32px range |
| **Emotional color** | Colors evoke a feeling — warmth, calm, urgency — not just contrast. | High-contrast dark bg + neon accent |
| **Typography as music** | Font weights, sizes, and styles create a visual melody — not monotone uppercase. | Everything uppercase, same weight |
| **Surprise within order** | One unexpected element in a structured composition. | Predictable, formulaic layout |
| **Breathing space** | Generous whitespace that feels like luxury, not emptiness. | Content packed edge-to-edge |

### The Beauty Test

Before shipping a template, ask:
1. Does this make me FEEL something? (warmth, calm, excitement, curiosity)
2. Would a human designer be proud of this? Or would they say "that's AI"?
3. Is there ONE moment that surprises me visually?
4. Does the typography create a melody — or is it monotone?
5. Could I mistake this for a real, shipped product website?

---

## ─────────────────────────────────────────
## AWARD-WINNING DESIGN PATTERNS (Reference Library)
## ─────────────────────────────────────────

Techniques extracted from real award-winning websites. Use these as building blocks.

### Visual Atmosphere Techniques

| Technique | CSS/Code Pattern | When to Use |
|---|---|---|
| **Radial glow orb** | `radial-gradient(circle, rgba(accent,0.08) 0%, transparent 70%)` + `filter: blur(80px)` on absolute-positioned div | Dark backgrounds that need warmth and depth |
| **Luminous text** | `text-shadow: 0 0 60px rgba(accent,0.3), 0 0 120px rgba(accent,0.1)` | Accent headlines on dark backgrounds |
| **Glassmorphism surface** | `backdrop-filter: blur(20px) saturate(1.2)` + `rgba(bg,0.7)` background + `rgba(accent,0.1)` border | Floating nav bars, modal overlays, cards |
| **Gradient backdrop** | `linear-gradient(180deg, color1 0%, color2 50%, color1 100%)` on absolute div behind content | Section differentiation without hard borders |
| **Animated line rule** | `motion.div` with `scaleX: 0 -> 1`, `transformOrigin: "left"`, custom cubic-bezier | Section dividers that draw attention |

### Decorative Geometry Techniques

| Technique | Implementation | Effect |
|---|---|---|
| **SVG decorative arcs** | `motion.circle` with `pathLength` animation, 0.3-0.5px stroke, 10-15% opacity | Elegant visual interest without clutter |
| **Nested circles** | Two concentric circles at different radii, different animation delays | Depth and sophistication |
| **Thin line accents** | 24px horizontal lines as section labels instead of dots | Editorial, less "SaaS template" |

### Typography Elevation Techniques

| Technique | When It Works | Anti-Pattern |
|---|---|---|
| **Extreme scale** (8-12vw hero) | One line, serif italic, dark bg | Multiple lines at extreme scale |
| **Split title/subtitle color** | "Connect" in white + "your carriers" in muted gray within same line | Every word a different color |
| **Glow on accent words only** | Last line of hero in accent color with text-shadow | Glowing everything |
| **Serif italic for numbers** | Large stats (47%, 73%) in serif italic feel premium | Sans-serif numbers at same scale |

### Layout Patterns That Break Convention

| Pattern | How It Differs from Default | Good For |
|---|---|---|
| **Single-stat hero** | One massive number centered with glow, not 3 metrics in a grid | Metrics/results sections |
| **Editorial index** | Steps as horizontal rows with number + title + description inline, not cards | How-it-works sections |
| **Atmospheric full-bleed** | Section takes full viewport with gradient backdrop, single statement | Transition moments |
| **Supporting stats strip** | Secondary metrics in a horizontal bar below the hero stat, not equal peers | Adding context without competing |

---

## ─────────────────────────────────────────
## ANTI-SAMENESS RULES (Template Diversity)
## ─────────────────────────────────────────

Templates in a collection MUST be visually diverse. A color swap is not a new template.

### Structural Diversity Checklist

Before generating a new template, compare against ALL existing templates. The new one must differ in at least 5 of these 8 dimensions:

| Dimension | Examples of variation |
|---|---|
| **Background tone** | Light warm, light cool, dark warm, dark cool, mid-tone, textured |
| **Display typography** | Serif italic, geometric sans, mono, slab, display, handwritten-inspired |
| **Button style** | Pill, ghost with fill-on-hover, bordered, text-only+arrow, asymmetric, full-width |
| **Section structure** | The order and types of sections must NOT be the same (not always Hero->Features->Metrics->CTA->Footer) |
| **Layout system** | Left-dominant, editorial split, centered-minimal, asymmetric overlap, horizontal scroll, magazine grid |
| **Animation personality** | Spring-bouncy, smooth-weighted, instant-mechanical, cinematic-slow, no-animation |
| **Color temperature** | Warm earth tones, cool steel, natural greens, sunset warmth, monochrome |
| **Information architecture** | Feature list, storytelling narrative, problem-solution, journey/steps, data-first |

### Hard Rules

- Never generate two templates with the same background tone (both dark, both light warm, etc.)
- Never reuse the same display font across templates
- Never use the same section order as any existing template
- Never default to uppercase everything — vary text case per template
- Every template must have a different button style
- At least one template must use a serif or italic display font
- At least one template must use a light/warm color palette
- Never use emojis

---

*System built for: SaaS landing pages and app components → React output*
*Design era: 2026 — grain, texture, imperfection, editorial tension, warmth, humanity*
