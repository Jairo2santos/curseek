<template>
  <div class="flex flex-col max-w-screen-full md:flex-row mx-auto md:px-60 bg-gray-100 p-6">
    <form
      class="bg-white px-6 md:px-16 py-8 max-w-screen-sm w-full"
      @submit.prevent="registerUser"
    >
      <!-- Mensaje de éxito -->
      <p v-if="registrationSuccess" class="text-sm text-green-500">
        Registro exitoso. Redirigiendo al login...
      </p>

      <!-- Mensaje de error -->
      <p v-if="registrationError" class="text-sm text-red-500">
        Error en el registro: {{ registrationErrorMessage }}
      </p>
      <h1 class="text-xl font-bold mb-4 text-center">Crea tu cuenta</h1>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-600">Nombre de Usuario <span class="text-red-500">*</span></label>
        <input type="text" id="username" v-model="username" class="mt-1 p-2 w-full border rounded-md" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-600">Email <span class="text-red-500">*</span></label>
        <input type="email" id="email" v-model="email" class="mt-1 p-2 w-full border rounded-md" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600">Contraseña <span class="text-red-500">*</span></label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="mt-1 p-2 w-full border rounded-md" required />
          <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-2">
            <svg :class="{'text-gray-500': !showPassword, 'text-gray-700': showPassword}" class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
              <path v-if="showPassword" d="M480.181-353.846q60.973 0 103.473-42.681t42.5-103.654q0-60.973-42.681-103.473t-103.654-42.5q-60.973 0-103.473 42.681t-42.5 103.654q0 60.973 42.681 103.473t103.654 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.956 0-236.879-70.731Q136.307-381.461 83.077-500q53.23-118.539 160.044-189.269Q349.934-760 479.89-760q129.956 0 236.879 70.731Q823.693-618.539 876.923-500q-53.23 118.539-160.044 189.269Q610.066-240 480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
              <path v-else d="M617.846-454.154 586-486q9-52.385-29.692-90.692Q517.615-615 466-606l-31.846-31.846q10.077-4.154 21.038-6.231 10.962-2.077 24.808-2.077 61.154 0 103.654 42.5 42.5 42.5 42.5 103.654 0 13.846-2.077 25.577-2.077 11.731-6.231 20.269Zm126.462 122.923L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-31.231-31.231q34.846-13.154 70.923-18.962Q443.769-760 480-760q130.231 0 238.231 71.577T876.923-500q-21.461 48.231-54.346 90.654-32.884 42.423-78.269 78.115Zm44.615 216.77L633.231-269.692q-26.539 11.769-65.885 20.731Q528-240 480-240q-131 0-238.231-71.577T83.077-500q23.307-53 61.461-99.269 38.154-46.269 81.462-77.654l-111.539-112 28.308-28.308 674.462 674.462-28.308 28.308ZM254.307-648.615Q219.923-624.154 184-584.308 148.077-544.461 128-500q50 101 143.5 160.5T480-280q34.615 0 69.769-6.731 35.154-6.73 52.846-13.577L537.385-366q-9.462 5.308-26.385 8.731-16.923 3.423-31 3.423-61.154 0-103.654-42.5-42.5-42.5-42.5-103.654 0-13.308 3.423-29.846 3.423-16.539 8.731-27.539l-91.693-91.23ZM541-531Zm-112.539 56.539Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirmar Contraseña <span class="text-red-500">*</span></label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" class="mt-1 p-2 w-full border rounded-md" required />
          <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-2">
            <svg :class="{'text-gray-500': !showPassword, 'text-gray-700': showPassword}" class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
              <path v-if="showPassword" d="M480.181-353.846q60.973 0 103.473-42.681t42.5-103.654q0-60.973-42.681-103.473t-103.654-42.5q-60.973 0-103.473 42.681t-42.5 103.654q0 60.973 42.681 103.473t103.654 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.956 0-236.879-70.731Q136.307-381.461 83.077-500q53.23-118.539 160.044-189.269Q349.934-760 479.89-760q129.956 0 236.879 70.731Q823.693-618.539 876.923-500q-53.23 118.539-160.044 189.269Q610.066-240 480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
              <path v-else d="M617.846-454.154 586-486q9-52.385-29.692-90.692Q517.615-615 466-606l-31.846-31.846q10.077-4.154 21.038-6.231 10.962-2.077 24.808-2.077 61.154 0 103.654 42.5 42.5 42.5 42.5 103.654 0 13.846-2.077 25.577-2.077 11.731-6.231 20.269Zm126.462 122.923L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-31.231-31.231q34.846-13.154 70.923-18.962Q443.769-760 480-760q130.231 0 238.231 71.577T876.923-500q-21.461 48.231-54.346 90.654-32.884 42.423-78.269 78.115Zm44.615 216.77L633.231-269.692q-26.539 11.769-65.885 20.731Q528-240 480-240q-131 0-238.231-71.577T83.077-500q23.307-53 61.461-99.269 38.154-46.269 81.462-77.654l-111.539-112 28.308-28.308 674.462 674.462-28.308 28.308ZM254.307-648.615Q219.923-624.154 184-584.308 148.077-544.461 128-500q50 101 143.5 160.5T480-280q34.615 0 69.769-6.731 35.154-6.73 52.846-13.577L537.385-366q-9.462 5.308-26.385 8.731-16.923 3.423-31 3.423-61.154 0-103.654-42.5-42.5-42.5-42.5-103.654 0-13.308 3.423-29.846 3.423-16.539 8.731-27.539l-91.693-91.23ZM541-531Zm-112.539 56.539Z"/>
            </svg>
          </button>
        </div>
        <p v-if="passwordsDoNotMatch" class="text-sm text-red-500 mt-1">
          Las contraseñas no coinciden.
        </p>
      </div>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-600">Dirección <span class="text-red-500">*</span></label>
        <textarea id="address" v-model="address" class="mt-1 p-2 w-full border rounded-md h-24"></textarea>
      </div>
      <div class="mb-4">
        <label for="profilePicture" class="block text-sm font-medium text-gray-600">Link URL de Imagen</label>
        <input type="text" id="profilePicture" v-model="profilePicture" class="mt-1 p-2 w-full border rounded-md" />
      </div>
      <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-800">
        Registrarse
      </button>
    </form>
    <div class="border-l border-gray-200 px-8 pt-4 pb-12 md:py-40 bg-white text-left">
      <h1 class="font-bold pb-2 t first-letter:ext-lg">¡Únete a CurSeek! Gratis</h1>
      <ul>
        <li class="text-sm pt-4">
          <svg class="inline mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
            width="24">
            <path
              d="M224.615-120q-26.846 0-45.731-18.884Q160-157.769 160-184.615v-444.846q-17.231-7.154-28.616-23.116Q120-668.538 120-689.231v-86.154q0-26.846 18.884-45.731Q157.769-840 184.615-840h590.77q26.846 0 45.731 18.884Q840-802.231 840-775.385v86.154q0 20.693-11.384 36.654-11.385 15.962-28.616 23.116v444.846q0 26.846-18.884 45.731Q762.231-120 735.385-120h-510.77ZM200-624.615v436.154q0 12.307 8.846 20.384T230.769-160h504.616q10.769 0 17.692-6.923T760-184.615v-440H200Zm-15.385-40h590.77q10.769 0 17.692-6.924Q800-678.462 800-689.231v-86.154q0-10.769-6.923-17.692T775.385-800h-590.77q-10.769 0-17.692 6.923T160-775.385v86.154q0 10.769 6.923 17.692 6.923 6.924 17.692 6.924Zm190.77 219.231h209.23V-480h-209.23v34.616ZM480-392.308Z" />
          </svg>
          <b> Descubre 10,000 cursos </b> de las principales universidades como UTN, UNAM y muchas más.
        </li>
        <li class="text-sm pt-4">
          <svg class="inline mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
            width="24">
            <path
              d="M184.615-200Q157-200 138.5-218.5 120-237 120-264.615v-430.77Q120-723 138.5-741.5 157-760 184.615-760h590.77Q803-760 821.5-741.5 840-723 840-695.385v430.77Q840-237 821.5-218.5 803-200 775.385-200h-590.77ZM480-475.384 160-684.615v420q0 10.769 6.923 17.692T184.615-240h590.77q10.769 0 17.692-6.923T800-264.615v-420L480-475.384ZM480-520l307.692-200H172.308L480-520ZM160-684.615V-720v455.385q0 10.769 6.923 17.692T184.615-240H160v-444.615Z" />
          </svg>
          <b> Nunca te pierdas un curso </b> con nuestro botón de Seguir para la educación.
        </li>
        <li class="text-sm pt-4">
          <svg class="inline mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
            width="24">
            <path
              d="m480-173.846-30.308-27.385q-97.923-89.461-162-153.153-64.077-63.693-101.154-112.347-37.077-48.654-51.807-88.038Q120-594.154 120-634q0-76.308 51.846-128.154Q223.692-814 300-814q52.769 0 99 27t81 78.538Q514.769-760 561-787t99-27q76.308 0 128.154 51.846Q840-710.308 840-634q0 39.846-14.731 79.231-14.73 39.384-51.807 88.038-37.077 48.654-100.769 112.347Q609-290.692 510.308-201.231L480-173.846ZM480-228q96-86.769 158-148.654 62-61.884 98-107.384t50-80.616q14-35.115 14-69.346 0-60-40-100t-100-40q-47.769 0-88.154 27.269-40.384 27.269-72.307 82.116h-39.078q-32.692-55.616-72.692-82.5Q347.769-774 300-774q-59.231 0-99.615 40Q160-694 160-634q0 34.231 14 69.346 14 35.116 50 80.616t98 107q62 61.5 158 149.038Zm0-273Z" />
          </svg>
          <b> Marca cursos </b> o crea trayectorias de aprendizaje desde cualquier recurso en la web.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const address = ref("");
const profilePicture = ref("");
const passwordsDoNotMatch = ref(false);
const registrationSuccess = ref(false);
const registrationError = ref(false);
const registrationErrorMessage = ref("");
const showPassword = ref(false);

const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    passwordsDoNotMatch.value = true;
    return;
  }
  passwordsDoNotMatch.value = false;
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
      address: address.value,
      profilePicture: profilePicture.value,
    });

    registrationSuccess.value = true;
    setTimeout(() => router.push("/login"), 2000); 
    } catch (error) {
    registrationError.value = true;
    registrationErrorMessage.value = error.response.data.message || "Error desconocido";
    console.error("Error al registrar el usuario:", error);
  }
};

</script>
