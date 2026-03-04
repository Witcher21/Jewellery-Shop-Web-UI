<template>
  <q-layout view="hHh lpr fFf">
    <!-- height="68" tells Quasar the exact header size so q-page-container
         gets the correct automatic padding-top on every page -->
    <q-header elevated style="height: 68px; background: transparent; box-shadow: none">
      <NavbarMain />
    </q-header>

    <q-page-container>
      <router-view />
      <FooterSection />
      <CartSidebar />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavbarMain from 'components/NavbarMain.vue'
import FooterSection from 'components/FooterSection.vue'
import CartSidebar from 'components/CartSidebar.vue'
</script>

<style scoped>
.q-layout {
  background: #050505;
}

/* Force q-page-container to always start below the 68px navbar,
   regardless of what Quasar auto-computes from q-header */
:deep(.q-page-container) {
  padding-top: 68px !important;
}
</style>
