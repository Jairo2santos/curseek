<template>
  <div class="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start md:items-center p-4 gap-4">
   <!-- notificacion -->
    <transition name="slide-down">
    <div v-if="showNotification" class="fixed top-0 inset-x-0 z-50">
      <div :class="{
        'bg-green-500': notificationType === 'success',
        'bg-red-500': notificationType === 'error'
      }" class="text-white text-center py-3">
        {{ notificationMessage }}
      </div>
    </div>
  </transition>
   
    <!-- Profile Card -->
    <div class="profile-card bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
      <h1 class="text-center font-bold text-xl">Mi Perfil</h1>
      <img :src="userData.profilePicture || 'ruta/a/imagen/placeholder.png'" alt="Foto de perfil"
        class="w-32 h-32 rounded-full mx-auto mb-4" />

      <!-- Editable fields -->
      <div v-if="editing" class="space-y-4">
        <div class="flex flex-col">
          <label for="username" class="text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input id="username" type="text" v-model="editableUserData.username" class="form-input mt-1 block w-full bg-gray-200" placeholder="Nombre de usuario">
        </div>

        <div class="flex flex-col">
          <label for="address" class="text-sm font-medium text-gray-700">Dirección</label>
          <input id="address" type="text" v-model="editableUserData.address" class="form-input mt-1 block w-full bg-gray-200" placeholder="Dirección">
        </div>

        <div class="flex flex-col">
          <label for="newPassword" class="text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <div class="relative">
            <input :type="isPasswordShown ? 'text' : 'password'" id="newPassword" v-model="newPassword" class="form-input mt-1 block w-full" placeholder="Nueva Contraseña">
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <span>{{ isPasswordShown ? 'Ocultar' : 'Mostrar' }}</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <div class="flex gap-2 justify-end">
            <button @click="saveProfile" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar cambios</button>
            <button @click="cancelEdit" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Display fields -->
      <div v-else>
  <div class="text-center mx-auto">
    <h2 class="text-2xl font-semibold mb-4">{{ userData.username }}</h2>
    <div class="mb-4">
      <p class="text-gray-600 text-sm">
        
        📧  E-mail: {{ userData.email }}
      </p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600 text-sm">
       
        🏡 Dirección: {{ userData.address }}
      </p>
    </div>
  </div>



        <div class="flex flex-col items-center">
          <button @click="startEdit" class="btn text-blue-600 font-semibold text-lg">Editar perfil</button>
          <button @click="logout" class="btn text-red-600 font-semibold text-lg mt-2">Logout</button>
        </div>
      </div>
    </div>

    <div class="profile-card bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mx-auto">
  <h2 class="text-2xl font-bold mb-4">Mis Cursos Favoritos</h2>
  <div class="flex flex-col gap-4">
    <!-- Loop through favorite courses -->
    <div v-for="course in favoriteCourses" :key="course._id" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Imagen del curso a la izquierda -->
        <img :src="course.image_480x270" alt="Imagen del curso" class="md:w-48 w-full h-48 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg">

        <!-- Contenido del curso a la derecha -->
        <div class="p-4 flex-grow">
          <h3 class="font-semibold text-lg mb-2">{{ course.title }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ course.headline }}</p>
          <div class="flex items-center mb-4">
            <img :src="course.instructors[0].image_100x100" alt="Instructor" class="w-10 h-10 rounded-full mr-2">
            <span class="text-sm font-semibold">{{ course.instructors[0].name }}</span>
          </div>
          <router-link :to="{ name: 'DetalleCursoUdemy', params: { id: course._id } }"
  class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
  Ver Detalle
</router-link>

<button @click="removeFromFavorites(course._id)" 
  class="inline-block bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded ml-2">
  Eliminar de Favoritos
</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref(localStorage.getItem("loggedInUserId"));
const userData = ref({});
const editableUserData = reactive({}); // Datos editables del usuario
const newPassword = ref(''); // Nueva contraseña
const isPasswordShown = ref(false);
const editing = ref(false);
const favoriteCourses = ref([]);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

// Función para alternar la visibilidad de la contraseña
const togglePasswordVisibility = () => {
  isPasswordShown.value = !isPasswordShown.value;
};

// Función para cerrar sesión
const logout = () => {
  localStorage.clear();
  router.push('/login');
};

// Función para obtener el perfil del usuario
const fetchUserProfile = async () => {
  if (!userId.value) {
    console.error("ID de usuario no identificado.");
   
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3333/users/profile/id/${userId.value}`);
    userData.value = response.data;
    Object.assign(editableUserData, response.data); // Copiar datos del usuario a editableUserData
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

const removeFromFavorites = async (courseId) => {
  try {
    await axios.post('http://localhost:3333/users/favorites/remove', { userId: userId.value, courseId });
    // Actualizar la lista de favoritos en la vista
    favoriteCourses.value = favoriteCourses.value.filter(course => course._id !== courseId);
  } catch (error) {
    console.error('Error al eliminar curso de favoritos:', error);
    // Puedes mostrar un mensaje de error al usuario aquí
  }
};

// Función para cargar cursos favoritos
const loadFavoriteCourses = async () => {
  if (!userId.value) {
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3333/users/favorites/${userId.value}`);
    favoriteCourses.value = response.data;
  } catch (error) {
    console.error("Error al cargar cursos favoritos:", error);
  }
};
const startEdit = () => {
  editing.value = true;
};

const cancelEdit = () => {
  editing.value = false;
  // Reset password field and editable user data
  newPassword.value = '';
  Object.assign(editableUserData, userData.value);
};

// Función para guardar los cambios del perfil
const saveProfile = async () => {
  const updatedData = {
    ...editableUserData,
    password: newPassword.value ? newPassword.value : undefined
  };

  try {
    const response = await axios.put(`http://localhost:3333/users/profile/${userId.value}`, updatedData);
    console.log('Perfil actualizado exitosamente');

    // Aquí actualizamos las propiedades reactivas para mostrar la notificación de éxito
    notificationMessage.value = 'Perfil actualizado con éxito.';
    notificationType.value = 'success';
    showNotification.value = true;

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);

    editing.value = false;
    newPassword.value = ''; // Limpiar la nueva contraseña
  } catch (error) {
    console.error('Error al actualizar perfil:', error);

    // Si deseas, también puedes mostrar una notificación de error
    notificationMessage.value = 'Error al actualizar el perfil. Por favor, intente de nuevo.';
    notificationType.value = 'error';
    showNotification.value = true;

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};


onMounted(() => {
  fetchUserProfile();
  loadFavoriteCourses();
});
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
  .slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
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
