<template>
  <footer class="bg-gray-200 text-blak md:pb-20 pb-20 pt-12 px-20 md:px-40">
    <div class="mb-4 md:mb-0 pb-4 mr-0 md:mr-8 border-b border-gray-300">
      <a href="/">
        <img src="../assets/logo-curseek.png" alt="CurSeek" class="w-48">
      </a>
    </div>
    <div class="container mx-auto flex flex-col md:flex-row justify-between py-8">
      <!-- Logo y Enlaces -->
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-start md:items-start md:mr-8">
        <!-- Enlaces de navegación -->
        <div class="flex flex-col md:flex-row">
          <!-- Buscar por Proveedores -->
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-md font-semibold mb-2 border-b border-gray-300">Buscar por Proveedores</h4>
            <ul>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/cursos/udemy">Udemy</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/cursos/Coursera">Coursera</a></li>
            </ul>
          </div>
          <!-- Buscar por Universidades -->
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-md font-semibold mb-2 border-b border-gray-300">Buscar por Universidades</h4>
            <ul>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/cursos/utn">UTN</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/coursera/universidades/uab">UAB</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/coursera/universidades/uchile">U. de Chile</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/coursera/universidades/udlac">U. Andes Colombia</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/coursera/universidades/UNAM">UNAM</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/coursera/universidades/upchile">U. Católica de Chile</a></li>
            </ul>
          </div>
          <!-- Sección de Ayuda -->
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-md font-semibold mb-2 border-b border-gray-300">Ayuda</h4>
            <ul>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/preguntasFrecuentes">Preguntas frecuentes</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/soporte">Soporte técnico</a></li>
            </ul>
          </div>
          <!-- Sección de Nosotros -->
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-md font-semibold mb-2 border-b border-gray-300">Nosotros</h4>
            <ul>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/acerca">Sobre nosotros</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/nuestroEquipo">Nuestro equipo</a></li>
            </ul>
          </div>
          <!-- Sección de Términos y Condiciones -->
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-md font-semibold mb-2 border-b border-gray-300">Términos y Condiciones</h4>
            <ul>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/privacidad">Política de privacidad</a></li>
              <li class="text-sm text-gray-800 hover:underline transition pb-1"><a href="/nosotros/#/terminos">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Copyright -->
    <div class="text-sm mb-4 md:mb-0 pt-4 mr-0 md:mr-8 border-t border-gray-300">
      <p class="">Courseek &copy; 2023-2024
        <a href="/nosotros/#/privacidad" class="hover:underline">
          Política de Privacidad
        </a>
      </p>
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