<template>
  <q-page class="collections-page">
    <!-- 3D Particle Hero for specific category -->
    <ParticleHero
      v-if="currentCategory && categoryShape"
      :shape="categoryShape"
      :category="currentCategory"
      :key="currentCategory"
    />

    <!-- Simple hero for "All Collections" -->
    <div v-else class="page-hero">
      <div class="hero-particles">
        <span v-for="n in 40" :key="n" class="hero-dot" :style="randomDotStyle()"></span>
      </div>
      <p class="hero-tag">EXPLORE</p>
      <h1 class="page-title">All Collections</h1>
      <p class="page-subtitle">Explore our complete range of handcrafted jewellery</p>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-container">
        <div class="filter-tabs">
          <router-link to="/collections" class="filter-tab" :class="{ active: !currentCategory }">
            All
          </router-link>
          <router-link
            v-for="cat in categories"
            :key="cat.id"
            :to="`/collections/${cat.id}`"
            class="filter-tab"
            :class="{ active: currentCategory === cat.id }"
          >
            {{ cat.icon }} {{ cat.name }}
          </router-link>
        </div>

        <div class="filter-controls">
          <select v-model="sortBy" class="filter-select">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>

          <div class="view-toggle">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="4" rx="1" />
                <rect x="3" y="10" width="18" height="4" rx="1" />
                <rect x="3" y="16" width="18" height="4" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="products-section">
      <div class="products-container">
        <p class="results-count">{{ filteredProducts.length }} pieces found</p>
        <div class="products-grid" :class="{ 'list-view': viewMode === 'list' }">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>

        <div v-if="filteredProducts.length === 0" class="no-results">
          <p class="no-results-text">No pieces found matching your criteria</p>
          <router-link to="/collections" class="no-results-link">View All Collections</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from 'stores/products'
import ProductCard from 'components/ProductCard.vue'
import ParticleHero from 'components/ParticleHero.vue'

const route = useRoute()
const store = useProductStore()

const categories = computed(() => store.categories)
const currentCategory = computed(() => route.params.category || null)
const sortBy = ref('featured')
const viewMode = ref('grid')
const searchQuery = computed(() => route.query.search || '')

// Map category to particle shape
const categoryShape = computed(() => {
  const map = {
    rings: 'torus',
    necklaces: 'heart',
    bracelets: 'bangle',
    earrings: 'teardrop',
  }
  return map[currentCategory.value] || null
})

const filteredProducts = computed(() => {
  let prods = [...store.products]

  if (searchQuery.value) {
    prods = store.searchProducts(searchQuery.value)
  } else if (currentCategory.value) {
    prods = store.getProductsByCategory(currentCategory.value)
  }

  switch (sortBy.value) {
    case 'price-low':
      prods.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      prods.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      prods.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      prods.sort((a, b) => (a.badge === 'New' ? -1 : b.badge === 'New' ? 1 : 0))
      break
  }

  return prods
})

watch(
  () => route.params.category,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

function randomDotStyle() {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${4 + Math.random() * 6}s`,
    opacity: Math.random() * 0.3 + 0.05,
    width: `${1 + Math.random() * 3}px`,
    height: `${1 + Math.random() * 3}px`,
  }
}
</script>

<style scoped>
.collections-page {
  background: #050505;
  padding: 0;
  min-height: 100vh;
}

/* ─── Simple Hero (All Collections) ────────────────── */
.page-hero {
  position: relative;
  padding: 80px 40px 70px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0908 0%, #050505 100%);
}

.hero-particles {
  position: absolute;
  inset: 0;
}

.hero-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.3);
  animation: dotFloat ease-in-out infinite;
}

@keyframes dotFloat {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-15px);
    opacity: 0.4;
  }
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  letter-spacing: 5px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 14px;
  position: relative;
  z-index: 1;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 56px);
  color: rgba(255, 225, 160, 0.9);
  margin: 0 0 12px;
  position: relative;
  z-index: 1;
  letter-spacing: 3px;
}

.page-subtitle {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(200, 180, 140, 0.35);
  position: relative;
  z-index: 1;
}

/* ─── Filters ──────────────────────────────────────── */
.filters-section {
  position: sticky;
  top: 68px;
  z-index: 100;
  background: rgba(5, 5, 5, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.08);
  padding: 14px 0;
}

.filters-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.filter-tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(212, 175, 55, 0.4);
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  color: rgba(212, 175, 55, 0.7);
}

.filter-tab.active {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
  border-color: rgba(212, 175, 55, 0.15);
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-select {
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 6px;
  padding: 8px 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(212, 175, 55, 0.7);
  outline: none;
  cursor: pointer;
  appearance: none;
}

.filter-select option {
  background: #0a0a08;
  color: rgba(212, 175, 55, 0.9);
}

.view-toggle {
  display: flex;
  gap: 4px;
}

.view-btn {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid rgba(212, 175, 55, 0.08);
  background: transparent;
  color: rgba(212, 175, 55, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.view-btn.active {
  color: rgba(212, 175, 55, 0.8);
  background: rgba(212, 175, 55, 0.08);
  border-color: rgba(212, 175, 55, 0.15);
}

/* ─── Products ─────────────────────────────────────── */
.products-section {
  padding: 40px 0 100px;
}

.products-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.results-count {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(200, 180, 140, 0.25);
  margin-bottom: 24px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.products-grid.list-view {
  grid-template-columns: 1fr;
  max-width: 800px;
}

.no-results {
  text-align: center;
  padding: 80px 0;
}

.no-results-text {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  color: rgba(200, 180, 140, 0.3);
  margin-bottom: 20px;
}

.no-results-link {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  padding: 12px 28px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 4px;
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
  }

  .products-container {
    padding: 0 20px;
  }
  .page-hero {
    padding: 130px 20px 60px;
  }
}
</style>
