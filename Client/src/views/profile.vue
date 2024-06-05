<template>
  <div class="bg-gray-100 flex flex-wrap justify-center items-start md:items-center p-4 md:p-12 gap-4">
    <!-- Notificación -->
    <transition name="slide-down">
      <div v-if="showNotification" class="fixed top-0 inset-x-0 z-50">
        <div :class="{
        'bg-green-700 bg-opacity-75 fixed bottom-0 inset-x-0 z-50':
          notificationType === 'success',
        'bg-red-700 bg-opacity-75 fixed bottom-0 inset-x-0 z-50':
          notificationType === 'error',
      }" class="text-white text-center py-3">
          {{ notificationMessage }}
        </div>
      </div>
    </transition>

    <!-- Perfil -->
    <div class="bg-white p-6 md:w-1/3 rounded-md mb-auto">
      <h1 class="text-center font-bold text-xl mb-4 hidden">Mi Perfil</h1>
      <img :src="resolveImagePath(userData.profilePicture)" alt="" class="w-60 h-60 rounded-full mx-auto mb-4" />

      <!-- Campos editables -->
      <div v-if="editing" class="space-y-4">
        <!-- Campo para subir imagen de perfil -->
        <div class="flex flex-col">
          <label for="profilePicture" class="text-sm font-medium text-gray-700 mb-1">Imagen de perfil</label>
          <input type="file" id="profilePicture" @change="handleProfilePictureChange" class="form-input" />
        </div>

        <div class="flex flex-col">
          <label for="username" class="text-sm font-medium text-gray-700 mb-1">Nombre usuario</label>
          <span class="flex items-center">
            <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
              <path
                d="M480-120q-74.539 0-140.276-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.35t114.365 76.95q48.627 48.6 76.993 114.3Q840-554.7 840-480v39.539q0 50.538-34.714 85.5Q770.572-320 720-320q-35.769 0-65.231-19.615-29.461-19.615-43.538-52.231Q588.385-359 554.192-339.5 520-320 480-320q-66.846 0-113.423-46.577T320-480q0-66.846 46.577-113.423T480-640q66.846 0 113.423 46.577T640-480v39.539q0 32.923 23.539 56.692Q687.077-360 720-360t56.462-23.769Q800-407.538 800-440.461V-480q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v40H480Zm0-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
            </svg>
            <input id="username" type="text" v-model="editableUserData.username"
              class="form-input text-sm mt-1 p-2 rounded-lg block w-full bg-gray-100" placeholder="Nombre de usuario" />
          </span>
        </div>

       
        <div class="flex flex-col space-y-4 pt-2 text-md">
          <div class="flex gap-2 justify-start">
            <button @click="saveProfile" 
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 disabled:bg-indigo-400 transition">
              Guardar
            </button>
            <button @click="cancelEdit" class="px-4 py-2 text-gray-700">
              Cancelar
            </button>
          </div>

          <!-- Sección de aviso para eliminar cuenta -->
          <div v-if="editing" class="mt-6 p-4 bg-red-100 rounded-lg">
            <h3 class="text-sm font-semibold text-red-600 mb-2">
              ¿Deseas eliminar tu cuenta?
            </h3>
            <p class="text-xs text-red-600">
              Si has decidido desvincularte de nuestra plataforma, ten en cuenta que al eliminar tu cuenta, <strong>todos tus
              datos serán borrados de forma permanente y no podrás recuperarlos</strong>. Si estás seguro y comprendes las
              consecuencias, puedes proceder a eliminar tu cuenta de manera permanente
              <a @click="confirmAccountDeletion" class="hover:text-red-800 hover:underline cursor-pointer">
                haciendo click aquí.</a>
            </p>
          </div>
        </div>
      </div>
      <!-- Campos de visualización -->
      <div v-else>
        <div class="m-auto">
          <div class="flex flex-col mb-1">
            <span class="flex text-md">
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                <path
                  d="M480-120q-74.539 0-140.276-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.35t114.365 76.95q48.627 48.6 76.993 114.3Q840-554.7 840-480v39.539q0 50.538-34.714 85.5Q770.572-320 720-320q-35.769 0-65.231-19.615-29.461-19.615-43.538-52.231Q588.385-359 554.192-339.5 520-320 480-320q-66.846 0-113.423-46.577T320-480q0-66.846 46.577-113.423T480-640q66.846 0 113.423 46.577T640-480v39.539q0 32.923 23.539 56.692Q687.077-360 720-360t56.462-23.769Q800-407.538 800-440.461V-480q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v40H480Zm0-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
              </svg>
              {{ userData.username }}
            </span>
          </div>

          <div class="flex flex-col mb-1">
            <div class="flex text-md">
              <!-- Usa el filtro capitalize -->
              <span class="mr-auto flex text-md">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M184.615-200Q157-200 138.5-218.5 120-237 120-264.615v-430.77Q120-723 138.5-741.5 157-760 184.615-760h590.77Q803-760 821.5-741.5 840-723 840-695.385v430.77Q840-237 821.5-218.5 803-200 775.385-200h-590.77ZM480-475.384 160-684.615v420q0 10.769 6.923 17.692T184.615-240h590.77q10.769 0 17.692-6.923T800-264.615v-420L480-475.384ZM480-520l307.692-200H172.308L480-520ZM160-684.615V-720v455.385q0 10.769 6.923 17.692T184.615-240H160v-444.615Z" />
                </svg>
                {{ userData.email }}
              </span>
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <div class="flex">
              <span class="mr-auto flex text-md">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M480.136-490.769q26.71 0 45.595-19.021 18.884-19.021 18.884-45.731t-19.02-45.594Q506.574-620 479.864-620t-45.595 19.021q-18.884 19.02-18.884 45.731 0 26.71 19.02 45.594 19.021 18.885 45.731 18.885ZM480-172.923q112.769-98.154 178.308-199.654 65.538-101.5 65.538-175.577 0-109.769-69.5-181.192T480-800.769q-104.846 0-174.346 71.423t-69.5 181.192q0 74.077 65.538 175.577Q367.231-271.077 480-172.923Zm0 53.692Q339-243.923 267.577-351.808q-71.423-107.884-71.423-196.346 0-126.923 82.654-209.385Q361.461-840 480-840t201.192 82.461q82.654 82.462 82.654 209.385 0 88.462-71.423 196.346Q621-243.923 480-119.231Zm0-436.154Z" />
                </svg>
                {{ userData.address }}
              </span>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button @click="startEdit"
            class="btn flex items-center justify-center text-sm font-bold text-black w-full rounded-md border border-gray-300 py-1.5">
            Editar perfil
            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
              <path
                d="m405.384-120-14.461-115.692q-19.154-5.769-41.423-18.154-22.269-12.385-37.885-26.538L204.923-235l-74.616-130 92.231-69.539q-1.769-10.846-2.923-22.346-1.154-11.5-1.154-22.346 0-10.077 1.154-21.192t2.923-25.038L130.307-595l74.616-128.462 105.923 44.616q17.923-14.923 38.769-26.923 20.846-12 40.539-18.539L405.384-840h149.232l14.461 116.461q23 8.077 40.654 18.539 17.654 10.461 36.346 26.154l109-44.616L829.693-595l-95.308 71.846q3.308 12.385 3.692 22.731.385 10.346.385 20.423 0 9.308-.769 19.654-.77 10.346-3.539 25.038L827.923-365l-74.615 130-107.231-46.154q-18.692 15.693-37.615 26.923-18.923 11.231-39.385 17.77L554.616-120H405.384Zm73.539-260q41.846 0 70.923-29.077 29.077-29.077 29.077-70.923 0-41.846-29.077-70.923Q520.769-580 478.923-580q-42.077 0-71.039 29.077-28.961 29.077-28.961 70.923 0 41.846 28.961 70.923Q436.846-380 478.923-380Z" />
            </svg>
          </button>
          <!-- <button @click="startEdit"
              class="btn text-sm font-bold text-black p-2 mr-4">
            </button> -->
          <button @click="logout" class="btn text-red-600 font-semibold text-sm mt-4">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Cursos favoritos -->
    <div class="profile-card bg-white p-6 rounded-md mb-auto md:w-1/2">
      <h2 class="text-xl text-center md:text-left font-bold mb-6">
        Mis Cursos Favoritos
      </h2>
      <div class="flex flex-col gap-1">
        <div :class="{ 'max-h-96 overflow-y-auto': !expandDescription }" class="md:text-md bold-4 relative">
          <div>
            <!-- Bucle para los cursos favoritos -->
            <div v-for="course in favoriteCourses" :key="course._id"
              class="bg-white md:shadow-sm shadow-md md:p-0 my-1 p-2 hover:shadow-md transition overflow-hidden">
              <div class="flex flex-col justify-center items-center md:flex-row cursor-pointer">
                <!-- Imagen del curso a la izquierda -->
                <img :src="courseImage(course)" alt=""
                  class="md:w-12 md:h-12 w-full h-12 mx-auto object-cover rounded-md" />
                <!-- Contenido del curso a la derecha -->
                <div class="p-2 flex-grow">
                  <h3 @click="() => goToCourseDetail(course)" class="font-semibold text-md hover:underline">
                    {{ course.title || "Curso Seleccionado" }}
                  </h3>

                  <div class="flex">
                    <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                      width="24">
                      <path
                        d="M400-420h139.231v-40H400v40Zm0-120h278.462v-40H400v40Zm0-120h278.462v-40H400v40Zm-75.385 380Q297-280 278.5-298.5 260-317 260-344.615v-430.77Q260-803 278.5-821.5 297-840 324.615-840h430.77Q783-840 801.5-821.5 820-803 820-775.385v430.77Q820-317 801.5-298.5 783-280 755.385-280h-430.77Zm0-40h430.77q9.231 0 16.923-7.692Q780-335.385 780-344.615v-430.77q0-9.23-7.692-16.923Q764.616-800 755.385-800h-430.77q-9.23 0-16.923 7.692Q300-784.615 300-775.385v430.77q0 9.23 7.692 16.923Q315.385-320 324.615-320Zm-120 160Q177-160 158.5-178.5 140-197 140-224.615v-470.77h40v470.77q0 9.231 7.692 16.923Q195.384-200 204.615-200h470.77v40h-470.77ZM300-800v480-480Z">
                      </path>
                    </svg>
                    <h4 @click="() => goToCourseDetail(course)" class="text-sm mr-2 capitalize">
                      {{
        course.courseType === "COURSERA"
          ? "Coursera"
          : course.courseType === "UTN"
            ? "UTN"
            : "Udemy"
      }}
                      {{ course.university }}
                    </h4>
                  </div>
                </div>
                <button @click="removeFromFavorites(course._id)" title="Eliminar curso" class="ml-auto pr-4">
                  <svg fill="#FF0000" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                    <path
                      d="M304.615-160q-26.846 0-45.731-18.884Q240-197.769 240-224.615V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.385Q720-197 701.5-178.5 683-160 655.385-160h-350.77ZM680-720H280v495.385q0 10.769 6.923 17.692T304.615-200h350.77q9.23 0 16.923-7.692Q680-215.385 680-224.615V-720ZM392.307-280h40.001v-360h-40.001v360Zm135.385 0h40.001v-360h-40.001v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- <div v-if="!expandDescription"
              class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div> -->
        </div>
        <!-- <button @click="toggleDescription"
            class="mt-4 text-blue-600 hover:underline font-semibold transition focus:outline-none">
            {{ expandDescription ? "" : "Ver más" }}
          </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import axios from '../axiosConfig.js' 
import { useRouter } from "vue-router";
import { getFromLocalStorage, clearLocalStorage } from "../utils/localStorage";


const defaultProfilePicturePath = `${import.meta.env.VITE_API_URL}/users/uploads/student.png`;
const selectedProfilePicture = ref(null);
const router = useRouter();
const userData = ref({});
const editableUserData = reactive({}); 
const userId = ref(getFromLocalStorage("loggedInUserId"));
const newPassword = ref(""); 
const isPasswordShown = ref(false);
const editing = ref(false);
const favoriteCourses = ref([]);
const showNotification = ref(false);
const notificationMessage = ref("");
const notificationType = ref("");
const expandDescription = ref(false);
const passwordStrength = ref(0);
const passwordRulesMessage = ref('');

const toggleDescription = () => {
  expandDescription.value = !expandDescription.value;
};

const selectedCountry = ref("");
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia (formerly Macedonia)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
//revisar credenciales y redirigir
const checkAuth = async () => {
  const token = getFromLocalStorage("token");
  if (token) {
    try {
      const response = await axios.post(`/users/auth/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.valid) {
        return true;
      }
    } catch (error) {
      console.error("Error validando el token:", error);
    }
  }
  // Si no hay token o el token no es válido, redirigir al login
  redirectToLogin("Su sesión ha expirado, por favor inicie sesión de nuevo.");
  return false;
};

const redirectToLogin = (message, messageType = "error") => {
  notificationMessage.value = message;
  notificationType.value = messageType;
  showNotification.value = true;

  setTimeout(() => {
    showNotification.value = false;
    router.push("/login");
  }, 3000);
};

// Función para obtener el perfil del usuario
const fetchUserProfile = async () => {
  checkAuth();
  if (!userId.value) {
    console.error("ID de usuario no identificado.");
    return;
  }
  try {
    const response = await axios.get(
      `/users/profile/id/${userId.value}`,
      {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      }
    );
    userData.value = response.data;
    Object.assign(editableUserData, response.data);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

// Función para cargar cursos favoritos
const loadFavoriteCourses = async () => {
  checkAuth();
  if (!userId.value) {
    return;
  }
  try {
    const response = await axios.get(
      `/users/favorites/${userId.value}`,
      {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      }
    );
    console.log("Cursos favoritos recibidos:", response.data);
    favoriteCourses.value = response.data;
  } catch (error) {
    console.error("Error al cargar cursos favoritos:", error);
  }
};

//editar perfil
const startEdit = () => {
  editing.value = true;
};
const cancelEdit = () => {
  editing.value = false;
  // Reset password field and editable user data
  newPassword.value = "";
  Object.assign(editableUserData, userData.value);
};

//ajustes para diferencia de utn y udemy
const goToCourseDetail = (course) => {
  // Asegúrate de que cada curso tenga un campo `slug`.
  const courseSlug = course.slug; // Asume que tu objeto `course` tiene un campo `slug`.

  if (!courseSlug) {
    console.error("El curso no tiene un slug definido.");
    return;
  }

  if (course.courseType === "UDEMY") {
    router.push({ name: "DetalleCursoUdemy", params: { slug: courseSlug } });
  } else if (course.courseType === "UTN") {
    router.push({ name: "DetalleCursoUTN", params: { slug: courseSlug } });
  } else if (course.courseType === "COURSERA") {
    router.push({ name: "DetalleCursoCoursera", params: { slug: courseSlug } });
  } else {
    console.error("Tipo de curso no soportado.");
  }
};
const courseImage = (course) => {
  return course.image_480x270 || course.imgUrl;
};
const courseInstitution = (course) => {
  return course.headline || course.summary;
};
// Función para alternar la visibilidad de la contraseña
const togglePasswordVisibility = () => {
  isPasswordShown.value = !isPasswordShown.value;
};
// Función para cerrar sesión
const logout = () => {
  // Establecer mensaje de notificación para cerrar sesión
  clearLocalStorage();
  router.push("/login");
};

const removeFromFavorites = async (courseId) => {
  // Recuperar el token de autenticación almacenado
  const token = getFromLocalStorage("token");

  if (!token) {
    console.error("Token de autorización no encontrado.");
    return; // Detener la ejecución si no hay token
  }

  try {
    await axios.post(
      `/users/favorites/remove`,
      {
        userId: userId.value,
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Mostrar notificación de éxito
    notificationMessage.value = "Curso eliminado de favoritos con éxito.";
    notificationType.value = "success";
    showNotification.value = true;
    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
    // Filtrar el curso eliminado de la lista de favoritos
    favoriteCourses.value = favoriteCourses.value.filter(
      (course) => course._id !== courseId
    );
  } catch (error) {
    console.error("Error al eliminar curso de favoritos:", error);
    notificationMessage.value =
      "Error al eliminar curso de favoritos. Por favor, intente de nuevo.";
    notificationType.value = "error";
    showNotification.value = true;
    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};

const confirmAccountDeletion = () => {
  if (
    window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta permanentemente? Esta acción no se puede deshacer."
    )
  ) {
    deleteAccount();
  }
};

const deleteAccount = async () => {
  try {
    const response = await axios.delete(
      `/users/profile/${userId.value}`,
      {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      }
    );

    if (response.status === 200) {
      alert("Tu cuenta ha sido eliminada.");
      logout(); // Llamar a la función de cierre de sesión
    }
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    alert("No se pudo eliminar la cuenta.");
  }
};

// Función para guardar los cambios del perfil
const saveProfile = async () => {
  if (!editing.value) {
    return;
  }

  const formData = new FormData();

  for (const [key, value] of Object.entries(editableUserData)) {
    if (value !== userData.value[key]) {
      formData.append(key, value);
    }
  }

  if (selectedProfilePicture.value) {
    formData.append("profilePicture", selectedProfilePicture.value);
  }

  try {
    const response = await axios.put(
      `/users/profile/${userId.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      }
    );

    if (response.data && response.data.user) {
      notificationMessage.value = "Perfil actualizado con éxito.";
      notificationType.value = "success";

      Object.assign(userData.value, response.data.user);

      if (response.data.user.profilePicture) {
        userData.value.profilePicture = `${import.meta.env.VITE_API_URL}/users/uploads/${response.data.user.profilePicture}?timestamp=${Date.now()}`;
      }

      editing.value = false;
      newPassword.value = "";
      selectedProfilePicture.value = null;

      // Refrescar el perfil del usuario
      setTimeout(() => {
        fetchUserProfile();
      }, 3000);
    } else {
      throw new Error("No se recibieron los datos del usuario actualizados");
    }
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    // Verificar si el error es por nombre de usuario o correo electrónico duplicado
    if (error.response && error.response.data) {
      const message = error.response.data.message;
      if (message.includes('nombre de usuario')) {
        notificationMessage.value = "El nombre de usuario ya está en uso. Por favor, elige otro.";
      } else if (message.includes('correo electrónico')) {
        notificationMessage.value = "El correo electrónico ya está en uso. Por favor, utiliza otro.";
      } else {
        notificationMessage.value = "Error al actualizar el perfil. Por favor, intenta de nuevo.";
      }
    } else {
      notificationMessage.value = "Error al actualizar el perfil. Por favor, intenta de nuevo.";
    }
    notificationType.value = "error";
  } finally {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};
const evaluatePasswordStrength = () => {
  const password = newPassword.value;
  const lengthCriteria = password.length >= 8;
  const lowerCaseCriteria = /[a-z]/.test(password);
  const upperCaseCriteria = /[A-Z]/.test(password);
  const numberCriteria = /[0-9]/.test(password);
  const specialCharacterCriteria = /[^A-Za-z0-9]/.test(password);

  const strength = [
    lengthCriteria,
    lowerCaseCriteria,
    upperCaseCriteria,
    numberCriteria,
    specialCharacterCriteria,
  ].filter(Boolean).length;

  passwordStrength.value = strength;
  // Actualizar el mensaje de reglas según la validación
  passwordRulesMessage.value = strength < 3 ? "Use 8 o más caracteres con una mezcla de letras, números y símbolos." : "";
};

const handleProfilePictureChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (
      [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
        "image/avif",
      ].includes(file.type) &&
      file.size <= 1024 * 1024 * 5
    ) {
      selectedProfilePicture.value = file;

    } else {
      notificationMessage.value =
        "Archivo no permitido: debe ser una imagen (JPEG, PNG, WebP, GIF, SVG, AVIF) y no exceder de 5MB.";
      notificationType.value = "error";
      showNotification.value = true;
      // Limpiar el input file
      event.target.value = "";
    }
  }
};

const resolveImagePath = (path) => {
  console.log("Profile picture path:", path);

  // Comprueba si 'path' es una cadena no vacía 
  if (path && path.trim() && !path.includes('student.png')) {
    return `${import.meta.env.VITE_API_URL}/users/uploads/${path}?timestamp=${new Date().getTime()}`;
  } else {
    return defaultProfilePicturePath;
  }
};



onMounted(async () => {
  if (await checkAuth()) {
    fetchUserProfile();
    loadFavoriteCourses();
  }
});
onMounted(() => {
  if (!getFromLocalStorage("token")) {
    redirectToLogin("Debe iniciar sesión para ver el perfil.");
  } else {
    fetchUserProfile();
    loadFavoriteCourses();
  }
});

watch(newPassword, evaluatePasswordStrength);

</script>
