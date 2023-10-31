<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form class="bg-white rounded shadow-md p-6 w-80" @submit.prevent="login">
      <h2 class="text-2xl mb-4 text-center">Iniciar Sesión</h2>

      <div class="mb-6">
        <label for="username" class="block font-bold">Nombre de Usuario</label>
        <input type="text" id="username" v-model="username" placeholder="Nombre de Usuario" required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
      </div>

      <div class="mb-6">
        <label for="password" class="block font-bold">Contraseña</label>
        <input type="password" id="password" v-model="password" placeholder="Contraseña" required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
      </div>

      <p class="mb-4 text-gray-500">usuario: user pass: 12345</p>

      <button type="submit"
        class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300">
        Ingresar
      </button>

      <p class="mt-3 text-center">
        ¿Nuevo en CurSeek? <router-link class="text-blue-500" to="/signUp">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref(localStorage.getItem('loggedInUsername') || '');
const password = ref('');
const userData = ref({});
const isPasswordShown = ref(false);

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3333/users/login', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200) {
      localStorage.setItem('loggedInUsername', username.value);
      router.push('/profile');
    }

    console.log('Usuario logueado:', response.data);
    router.push('/profile');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>
