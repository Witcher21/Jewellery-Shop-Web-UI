<template>
  <header class="navbar" :class="{ scrolled: isScrolled, 'menu-open': mobileMenuOpen }">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="nav-logo" @click="closeMobile">
        <span class="logo-text">GNS</span>
        <span class="logo-divider"></span>
        <span class="logo-sub">JEWELLERY</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>

        <div class="nav-dropdown">
          <router-link to="/collections" class="nav-link" active-class="active">
            Collections
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </router-link>
          <div class="dropdown-menu">
            <router-link
              v-for="cat in categories"
              :key="cat.id"
              :to="`/collections/${cat.id}`"
              class="dropdown-item"
            >
              <span class="dropdown-icon">{{ cat.icon }}</span>
              <div>
                <span class="dropdown-title">{{ cat.name }}</span>
                <span class="dropdown-desc">{{ cat.description }}</span>
              </div>
            </router-link>
          </div>
        </div>

        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        <router-link to="/contact" class="nav-link" active-class="active">Contact</router-link>
      </nav>

      <!-- Action Icons -->
      <div class="nav-actions">
        <button class="nav-icon-btn" @click="toggleSearch" aria-label="Search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>

        <router-link to="/wishlist" class="nav-icon-btn" aria-label="Wishlist">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
          <span v-if="wishlistCount > 0" class="icon-badge">{{ wishlistCount }}</span>
        </router-link>

        <button class="nav-icon-btn" @click="store.toggleCart()" aria-label="Cart">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span v-if="store.cartCount > 0" class="icon-badge">{{ store.cartCount }}</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <span class="hamburger" :class="{ open: mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <transition name="search-slide">
      <div v-if="searchOpen" class="search-bar">
        <div class="search-container">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search for jewellery..."
            @keyup.enter="performSearch"
            @keyup.esc="searchOpen = false"
          />
          <button class="search-close" @click="searchOpen = false">&times;</button>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="mobile-slide">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <router-link to="/" class="mobile-link" @click="closeMobile">Home</router-link>
        <router-link to="/collections" class="mobile-link" @click="closeMobile"
          >All Collections</router-link
        >
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="`/collections/${cat.id}`"
          class="mobile-link sub"
          @click="closeMobile"
        >
          {{ cat.icon }} {{ cat.name }}
        </router-link>
        <router-link to="/about" class="mobile-link" @click="closeMobile">About</router-link>
        <router-link to="/contact" class="mobile-link" @click="closeMobile">Contact</router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from 'stores/products'

const store = useProductStore()
const router = useRouter()

const categories = computed(() => store.categories)
const wishlistCount = computed(() => store.wishlist.length)

const isScrolled = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const mobileMenuOpen = ref(false)
const searchInput = ref(null)

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => searchInput.value?.focus())
  }
}

function performSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/collections', query: { search: searchQuery.value } })
    searchOpen.value = false
    searchQuery.value = ''
  }
}

function closeMobile() {
  mobileMenuOpen.value = false
}

watch(mobileMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Navbar — always glass so it's readable over any background */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.navbar.scrolled {
  background: rgba(5, 5, 5, 0.92);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.6);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: padding 0.3s ease;
}

.navbar.scrolled .nav-container {
  padding: 12px 40px;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  z-index: 1001;
}

.logo-text {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 28px;
  color: #d4af37;
  letter-spacing: 6px;
}

.logo-divider {
  width: 1px;
  height: 24px;
  background: rgba(212, 175, 55, 0.3);
}

.logo-sub {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 10px;
  color: rgba(212, 175, 55, 0.6);
  letter-spacing: 4px;
}

/* Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
}

.nav-link {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.85);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  transition: width 0.35s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #ffe98c;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  min-width: 280px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 8px;
  padding: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 16px;
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(212, 175, 55, 0.08);
}

.dropdown-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
}

.dropdown-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: rgba(212, 175, 55, 0.9);
  display: block;
}

.dropdown-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 11px;
  color: rgba(200, 180, 140, 0.4);
  display: block;
  margin-top: 2px;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1001;
}

.nav-icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(212, 175, 55, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;
}

.nav-icon-btn:hover {
  color: #ffe98c;
  background: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.2);
}

.icon-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d4af37;
  color: #050505;
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.hamburger span {
  display: block;
  height: 1.5px;
  background: rgba(212, 175, 55, 0.7);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -5px);
}

/* Search Bar */
.search-bar {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  padding: 16px 40px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 8px;
  padding: 12px 16px;
  color: rgba(212, 175, 55, 0.5);
}

.search-container input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: rgba(212, 175, 55, 0.9);
}

.search-container input::placeholder {
  color: rgba(212, 175, 55, 0.3);
}

.search-close {
  background: none;
  border: none;
  color: rgba(212, 175, 55, 0.5);
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
}

/* Transitions */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 5, 5, 0.98);
  padding: 100px 40px 40px;
  flex-direction: column;
  gap: 4px;
  z-index: 999;
}

.mobile-link {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: rgba(212, 175, 55, 0.6);
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.06);
  transition: color 0.3s ease;
  letter-spacing: 2px;
}

.mobile-link.sub {
  padding-left: 24px;
  font-size: 15px;
}

.mobile-link:hover {
  color: #d4af37;
}

.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .nav-container {
    padding: 16px 20px;
  }
}
</style>
