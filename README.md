# GNS Fine Jewellery - Web App 💍✨

A premium, modern 2026 eCommerce experience for luxury fine jewellery. Built with cutting-edge web technologies to deliver an immersive and performant user experience.

## ✨ Key Features

- **3D Particle Animations:** Stunning "Scroll-to-Assemble" WebGL particle ring effects on the homepage using Three.js and GSAP.
- **Dynamic Category Heroes:** Unique 3D particle shapes (rings, necklaces, bracelets, earrings) for each collection page with realistic UnrealBloom glows.
- **Premium 2026 Aesthetics:** High-end dark theme UI with glassmorphism, glowing accents, custom radial gradients, and elegant typography (Cormorant Garamond & Outfit).
- **Responsive Layout:** Perfectly scales from mobile to high-resolution desktop screens, with auto-managed header padding for zero overlap.
- **Performant Rendering:** Optimized Three.js particle counts and ACESFilmic tone-mapping for buttery smooth 60FPS scrolling.

## 🛠️ Technology Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API) + [Quasar Framework](https://quasar.dev/)
- **3D & Rendering:** [Three.js](https://threejs.org/) + WebGL Post-Processing (`EffectComposer`, `UnrealBloomPass`)
- **Animation:** [GSAP (GreenSock)](https://greensock.com/gsap/) + ScrollTrigger
- **Styling:** Custom Vanilla CSS with modern flexbox/grid
- **Build Tool:** Vite

## 🚀 Getting Started

### Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode

(Hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

## 🎨 UI/UX Highlights

- **Navbar:** Sticky, blurred glassmorphic header that floats elegantly over content.
- **Hover Effects:** Dynamic glowing borders, gold accent lines, and scale animations.
- **Typography:** Harmonious blend of classic serifs for titles and clean sans-serifs for metadata.
