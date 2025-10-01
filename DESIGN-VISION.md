# 🎨 Bakım Pusulası - Design Vision Document

## 🎯 Design Philosophy: "Scientific Wonder"

### Core Principles
1. **Mobile-First Performance**: <200ms interaction, <3s FCP
2. **3D Depth Without Compromise**: Hardware-accelerated, 60fps on mobile
3. **Accessible Wow**: WCAG 2.1 AA + reduced-motion support
4. **Progressive Enhancement**: Works without JS, amazing with it

---

## 🌊 Visual Language

### Color System
```
Primary Gradient: Teal 600 → Blue 600 → Purple 600
Accent: Amber 400 → Orange 500 (warmth, hope)
Neutral: Gray 50 → 900 (depth, contrast)
Success: Emerald 500 | Warning: Yellow 500 | Error: Red 500

Dark Mode: Slate 950 base, neon accents
```

### Typography
```
Headings: 'Inter Variable', kinetic sizing (clamp)
  - H1: 2.5rem → 5rem (mobile → desktop)
  - H2: 2rem → 3.5rem
  - H3: 1.5rem → 2.25rem

Body: 'Inter', 1rem → 1.125rem, line-height 1.6
Mono: 'Fira Code', for data/stats
```

### 3D Elements
- **Hero Background**: Floating gradient mesh (low-poly)
- **Cards**: Tilt-on-hover (max 15deg), depth shadows
- **Particles**: Reactive dots (mouse/scroll/touch)
- **Transitions**: Morph between states (page transitions)

---

## 📱 Mobile-First Breakpoints

```
xs:  0-639px    (phones, primary target)
sm:  640-767px  (large phones)
md:  768-1023px (tablets)
lg:  1024-1279px (laptops)
xl:  1280+px     (desktops)
```

**Mobile Optimizations:**
- Touch targets: min 44x44px
- Gestures: swipe (nav), pull (refresh), pinch (zoom-disabled)
- 3D: Reduced particle count, lower poly models
- Fonts: System fonts fallback for performance

---

## 🎭 Animation Strategy

### Micro-interactions (Framer Motion)
- Button press: scale(0.95) + haptic
- Card hover: y(-8px) + shadow-2xl
- Input focus: ring-4 + glow
- Page transition: fade + slide (200ms)

### 3D Animations (Three.js / React Three Fiber)
- Hero mesh: Slow rotation (60s cycle), mouse parallax
- Particles: Float + react to scroll velocity
- Card tilt: Mouse position (desktop), gyroscope (mobile)

### Scroll Reveals
- Fade-in-up: 0.6s ease-out, threshold 0.2
- Stagger children: 100ms delay
- Progress bar: Smooth width transition

---

## 🏗️ Component Architecture

```
/components
  /3d
    - GradientMesh.tsx       (Hero background)
    - ParticleField.tsx      (Interactive particles)
    - Card3D.tsx             (Tilt card wrapper)
  
  /layout
    - FloatingNav.tsx        (Blur backdrop nav)
    - PageTransition.tsx     (Route animations)
  
  /ui
    - Button.tsx             (Enhanced with morphs)
    - Card.tsx               (3D tilt integration)
    - KineticText.tsx        (Animated typography)
    - GlassmorphCard.tsx     (Frosted glass effect)
  
  /analytics
    - PublicDashboard.tsx    (Open access stats)
    - AnimatedCharts.tsx     (Recharts + motion)
```

---

## ⚡ Performance Budget

| Metric | Target | Max |
|--------|--------|-----|
| FCP | <1.5s | 2s |
| LCP | <2s | 3s |
| TTI | <3s | 4s |
| CLS | <0.05 | 0.1 |
| FID | <50ms | 100ms |
| Bundle | <200KB | 300KB (gzip) |

**3D Performance:**
- Three.js: Code-split, lazy load
- Particle count: 50 (mobile) → 200 (desktop)
- Render target: 30fps (mobile), 60fps (desktop)

---

## ♿ Accessibility

1. **Keyboard Navigation**: All interactive elements focusable
2. **Screen Readers**: ARIA labels, semantic HTML
3. **Reduced Motion**: `prefers-reduced-motion` → disable 3D
4. **High Contrast**: `prefers-contrast: high` → bold borders
5. **Color Blind Safe**: Icons + text labels, not color alone

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Quick Wins)
- [ ] Remove auto-save
- [ ] Public analytics route
- [ ] Install Three.js dependencies

### Phase 2: 3D Core
- [ ] GradientMesh background
- [ ] ParticleField component
- [ ] Card3D with tilt

### Phase 3: Hero Redesign
- [ ] 3D background integration
- [ ] Kinetic typography
- [ ] Glassmorphism cards

### Phase 4: Polish
- [ ] Floating navigation
- [ ] Page transitions
- [ ] Mobile gestures
- [ ] Dark mode toggle

### Phase 5: Optimization
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Image optimization
- [ ] Lighthouse audit (95+ score)

---

## 🎨 Inspiration References

- **Apple.com**: Product cards, smooth scrolling
- **Stripe.com**: Gradient backgrounds, clean UI
- **Vercel.com**: Dark mode, typography
- **Awwwards winners**: 3D interactions, animations

---

**Next Action:** Install Three.js → Build GradientMesh → Integrate into Hero

