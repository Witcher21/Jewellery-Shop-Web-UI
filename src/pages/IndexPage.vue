<template>
  <q-page class="home-page">
    <!-- Hero Section with Particle Ring -->
    <ParticleRing />

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="section-container">
        <div class="section-header">
          <p class="section-tag">EXPLORE</p>
          <h2 class="section-title">Our Collections</h2>
          <p class="section-desc">Discover handcrafted pieces across our curated categories</p>
        </div>

        <div class="categories-grid">
          <router-link
            v-for="cat in categories"
            :key="cat.id"
            :to="`/collections/${cat.id}`"
            class="category-card"
            :class="cat.id"
          >
            <div class="cat-bg">
              <CategoryParticle :shape="cat.particleShape" />
            </div>
            <div class="cat-content">
              <h3 class="cat-name">{{ cat.name }}</h3>
              <p class="cat-desc">{{ cat.description }}</p>
              <span class="cat-explore">
                Explore
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section">
      <div class="section-container">
        <div class="section-header">
          <p class="section-tag">CURATED FOR YOU</p>
          <h2 class="section-title">Featured Pieces</h2>
          <p class="section-desc">Our most sought-after creations, handpicked by our artisans</p>
        </div>

        <div class="products-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>

        <div class="section-cta">
          <router-link to="/collections" class="cta-button">
            View All Collections
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="new-section">
      <div class="section-container">
        <div class="section-header">
          <p class="section-tag">JUST ARRIVED</p>
          <h2 class="section-title">New Arrivals</h2>
          <p class="section-desc">The latest additions to our ever-growing collection</p>
        </div>

        <div class="products-grid">
          <ProductCard v-for="product in newProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Brand Story Banner -->
    <section class="story-section">
      <div class="story-container">
        <div class="story-bg">
          <div class="story-particles">
            <span v-for="n in 30" :key="n" class="story-dot" :style="randomStoryDotStyle()"></span>
          </div>
        </div>
        <div class="story-content">
          <p class="story-tag">OUR LEGACY</p>
          <h2 class="story-title">Crafting Beauty<br />Since 1987</h2>
          <p class="story-desc">
            For over three decades, GNS has been at the forefront of fine jewellery craftsmanship.
            Each piece is meticulously designed and handcrafted by our master artisans, using only
            the finest materials sourced from around the world.
          </p>
          <router-link to="/about" class="story-cta">
            Our Story
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="section-container">
        <div class="section-header">
          <p class="section-tag">WHAT THEY SAY</p>
          <h2 class="section-title">Client Testimonials</h2>
        </div>

        <div class="testimonials-grid">
          <div v-for="(t, i) in testimonials" :key="i" class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"{{ t.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ t.initials }}</div>
              <div>
                <p class="author-name">{{ t.name }}</p>
                <p class="author-title">{{ t.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from 'stores/products'
import ParticleRing from 'components/ParticleRing.vue'
import ProductCard from 'components/ProductCard.vue'
import CategoryParticle from 'components/CategoryParticle.vue'

const store = useProductStore()

const categories = computed(() => store.categories)
const featuredProducts = computed(() => store.getFeaturedProducts())
const newProducts = computed(() => store.getNewProducts())

const testimonials = [
  {
    text: 'The Eternity Band exceeded all expectations. The craftsmanship is impeccable, and it catches light beautifully from every angle.',
    name: 'Sarah Mitchell',
    initials: 'SM',
    title: 'Verified Buyer',
  },
  {
    text: 'I ordered the Golden Cascade Pendant for my anniversary. My wife was absolutely speechless. The quality is outstanding.',
    name: 'James Chen',
    initials: 'JC',
    title: 'Verified Buyer',
  },
  {
    text: 'GNS jewellery is in a league of its own. The attention to detail in every piece makes you feel truly special.',
    name: 'Priya Sharma',
    initials: 'PS',
    title: 'Loyal Customer',
  },
]

function randomStoryDotStyle() {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 6}s`,
    opacity: Math.random() * 0.3 + 0.1,
    width: `${1 + Math.random() * 3}px`,
    height: `${1 + Math.random() * 3}px`,
  }
}
</script>

<style scoped>
.home-page {
  background: #050505;
  padding: 0;
}

/* ─── Section Shared ───────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 6px;
  color: #d4af37;
  margin: 0 0 20px;
  text-transform: uppercase;
}

.section-tag::before,
.section-tag::after {
  content: '';
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(36px, 5vw, 64px);
  color: rgba(255, 235, 180, 1);
  margin: 0 0 18px;
  letter-spacing: 2px;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
}

.section-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: rgba(200, 180, 140, 0.65);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ─── Categories ───────────────────────────────────── */
.categories-section {
  padding: 120px 0;
  position: relative;
  z-index: 10;
  background: #050505;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  text-decoration: none;
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  background: #0e0c09;
}

.category-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.category-card:hover {
  border-color: rgba(212, 175, 55, 0.35);
  transform: translateY(-12px);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.8),
    0 0 100px rgba(212, 175, 55, 0.12),
    inset 0 0 30px rgba(212, 175, 55, 0.05);
}

.category-card:hover::after {
  opacity: 1;
}

.cat-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transition: transform 0.8s ease;
}

.category-card:hover .cat-bg {
  transform: scale(1.05);
}

.category-card.rings .cat-bg {
  background: linear-gradient(160deg, #1a1510 0%, #0d0b08 50%, #1a1510 100%);
}

.category-card.necklaces .cat-bg {
  background: linear-gradient(160deg, #15120e 0%, #080705 50%, #15120e 100%);
}

.category-card.bracelets .cat-bg {
  background: linear-gradient(160deg, #18150f 0%, #0b0a08 50%, #18150f 100%);
}

.category-card.earrings .cat-bg {
  background: linear-gradient(160deg, #16130f 0%, #0c0a08 50%, #16130f 100%);
}

.cat-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 28px 24px;
  text-align: center;
  /* Strong gradient so text is ALWAYS readable */
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.95) 0%,
    rgba(5, 5, 5, 0.65) 35%,
    rgba(5, 5, 5, 0.1) 65%,
    transparent 100%
  );
}

.cat-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 28px;
  color: rgba(255, 230, 160, 1);
  margin: 0 0 8px;
  letter-spacing: 2px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
}

.cat-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: rgba(200, 180, 140, 0.7);
  margin: 0 0 18px;
  line-height: 1.6;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
}

.cat-explore {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.65);
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 1;
  transition: all 0.4s ease;
}

.category-card:hover .cat-explore {
  color: #d4af37;
  gap: 10px;
}

/* ─── Products Grid ────────────────────────────────── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.section-cta {
  text-align: center;
  margin-top: 80px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  padding: 18px 48px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 4px;
  background: linear-gradient(90deg, transparent, transparent);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent);
  transform: skewX(-20deg);
  transition: left 0.7s ease;
}

.cta-button:hover::before {
  left: 150%;
}

.cta-button:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: rgba(212, 175, 55, 0.8);
  box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);
  color: #ffe98c;
  transform: translateY(-2px);
}

/* ─── Featured & New ───────────────────────────────── */
.featured-section {
  padding: 120px 0;
  position: relative;
  z-index: 10;
  background: radial-gradient(circle at 50% 0%, #15120c 0%, #050505 70%);
}

.new-section {
  padding: 120px 0;
  position: relative;
  z-index: 10;
  background: radial-gradient(circle at 50% 50%, #120e0a 0%, #050505 100%);
}

/* ─── Story ────────────────────────────────────────── */
.story-section {
  padding: 120px 40px;
  position: relative;
  z-index: 10;
  background: #050505;
}

.story-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow:
    0 30px 100px rgba(0, 0, 0, 0.8),
    0 0 60px rgba(212, 175, 55, 0.05);
}

.story-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #12100c 0%, #080705 60%, #0e0c08 100%);
}

.story-particles {
  position: absolute;
  inset: 0;
}

.story-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.3);
  animation: catFloat ease-in-out infinite;
}

@keyframes catFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-10px) scale(1.3);
    opacity: 0.5;
  }
}

.story-content {
  position: relative;
  z-index: 1;
  padding: 80px;
  max-width: 600px;
}

.story-tag {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 4px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 16px;
}

.story-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(40px, 5vw, 68px);
  color: rgba(255, 235, 180, 1);
  margin: 0 0 24px;
  line-height: 1.1;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
}

.story-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(200, 180, 140, 0.4);
  margin: 0 0 36px;
}

.story-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  padding: 14px 32px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 4px;
  transition: all 0.4s ease;
}

.story-cta:hover {
  background: rgba(212, 175, 55, 0.08);
  border-color: rgba(212, 175, 55, 0.5);
}

/* ─── Testimonials ─────────────────────────────────── */
.testimonials-section {
  padding: 120px 0 160px;
  position: relative;
  z-index: 10;
  background: linear-gradient(180deg, #050505, #0c0a08);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  padding: 40px;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(20, 18, 15, 0.8), rgba(8, 7, 5, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-top-color: rgba(212, 175, 55, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  border-color: rgba(212, 175, 55, 0.25);
  transform: translateY(-8px);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(212, 175, 55, 0.05);
}

.testimonial-stars {
  font-size: 14px;
  color: #d4af37;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.testimonial-text {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(200, 180, 140, 0.5);
  margin: 0 0 24px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: rgba(212, 175, 55, 0.6);
}

.author-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 225, 160, 0.7);
  margin: 0;
}

.author-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 11px;
  color: rgba(200, 180, 140, 0.3);
  margin: 3px 0 0;
}

/* ─── Responsive ───────────────────────────────────── */
@media (max-width: 1000px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }

  .story-content {
    padding: 50px;
  }
}

@media (max-width: 600px) {
  .categories-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto;
  }

  .section-container {
    padding: 0 20px;
  }

  .categories-section,
  .featured-section,
  .new-section {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .story-section {
    padding: 40px 20px;
  }
}
</style>
