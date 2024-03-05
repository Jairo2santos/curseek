<template>
  <div class="md:min-h-screen py-12 flex items-center justify-center bg-gray-100">
    <Notificationes v-if="showNotification" :message="notificationMessage" :type="notificationType"
      @close="showNotification = false" />
    <form class="bg-white rounded shadow-md p-6 w-80" @submit.prevent="login">
      <h2 class="text-xl mb-4 text-center">Iniciar Sesión</h2>
      <div class="mb-6">
        <label for="username" class="block text-md mb-2">Nombre de usuario <span class="text-red-500">*</span></label>
        <input type="text" id="username" placeholder="Ingrese su nombre de usuario" v-model="username" required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-md mb-2">Contraseña <span class="text-red-500">*</span></label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Ingerse su contraseña" v-model="password" class="mt-1 p-2 w-full border rounded-md" required />
          <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-2">
            <svg :class="{'text-gray-500': !showPassword, 'text-gray-700': showPassword}" class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
              <path v-if="showPassword" d="M480.181-353.846q60.973 0 103.473-42.681t42.5-103.654q0-60.973-42.681-103.473t-103.654-42.5q-60.973 0-103.473 42.681t-42.5 103.654q0 60.973 42.681 103.473t103.654 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.956 0-236.879-70.731Q136.307-381.461 83.077-500q53.23-118.539 160.044-189.269Q349.934-760 479.89-760q129.956 0 236.879 70.731Q823.693-618.539 876.923-500q-53.23 118.539-160.044 189.269Q610.066-240 480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
              <path v-else d="M617.846-454.154 586-486q9-52.385-29.692-90.692Q517.615-615 466-606l-31.846-31.846q10.077-4.154 21.038-6.231 10.962-2.077 24.808-2.077 61.154 0 103.654 42.5 42.5 42.5 42.5 103.654 0 13.846-2.077 25.577-2.077 11.731-6.231 20.269Zm126.462 122.923L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-31.231-31.231q34.846-13.154 70.923-18.962Q443.769-760 480-760q130.231 0 238.231 71.577T876.923-500q-21.461 48.231-54.346 90.654-32.884 42.423-78.269 78.115Zm44.615 216.77L633.231-269.692q-26.539 11.769-65.885 20.731Q528-240 480-240q-131 0-238.231-71.577T83.077-500q23.307-53 61.461-99.269 38.154-46.269 81.462-77.654l-111.539-112 28.308-28.308 674.462 674.462-28.308 28.308ZM254.307-648.615Q219.923-624.154 184-584.308 148.077-544.461 128-500q50 101 143.5 160.5T480-280q34.615 0 69.769-6.731 35.154-6.73 52.846-13.577L537.385-366q-9.462 5.308-26.385 8.731-16.923 3.423-31 3.423-61.154 0-103.654-42.5-42.5-42.5-42.5-103.654 0-13.308 3.423-29.846 3.423-16.539 8.731-27.539l-91.693-91.23ZM541-531Zm-112.539 56.539Z"/>
            </svg>
          </button>
        </div>
        <!-- <input type="password" id="password" v-model="password" placeholder="" required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" /> -->
      </div>
      <button type="submit"
        class="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-800 transition duration-300">
        Ingresar
      </button>
      <p class="mt-4 text-center text-sm">
        ¿Eres Nuevo? <router-link class="text-indigo-500" to="/signUp">Regístrate</router-link>
      </p>
      <div>
        <p class="mt-4 text-center text-sm border-t border-gray-300 py-4">
          ¿Olvidaste tu contraseña?, comunicate con nosotros: <a href="mailto:restore@curseek.com" class="text-indigo-500">restore@curseek.com</a>
        </p>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Notificationes from '../components/Notificaciones.vue'; 

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

const login = async () => {
  console.log(`Attempting to login with username: ${username.value} and password: ${password.value}`);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
      username: username.value,
      password: password.value,
    });
    if (response.status === 200) {
      notify('Inicio de sesión exitoso!', 'success');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('loggedInUsername', response.data.username);
      localStorage.setItem('loggedInUserId', response.data.userId);
      
      setTimeout(() => {
        router.push('/profile'); 
      }, 1000); 
    } else {
      notify('Credenciales incorrectas. Por favor, intenta nuevamente.', 'error');
    }
  } catch (error) {
    notify('Ocurrió un error al intentar iniciar sesión. Por favor, revisa los datos ingresados', 'error');
    console.error('Error al iniciar sesión:', error);
  }
};

const notify = (message, type) => {
  showNotification.value = true;
  notificationMessage.value = message;
  notificationType.value = type;
};
</script>
