export interface GSAPTechnique {
  id: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  plugins: string[];
  code: string;
  parameters: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
  }>;
  useCases: string[];
  notes: string[];
}

export const gsapTechniques: GSAPTechnique[] = [
  {
    id: "liquid-distortion",
    name: "WebGL Liquid Distortion",
    category: "WebGL",
    difficulty: "Advanced",
    description:
      "Create fluid, organic distortion effects using WebGL shaders combined with GSAP ScrollTrigger. Simulates liquid morphing with displacement mapping for premium visual experiences.",
    plugins: ["ScrollTrigger"],
    code: `// Vertex shader with displacement
const vertexShader = \`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

// Fragment shader with wave distortion
const fragmentShader = \`
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave = sin(uv.y * 10.0 + uTime) * 0.05 * uProgress;
    uv.x += wave;
    gl_FragColor = texture2D(uTexture, uv);
  }
\`;

// GSAP ScrollTrigger integration
gsap.to(uniforms.uProgress, {
  value: 1,
  scrollTrigger: {
    trigger: element,
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});`,
    parameters: [
      {
        name: "uProgress",
        type: "Number",
        default: "0",
        description: "Animation progress uniform (0-1) controlled by GSAP",
      },
      {
        name: "uTime",
        type: "Number",
        default: "0",
        description: "Time uniform for continuous wave animation",
      },
      {
        name: "displacement",
        type: "Number",
        default: "0.05",
        description: "Intensity of distortion effect",
      },
    ],
    useCases: [
      "Premium landing pages with interactive hero sections",
      "Product showcases with attention-grabbing animations",
      "Creative agency portfolios with liquid transitions",
      "Immersive storytelling experiences",
    ],
    notes: [
      "Requires WebGL context and shader knowledge",
      "Use Three.js or raw WebGL for shader setup",
      "Optimize shader complexity for mobile devices",
      "Combine with mouse tracking for interactive effects",
      "requestAnimationFrame updates uTime uniform",
    ],
  },
  {
    id: "magnetic-elements",
    name: "Magnetic Hover Effect",
    category: "Interaction",
    difficulty: "Advanced",
    description:
      "Elements that attract and follow cursor movement with physics-based momentum and constraints. Creates premium interactive experiences with smooth interpolation.",
    plugins: [],
    code: `let mouse = { x: 0, y: 0 };
let current = { x: 0, y: 0 };

const lerp = (start, end, factor) => start + (end - start) * factor;

const updateMousePosition = (e) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.sqrt(
    Math.pow(e.clientX - centerX, 2) +
    Math.pow(e.clientY - centerY, 2)
  );

  const maxDistance = 150;
  const strength = Math.max(0, 1 - distance / maxDistance);

  mouse.x = (e.clientX - centerX) * strength * 0.3;
  mouse.y = (e.clientY - centerY) * strength * 0.3;
};

const animate = () => {
  current.x = lerp(current.x, mouse.x, 0.1);
  current.y = lerp(current.y, mouse.y, 0.1);

  gsap.set(element, {
    x: current.x,
    y: current.y,
    rotation: current.x * 0.05
  });

  requestAnimationFrame(animate);
};

window.addEventListener('mousemove', updateMousePosition);
animate();`,
    parameters: [
      {
        name: "strength",
        type: "Number",
        default: "0.3",
        description: "Attraction strength (0-1), higher = more magnetic",
      },
      {
        name: "maxDistance",
        type: "Number",
        default: "150",
        description: "Maximum distance in pixels for effect activation",
      },
      {
        name: "lerpFactor",
        type: "Number",
        default: "0.1",
        description: "Smoothing factor (0-1), lower = smoother/slower",
      },
    ],
    useCases: [
      "Interactive CTA buttons with premium feel",
      "Portfolio project thumbnails",
      "Navigation elements with enhanced interactivity",
      "Product cards in e-commerce",
    ],
    notes: [
      "Use requestAnimationFrame for smooth 60fps animation",
      "Calculate distance for proximity-based activation",
      "Add rotation for enhanced 3D feeling",
      "Debounce on mobile to prevent performance issues",
      "Use GSAP quickSetter for better performance",
    ],
  },
  {
    id: "text-scramble",
    name: "Matrix Text Scramble",
    category: "Text",
    difficulty: "Advanced",
    description:
      "Decode effect that scrambles random characters before revealing final text. Creates hacker/sci-fi aesthetic with customizable character sets and timing.",
    plugins: [],
    code: `const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~\`";
const queue = [];

const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

const scrambleText = (element, newText) => {
  const oldText = element.innerText;
  const length = Math.max(oldText.length, newText.length);

  return new Promise((resolve) => {
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end, char: from });
    }

    let frame = 0;
    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      element.innerText = output;

      if (complete === queue.length) {
        resolve();
      } else {
        frame++;
        requestAnimationFrame(update);
      }
    };

    update();
  });
};`,
    parameters: [
      {
        name: "chars",
        type: "String",
        default: '"!@#$%^&*()"',
        description: "Character set for scramble effect",
      },
      {
        name: "duration",
        type: "Number",
        default: "40-80 frames",
        description: "Random duration for each character reveal",
      },
      {
        name: "changeRate",
        type: "Number",
        default: "0.28",
        description: "Probability of character change per frame",
      },
    ],
    useCases: [
      "Tech/crypto landing pages",
      "Loading states with sci-fi aesthetic",
      "Glitch effects for creative portfolios",
      "Cybersecurity or gaming websites",
    ],
    notes: [
      "Combine with ScrollTrigger for scroll-based reveals",
      "Use monospace fonts for best visual effect",
      "Adjust changeRate for speed control",
      "Can be extended to support multiple elements",
      "Works well with glitch CSS filters",
    ],
  },
  {
    id: "scrolltrigger-pin",
    name: "ScrollTrigger Pinning",
    category: "Scroll",
    difficulty: "Intermediate",
    description:
      "Pin elements in place during scroll, creating fixed sections while content scrolls behind. Essential for multi-section storytelling and progressive reveals.",
    plugins: ["ScrollTrigger"],
    code: `ScrollTrigger.create({
  trigger: element,
  start: "top top",
  end: "bottom bottom",
  pin: true,
  pinSpacing: false,
  scrub: 1,
  markers: false
});`,
    parameters: [
      {
        name: "trigger",
        type: "Element | String",
        default: "null",
        description: "Element that triggers the scroll animation when it enters viewport",
      },
      {
        name: "start",
        type: "String",
        default: '"top top"',
        description: "When the animation should start (trigger position viewport position)",
      },
      {
        name: "end",
        type: "String",
        default: '"bottom bottom"',
        description: "When the animation should end",
      },
      {
        name: "pin",
        type: "Boolean | Element",
        default: "false",
        description: "Whether to pin the element in place during scroll",
      },
      {
        name: "scrub",
        type: "Boolean | Number",
        default: "false",
        description: "Links animation progress directly to scroll position (number = smoothing)",
      },
    ],
    useCases: [
      "Long-form storytelling with progressive content reveals",
      "Product showcases with sticky headers or navigation",
      "Multi-section landing pages with anchored content",
      "Parallax effects with pinned foreground elements",
    ],
    notes: [
      "pinSpacing creates space for pinned element, set to false for overlay effects",
      "Use scrub: true for 1:1 scroll mapping, or number (0-1) for smoothing",
      "Combine with other animations for complex choreography",
      "Be mindful of performance on mobile devices with many pinned sections",
    ],
  },
  {
    id: "scrolltrigger-parallax",
    name: "ScrollTrigger Parallax",
    category: "Scroll",
    difficulty: "Intermediate",
    description:
      "Create depth through differential scroll speeds. Multiple layers moving at different rates produce a 3D parallax effect commonly seen in modern web design.",
    plugins: ["ScrollTrigger"],
    code: `gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: container,
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});`,
    parameters: [
      {
        name: "y",
        type: "Number",
        default: "0",
        description: "Vertical translation amount (negative = up, positive = down)",
      },
      {
        name: "scrub",
        type: "Boolean | Number",
        default: "false",
        description: "Smoothness of scroll-animation linkage",
      },
      {
        name: "start/end",
        type: "String",
        default: '"top bottom"',
        description: "Animation trigger points relative to viewport",
      },
    ],
    useCases: [
      "Hero sections with layered background elements",
      "Product photography with depth effects",
      "Artistic portfolio websites with spatial narratives",
      "Gaming or entertainment sites with immersive scrolling",
    ],
    notes: [
      "Faster layers (larger y values) appear closer to viewer",
      "Keep total layers under 5-6 for optimal performance",
      "Use will-change: transform CSS for smoother animations",
      "Test on lower-end devices to ensure acceptable framerates",
    ],
  },
  {
    id: "horizontal-scroll",
    name: "Horizontal Scroll",
    category: "Scroll",
    difficulty: "Advanced",
    description:
      "Transform vertical scroll into horizontal movement. Ideal for creating unique navigation patterns and showcasing wide-format content like timelines or portfolios.",
    plugins: ["ScrollTrigger"],
    code: `const panels = gsap.utils.toArray(".panel");

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + container.offsetWidth
  }
});`,
    parameters: [
      {
        name: "xPercent",
        type: "Number",
        default: "0",
        description: "Percentage-based horizontal movement (relative to element width)",
      },
      {
        name: "snap",
        type: "Number | Array | Object",
        default: "false",
        description: "Snap points for scroll position (0-1 for even distribution)",
      },
      {
        name: "pin",
        type: "Boolean",
        default: "false",
        description: "Pin container while horizontal scroll occurs",
      },
    ],
    useCases: [
      "Timeline visualizations with chronological data",
      "Portfolio galleries with wide-format artwork",
      "Product comparison tables with many columns",
      "Cinematic storytelling experiences",
    ],
    notes: [
      "Calculate end point dynamically based on total panel width",
      "Use snap for discrete panel transitions",
      "Consider adding scroll hints for user guidance",
      "Test touch/trackpad interactions thoroughly",
    ],
  },
  {
    id: "timeline-stagger",
    name: "Timeline Stagger",
    category: "Sequencing",
    difficulty: "Beginner",
    description:
      "Orchestrate complex animation sequences with precise timing control. Stagger creates cascading effects by delaying each element's animation relative to the previous one.",
    plugins: [],
    code: `const tl = gsap.timeline({ paused: true });

tl.from(".element", {
  y: 100,
  opacity: 0,
  duration: 0.6,
  stagger: {
    each: 0.15,
    from: "start",
    ease: "power2.out"
  }
});

// Control methods
tl.play();
tl.pause();
tl.reverse();
tl.seek(2);`,
    parameters: [
      {
        name: "stagger.each",
        type: "Number",
        default: "0",
        description: "Delay in seconds between each element's animation start",
      },
      {
        name: "stagger.from",
        type: "String",
        default: '"start"',
        description: 'Stagger direction: "start", "end", "center", "edges", "random"',
      },
      {
        name: "stagger.ease",
        type: "String | Function",
        default: '"none"',
        description: "Easing function applied to stagger timing",
      },
    ],
    useCases: [
      "List reveals with cascading entrance animations",
      "Gallery grids with sequential image loading",
      "Navigation menu items appearing in sequence",
      "Text reveals with character or word delays",
    ],
    notes: [
      "Timeline methods (play, pause, reverse) provide full playback control",
      "Use position parameter ('-=0.4') to overlap animations",
      "Combine multiple staggers for complex choreography",
      "Keep stagger.each between 0.05-0.2s for optimal perception",
    ],
  },
  {
    id: "svg-morph",
    name: "SVG Path Morphing",
    category: "SVG",
    difficulty: "Advanced",
    description:
      "Seamlessly transform between different SVG path shapes. Requires MorphSVGPlugin (Club GreenSock premium). Creates smooth, organic transitions between vector graphics.",
    plugins: ["MorphSVGPlugin"],
    code: `gsap.to(pathElement, {
  morphSVG: targetPath,
  duration: 1,
  ease: "power2.inOut"
});

// Or morph to another element
gsap.to("#shape1", {
  morphSVG: "#shape2",
  duration: 1.5
});`,
    parameters: [
      {
        name: "morphSVG",
        type: "String | Element",
        default: "null",
        description: "Target path data or element to morph into",
      },
      {
        name: "duration",
        type: "Number",
        default: "0.5",
        description: "Animation duration in seconds",
      },
      {
        name: "ease",
        type: "String | Function",
        default: '"power1.out"',
        description: "Easing function for morph transition",
      },
    ],
    useCases: [
      "Icon state transitions (menu to close, play to pause)",
      "Animated logos with shape transformations",
      "Data visualization shape changes",
      "Creative loading indicators and transitions",
    ],
    notes: [
      "Paths should have similar point counts for optimal results",
      "Use MorphSVGPlugin.convertToPath() to convert shapes to paths",
      "Requires Club GreenSock membership (not free)",
      "MorphSVGPlugin.findShapeIndex() helps find best morph points",
    ],
  },
  {
    id: "transform-3d",
    name: "3D Transforms",
    category: "Transform",
    difficulty: "Intermediate",
    description:
      "Rotate and transform elements in three-dimensional space using CSS 3D transforms. Creates depth and dimensionality through perspective and rotation.",
    plugins: [],
    code: `gsap.to(element, {
  rotateX: 360,
  rotateY: 360,
  rotateZ: 360,
  transformPerspective: 1000,
  transformOrigin: "center center",
  duration: 1.5,
  ease: "power2.inOut"
});`,
    parameters: [
      {
        name: "rotateX/Y/Z",
        type: "Number",
        default: "0",
        description: "Rotation in degrees around X, Y, or Z axis",
      },
      {
        name: "transformPerspective",
        type: "Number",
        default: "0",
        description: "3D perspective distance in pixels (800-1200 typical)",
      },
      {
        name: "transformOrigin",
        type: "String",
        default: '"50% 50%"',
        description: "Point around which transform occurs",
      },
    ],
    useCases: [
      "Card flip interactions (flip to reveal back)",
      "Product showcases with 360° rotation views",
      "Creative page transitions with depth",
      "Interactive 3D object presentations",
    ],
    notes: [
      "Set transform-style: preserve-3d on parent for nested 3D",
      "Use backface-visibility: hidden to hide element reverse side",
      "Perspective values: smaller = more dramatic, larger = subtle",
      "Combine rotateX/Y for complex 3D movements",
    ],
  },
  {
    id: "draggable",
    name: "Draggable with Physics",
    category: "Interaction",
    difficulty: "Advanced",
    description:
      "Enable drag interactions with realistic physics including inertia, bounds, and snap points. Requires Draggable and InertiaPlugin (Club GreenSock premium).",
    plugins: ["Draggable", "InertiaPlugin"],
    code: `Draggable.create(element, {
  type: "x,y",
  inertia: true,
  bounds: container,
  edgeResistance: 0.65,
  snap: {
    x: (endValue) => Math.round(endValue / 50) * 50
  },
  onDrag: function() {
    console.log(this.x, this.y);
  }
});`,
    parameters: [
      {
        name: "type",
        type: "String",
        default: '"x,y"',
        description: 'Drag constraint: "x,y", "x", "y", "rotation", "scroll"',
      },
      {
        name: "inertia",
        type: "Boolean",
        default: "false",
        description: "Enable momentum-based throwing after release",
      },
      {
        name: "bounds",
        type: "Element | Object",
        default: "null",
        description: "Boundary constraints for drag movement",
      },
      {
        name: "snap",
        type: "Object | Function",
        default: "null",
        description: "Snap points or function to calculate snap positions",
      },
    ],
    useCases: [
      "Custom sliders and range controls",
      "Sortable lists with drag-and-drop",
      "Interactive maps with pan functionality",
      "Game elements with physics-based movement",
    ],
    notes: [
      "InertiaPlugin provides realistic momentum after release",
      "Use edgeResistance (0-1) for soft boundary behavior",
      "Combine with collision detection for advanced interactions",
      "Requires Club GreenSock membership for InertiaPlugin",
    ],
  },
  {
    id: "custom-easing",
    name: "Custom Easing Functions",
    category: "Timing",
    difficulty: "Beginner",
    description:
      "Control animation pacing with built-in or custom easing functions. Easing determines acceleration and deceleration throughout the animation timeline.",
    plugins: ["CustomEase"],
    code: `// Built-in easings
gsap.to(element, {
  x: 100,
  ease: "power2.out",
  duration: 1
});

// Custom bezier
gsap.to(element, {
  x: 100,
  ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  duration: 1
});

// CustomEase (Club plugin)
CustomEase.create("hop", "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1");`,
    parameters: [
      {
        name: "ease",
        type: "String | Function",
        default: '"power1.out"',
        description: "Easing function or custom bezier curve",
      },
      {
        name: "duration",
        type: "Number",
        default: "0.5",
        description: "Animation duration in seconds",
      },
    ],
    useCases: [
      "Bounce effects for playful UI interactions",
      "Elastic movements for organic feel",
      "Back easings for attention-grabbing entrances",
      "Custom curves for brand-specific motion design",
    ],
    notes: [
      "power1/2/3/4: varying acceleration strengths",
      "elastic: spring-like oscillation (adjust parameters)",
      "back: overshoots then settles",
      "bounce: bounces at end of animation",
      "Use ease visualizer at greensock.com/ease-visualizer",
    ],
  },
  {
    id: "motion-path",
    name: "Motion Path Animation",
    category: "SVG",
    difficulty: "Advanced",
    description:
      "Animate elements along SVG paths with automatic rotation. Creates complex curved motion trajectories for sophisticated movement design.",
    plugins: ["MotionPathPlugin"],
    code: `gsap.to(element, {
  duration: 5,
  motionPath: {
    path: "#svg-path",
    align: "#svg-path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
    start: 0,
    end: 1
  },
  ease: "power1.inOut"
});`,
    parameters: [
      {
        name: "motionPath.path",
        type: "String | Element | Array",
        default: "null",
        description: "SVG path or array of points defining motion trajectory",
      },
      {
        name: "motionPath.autoRotate",
        type: "Boolean | Number",
        default: "false",
        description: "Auto-rotate element to face path direction (or add offset degrees)",
      },
      {
        name: "motionPath.align",
        type: "String | Element",
        default: "null",
        description: "Path to align element along",
      },
      {
        name: "motionPath.start/end",
        type: "Number",
        default: "0 / 1",
        description: "Start and end position on path (0-1)",
      },
    ],
    useCases: [
      "Animated illustrations with moving elements",
      "Complex loading indicators and progress bars",
      "Interactive tours with guided cursor movement",
      "Decorative motion graphics and transitions",
    ],
    notes: [
      "Use SVG editing tools to create complex paths",
      "autoRotate: true orients element tangent to path",
      "alignOrigin sets rotation pivot point [x, y] (0-1)",
      "Combine with other properties for rich motion design",
    ],
  },
  {
    id: "scrollsmoother",
    name: "ScrollSmoother",
    category: "Scroll",
    difficulty: "Advanced",
    description:
      "Create buttery-smooth scrolling with momentum and easing. Enhances native scroll with customizable smoothness and speed. Requires Club GreenSock membership.",
    plugins: ["ScrollSmoother", "ScrollTrigger"],
    code: `const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
  normalizeScroll: true
});

// Control methods
smoother.scrollTo(target, true);
smoother.paused(true);`,
    parameters: [
      {
        name: "smooth",
        type: "Number",
        default: "1",
        description: "Smoothness amount (higher = smoother, 0 = native)",
      },
      {
        name: "effects",
        type: "Boolean",
        default: "false",
        description: "Enable data-speed and data-lag parallax effects",
      },
      {
        name: "normalizeScroll",
        type: "Boolean",
        default: "false",
        description: "Normalize scroll behavior across browsers/devices",
      },
    ],
    useCases: [
      "Premium portfolio sites with refined scrolling",
      "Long-form content with enhanced reading experience",
      "Showcase sites where scroll feel matters",
      "Applications requiring precise scroll control",
    ],
    notes: [
      "Requires specific HTML structure (wrapper + content)",
      "Works with ScrollTrigger for advanced effects",
      "data-speed attribute on elements for parallax",
      "Club GreenSock membership required",
      "Test thoroughly on touch devices",
    ],
  },
  // CINEMATOGRAPHY TECHNIQUES
  {
    id: "dolly-zoom",
    name: "Dolly Zoom (Vertigo Effect)",
    category: "Cinematography",
    difficulty: "Advanced",
    description:
      "The famous Hitchcock effect where the camera dollies while zooming in the opposite direction, creating a disorienting perspective shift. Background appears to change while subject stays same size.",
    plugins: ["ScrollTrigger"],
    code: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});

// Move camera closer while zooming out
tl.to(camera, {
  z: 200,
  duration: 1
})
.to(foreground, {
  scale: 0.5,
  duration: 1
}, "<")
.to(background, {
  scale: 1.5,
  duration: 1
}, "<");`,
    parameters: [
      {
        name: "z",
        type: "Number",
        default: "0",
        description: "Camera Z-axis movement (dolly in/out)",
      },
      {
        name: "scale",
        type: "Number",
        default: "1",
        description: "Zoom compensation to keep subject size constant",
      },
      {
        name: "scrub",
        type: "Number",
        default: "1",
        description: "Smoothness of scroll-linked animation",
      },
    ],
    useCases: [
      "Dramatic reveals with psychological impact",
      "Product showcases with cinematic flair",
      "Storytelling moments requiring emotional emphasis",
      "Portfolio hero sections with memorable entrance",
    ],
    notes: [
      "Made famous by Hitchcock in Vertigo (1958)",
      "Creates feeling of unease or realization",
      "Requires careful balance of zoom and dolly",
      "Works best with clear foreground/background separation",
    ],
  },
  {
    id: "whip-pan",
    name: "Whip Pan Transition",
    category: "Cinematography",
    difficulty: "Intermediate",
    description:
      "Rapid camera pan that blurs the scene, used as a dynamic transition between shots. Creates energy and maintains pacing in action sequences or quick cuts.",
    plugins: [],
    code: `const whipPan = (from, to) => {
  const tl = gsap.timeline();

  tl.to(from, {
    x: -window.innerWidth,
    duration: 0.4,
    ease: "power4.in",
    filter: "blur(20px)"
  })
  .to(to, {
    x: 0,
    duration: 0.4,
    ease: "power4.out",
    filter: "blur(0px)"
  }, "-=0.2")
  .set(from, { x: 0 });

  return tl;
};

// Usage
whipPan(currentSection, nextSection);`,
    parameters: [
      {
        name: "duration",
        type: "Number",
        default: "0.4",
        description: "Speed of pan (shorter = more aggressive)",
      },
      {
        name: "blur",
        type: "String",
        default: '"blur(20px)"',
        description: "Motion blur intensity during transition",
      },
      {
        name: "ease",
        type: "String",
        default: '"power4"',
        description: "Acceleration curve for whip effect",
      },
    ],
    useCases: [
      "Page transitions with energy and momentum",
      "Section changes in single-page applications",
      "Image gallery navigation with style",
      "Video-style storytelling interfaces",
    ],
    notes: [
      "Popular in action films and music videos",
      "Overlap animations by 20% for smooth transition",
      "Add motion blur for realistic camera movement",
      "Can pan horizontally or vertically",
    ],
  },
  {
    id: "rack-focus",
    name: "Rack Focus (Focal Shift)",
    category: "Cinematography",
    difficulty: "Intermediate",
    description:
      "Shift focus from one subject to another by changing depth of field, blurring foreground while sharpening background or vice versa. Directs viewer attention cinematically.",
    plugins: [],
    code: `const rackFocus = gsap.timeline();

rackFocus
  .to(foreground, {
    filter: "blur(8px)",
    scale: 0.98,
    opacity: 0.6,
    duration: 1,
    ease: "power2.inOut"
  })
  .to(background, {
    filter: "blur(0px)",
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  }, "<");`,
    parameters: [
      {
        name: "blur",
        type: "String",
        default: '"blur(8px)"',
        description: "Depth of field blur amount",
      },
      {
        name: "scale",
        type: "Number",
        default: "0.98",
        description: "Subtle scale to enhance depth perception",
      },
      {
        name: "opacity",
        type: "Number",
        default: "0.6",
        description: "Reduce prominence of out-of-focus elements",
      },
    ],
    useCases: [
      "Multi-layer storytelling interfaces",
      "Product reveals with dramatic timing",
      "Form transitions guiding user attention",
      "Interactive narratives with focal shifts",
    ],
    notes: [
      "Mimics cinematographer pulling focus",
      "Combine with subtle scale for depth enhancement",
      "Use to guide user attention between elements",
      "Works well with parallax for layered scenes",
    ],
  },
  {
    id: "ken-burns",
    name: "Ken Burns Effect",
    category: "Cinematography",
    difficulty: "Beginner",
    description:
      "Slow zoom and pan across static images to create movement and reveal details. Named after documentary filmmaker Ken Burns who popularized the technique.",
    plugins: [],
    code: `gsap.to(image, {
  scale: 1.3,
  x: -50,
  y: -30,
  duration: 10,
  ease: "none",
  repeat: -1,
  yoyo: true
});`,
    parameters: [
      {
        name: "scale",
        type: "Number",
        default: "1.3",
        description: "Zoom amount (1.2-1.5 typical)",
      },
      {
        name: "x, y",
        type: "Number",
        default: "0",
        description: "Pan direction and distance",
      },
      {
        name: "duration",
        type: "Number",
        default: "10",
        description: "Slow movement duration in seconds",
      },
    ],
    useCases: [
      "Background images in hero sections",
      "Portfolio image galleries",
      "Documentary-style storytelling",
      "Testimonial sections with photography",
    ],
    notes: [
      "Keep movement slow (8-15 seconds typical)",
      "Ensure images are high-resolution for zoom",
      "Combine scale and translation for best effect",
      "Use yoyo for continuous subtle movement",
    ],
  },
  {
    id: "cinemagraph",
    name: "Cinemagraph Loop",
    category: "Cinematography",
    difficulty: "Advanced",
    description:
      "Still photograph with minor repeated movement, creating a seamless infinite loop. Most of the frame is frozen while specific elements animate subtly.",
    plugins: [],
    code: `// Mask for animated region
const mask = gsap.timeline({ repeat: -1 });

mask.to(animatedRegion, {
  backgroundPosition: "0% 100%",
  duration: 3,
  ease: "none"
})
.to(animatedRegion, {
  backgroundPosition: "0% 0%",
  duration: 3,
  ease: "none"
});

// Subtle overlay movement
gsap.to(overlay, {
  opacity: 0.3,
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});`,
    parameters: [
      {
        name: "backgroundPosition",
        type: "String",
        default: '"0% 0%"',
        description: "Animate texture or gradient across region",
      },
      {
        name: "duration",
        type: "Number",
        default: "3",
        description: "Loop cycle duration (slower is more subtle)",
      },
      {
        name: "ease",
        type: "String",
        default: '"none"',
        description: "Linear for seamless loops",
      },
    ],
    useCases: [
      "Hero sections with subtle life",
      "Background ambiance without distraction",
      "Product photography with highlight movement",
      "Atmospheric portfolio pieces",
    ],
    notes: [
      "Keep movement extremely subtle",
      "Use masks to isolate animated regions",
      "Ensure perfect loop points for seamlessness",
      "Popular on high-end brand websites",
    ],
  },
  {
    id: "dutch-angle",
    name: "Dutch Angle (Tilted Frame)",
    category: "Cinematography",
    difficulty: "Beginner",
    description:
      "Camera tilted on its roll axis, creating diagonal horizon line. Conveys unease, tension, or psychological disorientation. Also called canted angle.",
    plugins: ["ScrollTrigger"],
    code: `gsap.to(container, {
  rotation: -5,
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: section,
    start: "top center",
    end: "bottom center",
    scrub: 1,
    onEnter: () => {
      gsap.to(container, {
        rotation: -5,
        duration: 1,
        ease: "power2.out"
      });
    }
  }
});`,
    parameters: [
      {
        name: "rotation",
        type: "Number",
        default: "-5",
        description: "Tilt angle in degrees (3-15 typical)",
      },
      {
        name: "transformOrigin",
        type: "String",
        default: '"center center"',
        description: "Rotation pivot point",
      },
    ],
    useCases: [
      "Error or warning states with visual tension",
      "Creative portfolio sections with edge",
      "Horror or thriller themed content",
      "Drawing attention to unconventional ideas",
    ],
    notes: [
      "Used in noir, horror, and action films",
      "Subtle angles (3-8°) feel unsettling",
      "Extreme angles (15-45°) are dramatic",
      "Can animate tilt to increase tension progressively",
    ],
  },
  {
    id: "speed-ramp",
    name: "Speed Ramping",
    category: "Cinematography",
    difficulty: "Intermediate",
    description:
      "Dynamically change animation speed mid-sequence, ramping from slow-motion to real-time or vice versa. Creates dramatic emphasis and smooth pace variation.",
    plugins: [],
    code: `const timeline = gsap.timeline();

timeline
  .to(element, {
    x: 100,
    duration: 2,
    ease: "slow(0.5, 0.8, false)"
  })
  .to(element, {
    x: 400,
    duration: 0.3,
    ease: "power4.in"
  })
  .to(element, {
    x: 600,
    duration: 1.5,
    ease: "slow(0.7, 0.8, false)"
  });`,
    parameters: [
      {
        name: "duration",
        type: "Number",
        default: "1",
        description: "Duration of each speed segment",
      },
      {
        name: "ease",
        type: "String",
        default: '"slow(0.5, 0.8)"',
        description: "Slow-motion ease or speed-up ease",
      },
    ],
    useCases: [
      "Action sequences with dramatic timing",
      "Product reveals with varied pacing",
      "Sports or motion-focused content",
      "Highlighting key moments in animations",
    ],
    notes: [
      "Popular in action films and sports videos",
      "Use slow() ease for slow-motion segments",
      "Combine with motion blur for realism",
      "Great for emphasizing specific moments",
    ],
  },
  {
    id: "parallax-depth",
    name: "Parallax Depth Layers",
    category: "Cinematography",
    difficulty: "Advanced",
    description:
      "Multiple layers moving at different speeds to create depth perception, mimicking how closer objects move faster than distant ones during camera movement.",
    plugins: ["ScrollTrigger"],
    code: `const layers = [
  { element: ".layer-far", speed: 0.3 },
  { element: ".layer-mid", speed: 0.6 },
  { element: ".layer-near", speed: 1.0 }
];

layers.forEach(({ element, speed }) => {
  gsap.to(element, {
    y: -200 * speed,
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
});`,
    parameters: [
      {
        name: "speed",
        type: "Number",
        default: "1.0",
        description: "Layer movement multiplier (0-1, lower = farther)",
      },
      {
        name: "y",
        type: "Number",
        default: "-200",
        description: "Total vertical travel distance",
      },
    ],
    useCases: [
      "Immersive hero sections with depth",
      "Storytelling interfaces with spatial layers",
      "Game-style landing pages",
      "Interactive narratives with environment",
    ],
    notes: [
      "3-5 layers optimal for performance",
      "Closer layers move faster (higher speed values)",
      "Use with scroll for natural depth perception",
      "Add atmospheric perspective for realism",
    ],
  },
  {
    id: "crash-zoom",
    name: "Crash Zoom",
    category: "Cinematography",
    difficulty: "Intermediate",
    description:
      "Rapid aggressive zoom, often combined with a hard cut. Creates shock, surprise, or comedic emphasis. Popular in horror and comedy genres.",
    plugins: [],
    code: `const crashZoom = gsap.timeline();

crashZoom
  .to(element, {
    scale: 3,
    duration: 0.3,
    ease: "power4.in",
    filter: "blur(2px) brightness(1.2)"
  })
  .to(element, {
    scale: 1,
    duration: 0,
    filter: "blur(0px) brightness(1)"
  });`,
    parameters: [
      {
        name: "scale",
        type: "Number",
        default: "3",
        description: "Zoom magnitude (2-5 typical)",
      },
      {
        name: "duration",
        type: "Number",
        default: "0.3",
        description: "Speed of zoom (0.2-0.4 typical)",
      },
      {
        name: "ease",
        type: "String",
        default: '"power4.in"',
        description: "Aggressive acceleration curve",
      },
    ],
    useCases: [
      "Call-to-action emphasis",
      "Error state attention-grabbers",
      "Comedic or dramatic reveals",
      "Notification or alert animations",
    ],
    notes: [
      "Add slight blur for motion realism",
      "Often followed by hard cut or reset",
      "Used in Sam Raimi films and comedies",
      "Combine with camera shake for intensity",
    ],
  },
  {
    id: "light-leak",
    name: "Light Leak Transition",
    category: "Cinematography",
    difficulty: "Advanced",
    description:
      "Simulate light bleeding into camera lens during transitions, creating organic film-quality feel. Often used in romantic or nostalgic contexts.",
    plugins: [],
    code: `const lightLeak = gsap.timeline();

lightLeak
  .fromTo(overlay,
    {
      opacity: 0,
      background: "radial-gradient(circle, rgba(255,200,100,0.8) 0%, transparent 70%)",
      scale: 0.5
    },
    {
      opacity: 1,
      scale: 2,
      duration: 0.6,
      ease: "power2.out"
    }
  )
  .to(currentScene, {
    opacity: 0,
    duration: 0.3
  }, "-=0.3")
  .to(nextScene, {
    opacity: 1,
    duration: 0.4
  }, "-=0.2")
  .to(overlay, {
    opacity: 0,
    duration: 0.5
  }, "-=0.2");`,
    parameters: [
      {
        name: "gradient",
        type: "String",
        default: '"radial-gradient(...)"',
        description: "Color and shape of light leak",
      },
      {
        name: "scale",
        type: "Number",
        default: "2",
        description: "Expansion of light source",
      },
    ],
    useCases: [
      "Romantic or nostalgic scene transitions",
      "Photo gallery navigation",
      "Brand storytelling with warmth",
      "Video-style page transitions",
    ],
    notes: [
      "Popular in wedding films and lifestyle brands",
      "Use warm colors (yellow, orange) for authenticity",
      "Radial gradients work best",
      "Combine with slight color grading shift",
    ],
  },
  {
    id: "holographic-card",
    name: "Holographic 3D Card",
    category: "Interaction",
    difficulty: "Intermediate",
    description:
      "A premium 3D card effect that responds to mouse movement with realistic perspective, parallax depth, and dynamic glare lighting. Creates a tangible, high-end feel.",
    plugins: [],
    code: `const handleMouseMove = (e) => {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Calculate rotation based on mouse position
  const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -15;
  const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    duration: 0.5,
    ease: "power2.out",
    transformPerspective: 1000
  });

  // Parallax content
  gsap.to(content, {
    x: (e.clientX - centerX) * 0.1,
    y: (e.clientY - centerY) * 0.1,
    duration: 0.5
  });
};`,
    parameters: [
      {
        name: "rotateX/Y",
        type: "Number",
        default: "15",
        description: "Maximum rotation angle in degrees",
      },
      {
        name: "perspective",
        type: "Number",
        default: "1000",
        description: "3D perspective depth in pixels",
      },
      {
        name: "glareOpacity",
        type: "Number",
        default: "0.6",
        description: "Maximum opacity of the glare effect",
      },
    ],
    useCases: [
      "Premium product cards",
      "Credit card or membership displays",
      "Feature highlights in landing pages",
      "Interactive portfolio project cards",
    ],
    notes: [
      "Use transform-style: preserve-3d for nested 3D elements",
      "Add a glare layer with mix-blend-mode: overlay for realism",
      "Smooth return to center on mouse leave using elastic ease",
      "Optimize performance with will-change: transform",
    ],
  },
  {
    id: "kinetic-typography",
    name: "Kinetic Typography",
    category: "Text",
    difficulty: "Advanced",
    description:
      "Text that reacts physically to mouse velocity, creating a fluid, organic feel. Uses skew and translation based on cursor speed to simulate inertia and weight.",
    plugins: [],
    code: `const animate = () => {
  // Calculate velocity
  velocity.x = mouse.x - lastMouse.x;
  
  // Apply skew based on velocity
  const skewX = velocity.x * 0.1;
  const clampedSkewX = Math.max(Math.min(skewX, 15), -15);

  textRefs.current.forEach((text, index) => {
    // Stagger effect based on index
    gsap.to(text, {
      skewX: -clampedSkewX,
      x: velocity.x * 0.5 * (1 + index * 0.2), // Parallax
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  requestAnimationFrame(animate);
};`,
    parameters: [
      {
        name: "skewFactor",
        type: "Number",
        default: "0.1",
        description: "Multiplier for velocity-to-skew conversion",
      },
      {
        name: "maxSkew",
        type: "Number",
        default: "15",
        description: "Maximum skew angle in degrees",
      },
      {
        name: "parallax",
        type: "Number",
        default: "0.2",
        description: "Movement difference between lines",
      },
    ],
    useCases: [
      "Hero section headlines",
      "Creative agency portfolios",
      "Interactive 404 pages",
      "Section headers that demand attention",
    ],
    notes: [
      "Use requestAnimationFrame for smooth velocity calculation",
      "Clamp skew values to prevent text from becoming unreadable",
      "Add 'overwrite: auto' to prevent GSAP conflict on rapid updates",
      "Combine with mix-blend-mode for extra visual flair",
    ],
  },
  {
    id: "interactive-marquee",
    name: "Interactive Marquee",
    category: "Scroll",
    difficulty: "Intermediate",
    description:
      "Infinite scrolling text that responds to scroll direction and velocity. Accelerates when scrolling fast and reverses direction naturally.",
    plugins: ["ScrollTrigger"],
    code: `ScrollTrigger.create({
  trigger: container,
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const speed = Math.max(Math.abs(velocity / 1000), 1);
    
    // Change direction based on scroll
    if (self.direction !== 0) {
      direction = self.direction === 1 ? -1 : 1;
    }

    // Skew effect
    gsap.to(text, {
      skewX: -velocity / 200,
      overwrite: "auto"
    });

    // Boost speed temporarily
    xPercent += (0.1 * direction) * speed;
  }
});`,
    parameters: [
      {
        name: "baseSpeed",
        type: "Number",
        default: "0.1",
        description: "Base scrolling speed",
      },
      {
        name: "velocityMultiplier",
        type: "Number",
        default: "1000",
        description: "Divisor for scroll velocity to speed conversion",
      },
      {
        name: "skewIntensity",
        type: "Number",
        default: "200",
        description: "Divisor for velocity to skew conversion",
      },
    ],
    useCases: [
      "Brand tickers and partner logos",
      "Large typography sections",
      "News tickers or announcement bars",
      "Footer elements",
    ],
    notes: [
      "Duplicate content to ensure seamless infinite loop",
      "Use will-change: transform for performance",
      "Handle resize events to recalculate bounds",
      "Reset position when it goes off-screen",
    ],
  }
];
