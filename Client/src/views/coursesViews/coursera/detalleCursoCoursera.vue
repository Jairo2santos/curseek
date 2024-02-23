<template >
  <div class="bg-gray-100">

    <div class=" bg-gray-100  container mx-auto p-6 flex flex-col md:flex-row">
      <!-- Contenido principal -->
      <main class="flex-1 bg-white p-4 rounded-lg shadow-md mr-4">
        <!-- Título y Universidad -->
        <section class="mb-6 p-4 rounded-lg">
          <h1 class="text-3xl font-bold mb-2">{{ course.title }}</h1>
        </section>

        <section class="mb-6 p-4 rounded-lg my-3">
          <h2 class="text-xl font-semibold text-gray-700">
            {{ course.university }}
          </h2>
        </section>
        <!-- Resumen del curso con botón de expandir -->
        <section class="mb-6 p-4 rounded-lg">
          <h3 class="text-lg font-bold mb-2">Resumen</h3>
          <div :class="{ 'max-h-48 overflow-hidden': !expandDescription }" class="relative">
            <p>{{ course.longDescription }}</p>
            <div v-if="!expandDescription"
              class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
          </div>
          <button @click="expandDescription = !expandDescription" class="mt-4 text-blue-600">
            {{ expandDescription ? "Ver menos" : "Ver más" }}
          </button>
        </section>
        <!-- Detalles del Curso -->
        <section class="mb-6 p-4 rounded-lg bg-gray-50">
          <h3 class="text-lg font-bold mb-2">Detalles del Curso</h3>
          <div :class="{ 'max-h-72 overflow-hidden': !expandCourseDetails }" class="relative">
            <pre>{{ course.courseDetailsText }}</pre>
            <div v-if="!expandCourseDetails"
              class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
          </div>
          <button @click="expandCourseDetails = !expandCourseDetails" class="mt-4 text-blue-600">
            {{ expandCourseDetails ? "Ver menos" : "Ver más" }}
          </button>
        </section>
        <!-- Profesores -->
        <section class="p-4 rounded-lg">
          <h3 class="text-lg font-bold mb-2">Profesores</h3>
          <div v-for="instructor in course.instructors" :key="instructor._id" class="flex items-center mb-4">
            <img :src="instructor.imageUrl" alt="Foto del profesor" class="rounded-full w-12 h-12 mr-4" />
            <div class="font-medium">{{ instructor.name }}</div>
          </div>
        </section>
      </main>
      <!-- Barra lateral con detalles del curso -->
      <aside class="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <img :src="course.imgUrl" alt="Imagen del curso" class="rounded-lg mb-4" />
        <a :href="course.courseUrl" target="_blank"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center mb-4">
          Ir al curso
        </a>
        <div class="space-y-2">
          <div class="flex items-center">
            <h4 class="text-lg font-bold mb-2">Estrellas de este curso: {{ course.rating }}</h4>
          </div>
          <div class="text-gray-600">Nivel: {{ course.level }}</div>
          <div class="text-gray-600">
            Categoría Principal: {{ course.mainCategory }}
          </div>
          <div class="text-gray-600">
            Subcategoría: {{ course.secondaryCategory }}
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const course = ref({});
const expandDescription = ref(false);
const expandCourseDetails = ref(false);

onMounted(async () => {
  const courseSlug = route.params.slug;
  try {
    const response = await axios.get(
      `http://localhost:3333/cursos/coursera/${courseSlug}`
    );
    course.value = response.data;
  } catch (error) {
    console.error("Error obteniendo el detalle del curso de Coursera:", error);
  }
});
</script>
