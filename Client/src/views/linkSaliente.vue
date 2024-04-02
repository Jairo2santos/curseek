<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center p-8 bg-white shadow-xl rounded-lg">
      <h1 class="text-2xl font-semibold text-indigo-600 mb-4">¡Gracias por visitar CurSeek!</h1>
      <p class="text-lg text-gray-700 mb-5">Estás siendo redirigido a un sitio externo.</p>
      <a :href="externalUrl" class="text-indigo-500 underline hover:text-indigo-600 transition duration-300 ease-in-out">Haz clic aquí si no eres redirigido automáticamente</a>
      <p class="text-sm text-gray-600 mt-8">Si el enlace externo no funciona, <a href="/nosotros/#/soporte" class="text-indigo-500 underline hover:text-indigo-600 transition duration-300 ease-in-out">contáctanos.</a></p>
      <div class="loader mt-6"></div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  

  const route = useRoute();
const externalUrl = ref('');

onMounted(() => {
  // Decodifica el URL recibido como parámetro
  externalUrl.value = decodeURIComponent(route.query.url || 'https://www.ejemplo.com');
  
  setTimeout(() => {
    // Redirige al usuario al enlace externo
    window.location.href = externalUrl.value;
  }, 3000); // Espera 3 segundos antes de redirigir
});
  </script>
  
  <style>
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #4F46E5; /* Tailwind color indigo-600 */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  