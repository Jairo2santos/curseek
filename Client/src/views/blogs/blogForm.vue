<template>
  <div class="max-w-4xl mx-auto my-10">
    <Notificacion
      v-if="showNotification"
      :message="notificationMessage"
      :type="notificationType"
      @close="showNotification = false"
    />

    <h2 class="text-3xl font-bold mb-5">
      {{ isEditMode ? "Editar Blog" : "Agregar Nuevo Blog" }}
    </h2>
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900"
          >Título</label
        >
        <input
          type="text"
          id="title"
          v-model="blog.title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pastel-verde focus:border-pastel-verde block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label for="image" class="block mb-2 text-sm font-medium text-gray-900"
          >URL de la Imagen</label
        >
        <input
          type="text"
          id="image"
          v-model="blog.image"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pastel-verde focus:border-pastel-verde block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="content"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Contenido</label
        >
        <div class="quill-editor-container">
  <div ref="quillEditor"></div> 
</div>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Guardar
      </button>
      <button
        v-if="!isEditMode"
        @click="publishBlog"
        type="button"
        class="ml-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Publicar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const route = useRoute();
const router = useRouter();
const blog = ref({ title: "", image: "", content: "" });
const isEditMode = ref(false);
const showNotification = ref(false);
const notificationMessage = ref("");
const notificationType = ref("");
const quillEditor = ref(null);

// Configuración inicial del editor Quill
onMounted(() => {
  if (route.params.blogId) {
    isEditMode.value = true;
    loadBlogData();
  }
  initQuill();
});

const loadBlogData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3333/blogs/${route.params.blogId}`
    );
    blog.value = response.data;
    quillEditor.value.root.innerHTML = blog.value.content; // Asegúrate de que Quill esté inicializado aquí
  } catch (error) {
    console.error("Error al cargar el blog:", error);
  }
};

const initQuill = () => {
  quillEditor.value = new Quill(quillEditor.value, { // Usa la referencia del elemento para inicializar Quill
    theme: 'snow'
  });
  // Escuchar cambios en el contenido del editor y actualizar blog.content
  quillEditor.value.on('text-change', function() {
    blog.value.content = quillEditor.value.root.innerHTML;
  });
};

const submitForm = async () => {
  try {
    let response;
    if (isEditMode.value) {
      response = await axios.put(
        `http://localhost:3333/blogs/${route.params.blogId}`,
        blog.value,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } else {
      response = await axios.post("http://localhost:3333/blogs", blog.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    }
    if (response.status === 200 || response.status === 201) {
      showSuccessNotification(
        isEditMode.value
          ? "Blog actualizado exitosamente"
          : "Blog publicado exitosamente"
      );
      router.push("/blogs");
    }
  } catch (error) {
    console.error("Error al guardar el blog:", error);
    showErrorNotification("Hubo un problema al guardar el blog");
  }
};

const showSuccessNotification = (message) => {
  notificationMessage.value = message;
  notificationType.value = "success";
  showNotification.value = true;
  setTimeout(() => (showNotification.value = false), 3000);
};

const showErrorNotification = (message) => {
  notificationMessage.value = message;
  notificationType.value = "error";
  showNotification.value = true;
  setTimeout(() => (showNotification.value = false), 3000);
};
</script>
