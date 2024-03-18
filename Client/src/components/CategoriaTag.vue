<!-- src/components/CategoriaTag.vue -->
<template>
  <a :href="'/categoria/' + categoria" class="text-sm bg-blue-200 text-blue-700 py-1 px-2 rounded">
    {{ categoria }}
  </a>
</template>

<<<<<<< HEAD
<script>
export default {
  props: {
    categoria: {
      type: String,
      required: true
    }
  }
}
=======
<script setup>
const { categoria } = defineProps(['categoria']);
>>>>>>> developer
</script>