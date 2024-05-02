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
        <div id="editor"></div>

      </div>
      <button type="submit"
        class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{{ isEditMode ? 'Actualizar' : 'Publicar' }}</button>
    </form>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../../axiosConfig.js' 
import Notificacion from '../../components/Notificaciones.vue';
import { getFromLocalStorage} from '../../utils/localStorage';
import 'quill/dist/quill.snow.css';

const route = useRoute();
const router = useRouter();
const blog = ref({ title: '', image: '', content: '' });
const isEditMode = ref(false);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
let editor = null;


onMounted(async () => {
  const slug = route.params.slug;
  if (slug) {
    isEditMode.value = true;
    try {
      const response = await axios.get(`/blogs/slug/${slug}`);
      blog.value = response.data;
      console.log('Blog cargado para editar:', blog.value);
    } catch (error) {
      console.error('Error al cargar el blog para editar:', error);
      notificationMessage.value = 'No se pudo cargar el blog para editar';
      notificationType.value = 'error';
      showNotification.value = true;
    }
  }
  if (typeof window !== 'undefined') {
    const Quill = await import('quill');
  // Solo inicializa Quill una vez
  editor = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet'}, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  },
  placeholder: 'Escribe algo increíble...',
});


  // Establece el contenido del editor en modo de edición
  if (isEditMode.value && blog.value.content) {
    editor.root.innerHTML = blog.value.content;
  }
}
});

const submitForm = async () => {
  const token = getFromLocalStorage('token');

  if (!token) {
    console.error('No se ha proporcionado el token de autorización.');
    notificationMessage.value = 'Falta el token de autorización.';
    notificationType.value = 'error';
    showNotification.value = true;
    return;
  }

  try {
    const slug = route.params.slug;
    const url = isEditMode.value && slug ? `/blogs/slug/${slug}` : `/blogs`;
    const method = isEditMode.value ? 'put' : 'post';

    // Obtiene el contenido HTML del editor Quill
    const contentHTML = editor.root.innerHTML; 

    // Asegúrate de que la estructura de `blog.value` incluya el contenido HTML correctamente
    const blogData = {
    ...blog.value,
    content: contentHTML, // Aquí asignas el contenido HTML al campo correcto
  };

    console.log('Realizando solicitud:', method, 'a', url);
    console.log('Datos del blog:', blogData);

    const response = await axios({
      method,
      url,
      data: blogData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta de la solicitud:', response);
    notificationMessage.value = isEditMode.value ? 'Blog actualizado exitosamente' : 'Blog publicado exitosamente';
    notificationType.value = 'success';
    showNotification.value = true;
    
    setTimeout(() => {
      router.push({ name: 'BlogList' });
    }, 3000);
  } catch (error) {
    console.error('Error al guardar el blog:', error);
    notificationMessage.value = 'Error al guardar el blog';
    notificationType.value = 'error';
    showNotification.value = true;
  }
};

</script>
