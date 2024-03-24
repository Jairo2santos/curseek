<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="text-center">
        <p class="mb-4 text-lg">Estás saliendo de la plataforma gracias por elegirnos...</p>

        <p class="text-sm mb-8">Si no eres redirigido automáticamente, <a :href="externalUrl" class="text-blue-500 underline">haz clic aquí</a>.</p>
        <p class="text-sm mb-8">Si encuentras un problema con el enlace externo, por favor <a href="/nosotros/#/soporte" class="text-blue-500 underline">contáctanos</a>.</p>

        <div class="loader"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const externalUrl = ref(router.currentRoute.value.query.url || 'http://www.udemy.com');
  
  // Simular la carga y la verificación de la URL (este es un placeholder)
  onMounted(() => {
    setTimeout(() => {
      // Aquí podrías verificar si la URL es un 404 o no
      window.location.href = externalUrl.value;
    }, 3000); // Espera 3 segundos antes de redirigir
  });
  </script>
  
  <style>
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
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
  