

<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-4">
  
      <router-view />
    </div>
  </div>
</template>


<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader
  }
};
</script>