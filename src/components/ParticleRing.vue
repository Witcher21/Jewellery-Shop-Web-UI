<template>
  <div ref="containerRef" class="particle-ring-container">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" :class="{ hidden: scrollProgress > 0.05 }">
      <div class="scroll-icon">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
      </div>
      <span class="scroll-text">Scroll to Discover</span>
    </div>

    <!-- Brand text -->
    <div class="brand-overlay" :style="{ opacity: brandOpacity }">
      <h1 class="brand-title">GNS</h1>
      <p class="brand-subtitle">FINE JEWELLERY</p>
    </div>

    <!-- Product info → revealed via GSAP when ring assembles -->
    <div ref="productInfoRef" class="product-info">
      <p class="product-tag">SIGNATURE COLLECTION</p>
      <h2 class="product-name">The Eternity Ring</h2>
      <p class="product-desc">
        Hand-crafted in 24K gold, a timeless piece that captures the essence of forever.
      </p>
      <button class="product-cta" @click="goToCollections">
        Explore Collection
        <span class="cta-shine"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const containerRef = ref(null)
const canvasRef = ref(null)
const productInfoRef = ref(null)
const scrollProgress = ref(0)

const brandOpacity = computed(() => {
  if (scrollProgress.value < 0.1) return 1
  if (scrollProgress.value < 0.3) return 1 - (scrollProgress.value - 0.1) / 0.2
  return 0
})

function goToCollections() {
  router.push('/collections/rings')
}

// ─── Three.js state ──────────────────────────────────────
let scene, camera, renderer, composer
let particleSystem, solidRing
let initialPositions, targetPositions
let animationFrameId
let scrollTriggerInstance = null
let textTween = null
let textRevealed = false

const PARTICLE_COUNT = 5000

// ─── Glow texture for particles ──────────────────────────
function createGlowTexture() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')

  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0.0, 'rgba(255, 245, 170, 1.00)')
  g.addColorStop(0.08, 'rgba(255, 220, 100, 0.95)')
  g.addColorStop(0.2, 'rgba(212, 175,  55, 0.75)')
  g.addColorStop(0.45, 'rgba(180, 140,  30, 0.30)')
  g.addColorStop(0.75, 'rgba(130,  90,   5, 0.08)')
  g.addColorStop(1.0, 'rgba( 90,  55,   0, 0.00)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)

  // specular core
  const g2 = ctx.createRadialGradient(64, 64, 0, 64, 64, 22)
  g2.addColorStop(0, 'rgba(255,255,230,1.0)')
  g2.addColorStop(1, 'rgba(255,255,230,0.0)')
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, 128, 128)

  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

// ─── Torus target positions ───────────────────────────────
function buildTorusPositions(count) {
  const R = 2.1 // major radius
  const r = 0.38 // tube radius
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI * 2
    arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u)
    arr[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u)
    arr[i * 3 + 2] = r * Math.sin(v)
  }
  return arr
}

function buildScatterPositions(count) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const rad = 5 + Math.random() * 7
    arr[i * 3] = rad * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = rad * Math.cos(phi)
  }
  return arr
}

// ─── Init scene ───────────────────────────────────────────
const NAVBAR_H = 68 // fixed navbar height in px

function initScene() {
  const canvas = canvasRef.value
  const W = window.innerWidth
  const H = window.innerHeight - NAVBAR_H // usable height below navbar

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200)
  camera.position.set(0, 0, 8.5)

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x050505, 1)

  // ── Environment map for PBR gold ──
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  pmrem.dispose()

  // ── Particles ──
  const geo = new THREE.BufferGeometry()
  initialPositions = buildScatterPositions(PARTICLE_COUNT)
  targetPositions = buildTorusPositions(PARTICLE_COUNT)

  geo.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3))

  const sizes = new Float32Array(PARTICLE_COUNT)
  const phases = new Float32Array(PARTICLE_COUNT)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    sizes[i] = Math.random() < 0.07 ? 0.6 + Math.random() * 0.4 : 0.14 + Math.random() * 0.28
    phases[i] = Math.random() * Math.PI * 2
  }
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: createGlowTexture() },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uOpacity: { value: 1.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uProgress;
      uniform float uPixelRatio;
      varying float vAlpha;
      varying float vBright;

      void main() {
        vec4 mv = viewMatrix * modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;

        float shimmer = sin(uTime * 2.8 + aPhase * 6.2831) * 0.18 + 0.82;
        float sz = aSize * mix(0.9, 1.3, uProgress) * shimmer * uPixelRatio;
        gl_PointSize = sz * (320.0 / -mv.z);
        gl_PointSize = max(gl_PointSize, 0.5);

        float depth   = smoothstep(-10.0, 2.5, mv.z);
        float light   = pow(max(dot(normalize(position), vec3(0.6, 0.8, 0.4)), 0.0), 4.0);
        float specular = light * 0.65 * uProgress;

        vAlpha  = mix(0.10, 0.88, uProgress) * depth * shimmer + specular;
        vBright = mix(0.55, 1.4, uProgress) + specular * 1.6;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTexture;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vBright;

      void main() {
        vec4 tex = texture2D(uTexture, gl_PointCoord);
        if (tex.a < 0.01) discard;
        float d   = length(gl_PointCoord - 0.5) * 2.0;
        vec3 core = vec3(1.00, 0.95, 0.65);
        vec3 mid  = vec3(0.83, 0.68, 0.22);
        vec3 edge = vec3(0.52, 0.38, 0.06);
        vec3 col  = mix(core, mix(mid, edge, d), d) * vBright;
        gl_FragColor = vec4(col, tex.a * vAlpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  particleSystem = new THREE.Points(geo, mat)
  scene.add(particleSystem)

  // ── Solid gold ring (fades in when particles assemble) ──
  const ringGeo = new THREE.TorusGeometry(2.1, 0.38, 64, 120)
  const goldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd4af37),
    metalness: 1.0,
    roughness: 0.12,
    envMapIntensity: 2.0,
    transparent: true,
    opacity: 0.0,
  })
  solidRing = new THREE.Mesh(ringGeo, goldMat)
  solidRing.visible = false
  scene.add(solidRing)

  // ── Lighting for the solid ring ──
  const keyLight = new THREE.DirectionalLight(0xfff5d0, 3.0)
  keyLight.position.set(5, 8, 5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xffd580, 1.2)
  fillLight.position.set(-5, -3, 3)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffeebb, 0.8)
  rimLight.position.set(0, -5, -5)
  scene.add(rimLight)

  scene.add(new THREE.AmbientLight(0x221500, 1.0))

  // ── Background dust ──
  const dustGeo = new THREE.BufferGeometry()
  const dPos = new Float32Array(1500 * 3)
  for (let i = 0; i < 1500 * 3; i++) dPos[i] = (Math.random() - 0.5) * 30
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3))
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0x7a5a10,
        size: 0.025,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  )

  // ── Post-processing: UnrealBloom ──
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.55, 0.65, 0.25)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())
}

// ─── Lerp ────────────────────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ─── Text reveal (GSAP) ──────────────────────────────────
function revealText() {
  if (textRevealed || !productInfoRef.value) return
  textRevealed = true
  gsap.fromTo(
    productInfoRef.value,
    { opacity: 0, x: 30, pointerEvents: 'none' },
    {
      opacity: 1,
      x: 0,
      duration: 1.4,
      ease: 'expo.out',
      onComplete: () => {
        productInfoRef.value.style.pointerEvents = 'auto'
      },
    },
  )
  // Stagger child elements
  gsap.fromTo(
    productInfoRef.value.children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'expo.out', delay: 0.2 },
  )
}

function hideText() {
  if (!textRevealed || !productInfoRef.value) return
  textRevealed = false
  gsap.to(productInfoRef.value, {
    opacity: 0,
    x: 30,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      if (productInfoRef.value) productInfoRef.value.style.pointerEvents = 'none'
    },
  })
}

// ─── Animate loop ────────────────────────────────────────
let lastTime = 0
function animate(now = 0) {
  animationFrameId = requestAnimationFrame(animate)
  if (!renderer || !composer) return

  const t = now * 0.001
  const dt = Math.min((now - lastTime) * 0.001, 0.05)
  lastTime = now

  const p = scrollProgress.value
  const ease = easeInOutCubic(p)

  // ── Move particles ──
  const pos = particleSystem.geometry.attributes.position.array
  const speed = 0.035 + ease * 0.055

  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    const flutter = (1 - ease) * Math.sin(t * 0.4 + i * 0.009) * 0.018
    pos[i] = lerp(pos[i], targetPositions[i] + flutter, speed * ease + 0.004)
  }
  particleSystem.geometry.attributes.position.needsUpdate = true
  particleSystem.material.uniforms.uTime.value = t
  particleSystem.material.uniforms.uProgress.value = ease

  // ── Crossfade particles → solid ring ──
  const crossfadeStart = 0.82
  const crossfadeEnd = 0.98
  const crossAlpha = Math.max(
    0,
    Math.min(1, (ease - crossfadeStart) / (crossfadeEnd - crossfadeStart)),
  )

  particleSystem.material.uniforms.uOpacity.value = 1.0 - crossAlpha * 0.85
  solidRing.visible = crossAlpha > 0.01
  solidRing.material.opacity = crossAlpha

  // ── Text reveal ──
  if (ease > 0.92 && !textRevealed) revealText()
  if (ease < 0.8 && textRevealed) hideText()

  // ── Rotation ──
  if (p < 0.5) {
    particleSystem.rotation.y += 0.0014 * dt * 60
    particleSystem.rotation.x = lerp(particleSystem.rotation.x, 0, 0.01)
  } else {
    particleSystem.rotation.y += 0.0028 * ease * dt * 60
    particleSystem.rotation.x = lerp(particleSystem.rotation.x, -0.28, 0.012)
  }
  solidRing.rotation.y = particleSystem.rotation.y
  solidRing.rotation.x = particleSystem.rotation.x

  // ── Camera ──
  camera.position.z = lerp(8.5, 6.0, ease)
  camera.position.y = lerp(0, -0.15, ease)

  composer.render()
}

// ─── ScrollTrigger ───────────────────────────────────────
function setupScroll() {
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5, // buttery smooth
    onUpdate: (self) => {
      scrollProgress.value = self.progress
    },
  })
}

// ─── Resize ──────────────────────────────────────────────
function onResize() {
  if (!camera || !renderer || !composer) return
  const W = window.innerWidth
  const H = window.innerHeight - NAVBAR_H
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  composer.setSize(W, H)
  if (particleSystem) {
    particleSystem.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
  }
}

// ─── Lifecycle ───────────────────────────────────────────
onMounted(() => {
  initScene()
  setupScroll()
  requestAnimationFrame(animate)
  window.addEventListener('resize', onResize)

  // init product info hidden
  if (productInfoRef.value) {
    gsap.set(productInfoRef.value, { opacity: 0, x: 30 })
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
  if (textTween) textTween.kill()
  if (composer) {
    composer.passes.forEach((p) => {
      if (p.dispose) p.dispose()
    })
  }
  if (renderer) renderer.dispose()
  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
        else obj.material.dispose()
      }
    })
    if (scene.environment) scene.environment.dispose()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500&display=swap');

/* clip-path: inset(0) creates a new stacking context —
   the position:fixed canvas is clipped to THIS container only.
   This fully fixes the overlap with sections below. */
.particle-ring-container {
  width: 100%;
  height: 400vh;
  position: relative;
  background: #050505;
  clip-path: inset(0 0 0 0);
  overflow: hidden;
}

/* Canvas physically starts BELOW the navbar (68px) so it can never overlap it */
.particle-canvas {
  position: fixed;
  top: 68px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 68px);
  z-index: 1;
}

/* ─── Scroll indicator ─────────────────────────────────── */
.scroll-indicator {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: opacity 0.9s ease;
}

.scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

.scroll-mouse {
  width: 26px;
  height: 42px;
  border: 1.5px solid rgba(212, 175, 55, 0.45);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-wheel {
  width: 2.5px;
  height: 8px;
  border-radius: 2px;
  background: rgba(212, 175, 55, 0.75);
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  55% {
    transform: translateY(10px);
    opacity: 0.2;
  }
}

.scroll-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 10px;
  letter-spacing: 3.5px;
  color: rgba(212, 175, 55, 0.45);
  text-transform: uppercase;
}

/* Brand text — centred on the usable area below navbar */
.brand-overlay {
  position: fixed;
  top: calc(50% + 34px); /* 68px / 2 nudges centre down into usable area */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.brand-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(60px, 12vw, 140px);
  letter-spacing: 22px;
  color: rgba(212, 175, 55, 0.6);
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 120px rgba(212, 175, 55, 0.15);
}

.brand-subtitle {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: clamp(10px, 1.5vw, 15px);
  letter-spacing: 10px;
  color: rgba(212, 175, 55, 0.7);
  margin: 16px 0 0;
  text-transform: uppercase;
}

/* Product info — right side, offset below navbar */
.product-info {
  position: fixed;
  right: clamp(28px, 7vw, 110px);
  top: calc(50% + 34px);
  transform: translateY(-50%);
  z-index: 10;
  max-width: 340px;
  opacity: 0;
  pointer-events: none;
}

.product-tag {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 4px;
  color: rgba(212, 175, 55, 0.55);
  text-transform: uppercase;
  margin: 0 0 12px;
}

.product-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 46px);
  color: rgba(255, 225, 150, 0.95);
  line-height: 1.15;
  margin: 0 0 16px;
  letter-spacing: 1px;
}

.product-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.85;
  color: rgba(200, 180, 140, 0.5);
  margin: 0 0 30px;
}

.product-cta {
  position: relative;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #d4af37;
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 14px 36px;
  border-radius: 2px;
  cursor: pointer;
  transition:
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.product-cta:hover {
  border-color: rgba(212, 175, 55, 0.65);
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.14);
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -120%;
  width: 80%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(212, 175, 55, 0.2) 50%,
    transparent 70%
  );
  transition: left 0.55s ease;
}

.product-cta:hover .cta-shine {
  left: 150%;
}

/* ─── Responsive ───────────────────────────────────── */
@media (max-width: 900px) {
  .product-info {
    right: auto;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 90vw;
    max-width: 400px;
  }
}
</style>
