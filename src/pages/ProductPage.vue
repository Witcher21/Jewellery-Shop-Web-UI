<template>
  <q-page class="product-page">
    <div v-if="product" class="product-layout">
      <!-- Back Button -->
      <router-link to="/collections" class="back-link">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Collections
      </router-link>

      <div class="product-grid">
        <!-- Image Section -->
        <div class="product-image-section">
          <div class="image-main" :class="product.category">
            <span class="main-icon">{{ getCategoryIcon(product.category) }}</span>
            <div class="image-glow"></div>
            <span v-if="product.badge" class="product-badge" :class="product.badge.toLowerCase()">
              {{ product.badge }}
            </span>
          </div>
        </div>

        <!-- Details Section -->
        <div class="product-details">
          <p class="detail-category">{{ product.category }}</p>
          <h1 class="detail-name">{{ product.name }}</h1>

          <div class="detail-rating">
            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{ filled: i <= Math.round(product.rating) }"
                >★</span
              >
            </div>
            <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
          </div>

          <div class="detail-price">
            <span class="price">${{ product.price.toLocaleString() }}</span>
            <span v-if="product.originalPrice" class="original-price">
              ${{ product.originalPrice.toLocaleString() }}
            </span>
            <span v-if="product.originalPrice" class="discount">
              {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF
            </span>
          </div>

          <p class="detail-desc">{{ product.description }}</p>

          <!-- Specs -->
          <div class="detail-specs">
            <div class="spec-item">
              <span class="spec-label">Material</span>
              <span class="spec-value">{{ product.material }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Weight</span>
              <span class="spec-value">{{ product.weight }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Category</span>
              <span class="spec-value" style="text-transform: capitalize">{{
                product.category
              }}</span>
            </div>
          </div>

          <!-- Size Selector (for rings/bracelets) -->
          <div
            v-if="product.category === 'rings' || product.category === 'bracelets'"
            class="size-selector"
          >
            <label class="size-label">Select Size</label>
            <div class="size-options">
              <button
                v-for="size in sizes"
                :key="size"
                class="size-btn"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="quantity-section">
            <label class="size-label">Quantity</label>
            <div class="quantity-control">
              <button @click="quantity > 1 && quantity--">−</button>
              <span>{{ quantity }}</span>
              <button @click="quantity++">+</button>
            </div>
          </div>

          <!-- Actions -->
          <div class="detail-actions">
            <button class="add-to-cart-btn" @click="addToCart">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to Bag
            </button>
            <button
              class="wishlist-btn"
              :class="{ active: store.isInWishlist(product.id) }"
              @click="store.toggleWishlist(product.id)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                :fill="store.isInWishlist(product.id) ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
          </div>

          <!-- Features -->
          <div class="detail-features">
            <div class="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Certified Authentic</span>
            </div>
            <div class="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <rect x="1" y="3" width="22" height="18" rx="2" />
                <line x1="1" y1="9" x2="23" y2="9" />
              </svg>
              <span>Complimentary Shipping</span>
            </div>
            <div class="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span>30-Day Returns</span>
            </div>
            <div class="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section class="related-section">
        <h2 class="related-title">You May Also Like</h2>
        <div class="related-grid">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from 'stores/products'
import ProductCard from 'components/ProductCard.vue'

const route = useRoute()
const store = useProductStore()

const product = computed(() => store.getProductById(route.params.id))
const quantity = ref(1)
const selectedSize = ref('7')
const sizes = ['5', '6', '7', '8', '9', '10']

const relatedProducts = computed(() => {
  if (!product.value) return []
  return store
    .getProductsByCategory(product.value.category)
    .filter((p) => p.id !== product.value.id)
    .slice(0, 4)
})

function getCategoryIcon(category) {
  const icons = { rings: '💍', necklaces: '📿', bracelets: '⭕', earrings: '✨' }
  return icons[category] || '💎'
}

function addToCart() {
  for (let i = 0; i < quantity.value; i++) {
    store.addToCart(product.value)
  }
}

watch(
  () => route.params.id,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    quantity.value = 1
  },
)
</script>

<style scoped>
.product-page {
  background: #050505;
  padding: 0;
  min-height: 100vh;
}

.product-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 40px 80px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(212, 175, 55, 0.4);
  text-decoration: none;
  margin-bottom: 40px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #d4af37;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 100px;
}

/* Image */
.product-image-section {
  position: sticky;
  top: 120px;
  height: fit-content;
}

.image-main {
  aspect-ratio: 1;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.06);
}

.image-main.rings {
  background: linear-gradient(135deg, #1a1510, #0a0805);
}

.image-main.necklaces {
  background: linear-gradient(135deg, #15120e, #080705);
}

.image-main.bracelets {
  background: linear-gradient(135deg, #18150f, #090806);
}

.image-main.earrings {
  background: linear-gradient(135deg, #16130f, #0a0806);
}

.main-icon {
  font-size: 120px;
  filter: brightness(0.9);
}

.image-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.product-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 16px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.product-badge.bestseller {
  background: rgba(212, 175, 55, 0.15);
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.product-badge.premium {
  background: rgba(180, 140, 255, 0.12);
  color: rgba(200, 170, 255, 0.9);
  border: 1px solid rgba(180, 140, 255, 0.2);
}

.product-badge.new {
  background: rgba(100, 200, 150, 0.12);
  color: rgba(130, 220, 170, 0.9);
  border: 1px solid rgba(100, 200, 150, 0.2);
}

.product-badge.exclusive {
  background: rgba(255, 140, 100, 0.12);
  color: rgba(255, 170, 130, 0.9);
  border: 1px solid rgba(255, 140, 100, 0.2);
}

.product-badge.popular {
  background: rgba(100, 180, 255, 0.12);
  color: rgba(140, 200, 255, 0.9);
  border: 1px solid rgba(100, 180, 255, 0.2);
}

/* Details */
.detail-category {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.4);
  margin: 0 0 8px;
}

.detail-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: clamp(28px, 3vw, 40px);
  color: rgba(255, 225, 160, 0.95);
  margin: 0 0 16px;
  line-height: 1.2;
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: rgba(212, 175, 55, 0.15);
}

.star.filled {
  color: #d4af37;
}

.rating-text {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(200, 180, 140, 0.3);
}

.detail-price {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.price {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 32px;
  color: #d4af37;
}

.original-price {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: rgba(200, 180, 140, 0.25);
  text-decoration: line-through;
}

.discount {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: rgba(130, 200, 130, 0.8);
  padding: 4px 10px;
  background: rgba(130, 200, 130, 0.08);
  border-radius: 12px;
}

.detail-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(200, 180, 140, 0.45);
  margin: 0 0 32px;
}

/* Specs */
.detail-specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(212, 175, 55, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.06);
}

.spec-label {
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.3);
  display: block;
  margin-bottom: 4px;
}

.spec-value {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: rgba(255, 225, 160, 0.7);
}

/* Size */
.size-selector {
  margin-bottom: 24px;
}

.size-label {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.4);
  display: block;
  margin-bottom: 10px;
}

.size-options {
  display: flex;
  gap: 8px;
}

.size-btn {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  background: transparent;
  color: rgba(212, 175, 55, 0.5);
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-btn:hover {
  border-color: rgba(212, 175, 55, 0.3);
}

.size-btn.active {
  background: rgba(212, 175, 55, 0.1);
  border-color: #d4af37;
  color: #d4af37;
}

/* Quantity */
.quantity-section {
  margin-bottom: 32px;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.quantity-control button {
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  color: rgba(212, 175, 55, 0.5);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-control button:hover {
  background: rgba(212, 175, 55, 0.08);
  color: #d4af37;
}

.quantity-control span {
  width: 48px;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: rgba(212, 175, 55, 0.8);
  border-left: 1px solid rgba(212, 175, 55, 0.1);
  border-right: 1px solid rgba(212, 175, 55, 0.1);
  line-height: 42px;
}

/* Actions */
.detail-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  background: linear-gradient(135deg, #d4af37, #b8942e);
  border: none;
  border-radius: 8px;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #050505;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #e0c050, #c4a035);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.25);
  transform: translateY(-2px);
}

.wishlist-btn {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.15);
  background: transparent;
  color: rgba(212, 175, 55, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.wishlist-btn:hover,
.wishlist-btn.active {
  border-color: rgba(212, 175, 55, 0.4);
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
}

/* Features */
.detail-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(200, 180, 140, 0.35);
}

.feature svg {
  color: rgba(212, 175, 55, 0.4);
  flex-shrink: 0;
}

/* Related */
.related-section {
  padding-top: 40px;
  border-top: 1px solid rgba(212, 175, 55, 0.06);
}

.related-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 28px;
  color: rgba(255, 225, 160, 0.8);
  margin: 0 0 40px;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .product-image-section {
    position: static;
  }

  .product-layout {
    padding: 100px 20px 60px;
  }

  .detail-specs {
    grid-template-columns: 1fr;
  }
}
</style>
