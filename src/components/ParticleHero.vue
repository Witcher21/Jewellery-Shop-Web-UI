<template>
  <div ref="containerRef" class="particle-hero">
    <canvas ref="canvasRef" class="hero-canvas"></canvas>
    <div class="hero-overlay">
      <p class="hero-tag">{{ categoryData.tag }}</p>
      <h1 ref="titleRef" class="hero-title">{{ categoryData.title }}</h1>
      <p ref="descRef" class="hero-desc">{{ categoryData.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'

const props = defineProps({
  shape: { type: String, default: 'torus' },
  category: { type: String, default: 'rings' },
})

const containerRef = ref(null)
const canvasRef = ref(null)
const titleRef = ref(null)
const descRef = ref(null)

const categoryData = computed(
  () =>
    ({
      rings: {
        tag: 'COLLECTION',
        title: 'Rings',
        desc: 'Timeless bands of gold, crafted for eternity',
      },
      necklaces: {
        tag: 'COLLECTION',
        title: 'Necklaces',
        desc: 'Elegant chains that adorn with grace',
      },
      bracelets: {
        tag: 'COLLECTION',
        title: 'Bracelets',
        desc: 'Golden circles of endless beauty',
      },
      earrings: {
        tag: 'COLLECTION',
        title: 'Earrings',
        desc: 'Drops of gold that dance with light',
      },
    })[props.category] ?? { tag: 'COLLECTION', title: props.category, desc: '' },
)

// ─── Three state ─────────────────────────────────────────
let scene, camera, renderer, composer
let particleSystem, solidMesh
let initialPositions, targetPositions
let animationFrameId
let startTime = 0

const PARTICLE_COUNT = 4000
const ASSEMBLE_TIME = 2.0 // seconds

// ─── Glow texture ────────────────────────────────────────
function createGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0.0, 'rgba(255,248,170,1.00)')
  g.addColorStop(0.08, 'rgba(255,220, 90,0.95)')
  g.addColorStop(0.22, 'rgba(212,175, 55,0.70)')
  g.addColorStop(0.5, 'rgba(165,125, 20,0.25)')
  g.addColorStop(0.8, 'rgba(120, 80,  0,0.06)')
  g.addColorStop(1.0, 'rgba( 80, 50,  0,0.00)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const g2 = ctx.createRadialGradient(64, 64, 0, 64, 64, 22)
  g2.addColorStop(0, 'rgba(255,255,230,1.0)')
  g2.addColorStop(1, 'rgba(255,255,230,0.0)')
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.needsUpdate = true
  return t
}

// ─── Shape target positions ───────────────────────────────
function genTargetPositions(shape, n) {
  const p = new Float32Array(n * 3)
  let i = 0

  if (shape === 'torus') {
    const R = 2.1,
      r = 0.38
    for (; i < n; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      p[i * 3] = (R + r * Math.cos(v)) * Math.cos(u)
      p[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u)
      p[i * 3 + 2] = r * Math.sin(v)
    }
  } else if (shape === 'heart') {
    const perBail = Math.floor(n * 0.12),
      perHeart = n - perBail
    for (let j = 0; j < perHeart; j++, i++) {
      const t = Math.random() * Math.PI * 2,
        s = 0.148
      const depth = (Math.random() - 0.5) * 0.42
      const x = s * 16 * Math.pow(Math.sin(t), 3)
      const y =
        -s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      p[i * 3] = x + (Math.random() - 0.5) * 0.11
      p[i * 3 + 1] = y + 0.28 + (Math.random() - 0.5) * 0.11
      p[i * 3 + 2] = depth
    }
    for (let j = 0; j < perBail; j++, i++) {
      const a = Math.random() * Math.PI * 2,
        rb = 0.26 + (Math.random() - 0.5) * 0.05
      p[i * 3] = rb * Math.cos(a) * 0.4
      p[i * 3 + 1] = rb * Math.sin(a) * 0.4 + 2.88
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.11
    }
  } else if (shape === 'bangle') {
    const R = 2.3,
      r = 0.3,
      gap = 0.6
    for (; i < n; i++) {
      const u = Math.random() * (Math.PI * 2 - gap * 2) - (Math.PI - gap)
      const v = Math.random() * Math.PI * 2
      p[i * 3] = (R + r * Math.cos(v)) * Math.cos(u)
      p[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u)
      p[i * 3 + 2] = r * Math.sin(v) * 0.55
    }
  } else if (shape === 'teardrop') {
    const perHook = Math.floor(n * 0.1),
      perDrop = n - perHook
    for (let j = 0; j < perDrop; j++, i++) {
      const t = Math.random() * Math.PI * 2
      const rx = 1.15,
        ry = 1.55
      const x = rx * Math.sin(t)
      const y = (-ry * (1 - Math.cos(t))) / 2 + ry * 0.35
      const depth = (Math.random() - 0.5) * 0.4 * (1 - Math.abs(y) / ry)
      p[i * 3] = x * 0.85 + (Math.random() - 0.5) * 0.09
      p[i * 3 + 1] = y + (Math.random() - 0.5) * 0.09
      p[i * 3 + 2] = depth
    }
    for (let j = 0; j < perHook; j++, i++) {
      const t = Math.random() * Math.PI,
        rh = 0.28
      p[i * 3] = rh * Math.cos(t) * 0.5
      p[i * 3 + 1] = rh * Math.sin(t) + 1.58 + (Math.random() - 0.5) * 0.06
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.09
    }
  } else {
    // fallback sphere
    for (; i < n; i++) {
      const th = Math.random() * Math.PI * 2,
        ph = Math.acos(2 * Math.random() - 1),
        r = 2.0
      p[i * 3] = r * Math.sin(ph) * Math.cos(th)
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      p[i * 3 + 2] = r * Math.cos(ph)
    }
  }
  return p
}

function genScatter(n) {
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const rad = 5 + Math.random() * 8
    p[i * 3] = rad * Math.sin(ph) * Math.cos(th)
    p[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th)
    p[i * 3 + 2] = rad * Math.cos(ph)
  }
  return p
}

// ─── Build solid mesh per shape ───────────────────────────
function buildSolidMesh(shape, goldMat) {
  let geo
  switch (shape) {
    case 'torus':
      geo = new THREE.TorusGeometry(2.1, 0.38, 64, 120)
      break
    case 'heart': {
      // Heart curve → tube
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 80 }, (_, i) => {
          const t = (i / 80) * Math.PI * 2
          const s = 0.148
          return new THREE.Vector3(
            s * 16 * Math.pow(Math.sin(t), 3),
            -s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) +
              0.28,
            0,
          )
        }),
        true,
      )
      geo = new THREE.TubeGeometry(curve, 120, 0.06, 12, true)
      break
    }
    case 'bangle': {
      const gap = 0.6
      geo = new THREE.TorusGeometry(2.3, 0.3, 48, 100, Math.PI * 2 - gap * 2)
      break
    }
    case 'teardrop': {
      // Lathe for teardrop body
      const pts = Array.from({ length: 20 }, (_, i) => {
        const t = (i / 19) * Math.PI
        const rx = 1.15,
          ry = 1.55
        return new THREE.Vector2(rx * Math.sin(t) * 0.85, (-ry * (1 - Math.cos(t))) / 2 + ry * 0.35)
      })
      geo = new THREE.LatheGeometry(pts, 40)
      break
    }
    default:
      geo = new THREE.TorusGeometry(2.1, 0.38, 64, 120)
  }
  return new THREE.Mesh(geo, goldMat)
}

// ─── Init scene ───────────────────────────────────────────
function initScene() {
  const canvas = canvasRef.value
  if (!canvas) return

  const W = canvas.clientWidth
  const H = canvas.clientHeight

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x050505, 0.035)

  camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200)
  camera.position.set(0, 0, 7.0)

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setSize(W, H, false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x050505, 1)

  // Environment map for PBR gold
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  pmrem.dispose()

  // ── Particles ──
  const geo = new THREE.BufferGeometry()
  initialPositions = genScatter(PARTICLE_COUNT)
  targetPositions = genTargetPositions(props.shape, PARTICLE_COUNT)
  geo.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3))

  const sizes = new Float32Array(PARTICLE_COUNT)
  const phases = new Float32Array(PARTICLE_COUNT)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    sizes[i] = Math.random() < 0.07 ? 0.55 + Math.random() * 0.35 : 0.14 + Math.random() * 0.28
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
        float shimmer = sin(uTime*2.8 + aPhase*6.28)*0.18 + 0.82;
        float sz = aSize * mix(0.9, 1.3, uProgress) * shimmer * uPixelRatio;
        gl_PointSize = sz * (300.0 / -mv.z);
        gl_PointSize = max(gl_PointSize, 0.5);
        float depth = smoothstep(-10.0, 2.5, mv.z);
        float light = pow(max(dot(normalize(position), vec3(0.6,0.8,0.4)), 0.0), 4.0);
        float spec  = light * 0.65 * uProgress;
        vAlpha  = mix(0.10, 0.88, uProgress) * depth * shimmer + spec;
        vBright = mix(0.55, 1.4, uProgress) + spec * 1.6;
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
        float d   = length(gl_PointCoord - 0.5)*2.0;
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

  // ── Solid gold mesh ──
  const goldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd4af37),
    metalness: 1.0,
    roughness: 0.12,
    envMapIntensity: 2.2,
    transparent: true,
    opacity: 0.0,
  })
  solidMesh = buildSolidMesh(props.shape, goldMat)
  solidMesh.visible = false
  scene.add(solidMesh)

  // ── Lights ──
  const kl = new THREE.DirectionalLight(0xfff5d0, 2.5)
  kl.position.set(5, 8, 5)
  scene.add(kl)
  const fl = new THREE.DirectionalLight(0xffd080, 1.0)
  fl.position.set(-5, -3, 3)
  scene.add(fl)
  scene.add(new THREE.AmbientLight(0x221200, 0.8))

  // ── Background dust ──
  const dg = new THREE.BufferGeometry()
  const dp = new Float32Array(1200 * 3)
  for (let i = 0; i < 1200 * 3; i++) dp[i] = (Math.random() - 0.5) * 28
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3))
  scene.add(
    new THREE.Points(
      dg,
      new THREE.PointsMaterial({
        color: 0x7a5810,
        size: 0.022,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  )

  // ── Post-processing: UnrealBloom — tuned to avoid blow-out ──
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.5, 0.6, 0.26)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  startTime = performance.now()
}

// ─── Helpers ─────────────────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Text reveal ─────────────────────────────────────────
function revealText() {
  if (titleRef.value) {
    gsap.fromTo(
      titleRef.value,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' },
    )
  }
  if (descRef.value) {
    gsap.fromTo(
      descRef.value,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out', delay: 0.18 },
    )
  }
}

// ─── Render loop ─────────────────────────────────────────
let textShown = false
function loop() {
  animationFrameId = requestAnimationFrame(loop)
  if (!renderer || !composer) return

  const elapsed = (performance.now() - startTime) / 1000
  const rawP = Math.min(elapsed / ASSEMBLE_TIME, 1)
  const progress = easeOutCubic(rawP)

  // Move particles
  const pos = particleSystem.geometry.attributes.position.array
  const spd = 0.06 + progress * 0.08
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    const fl = (1 - progress) * Math.sin(elapsed * 0.4 + i * 0.009) * 0.016
    pos[i] = lerp(pos[i], targetPositions[i] + fl, spd * progress + 0.005)
  }
  particleSystem.geometry.attributes.position.needsUpdate = true
  particleSystem.material.uniforms.uTime.value = elapsed
  particleSystem.material.uniforms.uProgress.value = progress

  // Crossfade particles → solid mesh
  const cfStart = 0.78,
    cfEnd = 0.97
  const cf = Math.max(0, Math.min(1, (progress - cfStart) / (cfEnd - cfStart)))
  particleSystem.material.uniforms.uOpacity.value = 1.0 - cf * 0.88
  solidMesh.visible = cf > 0.02
  solidMesh.material.opacity = cf

  // Text reveal at 90%
  if (progress > 0.9 && !textShown) {
    textShown = true
    revealText()
  }

  // Rotation
  particleSystem.rotation.y += 0.005 * progress
  if (progress > 0.6) {
    particleSystem.rotation.x = lerp(particleSystem.rotation.x, -0.24, 0.014)
  }
  solidMesh.rotation.y = particleSystem.rotation.y
  solidMesh.rotation.x = particleSystem.rotation.x

  // Camera pull-in
  camera.position.z = lerp(7.0, 5.6, progress)

  composer.render()
}

// ─── Resize ──────────────────────────────────────────────
function onResize() {
  if (!camera || !renderer || !canvasRef.value) return
  const W = canvasRef.value.clientWidth
  const H = canvasRef.value.clientHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H, false)
  composer.setSize(W, H)
  if (particleSystem)
    particleSystem.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
}

// ─── Cleanup ─────────────────────────────────────────────
function cleanup() {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)
  if (composer)
    composer.passes.forEach((p) => {
      if (p.dispose) p.dispose()
    })
  if (renderer) renderer.dispose()
  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (obj.material.uniforms?.uTexture?.value) obj.material.uniforms.uTexture.value.dispose()
        obj.material.dispose()
      }
    })
    if (scene.environment) scene.environment.dispose()
  }
  scene = null
  camera = null
  renderer = null
  composer = null
  particleSystem = null
  solidMesh = null
  textShown = false
}

function setup() {
  cleanup()
  initScene()
  loop()
  window.addEventListener('resize', onResize)
  // re-hide text
  if (titleRef.value) gsap.set(titleRef.value, { opacity: 0, y: 24 })
  if (descRef.value) gsap.set(descRef.value, { opacity: 0, y: 16 })
}

watch(
  () => props.shape,
  () => {
    setup()
  },
)

onMounted(() => {
  // hide text initially
  gsap.set([titleRef.value, descRef.value], { opacity: 0 })
  setup()
})
onBeforeUnmount(cleanup)
</script>

<style scoped>
.particle-hero {
  position: relative;
  width: 100%;
  /* 52vh total, the top 68px is blocked by the fixed navbar */
  height: 52vh;
  min-height: 400px;
  margin-top: 0;
  background: #050505;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  text-align: center;
  pointer-events: none;
  padding: 0 20px 36px;
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.88) 0%,
    rgba(5, 5, 5, 0.35) 40%,
    transparent 65%
  );
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 5px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 10px;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(30px, 5vw, 56px);
  color: rgba(255, 228, 160, 0.96);
  margin: 0 0 10px;
  letter-spacing: 5px;
  text-shadow: 0 0 60px rgba(212, 175, 55, 0.15);
}

.hero-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.42);
  margin: 0;
}

@media (max-width: 768px) {
  .particle-hero {
    height: 44vh;
    min-height: 300px;
  }
  .hero-overlay {
    padding-bottom: 28px;
  }
}
</style>
