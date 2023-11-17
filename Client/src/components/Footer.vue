<template>
    <footer class="bg-gray-200 shadow-md p-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-4 md:mb-0 md:flex md:flex-col md:items-start md:mb-4">
            <a href="/">
              <img src="../assets/logo-curseek.png" alt="logo gorro curseek" width="120">
            </a>
            <p class="text-xl font-semibold text-indigo-900 mt-2">&copy; 2023 CurSeek</p>
          </div>
          <div class="md:flex md:items-center md:space-x-4">
            <ul>
                <li>
                    <a href="/about" class="text-gray-600 hover:text-indigo-900 transition">Acerca de nosotros</a>
                </li>
                <li>
                    <a href="/contact" class="text-gray-600 hover:text-indigo-900 transition">Contáctanos</a>
                </li>
                <li>
                    <a href="/terms" class="text-gray-600 hover:text-indigo-900 transition">Términos y condiciones</a>
                </li>
                <li>
                    <a href="/privacy" class="text-gray-600 hover:text-indigo-900 transition">Política de privacidad</a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const loggedInUsername = ref(localStorage.getItem('loggedInUsername'));
  const router = useRouter();
  
  watch(() => router.currentRoute, () => {
    loggedInUsername.value = localStorage.getItem('loggedInUsername');
  });
  
  const logout = () => {
    localStorage.removeItem('loggedInUsername');
    loggedInUsername.value = null;
    router.push('/login');
  };
  </script>
  