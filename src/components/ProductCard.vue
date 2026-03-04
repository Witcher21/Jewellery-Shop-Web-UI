<template>
  <div class="product-card" @click="goToProduct">
    <div class="card-image">
      <div class="image-placeholder" :class="product.category">
        <div class="product-silhouette">
          <span class="silhouette-icon">{{ getCategoryIcon(product.category) }}</span>
        </div>
        <div class="image-shimmer"></div>
      </div>

      <span v-if="product.badge" class="card-badge" :class="badgeClass">
        {{ product.badge }}
      </span>

      <div class="card-actions">
        <button
          class="action-btn"
          :class="{ active: store.isInWishlist(product.id) }"
          @click.stop="store.toggleWishlist(product.id)"
          aria-label="Wishlist"
        >
          <svg
            width="18"
            height="18"
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
        <button class="action-btn" @click.stop="store.addToCart(product)" aria-label="Add to cart">
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
        </button>
      </div>
    </div>

    <div class="card-content">
      <p class="card-category">{{ product.category }}</p>
      <h3 class="card-name">{{ product.name }}</h3>
      <div class="card-rating">
        <div class="stars">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ filled: i <= Math.round(product.rating) }"
            >★</span
          >
        </div>
        <span class="review-count">({{ product.reviews }})</span>
      </div>
      <div class="card-price">
        <span class="price">${{ product.price.toLocaleString() }}</span>
        <span v-if="product.originalPrice" class="original-price"
          >${{ product.originalPrice.toLocaleString() }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from 'stores/products'

const props = defineProps({
  product: { type: Object, required: true },
})

const store = useProductStore()
const router = useRouter()

const badgeClass = computed(() => {
  const map = {
    Bestseller: 'bestseller',
    Premium: 'premium',
    New: 'new',
    Exclusive: 'exclusive',
    Popular: 'popular',
  }
  return map[props.product.badge] || ''
})

function getCategoryIcon(category) {
  const icons = { rings: '💍', necklaces: '📿', bracelets: '⭕', earrings: '✨' }
  return icons[category] || '💎'
}

function goToProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(15, 15, 12, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.06);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover {
  border-color: rgba(212, 175, 55, 0.15);
  transform: translateY(-6px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(212, 175, 55, 0.05);
}

.card-image {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder.rings {
  background: linear-gradient(135deg, #1a1510 0%, #0d0b08 50%, #1a1510 100%);
}

.image-placeholder.necklaces {
  background: linear-gradient(135deg, #141210 0%, #0a0908 50%, #141210 100%);
}

.image-placeholder.bracelets {
  background: linear-gradient(135deg, #161410 0%, #0b0a08 50%, #161410 100%);
}

.image-placeholder.earrings {
  background: linear-gradient(135deg, #151310 0%, #0c0a08 50%, #151310 100%);
}

.product-silhouette {
  position: relative;
  z-index: 1;
}

.silhouette-icon {
  font-size: 48px;
  filter: grayscale(0.3) brightness(0.8);
  transition: all 0.4s ease;
}

.product-card:hover .silhouette-icon {
  filter: grayscale(0) brightness(1.1);
  transform: scale(1.1);
}

.image-shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 50%);
  animation: shimmerMove 8s ease-in-out infinite;
}

@keyframes shimmerMove {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20%, 20%);
  }
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 2;
}

.card-badge.bestseller {
  background: rgba(212, 175, 55, 0.15);
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.card-badge.premium {
  background: rgba(180, 140, 255, 0.12);
  color: rgba(200, 170, 255, 0.9);
  border: 1px solid rgba(180, 140, 255, 0.2);
}

.card-badge.new {
  background: rgba(100, 200, 150, 0.12);
  color: rgba(130, 220, 170, 0.9);
  border: 1px solid rgba(100, 200, 150, 0.2);
}

.card-badge.exclusive {
  background: rgba(255, 140, 100, 0.12);
  color: rgba(255, 170, 130, 0.9);
  border: 1px solid rgba(255, 140, 100, 0.2);
}

.card-badge.popular {
  background: rgba(100, 180, 255, 0.12);
  color: rgba(140, 200, 255, 0.9);
  border: 1px solid rgba(100, 180, 255, 0.2);
}

.card-actions {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}

.product-card:hover .card-actions {
  opacity: 1;
  transform: translateX(0);
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.2);
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(10px);
  color: rgba(212, 175, 55, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:hover,
.action-btn.active {
  background: rgba(212, 175, 55, 0.15);
  color: #d4af37;
  border-color: rgba(212, 175, 55, 0.4);
}

.card-content {
  padding: 18px;
}

.card-category {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.4);
  margin: 0 0 6px;
}

.card-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 18px;
  color: rgba(255, 225, 160, 0.9);
  margin: 0 0 8px;
  line-height: 1.3;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  font-size: 12px;
  color: rgba(212, 175, 55, 0.2);
}

.star.filled {
  color: #d4af37;
}

.review-count {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  color: rgba(200, 180, 140, 0.3);
}

.card-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #d4af37;
}

.original-price {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(200, 180, 140, 0.3);
  text-decoration: line-through;
}
</style>
