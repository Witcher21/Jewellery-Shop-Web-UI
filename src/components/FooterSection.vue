<template>
  <footer class="site-footer">
    <div class="footer-glow"></div>
    <div class="footer-container">
      <!-- Top Section -->
      <div class="footer-top">
        <div class="footer-brand">
          <h3 class="footer-logo">GNS</h3>
          <p class="footer-tagline">FINE JEWELLERY</p>
          <p class="footer-desc">
            Crafting timeless pieces of extraordinary beauty since 1987. Each creation tells a story
            of passion, precision, and heritage.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Pinterest">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.97 9.12-.08-.72-.16-1.83.03-2.62.17-.71 1.12-4.75 1.12-4.75s-.29-.57-.29-1.42c0-1.33.77-2.33 1.73-2.33.82 0 1.21.61 1.21 1.34 0 .82-.52 2.04-.79 3.17-.22.95.47 1.72 1.41 1.72 1.69 0 2.99-1.78 2.99-4.37 0-2.28-1.64-3.87-3.98-3.87-2.71 0-4.3 2.03-4.3 4.13 0 .82.31 1.69.71 2.17.08.09.09.17.07.27-.07.3-.24.95-.27 1.08-.04.18-.14.22-.33.13-1.23-.57-2-2.37-2-3.81 0-3.1 2.25-5.95 6.49-5.95 3.41 0 6.06 2.43 6.06 5.67 0 3.39-2.14 6.11-5.1 6.11-1 0-1.93-.52-2.25-1.13l-.61 2.34c-.22.86-.82 1.93-1.22 2.58.92.28 1.9.44 2.91.44 5.52 0 10-4.48 10-10S17.52 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links-group">
          <h4 class="footer-heading">Collections</h4>
          <router-link to="/collections/rings" class="footer-link">Rings</router-link>
          <router-link to="/collections/necklaces" class="footer-link">Necklaces</router-link>
          <router-link to="/collections/bracelets" class="footer-link">Bracelets</router-link>
          <router-link to="/collections/earrings" class="footer-link">Earrings</router-link>
          <router-link to="/collections" class="footer-link">All Collections</router-link>
        </div>

        <div class="footer-links-group">
          <h4 class="footer-heading">Company</h4>
          <router-link to="/about" class="footer-link">About Us</router-link>
          <router-link to="/contact" class="footer-link">Contact</router-link>
          <a href="#" class="footer-link">Careers</a>
          <a href="#" class="footer-link">Press</a>
          <a href="#" class="footer-link">Blog</a>
        </div>

        <div class="footer-links-group">
          <h4 class="footer-heading">Customer Care</h4>
          <a href="#" class="footer-link">Shipping & Returns</a>
          <a href="#" class="footer-link">Size Guide</a>
          <a href="#" class="footer-link">Care Instructions</a>
          <a href="#" class="footer-link">Warranty</a>
          <a href="#" class="footer-link">FAQ</a>
        </div>

        <div class="footer-newsletter">
          <h4 class="footer-heading">Stay Connected</h4>
          <p class="newsletter-desc">Subscribe for exclusive offers and new arrivals.</p>
          <div class="newsletter-form">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="newsletter-input"
            />
            <button class="newsletter-btn" @click="subscribe">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
          <p v-if="subscribed" class="subscribe-success">✓ Thank you for subscribing!</p>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 GNS Fine Jewellery. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (email.value.trim() && email.value.includes('@')) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 3000)
  }
}
</script>

<style scoped>
.site-footer {
  position: relative;
  background: #080808;
  border-top: 1px solid rgba(212, 175, 55, 0.08);
  padding: 80px 0 0;
}

.footer-glow {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 1px;
  background: radial-gradient(ellipse, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.06);
}

.footer-brand {
  padding-right: 20px;
}

.footer-logo {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 36px;
  color: #d4af37;
  letter-spacing: 8px;
  margin: 0;
}

.footer-tagline {
  font-family: 'Outfit', sans-serif;
  font-weight: 200;
  font-size: 10px;
  letter-spacing: 6px;
  color: rgba(212, 175, 55, 0.4);
  margin: 4px 0 20px;
}

.footer-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.8;
  color: rgba(200, 180, 140, 0.35);
  margin-bottom: 24px;
}

.footer-social {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.15);
  color: rgba(212, 175, 55, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: rgba(212, 175, 55, 0.5);
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
}

.footer-heading {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.7);
  margin: 0 0 20px;
}

.footer-links-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.35);
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: rgba(212, 175, 55, 0.8);
}

.newsletter-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.35);
  margin-bottom: 16px;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.12);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: rgba(212, 175, 55, 0.8);
  outline: none;
  transition: border-color 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(212, 175, 55, 0.25);
}

.newsletter-input:focus {
  border-color: rgba(212, 175, 55, 0.3);
}

.newsletter-btn {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  background: rgba(212, 175, 55, 0.08);
  color: #d4af37;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  background: rgba(212, 175, 55, 0.15);
  border-color: rgba(212, 175, 55, 0.4);
}

.subscribe-success {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(33, 186, 69, 0.8);
  margin-top: 8px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
}

.footer-copyright {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: rgba(200, 180, 140, 0.2);
}

.footer-bottom-links {
  display: flex;
  gap: 24px;
}

.footer-bottom-links a {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 11px;
  color: rgba(200, 180, 140, 0.2);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: rgba(212, 175, 55, 0.6);
}

@media (max-width: 1000px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 40px 30px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer-top {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .site-footer {
    padding: 50px 0 0;
  }

  .footer-container {
    padding: 0 20px;
  }
}
</style>
