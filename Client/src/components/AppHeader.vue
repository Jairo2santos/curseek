<template>
  <div class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2" style="border-bottom: 1px solid lightgray;">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-xl font-semibold" style="color: #5154a4;">
          <a href="/">
            <img src="../assets/logo-curseek.png" alt="logo curseek" width="194">
          </a>
          <details class="ml-12">
            <summary class="cursor-pointer">Cursos</summary>
            <ul class="mt-3 absolute bg-white p-2">
              <li class="m-1 flex items-center">
                <a href="/cursos/utn" class="hover:bg-gray-200" style="color: #4a4a4a; display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
                  <span style="margin-right: 5rem;" class="text-lg p-1">UTN.BA</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="#ababab"/></svg>
                </a>
              </li>
              <li class="m-1 flex items-center">
                <a href="/cursos/udemy" class="hover:bg-gray-200" style="color: #4a4a4a; display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
                  <span style="margin-right: 5rem;" class="text-lg p-1">Udemy</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="#ababab"/></svg>
                </a>
              </li>
            </ul>
          </details>
        </div>

        <nav class="space-x-4">
          <div v-if="loggedInUsername" class="flex items-center">
            <details>
              <summary class="cursor-pointer" style="list-style: none;">
                <!-- <span class="font-bold text-xl" style="color: #0c7175;">@{{ loggedInUsername }}</span> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="48">
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" fill="#5154a4"/>
                </svg>
              </summary>
              <ul class="mt-3 absolute bg-white p-2">
                <li class="m-1 flex items-center">
                  <a href="/profile" class="hover:text-purple-200 text-black">
                    <span class="text-lg p-1">Mi perfil</span>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="#ababab"/></svg> -->
                  </a>
                </li>
              </ul>
            </details>
          </div>          
          <router-link v-else to="/login" class="hover-bg-green-200 text-green-700 px-3 py-1 rounded transition text-lg font-bold">Log In</router-link>
          <router-link v-if="!loggedInUsername" to="/signUp" class="hover-bg-blue-200 text-blue-700 px-3 py-1 rounded transition text-lg font-bold">Sign Up</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      loggedInUsername: localStorage.getItem('loggedInUsername')
    };
  },
  watch: {
    '$route': function() {
      this.loggedInUsername = localStorage.getItem('loggedInUsername');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedInUsername');
      this.loggedInUsername = null;
      this.$router.push('/login');
    }
  }
};
</script>
