<script setup>
import AppHeader from './components/AppHeader.vue';
import Footer from './components/Footer.vue';
import { useScript } from 'unhead';

const { gtag } = useScript('https://www.google-analytics.com/analytics.js', {
  use() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-QNT69M33WS');

    return { gtag: window.gtag };
  }
});

gtag('event', 'page_view', {
  page_title: 'Inicio',
  page_location: window.location.href,
  page_path: window.location.pathname
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
