<script setup>
import { onBeforeMount } from 'vue';
import AppHeader from './components/AppHeader.vue';
import Footer from './components/Footer.vue';

onBeforeMount(() => {
  if (typeof window !== "undefined") {
    const script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js';
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-QNT69M33WS');

      // Registra una vista de página cuando el script se carga
      gtag('event', 'page_view', {
        page_title: 'Inicio',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    };
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div>
    <AppHeader />
    <div class="px-0">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
