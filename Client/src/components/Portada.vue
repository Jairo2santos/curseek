<template>
<<<<<<< HEAD
  <div class="flex justify-between items-center p-4 rounded-lg mb-6 w-full mx-auto .max-w-screen-xl">
    <div>
      <h1 class="text-2xl font-bold mb-2">{{ title }}</h1>
      <p class="text-gray-600 mb-2">{{ description }}</p>
      <span class="text-sm bg-gray-200 py-2 px-4 rounded-full">Cursos totales: {{ totalCourses }}</span>
    </div>
    <img :src="computedImageSrc" alt="UTN Logo" class="w-80" />
=======
  <div class="flex flex-col lg:flex-row justify-between items-center p-4 rounded-lg mb-6 w-full mx-auto max-w-screen-xl">
    <img :src="computedImageSrc" :alt="altText" class="w-full lg:w-80 mb-4 lg:mb-0" />

    <div class="lg:ml-4 py-2">
      <slot name="title">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-800">{{ title }}</h1>
      </slot>
      <slot name="description">
        <p class="text-gray-600 mr-4 py-4">{{ description }}</p>
      </slot>
      <slot name="course-info">
        <div class="flex items-center">
          <span class="text-sm bg-gray-200 py-2 px-4 mr-2 font-bold text-indigo-900 rounded-full">{{ totalCourses.toLocaleString() }} cursos</span>

          <div class="flex items-center">
            <a :href="instagramLink" target="_blank" 
            class="flex items-center mr-2 text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
              <!-- <img src="../assets/redes/instagram.png" alt="instagram" class="w-8 mr-1"> -->
              <!-- <span>Instagram</span> -->
              <i class="fab fa-instagram fa-lg w-8 mr-1 ml-4"></i>
            </a>
            <a :href="twitterLink" target="_blank" 
            class="flex items-center mr-2 text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
              <!-- <img src="../assets/redes/twitter.png" alt="twitter" class="w-8 mr-1"> -->
              <!-- <span>Twitter</span> -->
              <i class="fab fa-twitter fa-lg w-8 mr-1"></i>
            </a>
            <a :href="facebookLink" target="_blank" 
            class="flex items-center text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
              <!-- <img src="../assets/redes/facebook.png" alt="facebook" class="w-8 mr-1"> -->
              <!-- <span>Facebook</span> -->
              <i class="fab fa-facebook fa-lg w-8 mr-1"></i>
            </a>
          </div>

        </div>
      </slot>
    </div>
>>>>>>> developer
  </div>
</template>

<script setup>
import { computed } from 'vue';
import defaultImage from '../assets/logo-utn.jpg';

const props = defineProps({
  title: {
    type: String,
    default: "Institucion Educativa"
  },
<<<<<<< HEAD
  computed: {
    computedImageSrc() {
      return this.imageSrc;
    }
  }
}
=======
  description: {
    type: String,
    default: "Descripción predeterminada del curso o institución."
  },
  totalCourses: {
    type: Number,
    default: 0
  },
  imageSrc: {
    type: String,
    default: defaultImage
  },
  altText: {
    type: String,
    default: "Institución educativa"
  },
  instagramLink: {
    type: String,
    required: true,
  },
  twitterLink: {
    type: String,
    required: true,
  },
  facebookLink: {
    type: String,
    required: true,
  },
});

const computedImageSrc = computed(() => props.imageSrc);
>>>>>>> developer
</script>