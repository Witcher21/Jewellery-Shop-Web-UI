<template>
  <transition name="cart-slide">
    <div v-if="store.isCartOpen" class="cart-overlay" @click.self="store.isCartOpen = false">
      <div class="cart-sidebar">
        <!-- Header -->
        <div class="cart-header">
          <h3 class="cart-title">Shopping Bag</h3>
          <span class="cart-count">{{ store.cartCount }} items</span>
          <button class="cart-close" @click="store.isCartOpen = false">&times;</button>
        </div>

        <!-- Empty State -->
        <div v-if="store.cart.length === 0" class="cart-empty">
          <div class="empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p class="empty-text">Your bag is empty</p>
          <router-link to="/collections" class="empty-cta" @click="store.isCartOpen = false">
            Start Shopping
          </router-link>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items">
          <div v-for="item in store.cart" :key="item.id" class="cart-item">
            <div class="item-image">
              <span class="item-icon">{{ getCategoryIcon(item.category) }}</span>
            </div>
            <div class="item-details">
              <p class="item-category">{{ item.category }}</p>
              <h4 class="item-name">{{ item.name }}</h4>
              <div class="item-controls">
                <div class="quantity-control">
                  <button @click="store.updateQuantity(item.id, item.quantity - 1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="store.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <span class="item-price">${{ (item.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            <button class="item-remove" @click="store.removeFromCart(item.id)">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="store.cart.length > 0" class="cart-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ store.cartTotal.toLocaleString() }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span class="free-shipping">Complimentary</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ store.cartTotal.toLocaleString() }}</span>
            </div>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
          <router-link to="/collections" class="continue-link" @click="store.isCartOpen = false">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useProductStore } from 'stores/products'

const store = useProductStore()

function getCategoryIcon(category) {
  const icons = { rings: '💍', necklaces: '📿', bracelets: '⭕', earrings: '✨' }
  return icons[category] || '💎'
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: #0a0a08;
  border-left: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.06);
}

.cart-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 22px;
  color: rgba(255, 225, 160, 0.9);
  margin: 0;
}

.cart-count {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(212, 175, 55, 0.4);
}

.cart-close {
  margin-left: auto;
  background: none;
  border: none;
  color: rgba(212, 175, 55, 0.4);
  font-size: 28px;
  cursor: pointer;
  transition: color 0.3s;
  line-height: 1;
}

.cart-close:hover {
  color: #d4af37;
}

/* Empty */
.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
}

.empty-icon {
  color: rgba(212, 175, 55, 0.15);
}

.empty-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: rgba(200, 180, 140, 0.3);
}

.empty-cta {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  padding: 12px 28px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 4px;
  transition: all 0.3s;
}

.empty-cta:hover {
  background: rgba(212, 175, 55, 0.08);
}

/* Items */
.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  scrollbar-width: thin;
  scrollbar-color: rgba(212, 175, 55, 0.2) transparent;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.04);
  position: relative;
}

.item-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: rgba(212, 175, 55, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon {
  font-size: 24px;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-category {
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.3);
  margin: 0 0 4px;
}

.item-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 225, 160, 0.85);
  margin: 0 0 10px;
}

.item-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 4px;
}

.quantity-control button {
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  color: rgba(212, 175, 55, 0.5);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.quantity-control button:hover {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
}

.quantity-control span {
  width: 32px;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: rgba(212, 175, 55, 0.8);
  border-left: 1px solid rgba(212, 175, 55, 0.1);
  border-right: 1px solid rgba(212, 175, 55, 0.1);
  line-height: 28px;
}

.item-price {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #d4af37;
}

.item-remove {
  position: absolute;
  top: 16px;
  right: 0;
  background: none;
  border: none;
  color: rgba(200, 180, 140, 0.2);
  cursor: pointer;
  transition: color 0.3s;
  padding: 4px;
}

.item-remove:hover {
  color: rgba(200, 100, 100, 0.7);
}

/* Footer */
.cart-footer {
  padding: 24px;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  background: rgba(5, 5, 5, 0.5);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.4);
  padding: 6px 0;
}

.summary-row.total {
  font-weight: 500;
  font-size: 16px;
  color: rgba(255, 225, 160, 0.9);
  padding-top: 12px;
  margin-top: 8px;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
}

.free-shipping {
  color: rgba(130, 200, 130, 0.7);
  font-style: italic;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  background: linear-gradient(135deg, #d4af37, #b8942e);
  border: none;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #050505;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: linear-gradient(135deg, #e0c050, #c4a035);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.2);
}

.continue-link {
  display: block;
  text-align: center;
  margin-top: 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(212, 175, 55, 0.4);
  text-decoration: none;
  transition: color 0.3s;
}

.continue-link:hover {
  color: #d4af37;
}

/* Transitions */
.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-slide-enter-from .cart-sidebar,
.cart-slide-leave-to .cart-sidebar {
  transform: translateX(100%);
}

.cart-slide-enter-from,
.cart-slide-leave-to {
  opacity: 0;
}
</style>
