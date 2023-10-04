<template>
<div class="flex justify-between items-center p-4 rounded-lg mb-6 w-full mx-auto .max-w-screen-xl">
    <div>
        <h1 class="text-2xl font-bold mb-2">{{ title }}</h1>
        <p class="text-gray-600 mb-2">{{ description }}</p>
        <span class="text-sm bg-gray-200 py-2 px-4 rounded-full">Cursos totales: {{ totalCourses }}</span>
    </div>
    <img :src="computedImageSrc" alt="UTN Logo" class="w-80" />
</div>

</template>

<script>
// Importa la imagen aquí
import defaultImage from '../assets/logo-utn.jpg';

export default {
  props: {
    title: {
      type: String,
      default: "Universidad Tecnológica Nacional (UTN) "
    },
    description: {
      type: String,
      default: "Esta es una universidad argentina que viene de la Universidad Obrera Nacional. Es la única en Argentina que se enfoca principalmente en ingenierías y que está en todo el país. Aunque su oficina principal está en Buenos Aires, tiene 30 sedes en diferentes lugares de Argentina. Es la universidad de ingeniería con más estudiantes en el país."
    },
    totalCourses: {
      type: Number,
      default: 0
    },
    imageSrc: {
      type: String,
      default: defaultImage
    }
  },
  computed: {
    computedImageSrc() {
      return this.imageSrc;
    }
  }
}
</script>
