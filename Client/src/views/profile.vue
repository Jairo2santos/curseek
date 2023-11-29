<template>
  <div class="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start md:items-center p-4 gap-4">
    <!-- Notificación -->
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

    <!-- Perfil -->
    <div class="profile-card bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
      <h1 class="text-center font-bold text-xl">Mi Perfil</h1>
      <img :src="userData.profilePicture || 'ruta/a/imagen/placeholder.png'" alt="Foto de perfil"
        class="w-32 h-32 rounded-full mx-auto mb-4" />

      <!-- Campos editables -->
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
            <button @click="saveProfile" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition">Guardar</button>
            <button @click="cancelEdit" class="px-4 py-2 text-gray-700">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Campos de visualización -->
      <div v-else>
        <div class="mx-auto text-center">
          <h2 class="text-2xl font-semibold mb-4">@{{ userData.username }}</h2>
          <div class="mb-4">
            <div class="flex items-center justify-center">
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M184.615-200Q157-200 138.5-218.5 120-237 120-264.615v-430.77Q120-723 138.5-741.5 157-760 184.615-760h590.77Q803-760 821.5-741.5 840-723 840-695.385v430.77Q840-237 821.5-218.5 803-200 775.385-200h-590.77ZM480-475.384 160-684.615v420q0 10.769 6.923 17.692T184.615-240h590.77q10.769 0 17.692-6.923T800-264.615v-420L480-475.384ZM480-520l307.692-200H172.308L480-520ZM160-684.615V-720v455.385q0 10.769 6.923 17.692T184.615-240H160v-444.615Z"/>
              </svg>
              <!-- Usa el filtro capitalize -->
              <span>{{ userData.email }}</span>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex items-center justify-center">
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M480.136-490.769q26.71 0 45.595-19.021 18.884-19.021 18.884-45.731t-19.02-45.594Q506.574-620 479.864-620t-45.595 19.021q-18.884 19.02-18.884 45.731 0 26.71 19.02 45.594 19.021 18.885 45.731 18.885ZM480-172.923q112.769-98.154 178.308-199.654 65.538-101.5 65.538-175.577 0-109.769-69.5-181.192T480-800.769q-104.846 0-174.346 71.423t-69.5 181.192q0 74.077 65.538 175.577Q367.231-271.077 480-172.923Zm0 53.692Q339-243.923 267.577-351.808q-71.423-107.884-71.423-196.346 0-126.923 82.654-209.385Q361.461-840 480-840t201.192 82.461q82.654 82.462 82.654 209.385 0 88.462-71.423 196.346Q621-243.923 480-119.231Zm0-436.154Z"/>
              </svg>
              <!-- Usa el filtro capitalize -->
              <span>{{ userData.address }}</span>
            </div>
          </div>
        </div>

        <div class="text-center items-center">
          <button @click="startEdit" class="btn text-sm font-bold text-black rounded-md border border-gray-300 p-2 mr-4">Editar perfil</button>
          <button @click="logout" class="btn text-red-600 font-semibold text-lg mt-2">Logout</button>
        </div>
      </div>
    </div>

    <!-- Cursos favoritos -->
    <div class="profile-card bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mx-auto">
      <h2 class="text-2xl font-bold mb-4">Mis Cursos Favoritos</h2>
      <div class="flex flex-col gap-4">
        <!-- Bucle para los cursos favoritos -->
        <div v-for="course in favoriteCourses" :key="course._id"
        class="bg-white hover:shadow-md transition rounded-lg overflow-hidden">
          
          <div class="flex flex-col md:flex-row cursor-pointer border-gray-100 border">
            <!-- Imagen del curso a la izquierda -->
            <img :src="courseImage(course)" alt="Imagen del curso" 
            class="md:w-40 w-full object-contain rounded-t-lg md:rounded-t-none md:rounded-l-lg">

            <!-- Contenido del curso a la derecha -->
            <div class="p-2 flex-grow">
              <h3  @click="() => goToCourseDetail(course)"
                 class="font-semibold text-lg  hover:underline">{{ course.title || 'Curso Seleccionado' }}</h3>
              <!-- <p class="text-gray-600 text-sm mb-4">{{ courseDescription(course) || 'En el ámbito actual, al guiar a individuos, equipos y organizaciones a través de procesos de desarrollo del talento humano, se...'}}</p> -->
              
            </div>
            <button @click="removeFromFavorites(course._id)" title="Eliminar curso"
              class="p-2">
              <svg fill="#FF0000" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                <path d="M304.615-160q-26.846 0-45.731-18.884Q240-197.769 240-224.615V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.385Q720-197 701.5-178.5 683-160 655.385-160h-350.77ZM680-720H280v495.385q0 10.769 6.923 17.692T304.615-200h350.77q9.23 0 16.923-7.692Q680-215.385 680-224.615V-720ZM392.307-280h40.001v-360h-40.001v360Zm135.385 0h40.001v-360h-40.001v360ZM280-720v520-520Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted,computed  } from 'vue';
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


//ajustes para diferencia de utn y udemy 
const goToCourseDetail = (course) => {
  console.log("Curso actual:", course);
  console.log("Tipo de curso:", course.courseType);

  if (course.courseType === 'UDEMY') {
    router.push({ name: 'DetalleCursoUdemy', params: { id: course._id } });
  } else if (course.courseType === 'UTN') {
    router.push({ name: 'DetalleCursoUTN', params: { id: course._id } });
  } else {
    router.push({ name: 'Home' });
  }
};


const courseImage = (course) => {
  return course.image_480x270 || course.imgUrl;
};

const courseDescription = (course) => {
  
  return course.headline || course.summary;


};
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
    console.log("Cursos favoritos recibidos:", response.data);
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
