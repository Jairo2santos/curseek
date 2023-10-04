

<template>
  <div>
    <AppHeader />
    <div class="px-4">
  
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