<template>
    
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <Notificaciones v-if="showNotification" :message="notificationMessage" :type="notificationType" @close="showNotification = false" />

      <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold text-gray-900">
            Recuperación de Contraseña
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="submitRecoveryForm">
          <input v-model="userEmail" type="email" required class="w-full px-3 py-2 border rounded-md" placeholder="Email">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from '../axiosConfig.js' 
  import Notificaciones from '../components/Notificaciones.vue'; // Asegúrate de que la ruta sea correcta
  
  const userEmail = ref('');
  const showNotification = ref(false);
  const notificationMessage = ref('');
  const notificationType = ref('');
  


  
  const submitRecoveryForm = async () => {
  try {
    // Verificar si el usuario existe
    const verificationResponse = await axios.post('/users/email-user-verification', { email: userEmail.value });
    
    // Si el usuario existe, intentar enviar el correo electrónico de recuperación de contraseña
    if (verificationResponse.data.userExists) {
      try {
        // Intento de enviar el correo de recuperación
        const passwordRecoveryResponse = await axios.post('/users/password-recovery', { email: userEmail.value });
        notificationMessage.value = 'Se ha enviado un correo electrónico de recuperación.';
        notificationType.value = 'success';
      } catch (error) {
        // Asumimos que si hay error en esta etapa, es un error al enviar el correo
        notificationMessage.value = 'No sepudo enviar el correo de recuperación.';
notificationType.value = 'error';
}
} else {
// Si la verificación indica que el usuario no existe
notificationMessage.value = 'El usuario no está registrado.';
notificationType.value = 'error';
}
} catch (error) {
// Error en la verificación del usuario
if (error.response && error.response.data) {
// El servidor puede enviar respuestas adicionales en el body del error
notificationMessage.value = error.response.data.message || 'Hubo un error al procesar tu solicitud.';
} else {
// Error en la petición, como un problema de red o configuración
notificationMessage.value = 'Hubo un problema al intentar verificar el usuario.';
}
notificationType.value = 'error';
} finally {
showNotification.value = true;
}
};

  </script>
  