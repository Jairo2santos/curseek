<template>
  <div class="profile-card-container flex justify-center items-center min-h-screen bg-gray-100">
    <div class="profile-card bg-white p-6 rounded-lg shadow-lg md:max-w-xl">
      
      <h1 class="text-center font-bold text-xl p-8">Mi Perfil</h1>     
      <img :src="userData.profilePicture || 'ruta/a/imagen/placeholder.png'" alt="Foto de perfil"
      class="w-32 h-32 rounded-full mx-auto mb-4" />
      
      <div class="text-center mx-auto">
        <h2 class="text-lg font-bold mb-3">@{{ editing ? 'Editando perfil de ' + userData.username : userData.username }}</h2>
        <p v-if="!editing" class="text-gray-700 mb-2">mail {{ userData.email }}</p>
        <p v-if="!editing" class="text-gray-700 mb-2">home {{ userData.address }}</p>

        <div class="password-section m-auto mb-4 text-center items-center">
          <input :value="displayedPassword" readonly class="border bg-gray-100 px-3 py-2 rounded" />
          <button @click="togglePasswordVisibility" class="ml-2 text-blue-500">
            <i v-if="isPasswordShown" class="material-icons">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            </i>

            <i v-else class="material-icons">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            </i>
          </button>
        </div>

        <!-- Campos editables -->
        <div v-if="editing" class="space-y-4">
          <label class="mb-2">Nombre de Usuario</label>
          <input v-model="userData.username" class="block w-full border p-2 rounded mb-2" />

          <label class="mb-2">Correo Electrónico</label>
          <input v-model="userData.email" class="block w-full border p-2 rounded mb-2" />

          <label class="mb-2">Dirección</label>
          <input v-model="userData.address" class="block w-full border p-2 rounded mb-2" />

          <label class="mb-2">Contraseña</label>
          <div class="relative">
            <input :type="isPasswordShown ? 'text' : 'password'" v-model="userData.password" placeholder="Contraseña"
              class="block w-full border p-2 rounded pr-10 mb-2" />
            <button @click="togglePasswordVisibility" class="ml-2 text-blue-500">
            </button>
          </div>
        </div>

        <!-- Botones -->
        <div v-if="!editing" class="pt-4">
          <button @click="editing = true" class="btn text-blue-600 font-semibold text-lg">Editar perfil</button>
        </div>
        <div v-if="!editing" class="mt-3">
          <button @click="logout" class="btn text-red-600 font-semibold text-lg">Logout</button>
        </div>

        <div v-if="editing" class="mt-4 space-x-5">
          <button @click="saveProfile" class="btn text-green-600 font-semibold text-lg">Guardar cambios</button>
          <button @click="editing = false" class="btn text-red-600 font-semibold text-lg">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref(localStorage.getItem("loggedInUsername"));
const userData = ref({});
const isPasswordShown = ref(false);
const editing = ref(false);

const displayedPassword = computed(() => {
  return isPasswordShown.value ? userData.value.password : "*****";
});

const togglePasswordVisibility = () => {
  isPasswordShown.value = !isPasswordShown.value;
};

const logout = () => {
  localStorage.removeItem('loggedInUsername');
  username.value = null;
  router.push('/login');
};

const fetchUserProfile = async () => {
  if (!username.value) {
    console.error("Usuario no identificado.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3333/users/profile/${username.value}`);
    userData.value = response.data;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

const saveProfile = async () => {
  try {
    await axios.put(`http://localhost:3333/users/profile/${userData.value._id}`, userData.value);
    console.log('Perfil actualizado exitosamente');
    editing.value = false;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
  }
};

onMounted(fetchUserProfile);

</script>

<style scoped>
  .profile-card {
    min-width: 300px;
    width: 80%;
  }

  .btn-primary {
    background-color: #3490dc;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-primary:hover {
    background-color: #2779bd;
  }

  .btn-danger {
    background-color: #e3342f;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-danger:hover {
    background-color: #cc1f1a;
  }

  .btn-success {
    background-color: #38c172;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-success:hover {
    background-color: #2d8e60;
  }
</style>
