<template>
  <q-page class="contact-page">
    <div class="page-hero">
      <div class="hero-particles">
        <span v-for="n in 30" :key="n" class="hero-dot" :style="dotStyle()"></span>
      </div>
      <p class="hero-tag">GET IN TOUCH</p>
      <h1 class="hero-title">Contact Us</h1>
      <p class="hero-desc">We'd love to hear from you. Visit our boutique or send us a message.</p>
    </div>

    <div class="contact-container">
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3 class="info-title">Visit Our Boutique</h3>
            <p class="info-text">42 Galle Road, Colombo 03<br />Sri Lanka</p>
          </div>
          <div class="info-card">
            <div class="info-icon">📞</div>
            <h3 class="info-title">Call Us</h3>
            <p class="info-text">+94 11 234 5678<br />Mon–Sat, 9am–6pm</p>
          </div>
          <div class="info-card">
            <div class="info-icon">✉️</div>
            <h3 class="info-title">Email Us</h3>
            <p class="info-text">hello@gnsjewellery.com<br />We respond within 24 hours</p>
          </div>
          <div class="info-card">
            <div class="info-icon">💬</div>
            <h3 class="info-title">Live Chat</h3>
            <p class="info-text">Available during business hours<br />for instant assistance</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <h2 class="form-title">Send a Message</h2>
          <p class="form-desc">
            Fill out the form below and our team will get back to you shortly.
          </p>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  class="form-input"
                  placeholder="John"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  class="form-input"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="john@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Subject</label>
              <select v-model="form.subject" class="form-input">
                <option value="">Select a subject</option>
                <option value="inquiry">General Inquiry</option>
                <option value="order">Order Support</option>
                <option value="custom">Custom Design</option>
                <option value="repair">Repair & Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea
                v-model="form.message"
                class="form-input form-textarea"
                rows="5"
                placeholder="Tell us how we can help..."
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :class="{ sent: formSent }">
              {{ formSent ? '✓ Message Sent!' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const formSent = ref(false)

function submitForm() {
  formSent.value = true
  setTimeout(() => {
    formSent.value = false
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }, 3000)
}

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
.contact-page {
  background: #050505;
  padding: 0;
}

.page-hero {
  position: relative;
  padding: 180px 40px 100px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0a08, #050505);
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
  font-size: 11px;
  letter-spacing: 5px;
  color: rgba(212, 175, 55, 0.5);
  margin: 0 0 14px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 56px);
  color: rgba(255, 225, 160, 0.9);
  margin: 0 0 16px;
  position: relative;
  z-index: 1;
}

.hero-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(200, 180, 140, 0.4);
  position: relative;
  z-index: 1;
}

/* Container */
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 120px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
}

/* Info */
.contact-info {
  display: grid;
  gap: 20px;
}

.info-card {
  padding: 28px;
  border-radius: 12px;
  background: rgba(15, 15, 12, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.06);
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: rgba(212, 175, 55, 0.12);
}

.info-icon {
  font-size: 24px;
  margin-bottom: 12px;
}

.info-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 18px;
  color: rgba(255, 225, 160, 0.85);
  margin: 0 0 8px;
}

.info-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(200, 180, 140, 0.4);
  margin: 0;
}

/* Form */
.contact-form-wrapper {
  padding: 40px;
  border-radius: 16px;
  background: rgba(12, 12, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.06);
}

.form-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 28px;
  color: rgba(255, 225, 160, 0.85);
  margin: 0 0 8px;
}

.form-desc {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(200, 180, 140, 0.35);
  margin: 0 0 32px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.4);
  display: block;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  background: rgba(212, 175, 55, 0.04);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  padding: 14px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: rgba(212, 175, 55, 0.85);
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(212, 175, 55, 0.2);
}

.form-input:focus {
  border-color: rgba(212, 175, 55, 0.3);
}

.form-input option {
  background: #0a0a08;
  color: rgba(212, 175, 55, 0.9);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
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

.submit-btn:hover {
  background: linear-gradient(135deg, #e0c050, #c4a035);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.2);
}

.submit-btn.sent {
  background: linear-gradient(135deg, #4caf50, #388e3c);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .contact-container {
    padding: 0 20px 80px;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form-wrapper {
    padding: 24px;
  }
  .page-hero {
    padding: 140px 20px 80px;
  }
}
</style>
