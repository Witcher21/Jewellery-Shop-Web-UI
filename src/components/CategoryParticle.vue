<template>
  <div class="cat-particle-wrapper">
    <canvas ref="canvasRef" class="cat-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  shape: { type: String, default: 'torus' }, // torus, heart, bangle, teardrop
})

const canvasRef = ref(null)
let ctx = null
let animFrameId = null
let particles = []
const PARTICLE_COUNT = 200

// ─── Shape Generators ───────────────────────────────
function generateShapePoints(shape, count) {
  const points = []

  switch (shape) {
    case 'torus': // Ring - circle
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
        const r = 0.35 + (Math.random() - 0.5) * 0.06
        points.push({
          tx: Math.cos(angle) * r,
          ty: Math.sin(angle) * r,
        })
      }
      break

    case 'heart': // Necklace - heart/pendant
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2
        const scale = 0.018
        const tx = scale * 16 * Math.pow(Math.sin(t), 3)
        const ty =
          -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        points.push({
          tx: tx + (Math.random() - 0.5) * 0.03,
          ty: ty + 0.05 + (Math.random() - 0.5) * 0.03,
        })
      }
      break

    case 'bangle': // Bracelet - open bangle
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 1.7 - Math.PI * 0.85
        const r = 0.38 + (Math.random() - 0.5) * 0.05
        points.push({
          tx: Math.cos(angle) * r + (Math.random() - 0.5) * 0.02,
          ty: Math.sin(angle) * r + (Math.random() - 0.5) * 0.02,
        })
      }
      break

    case 'teardrop': // Earring - elongated drop
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2
        const r = 0.3
        // Teardrop parametric
        const tx = r * Math.sin(t) * (Math.random() * 0.1 + 0.95)
        const ty = r * (-Math.cos(t) - 0.5 * Math.sin(t) * Math.sin(t)) + 0.05
        points.push({
          tx: tx + (Math.random() - 0.5) * 0.02,
          ty: ty * 1.1 + (Math.random() - 0.5) * 0.02,
        })
      }
      break
  }

  return points
}

// ─── Initialize Particles ───────────────────────────
function initParticles() {
  const shapePoints = generateShapePoints(props.shape, PARTICLE_COUNT)
  particles = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const sp = shapePoints[i]
    particles.push({
      // Start scattered
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      // Target position
      tx: sp.tx,
      ty: sp.ty,
      // Properties
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.01 + 0.008,
      phase: Math.random() * Math.PI * 2,
      assembled: false,
    })
  }
}

// ─── Animate ────────────────────────────────────────
function animate(time) {
  animFrameId = requestAnimationFrame(animate)

  if (!ctx || !canvasRef.value) return

  const w = canvasRef.value.width
  const h = canvasRef.value.height
  const cx = w / 2
  const cy = h / 2
  const scale = Math.min(w, h) * 0.9

  ctx.clearRect(0, 0, w, h)

  const t = time * 0.001

  for (const p of particles) {
    // Smoothly approach target
    p.x += (p.tx - p.x) * p.speed
    p.y += (p.ty - p.y) * p.speed

    // Check if assembled
    const dx = p.tx - p.x
    const dy = p.ty - p.y
    p.assembled = Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01

    // Gentle floating when assembled
    const floatX = p.assembled ? Math.sin(t * 1.5 + p.phase) * 0.005 : 0
    const floatY = p.assembled ? Math.cos(t * 1.2 + p.phase) * 0.004 : 0

    // Screen position
    const sx = cx + (p.x + floatX) * scale
    const sy = cy + (p.y + floatY) * scale

    // Shimmer alpha
    const shimmer = Math.sin(t * 2 + p.phase) * 0.15 + 0.85
    const finalAlpha = p.alpha * shimmer * (p.assembled ? 1 : 0.6)

    // Draw glow
    const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, p.size * 2)
    gradient.addColorStop(0, `rgba(255, 215, 90, ${finalAlpha})`)
    gradient.addColorStop(0.4, `rgba(212, 175, 55, ${finalAlpha * 0.5})`)
    gradient.addColorStop(1, `rgba(180, 140, 30, 0)`)

    ctx.beginPath()
    ctx.arc(sx, sy, p.size * 2, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Core dot
    ctx.beginPath()
    ctx.arc(sx, sy, p.size * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 230, 130, ${finalAlpha * 0.9})`
    ctx.fill()
  }
}

// ─── Resize ─────────────────────────────────────────
function resize() {
  if (!canvasRef.value) return
  const rect = canvasRef.value.parentElement.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio, 2)
  canvasRef.value.width = rect.width * dpr
  canvasRef.value.height = rect.height * dpr
  ctx = canvasRef.value.getContext('2d')
}

let resizeObserver = null

onMounted(() => {
  resize()
  initParticles()
  animate(0)

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvasRef.value.parentElement)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrameId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
.cat-particle-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.cat-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
