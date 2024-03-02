<template>
  <div class="max-w-4xl mx-auto my-10">
    <Notificacion v-if="showNotification" :message="notificationMessage" :type="notificationType" @close="showNotification = false" />
    <h2 class="text-3xl font-bold mb-5">{{ isEditMode ? 'Editar Blog' : 'Agregar Nuevo Blog' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Título</label>
        <input type="text" id="title" v-model="blog.title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pastel-verde focus:border-pastel-verde block w-full p-2.5"
          required>
      </div>
      <div class="mb-6">
        <label for="image" class="block mb-2 text-sm font-medium text-gray-900">URL de la Imagen</label>
        <input type="text" id="image" v-model="blog.image"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pastel-verde focus:border-pastel-verde block w-full p-2.5"
          required>
      </div>
      <div class="mb-6">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Contenido</label>
        <textarea id="content" v-model="blog.content" rows="10"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pastel-verde focus:border-pastel-verde block w-full p-2.5"
          required></textarea>
      </div>
      <button type="submit"
        class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{{ isEditMode ? 'Actualizar' : 'Publicar' }}</button>
    </form>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Notificacion from '../../components/Notificaciones.vue'; // Asegúrate de importar correctamente el componente

const route = useRoute();
const router = useRouter();
const blog = ref({ title: '', image: '', content: '' });
const isEditMode = ref(false);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

// Cargar los datos del blog si estamos en modo de edición
onMounted(async () => {
  // Obtén el slug del blog desde los parámetros de la ruta
  const { slug } = route.params;
  try {
    // Realiza una solicitud para obtener los datos del blog
    const response = await axios.get(`http://localhost:3333/api/blogs/slug/${slug}`);
    blog.value = response.data;
  } catch (error) {
    console.error('Error al cargar el blog para editar:', error);
    // Maneja el error, por ejemplo, mostrando un mensaje al usuario
  }
});
const submitForm = async () => {
  try {
    const url = isEditMode.value ? `http://localhost:3333/api/blogs/slug/${route.params.slug}` : 'http://localhost:3333/blogs';
    const method = isEditMode.value ? 'put' : 'post';

    const response = await axios({
      method: method,
      url: url,
      data: blog.value,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Mostrar notificación de éxito
    showNotification.value = true;
    notificationMessage.value = isEditMode.value ? 'Blog actualizado exitosamente' : 'Blog publicado exitosamente';
    notificationType.value = 'success';
    
    // Redirigir al usuario a la lista de blogs después de 3 segundos
    setTimeout(() => {
      router.push({ name: 'BlogList' });
    }, 3000);
  } catch (error) {
    console.error('Error al guardar el blog:', error);
    // Mostrar notificación de error
    showNotification.value = true;
    notificationMessage.value = 'Error al guardar el blog';
    notificationType.value = 'error';
  }
};

</script>
  