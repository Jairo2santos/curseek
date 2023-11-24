<template>
  <div>
    <button @click.stop="toggleFavorite" class="focus:outline-none transition text-cyan-500 text-sm hover:text-cyan-600">
      <span :class="isFavorited ? 'text-3xl text-red-500' : 'text-3xl text-cyan-500'">
        {{ isFavorited ? '♥' : '♡' }}
      </span>
    </button>

    <transition name="slide-down">
      <div v-if="showNotification" class="fixed top-0 inset-x-0 z-50">
        <div :class="notificationClass" class="text-white text-center py-3">
          {{ notificationMessage }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  courseId: String,
  courseType: String,
  isFavorited: {
    type: Boolean,
    default: false
  },
  class: String // Aquí estás definiendo 'class' como una prop. Es posible que quieras utilizar otro nombre ya que 'class' es una palabra reservada en HTML.
});


const showNotification = ref(false);
const notificationMessage = ref('');
const notificationClass = ref('');



// Función para mostrar la notificación
const triggerNotification = (message, type) => {
  notificationMessage.value = message;
  // Aplicar la clase de color de fondo según el tipo de mensaje
  notificationClass.value = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  showNotification.value = true;

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};


// Eliminar de favoritos


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
    const response = await axios.post(`http://localhost:3333/users/favorites/${action}`, {
      userId,
      courseId: props.courseId,
      courseType: props.courseType
    });

    // Aquí, se invierte el valor de `isFavorited`
    isFavorited.value = !isFavorited.value;

    // Si la acción fue 'remove', significa que se eliminó de favoritos, y se debe pasar 'error' para mostrar la notificación roja.
    triggerNotification(`Curso ${action === 'add' ? 'agregado a' : 'eliminado de'} favoritos`, action === 'add' ? 'success' : 'error');
    
  } catch (error) {
    console.error('Error al actualizar favoritos:', error);
    triggerNotification('No se pudo actualizar la lista de favoritos', 'error');
  }
};
</script>