<template>
  <q-page class="about-page">
    <div class="page-hero">
      <div class="hero-particles">
        <span v-for="n in 50" :key="n" class="hero-dot" :style="dotStyle()"></span>
      </div>
      <p class="hero-tag">OUR STORY</p>
      <h1 class="hero-title">Crafting Timeless<br />Beauty Since 1987</h1>
      <p class="hero-desc">
        For over three decades, GNS has been synonymous with exceptional craftsmanship, unparalleled
        quality, and designs that transcend time.
      </p>
    </div>

    <section class="story-section">
      <div class="story-container">
        <div class="story-block">
          <div class="story-image">
            <div class="image-placeholder">
              <span class="placeholder-icon">🏛️</span>
            </div>
          </div>
          <div class="story-text">
            <p class="story-tag">THE BEGINNING</p>
            <h2 class="story-title">A Heritage of Excellence</h2>
            <p class="story-desc">
              Founded in 1987 by master goldsmith Nimal Gunawardena, GNS began as a small atelier in
              Colombo, dedicated to the art of fine jewellery making. What started as a one-man
              workshop has grown into one of the most respected names in luxury jewellery.
            </p>
            <p class="story-desc">
              Our founder's vision was simple yet profound: to create jewellery that tells stories,
              captures emotions, and stands the test of time. This vision continues to guide every
              piece we craft today.
            </p>
          </div>
        </div>

        <div class="story-block reverse">
          <div class="story-image">
            <div class="image-placeholder">
              <span class="placeholder-icon">⚒️</span>
            </div>
          </div>
          <div class="story-text">
            <p class="story-tag">CRAFTSMANSHIP</p>
            <h2 class="story-title">The Art of Perfection</h2>
            <p class="story-desc">
              Every GNS piece passes through the hands of at least seven master artisans. From the
              initial sketch to the final polish, each step is performed with meticulous attention
              to detail. We use traditional techniques passed down through generations, combined
              with modern technology for precision.
            </p>
          </div>
        </div>

        <div class="story-block">
          <div class="story-image">
            <div class="image-placeholder">
              <span class="placeholder-icon">💎</span>
            </div>
          </div>
          <div class="story-text">
            <p class="story-tag">MATERIALS</p>
            <h2 class="story-title">Only the Finest</h2>
            <p class="story-desc">
              We source our gold, diamonds, and gemstones from ethical suppliers around the world.
              Every stone is hand-selected by our gemologists, and every ounce of gold meets the
              highest purity standards. We believe that extraordinary jewellery begins with
              extraordinary materials.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="stats-container">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <h3 class="stat-number">{{ stat.number }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section">
      <div class="values-container">
        <div class="section-header">
          <p class="section-tag">OUR VALUES</p>
          <h2 class="section-title">What Drives Us</h2>
        </div>
        <div class="values-grid">
          <div v-for="(value, i) in values" :key="i" class="value-card">
            <div class="value-icon">{{ value.icon }}</div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-desc">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
const stats = [
  { number: '37+', label: 'Years of Excellence' },
  { number: '50K+', label: 'Pieces Crafted' },
  { number: '120+', label: 'Master Artisans' },
  { number: '28', label: 'Countries Served' },
]

const values = [
  {
    icon: '✨',
    title: 'Excellence',
    desc: 'We pursue perfection in every detail, from design to delivery.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    desc: 'Ethically sourced materials and eco-friendly practices guide our work.',
  },
  {
    icon: '💛',
    title: 'Heritage',
    desc: 'Traditional techniques meet modern innovation in every piece.',
  },
  {
    icon: '🤝',
    title: 'Trust',
    desc: 'Building lasting relationships through transparency and quality.',
  },
]

function dotStyle() {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${4 + Math.random() * 5}s`,
    opacity: Math.random() * 0.3,
    width: `${1 + Math.random() * 3}px`,
    height: `${1 + Math.random() * 3}px`,
  }
}
</script>

<style scoped>
.about-page {
  background: #050505;
  padding: 0;
}

/* Hero */
.page-hero {
  position: relative;
  padding: 200px 40px 120px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0a08 0%, #050505 100%);
}

.hero-particles {
  position: absolute;
  inset: 0;
}

.hero-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.4);
  animation: dotFloat ease-in-out infinite;
}

@keyframes dotFloat {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-12px);
    opacity: 0.4;
  }
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 5px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 16px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 60px);
  color: rgba(255, 225, 160, 0.9);
  margin: 0 0 20px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.hero-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: rgba(200, 180, 140, 0.4);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  position: relative;
  z-index: 1;
}

/* Story */
.story-section {
  padding: 80px 0;
}

.story-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.story-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 100px;
}

.story-block.reverse {
  direction: rtl;
}

.story-block.reverse > * {
  direction: ltr;
}

.image-placeholder {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: linear-gradient(135deg, #14120e 0%, #0a0905 100%);
  border: 1px solid rgba(212, 175, 55, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 64px;
  filter: brightness(0.7);
}

.story-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 12px;
}

.story-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 32px;
  color: rgba(255, 225, 160, 0.85);
  margin: 0 0 20px;
}

.story-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(200, 180, 140, 0.4);
  margin: 0 0 16px;
}

/* Stats */
.stats-section {
  padding: 80px 0;
  background: rgba(212, 175, 55, 0.02);
  border-top: 1px solid rgba(212, 175, 55, 0.04);
  border-bottom: 1px solid rgba(212, 175, 55, 0.04);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
}

.stat-number {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 48px;
  color: #d4af37;
  margin: 0 0 8px;
}

.stat-label {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.35);
  letter-spacing: 1px;
}

/* Values */
.values-section {
  padding: 100px 0 120px;
}

.values-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  letter-spacing: 4px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 12px;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 36px;
  color: rgba(255, 225, 160, 0.9);
  margin: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.value-card {
  text-align: center;
  padding: 40px 24px;
  border-radius: 12px;
  background: rgba(15, 15, 12, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.06);
  transition: all 0.4s ease;
}

.value-card:hover {
  border-color: rgba(212, 175, 55, 0.15);
  transform: translateY(-4px);
}

.value-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.value-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 20px;
  color: rgba(255, 225, 160, 0.85);
  margin: 0 0 12px;
}

.value-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(200, 180, 140, 0.35);
  margin: 0;
}

@media (max-width: 900px) {
  .story-block,
  .story-block.reverse {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
  .values-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto;
  }
  .page-hero {
    padding: 140px 20px 80px;
  }
}
</style>
