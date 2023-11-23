<template>
     <button @click.stop="toggleFavorite" class= "focus:outline-none transition text-cyan-500 text-sm hover:text-cyan-600 focus:outline-none transition">
      
    
      <span :class="isFavorited ? 'text-lg text-red-500' : 'text-lg text-cyan-500'">
  {{ isFavorited ? '♥' : '♡' }}
</span>
Favorito
    </button>


    <transition name="slide-down">
    <div v-if="showNotification" class="fixed top-0 inset-x-0 z-50">
      <div :class="notificationClass" class="text-white text-center py-3">
        {{ notificationMessage }}
      </div>
    </div>
  </transition>
  </template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  courseId: String,
  courseType: String
});

const showNotification = ref(false);
const notificationMessage = ref('');
const notificationClass = ref('');

// Función para mostrar la notificación
const triggerNotification = (message, type) => {
  notificationMessage.value = message;
  notificationClass.value = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  showNotification.value = true;

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

// Estado local que refleja si el curso está en favoritos
const isFavorited = ref(false);

// Función para alternar el estado de favoritos
const toggleFavorite = async () => {
  try {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
      triggerNotification('Debe iniciar sesión para agregar a favoritos', 'error');
      return;
    }
    const action = isFavorited.value ? 'remove' : 'add';
    await axios.post(`http://localhost:3333/users/favorites/${action}`, {
      userId,
      courseId: props.courseId,
      courseType: props.courseType
    });
    isFavorited.value = !isFavorited.value;
    triggerNotification(`Curso ${isFavorited.value ? 'agregado a' : 'eliminado de'} favoritos`, 'success');
  } catch (error) {
    console.error('Error al actualizar favoritos:', error);
    triggerNotification('No se pudo actualizar la lista de favoritos', 'error');
  }
};
</script>