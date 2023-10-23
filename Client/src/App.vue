

<template>
  <div>
    <AppHeader />
    <div class="px-0">
  
      <router-view />
    </div>
    
    <Footer />
  </div>
</template>


<script>
import AppHeader from './components/AppHeader.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    AppHeader,
    Footer
  }
};
</script>