# Magnetic Card Deck

A stunning interactive 3D card stack component featuring magnetic physics, glassmorphism design, and smooth GSAP animations.

## ✨ Features

### Visual Design
- **Glassmorphism**: Frosted glass effect with backdrop blur and subtle transparency
- **3D Depth**: Perspective transforms creating layered card stacking
- **Gradient Glows**: Smooth color transitions with ambient lighting effects
- **Holographic Overlay**: Shimmer effect on hover for premium feel

### Interactions
- **Magnetic Physics**: Cards respond to cursor proximity with realistic attraction
- **Expand/Collapse**: Click cards to bring them forward or return to stack
- **Deck Cycling**: Navigate through cards with Previous/Next controls
- **Hover Effects**: Dynamic scaling and rotation based on mouse position

### Technical Implementation
- **GSAP Animations**: 60fps smooth animations with custom easing
- **TypeScript**: Fully typed for better development experience
- **Responsive**: Works across different screen sizes
- **Performance**: Optimized with proper cleanup and event handling

## 🎯 Use Cases

Perfect for:
- Portfolio showcases
- Product feature highlights
- Service presentations
- Team member profiles
- Project galleries
- Case study displays

## 🔧 Props & Customization

The component accepts an optional `cards` prop to display custom content:

```tsx
interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;  // Tailwind gradient classes
  icon: string;       // Emoji or icon
}
```

## 🎨 Design Tokens

### Gradients
- Violet/Purple/Fuchsia: Tech/AI themes
- Cyan/Blue/Indigo: Professional/Corporate
- Emerald/Teal/Cyan: Data/Analytics
- Rose/Pink/Purple: Creative/Design

### Animations
- **Magnetic Effect**: 300px detection radius, 0.3x force multiplier
- **Rotation**: ±15° based on cursor position
- **Scale**: 1.0 - 1.05 on interaction
- **Duration**: 0.4-0.6s with power2.out easing

## 📊 Technical Details

### Dependencies
- React 19+
- GSAP 3.13+
- Tailwind CSS 3.4+
- TypeScript 5+

### Performance
- 60fps animations
- Cleanup on unmount
- Debounced mouse events
- Optimized re-renders

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+

## 🚀 Usage Examples

### Basic Usage
```tsx
import MagneticCardDeck from '@/components/animations/MagneticCardDeck';

export default function MyPage() {
  return <MagneticCardDeck />;
}
```

### In Showcase
Visit `/showcase` and select "Cards" → "Magnetic Card Deck" to see it in action.

### Dedicated Page
Visit `/magnetic-deck` for a full-page demo with technical details.

## 🎬 Animation Breakdown

### Initialization
1. Cards fade in with stagger (0.1s delay each)
2. 3D transforms applied (z-axis, rotation)
3. Event listeners attached

### Magnetic Effect
1. Calculate cursor distance from card center
2. Apply force based on proximity (max 300px)
3. Translate and rotate with GSAP
4. Reset on mouse leave

### Expand Animation
1. Selected card scales and moves forward (z: 100)
2. Cards before/after move backward with rotation
3. Click again to collapse back to stack

### Deck Cycling
1. Shift card order in array
2. Animate z-position transitions
3. Reorder refs for next interaction

## 🎓 Learning Points

This component demonstrates:
- Advanced GSAP timeline orchestration
- 3D CSS transforms with perspective
- Magnetic physics calculations
- Glassmorphism design patterns
- React refs management
- TypeScript interface design
- Performance optimization techniques

## 🔮 Future Enhancements

Potential additions:
- Drag to reorder cards
- Swipe gestures for mobile
- Auto-play carousel mode
- Keyboard navigation
- Custom card templates
- Animation speed controls
- Accessibility improvements (ARIA labels, keyboard focus)

## 📝 Notes

- Best viewed on desktop for full magnetic effect
- Mobile view uses simplified interactions
- Requires hardware acceleration for smooth 3D
- Dark mode optimized by default

---

**Design Style**: Modern, Premium, Interactive
**Complexity**: Intermediate-Advanced
**Animation Type**: Physics-based, Interactive 3D
