<template>
  <div :class="{ 'bg-gray-200': dropdownActive }" class="shadow-gray-200 shadow-xl"
    :style="{ 'backdrop-filter': dropdownActive ? 'blur(8px)' : 'none' }">

    <div class="bg-white shadow-md">
      <div class="mx-auto px-0 md:px-4 py-2 border-b border-gray-300">
        <div class="flex items-center justify-center md:justify-between"> <!-- Cambio aquí para centrar -->
          <div class="flex items-center text-xl font-semibold">
            <button @click="toggleMenu1" class="lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
            <a href="/" class="mx-12 md:mx-0"> <!-- Añadido el margen para separar el logo de los botones -->
              <img src="../assets/logo-curseek.png" alt="CurSeek" width="194">
            </a>
            <button @click="toggleMenu2" class="lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="32">
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                  fill="#5154a4" />
              </svg>
            </button>
            <div class="relative ml-12 hidden md:block">
              <button @click="toggleDropdown" class="text-indigo-600 font-semibold focus:outline-none w-full">
                <span :class="{ 'border-b-2 border-indigo-600 pb-5': dropdownActive }">Cursos</span>
              </button>
            </div>
          </div>

          <nav class="hidden lg:flex space-x-4 text-md">
            <!-- Campo de búsqueda -->
            <div class="max-w-xl m-0 p-0">
              <form @submit.prevent="search"
                class="flex bg-white items-center border border-gray-300 rounded-xl overflow-hidden">
                <button type="submit" class="px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                    <path
                      d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </button>
                <input v-model="query" placeholder="Buscar cursos y más..."
                  class="rounded-xl py-2.5 w-80 flex-grow outline-none" @focus="setInputClicked(true)"
                  @blur="setInputClicked(false)" />
                <button v-if="query" type="button" @click="clearSearch" class="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18">
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </form>
              <div>

                <!-- Resultados -->
                <div class="flex flex-col md:flex-row container mx-0 justify-center">
                  <div v-if="courses.length > 0"
                    class="md:absolute md:max-w-full mt-3 bg-white shadow-lg max-h-96 overflow-y-auto z-10">
                    <p class="px-4 py-2 text-sm font-semibold text-indigo-600 border-b">
                      Los cursos que se relacionan con "{{ query }}"
                    </p>

                    <ul>
                      <li v-for="course in courses" :key="course.slug" class="border-b last:border-b-0 pb-2 md:pb-0">
                        <a @click="redirectToCourse(course)"
                          class="flex flex-col md:flex-row items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                          <img :src="course.image" alt=""
                            class="w-full h-24 md:w-16 md:h-16 lg:w-20 lg:h-16 xl:w-24 xl:h-16 rounded object-cover md:mr-2" />
                          <div class="flex-grow p-2 md:p-0">
                            <div>
                              <h2 class="text-sm font-semibold hover:underline md:w-80">
                                {{
                                  course.title ||
                                  "Aprende con este curso y descubre oportunidades"
                                }}
                              </h2>
                              <p class="text-xs text-gray-600 pt-1">
                                {{ course.source || "Curso" }}
                              </p>
                            </div>
                          </div>
                          <div class="flex items-end text-sm font-semibold text-green-700">
                            <p>{{ course.price || "Gratis" }}</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div class="flex justify-center py-4">
                      <button @click="toggleViewAll"
                        class="px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition ease-in duration-300">
                        {{ limitResults ? "Ver Más" : "Ver Menos" }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Añadido: Mostrar "Login" o "Logout" según el estado de autenticación -->
            <router-link v-if="!loggedInUsername" to="/signUp"
              class="text-white hover:bg-indigo-700 transition bg-indigo-500 rounded-full px-3 py-3 font-bold">Empezar</router-link>
            <span class="border-r border-gray-300"></span>
            <router-link v-if="!loggedInUsername" to="/login"
              class="hover:underline font-bold px-3 py-3">Acceso</router-link>
            <!-- <a v-else @click="logout" class="hover:text-red-700 cursor-pointer">Logout</a> -->
            <router-link v-if="loggedInUsername" to="/profile" class="hover:text-purple-200 text-black">
              <!-- <img :src="profilePicture" alt="" class="h-8 w-8 rounded-full mr-2">               -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="32">
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                  fill="#5154a4" />
              </svg>
            </router-link>
          </nav>
        </div>

        <div v-if="menu1Visible"
          class="lg:hidden border-r border-l border-b border-gray-300 mx-2 shadow-xl p-4 bg-white text-black">
          <!-- <router-link v-if="!loggedInUsername" to="/login" class="block mb-4">Login</router-link> -->
          <!-- <a v-else @click="logout" class="block mb-4 cursor-pointer">Logout</a> -->
          <ul>
            <span class="font-semibold text-indigo-700">Proveedores</span>
            <li class="border-b border-gray-300 pb-4">
              <a href="/cursos/udemy" class="flex justify-between items-center py-1">
                <span>Udemy</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
              <a href="/cursos/coursera" class="flex justify-between items-center py-1">
                <span>Coursera</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>

            <li class="pt-4">
              <span class="font-semibold text-indigo-700">Universidades</span>
              <a href="/cursos/utn" class="flex justify-between items-center py-1">
                <span>UTN</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/coursera/universidades/uab" class="flex justify-between items-center py-1">
                <span>UAB</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/coursera/universidades/uchile" class="flex justify-between items-center py-1">
                <span>U. de Chile</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/coursera/universidades/udlac" class="flex justify-between items-center py-1">
                <span>U. Andes Colombia</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/coursera/universidades/unam" class="flex justify-between items-center py-1">
                <span>UNAM</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/coursera/universidades/upchile" class="flex justify-between items-center py-1">
                <span>U. Católica de Chile</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div v-if="menu2Visible"
          class="lg:hidden border-r border-l border-b border-gray-300 mx-2 shadow-xl bg-white text-black">
          <router-link v-if="!loggedInUsername" to="/signUp"
            class="block text-white hover:bg-indigo-700 transition bg-indigo-500 rounded-full px-3 py-2 mx-6 mt-6 font-bold text-center">Empezar</router-link>
          <router-link v-if="!loggedInUsername" to="/login"
            class="block text-black hover:underline px-3 py-2 font-bold text-center my-4">Acceso</router-link>
          <router-link v-if="loggedInUsername" to="/profile" class="block m-4">Mi Perfil</router-link>
        </div>
      </div>
      <!-- Desplegable -->
      <div class="relative">
        <div name="fade">
          <ul
            class="border-r border-l border-b max-h-96 overflow-y-auto border-gray-100 ml-48 absolute text-sm shadow-md bg-white w-60">
            <li v-if="dropdownVisible" class="font-semibold my-0.5 flex items-center px-4 w-full justify-between">
              <span class="text-indigo-700 py-1.5 px-1">Buscar por</span>
            </li>
            <li v-if="dropdownVisible" @mouseenter="showModal = true" @mouseleave="showModal = false"
              class="my-0.5 flex items-center hover:bg-gray-200 transition px-4 cursor-pointer w-full justify-between">
              <span class="text-gray-800 py-1.5 px-1">Proveedores</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
              </svg>
            </li>
            <li v-if="dropdownVisible" @mouseenter="showModal2 = true" @mouseleave="showModal2 = false"
              class="mb-2 my-0.5 flex items-center hover:bg-gray-200 transition px-4 cursor-pointer w-full justify-between">
              <span class="text-gray-800 py-1.5 px-1">Universidades</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                <path d="M9.41 7.41L14.83 12l-5.42 5.41L10 18l6-6-6-6-1.59 1.41Z" />
              </svg>
            </li>
          </ul>
        </div>

        <div v-if="showModal" @mouseenter="showModal = true" @mouseleave="showModal = false"
          class="border-l max-h-96 overflow-y-auto border-gray-100 absolute text-sm shadow-md bg-white py-4 w-60 left-80 mt-0 ml-28">
          <ul>
            <li class="my-0.5 flex items-center">
              <a href="/cursos/udemy" class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/udemy.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">Udemy</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/cursos/coursera"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/coursera.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">Coursera</span>
              </a>
            </li>
          </ul>
        </div>

        <div v-if="showModal2" @mouseenter="showModal2 = true" @mouseleave="showModal2 = false"
          class="max-h-96 overflow-y-auto absolute text-sm shadow-md bg-white py-4 w-60 left-80 mt-0 ml-28">
          <ul>
            <li class="my-0.5 flex items-center">
              <a href="/cursos/utn" class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/utn.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">UTN</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/coursera/universidades/uab"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/uab.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">UAB</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/coursera/universidades/uchile"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/Universidad_de_Chile.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">U. de Chile</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/coursera/universidades/udlac"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/uniandes.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">U. Andes Colombia</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/coursera/universidades/unam"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/unam.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">UNAM</span>
              </a>
            </li>
            <li class="my-0.5 flex items-center">
              <a href="/coursera/universidades/upchile"
                class="hover:bg-gray-200 transition px-4 flex items-center w-full justify-between">
                <img class="w-8" src="../assets/instituciones/upchile.png" alt="Coursera" />
                <span class="flex-1 text-gray-800 py-1.5 px-1">U. Cátolica de Chile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const query = ref("");
const courses = ref([]);
const isInputClicked = ref(false);
const limitResults = ref(true);


const search = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3333/cursos/search?q=${query.value
      }&all=${!limitResults.value}`
    );
    courses.value = response.data;
  } catch (error) {
    console.error("Error al buscar cursos:", error);
  }
};

const clearSearch = () => {
  query.value = "";
  courses.value = [];
};
const setInputClicked = (clicked) => {
  isInputClicked.value = clicked;
};
const redirectToCourse = (course) => {
  if (course.source === "UDEMY") {
    // Utiliza el slug en lugar del originalId
    router.push({
      name: "DetalleCursoUdemy",
      params: { slug: course.slug },
    });
  } else if (course.source === "UTN") {
    // Utiliza el slug en lugar del originalId
    router.push({
      name: "DetalleCursoUTN",
      params: { slug: course.slug },
    });
  } else if (course.source === "COURSERA") {
    // Utiliza el slug en lugar del originalId
    router.push({
      name: "DetalleCursoCoursera",
      params: { slug: course.slug },
    });
  }
};

const handleSearch = (value) => {
  query.value = value;
  search();
};

const toggleViewAll = () => {
  limitResults.value = !limitResults.value;
  search();
};
</script>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      loggedInUsername: localStorage.getItem('loggedInUsername'),
      menu1Visible: false,
      menu2Visible: false,
      dropdownVisible: false,
      dropdownActive: false,
      showModal: false,
      showModal2: false,
    };
  },
  watch: {
    '$route': function () {
      this.loggedInUsername = localStorage.getItem('loggedInUsername');
    }
  },
  methods: {
    toggleMenu1() {
      this.menu1Visible = !this.menu1Visible;
      this.menu2Visible = false;
    },
    toggleMenu2() {
      this.menu2Visible = !this.menu2Visible;
      this.menu1Visible = false;
    },
    logout() {
      localStorage.removeItem('loggedInUsername');
      this.loggedInUsername = null;
      this.$router.push('/login');
    },
    showDropdown() {
      this.dropdownVisible = true;
      this.dropdownActive = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
      this.dropdownActive = false;
    },
    closeDropdownOnClickOutside(event) {
      const dropdown = this.$el;
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownVisible = false;
        this.dropdownActive = false;
        document.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
      this.dropdownActive = this.dropdownVisible;
      if (this.dropdownVisible) {
        document.addEventListener('click', this.closeDropdownOnClickOutside);
      } else {
        document.removeEventListener('click', this.closeDropdownOnClickOutside);
      }
    },
  }
};
</script>
