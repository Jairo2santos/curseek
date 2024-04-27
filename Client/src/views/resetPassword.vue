<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <Notificaciones v-if="showNotification" :message="notificationMessage" :type="notificationType"
            @close="showNotification = false" />

        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Restablecer Contraseña
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Ingresa tu nueva contraseña a continuación.
                </p>
            </div>
            <form @submit.prevent="submitNewPassword" class="mt-8 space-y-6">
                <input v-model="newPassword" type="password" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nueva Contraseña" />
                <input v-model="confirmPassword" type="password" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar Contraseña" />
                <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-mediumrounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Restablecer Contraseña
                </button>
            </form>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from '../axiosConfig.js' 
import Notificaciones from '../components/Notificaciones.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const token = route.query.token;

const newPassword = ref('');
const confirmPassword = ref('');
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');


const submitNewPassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        notificationMessage.value = 'Las contraseñas no coinciden.';
        notificationType.value = 'error';
        showNotification.value = true;
        return;
    }
    try {
        const response = await axios.post('/users/reset-password', {
            password: newPassword.value,
            token,
        });
        notificationMessage.value = response.data.message;
        notificationType.value = 'success';
        // Redireccionar al login después del cambio de contraseña
        setTimeout(() => {
            router.push('/login');
        }, 3000); // Espera 3 segundos antes de redirigir
    } catch (error) {
        notificationMessage.value = error.response.data.message || 'Error desconocido.';
        notificationType.value = 'error';
    }
    showNotification.value = true;
};
</script>