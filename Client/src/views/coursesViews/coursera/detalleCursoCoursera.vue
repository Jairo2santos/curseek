<template>
  <div class="bg-gray-100 p-4 md:p-6 max-w-screen-full">
    <seo-component
      :title="pageTitleSEO"
      :description="pageDescriptionSEO"
      :breadcrumbs="breadcrumbs"
    />
    

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-screen-xl mx-auto">
      <!-- Contenido principal -->
      <main class="md:col-span-2">
        <!-- Título y Universidad -->
        <section class="hidden md:block bg-white p-4 md:p-6 rounded mb-6 justify-between items-center">
          <h1 class="md:text-3xl font-bold text-gray-800">{{ course.title }}</h1>
          <div class="flex items-center pt-2">
            <a href="/cursos/Coursera">
              <button class="flex hover:underline transition" title="Ir a cursos de Coursera">
                <span>Coursera, {{ course.university }}</span>
                <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="#000000">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
                </svg>
              </button>
            </a>
          </div>
          <div class="bg-gray-200 md:bg-white items-end ml-auto rounded-lg md:m-0 pt-2">
            <button title="Agregar a Favoritos">
              <Favoritos :courseId="course._id" :courseType="'COURSERA'" :isFavorited="course.isFavorited" />
            </button>
          </div>
        </section>

        <section class="hidden md:block bg-white p-4 md:p-6 rounded mb-6">
          <!-- Resumen del curso con botón de expandir -->
          <h3 class="text-xl mb-2 font-bold">Resumen</h3>
<div :class="{ 'max-h-48 overflow-hidden': !expandDescription }" class="relative">
  <p>{{ course.longDescription }}</p>
  <div v-if="!expandDescription" class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
</div>
<button @click="expandDescription = !expandDescription" class="mt-4 text-blue-600 hover:underline font-semibold transition focus:outline-none">
  {{ expandDescription ? "Ver menos" : "Ver más" }}
</button>
          <!-- Detalles del Curso Mejorados -->
          <h3 class="text-xl mb-2 font-bold mt-6">Formación</h3>
          <div :class="{ 'max-h-56 overflow-y-auto': expandCourseDetails }">
            <div v-if="courseModules.length === 0" class="p-4 mb-4 rounded-lg shadow">
              <p class="text-sm">No se encontraron módulos disponibles.</p>
            </div>
            <div v-else>
              <div v-for="(module, index) in courseModules" :key="index" class="p-4 mb-4 rounded-lg shadow">
                <h4 class="text-md font-semibold">{{ module.title}}</h4>
                <p class="text-sm">{{ module.details }}</p>
              </div>
            </div>
          </div>

          <button @click="expandCourseDetails = !expandCourseDetails"
            class="mt-4 text-blue-600 hover:underline font-semibold transition focus:outline-none">
            {{ expandCourseDetails ? 'Ver más' : '' }}
          </button>
        </section>

        <div class="bg-white p-4 md:p-6 rounded mb-6">
          <h3 class="text-xl mb-2 font-bold">Información institucional</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
            <!-- Primera card -->
            <section class="bg-white p-4 md:p-6 rounded flex-col justify-center">
              <!-- Contenido de la primera card -->
              <div class="flex items-center pb-2">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="36">
                  <path
                    d="M295.384-80V-358.23L158.461-580l160.385-260h322.308l160.385 260-136.923 221.769V-80L480-143.846 295.384-80Zm40.001-58.692L480-187.077l144.615 48.385V-320h-289.23v181.308ZM340.769-800l-136 220 136 220h278.462l136-220-136-220H340.769ZM438-445.461 324.461-558 353-586.539l85 85 169-170L635.539-644 438-445.461ZM335.385-320h289.23-289.23Z" />
                </svg>
                <h3 class="text-xl mb-2 font-bold">Profesores certificados</h3>
              </div>
              <div class="relative">
                <p>
                  Nuestros educadores poseen habilidades especializadas en la enseñanza a distancia y comparten una
                  profunda
                  pasión por educar, comprometiéndose a mantenerse continuamente actualizados para ofrecer lecciones
                  completas y de elevado estándar académico.
                </p>
              </div>
            </section>

            <!-- Segunda card -->
            <section class="bg-white p-4 md:p-6 rounded flex-col justify-center">
              <!-- Contenido de la segunda card -->
              <div class="flex items-center pb-2">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="36">
                  <path
                    d="m437-408 198.539-197.539L607-634.077l-170 170-85-85-28.308 28.308L437-408ZM70.769-181.538v-40h818.462v40H70.769Zm113.846-80q-27.615 0-46.115-18.5-18.5-18.5-18.5-46.116v-390.769q0-27.616 18.5-46.116t46.115-18.5h590.77q27.615 0 46.115 18.5 18.5 18.5 18.5 46.116v390.769q0 27.616-18.5 46.116t-46.115 18.5h-590.77Zm0-40.001h590.77q9.23 0 16.923-7.692Q800-316.923 800-326.154v-390.769q0-9.231-7.692-16.923-7.693-7.693-16.923-7.693h-590.77q-9.23 0-16.923 7.693Q160-726.154 160-716.923v390.769q0 9.231 7.692 16.923 7.693 7.692 16.923 7.692Zm-24.615 0v-440 440Z" />
                </svg>
                <h3 class="text-xl mb-2 font-bold">Estudia en Coursera</h3>
              </div>
              <div class="relative">
                <p>
                  Adquiere saberes de la mano de educadores altamente experimentados en educación a distancia,
                  comprometidos con una actualización constante para proporcionar clases de excelencia académica. Contamos
                  con una sólida trayectoria en la enseñanza en línea, respaldada por la dedicación y la experiencia de
                  nuestro equipo docente.
                </p>
              </div>
          
            </section>
          </div>
        </div>

        <!-- Profesores -->
        <section class="bg-white p-4 md:p-6 rounded">
          <h3 class="text-xl mb-2 font-bold">Profesores</h3>
          <div v-for="instructor in course.instructors" :key="instructor._id" class="flex items-center mb-4">
            <img :src="instructor.imageUrl" alt="" class="rounded-full w-12 mr-4" />
            <span class="font-medium">{{ instructor.name }}</span>
          </div>
        </section>
      </main>

      <!-- Barra lateral con detalles del curso -->
      <aside class="order-first md:order-last bg-white p-4 md:p-6 rounded">
        <img :src="course.imgUrl" alt="" class="block mx-auto rounded-sm mb-4 w-48" />
        <!-- Título y Universidad -->
        <section class="md:hidden bg-white md:p-6 rounded mb-4 flex justify-between items-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">{{ course.title }}</h3>
          <div class="bg-gray-200 ml-auto rounded-lg">
            <button class="mx-3" title="Agregar a Favoritos">
                <Favoritos :courseId="course._id" :courseType="'COURSERA'" :isFavorited="course.isFavorited" />
            </button>
          </div>
        </section>
        <section class="md:hidden block bg-white md:p-6 rounded mb-6">
          <!-- Resumen del curso con botón de expandir -->
          <div :class="{ 'max-h-48 overflow-hidden': !expandDescription }" class="relative">
            <p>{{ course.longDescription }}</p>
            <!-- Detalles del Curso Mejorados -->
            <h3 class="text-xl mb-2 font-bold mt-6">Formación</h3>
            <div :class="{ 'max-h-56 overflow-y-auto': expandCourseDetails }">
              <div v-if="courseModules.length === 0" class="p-4 mb-4 rounded-lg shadow">
                <p class="text-sm">No se encontraron módulos disponibles.</p>
              </div>
              <div v-else>
                <div v-for="(module, index) in courseModules" :key="index" class="p-4 mb-4 rounded-lg shadow">
                  <h4 class="text-md font-semibold">{{ module.title}}</h4>
                  <p class="text-sm">{{ module.details }}</p>
                </div>
              </div>
            </div>
            <div v-if="!expandDescription"
              class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
          </div>
          <button @click="expandDescription = !expandDescription"
            class="text-blue-600 hover:underline transition focus:outline-none">
            {{ expandDescription ? "Ver menos" : "Ver más" }}
          </button>
        </section>
        <div @click="redirectToCoursera" class=" cursor-pointer flex bg-indigo-600 text-white text-center py-2 px-4 rounded hover:bg-indigo-800 transition-colors duration-300 ease-in-out w-full items-center text-md justify-center font-semibold">
          Ir al curso
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" class="ml-2">
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
              fill="#fff" />
          </svg>
        </div>
        <!-- Contenido de bajo -->
        <div class="px-2 py-6 text-md">
          <!-- <div class="flex items-center">
            <h4 class="text-lg font-semibold mb-2">Estrellas de este curso: {{ course.rating == "No rating found" ?
              "Sin calificación" : "..." }}</h4>
          </div> -->

          <ul>
            <!-- Institución -->
            <li class="flex text-sm text-gray-800 p-2 border-b border-gray-100">
              <div class="flex items-center">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M400-420h139.231v-40H400v40Zm0-120h278.462v-40H400v40Zm0-120h278.462v-40H400v40Zm-75.385 380Q297-280 278.5-298.5 260-317 260-344.615v-430.77Q260-803 278.5-821.5 297-840 324.615-840h430.77Q783-840 801.5-821.5 820-803 820-775.385v430.77Q820-317 801.5-298.5 783-280 755.385-280h-430.77Zm0-40h430.77q9.231 0 16.923-7.692Q780-335.385 780-344.615v-430.77q0-9.23-7.692-16.923Q764.616-800 755.385-800h-430.77q-9.23 0-16.923 7.692Q300-784.615 300-775.385v430.77q0 9.23 7.692 16.923Q315.385-320 324.615-320Zm-120 160Q177-160 158.5-178.5 140-197 140-224.615v-470.77h40v470.77q0 9.231 7.692 16.923Q195.384-200 204.615-200h470.77v40h-470.77ZM300-800v480-480Z" />
                </svg>
                <a href="/cursos/Coursera">
                  <button class="flex hover:underline transition" title="Estos cursos provienen de nuestro proveedor: Coursera">
                    <span>Coursera - {{ course.university }}</span>
                    <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="#000000">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
                    </svg>
                  </button>
                </a>
              </div>
            </li>
            <!-- Categoría -->
            <li class="flex text-sm text-gray-800 p-2 border-b border-gray-100">
              <div class="flex items-center">
                <svg class="mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                  width="24">
                  <path
                    d="M260-318.462q52.385 0 101.885 12.039 49.5 12.038 98.115 39.192v-392.461q-43.308-30.923-95.462-46.385Q312.385-721.538 260-721.538q-36 0-63.039 4.307-27.038 4.308-60.038 16-9.231 3.077-13.077 8.846-3.846 5.77-3.846 12.693v360.615q0 10.769 7.692 15.769 7.693 5 16.923 1.154 21.923-7.384 50.654-11.846Q224-318.462 260-318.462Zm240 51.231q48.615-27.154 98.115-39.192 49.5-12.039 101.885-12.039 36 0 64.731 4.462 28.731 4.462 50.654 11.846 9.23 3.846 16.923-1.154 7.692-5 7.692-15.769v-360.615q0-6.923-3.846-12.308t-13.077-9.231q-33-11.692-60.038-16Q736-721.538 700-721.538q-52.385 0-104.538 15.461-52.154 15.462-95.462 46.385v392.461Zm-20 58.001q-48.769-33.385-104.769-51.308-56-17.923-115.231-17.923-31.231 0-61.346 5.231Q168.538-268 140-256.461q-21.769 8.692-40.885-5.231Q80-275.615 80-300.153v-386.616q0-14.847 7.807-27.539Q95.615-727 109.692-732q35.231-15.539 73.308-22.539 38.077-7 77-7 58.769 0 114.654 16.923Q430.538-727.693 480-695.385q49.462-32.308 105.346-49.231Q641.231-761.539 700-761.539q38.923 0 77 7T850.308-732q14.077 5 21.885 17.692Q880-701.616 880-686.769v386.616q0 24.538-20.654 37.692-20.653 13.154-43.961 4.461-27.769-10.769-56.731-15.615-28.962-4.846-58.654-4.846-59.231 0-115.231 17.923-56 17.923-104.769 51.308ZM290-499.385Z" />
                </svg>
                <span>{{ course.mainCategory  }} - {{ course.secondaryCategory}}</span>
              </div>
            </li>
            <!-- Nivel -->
            <li class="flex text-sm text-gray-800 p-2 border-b border-gray-100">
              <div class="flex items-center">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M335.384-160v-40H460v-150.154q-52.846-9.461-92.5-44.192t-54.577-86.115q-63.462-7.462-108.192-52.039Q160-577.077 160-640v-40q0-16.077 11.961-28.039Q183.923-720 200-720h106.154v-80h347.692v80H760q16.077 0 28.039 11.961Q800-696.077 800-680v40q0 62.923-44.731 107.5-44.73 44.577-108.192 52.039-14.923 51.384-54.577 86.115-39.654 34.731-92.5 44.192V-200h124.616v40H335.384Zm-29.23-363.385V-680H200v40q0 45.692 30.461 78.5 30.462 32.808 75.693 38.115ZM480-389.231q55.385 0 93.846-38.461 38.462-38.462 38.462-93.846V-760H347.692v238.462q0 55.384 38.462 93.846 38.461 38.461 93.846 38.461Zm173.846-134.154q45.231-5.307 75.693-38.115Q760-594.308 760-640v-40H653.846v156.615ZM480-574.615Z" />
                </svg>
                <span>{{ course.level || 'Sin Nivel' }}</span>
              </div>
            </li>
            <!-- Precio -->
            <li class="flex text-sm text-gray-800 p-3">
              <svg class="mr-2" fill="#057500" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                width="24">
                <path
                  d="M542.308-131.692q-11.529 11.461-28.573 11.461-17.043 0-28.504-11.461l-352-352q-6.385-6.385-9.808-14.02T120-514v-286q0-16.077 11.961-28.039Q143.923-840 160-840h286q7.769 0 15.452 3.166 7.683 3.167 13.317 8.526l352 352.231Q839-463.846 839.385-446.5q.384 17.346-11.077 28.808l-286 286ZM513.425-160l286.344-286-353.425-354H160v286l353.425 354ZM259.91-660q16.629 0 28.359-11.64Q300-683.281 300-699.909q0-16.63-11.64-28.36Q276.72-740 260.09-740q-16.629 0-28.359 11.64Q220-716.719 220-700.091q0 16.63 11.64 28.36Q243.28-660 259.91-660ZM160-800Z" />
              </svg>
              <span class="text-sm">{{ course.price || 'Inscripción Gratuita' }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
    <p class="hidden  mt-3 md:block text-center pb-6 text-sm text-gray-500">CurSeek cuenta con el apoyo del alumno. Cuando
      compra a través de enlaces en nuestro sitio, podemos ganar una comisión de afiliado.</p>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted} from "vue";
import axios from "axios";
import { useRoute,useRouter  } from "vue-router";
import Favoritos from "../../../components/Favoritos.vue";
import SeoComponent from '../../../components/SEO.vue';
import { useMeta } from 'vue-meta';

const route = useRoute();
const course = ref({});
const expandDescription = ref(false);
const expandCourseDetails = ref(false);
const courseModules = ref([]);
const router = useRouter();
const structuredData = ref({});


//SEO

// Ejemplo de pageTitle y pageDescription
const pageTitleSEO = computed(() => {
  return course.value.title ? `curso sobre ${course.value.title} - CurSeek` : 'Cargando...';
});

const pageDescriptionSEO = computed(() => {
   let description = course.value.shortDescription && course.value.shortDescription !== "No short description found"
                    ? course.value.shortDescription
                    : course.value.longDescription || '';
  
  return description.length > 160 ? `${description.substring(0, 157)}...` : description;
});


// Usa la API de enrutamiento de Vue para obtener la ruta actual

// Crea una estructura de breadcrumbs reactiva basada en la ruta actual
const breadcrumbs = computed(() => {
  const courseSlug = route.params.slug; // Obtienes el slug actual del curso desde la URL
  return [
    { text: 'Inicio', to: '/', active: route.path === '/' },
    { text: 'Coursera', to: '/cursos/coursera', active: route.path.includes('/cursos/coursera') },
    // Aquí usamos el slug real en lugar de ':slug'
    { text: course.value.title, to: `/coursera/cursos/${courseSlug}`, active: true },
  ];
});
onMounted(async () => {
  const courseSlug = route.params.slug;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/cursos/coursera/${courseSlug}`
    );
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Curso no encontrado');
    }
    course.value = response.data;
    console.log("Título SEO:", pageTitleSEO.value);
    console.log("Descripción SEO:", pageDescriptionSEO.value);
    structuredData.value = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.value.title,
      "description": course.value.longDescription, 
      "provider": {
        "@type": "Organization",
        "name": course.value.university, 
      }
    };
  } catch (error) {
    console.error("Error obteniendo el detalle del curso de Coursera:", error);
    router.push({ name: 'Error404' });
  }

});

//seo2 

useMeta({
  title: pageTitleSEO.value,
    meta: [
    {
      name: 'description',
      content: pageDescriptionSEO.value
    },
    // Tus otros meta tags aquí
  ],
  script: [
    {
      type: 'application/ld+json',
      json: structuredData
    },
  ],
});
const redirectToCoursera = () => {
  const courseUrl = course.value.courseUrl;
  router.push({ path: '/link-saliente', query: { url: courseUrl, isExternal: 'true' } });
};
const processCourseDetailsText = () => {
  const sections = course.value.courseDetailsText.split('\n').filter(line => line.trim() !== '');
  let currentModule = { title: '', details: '' };
  sections.forEach((section) => {
    if (section.match(/^Módulo \d+/)) { // Nuevo módulo detectado
      if (currentModule.title) {
        courseModules.value.push(currentModule); // Guardar el módulo anterior
      }
      currentModule = { title: section, details: '' }; // Empezar nuevo módulo
    } else {
      currentModule.details += section + ' '; // Añadir detalles al módulo actual
    }
  });
  if (currentModule.title) {
    courseModules.value.push(currentModule); // Asegurar que el último módulo se añada
  }
};


</script>
