<template>
    <div class="login-form-container">
      <form class="login-form" @submit.prevent="login">
        <h2>Iniciar Sesión</h2>
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Nombre de Usuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <p>usuario: user pass: 12345</p>
        <button type="submit">Ingresar</button>

        <p class="mb-3">¿No tienes una cuenta? <router-link to="/signup">Regístrate</router-link></p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

export default {
  data() {
    return {
      username: localStorage.getItem('loggedInUsername'),
      password: '',
    userData: {},
    isPasswordShown: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3333/users/login', {
  username: this.username,
  password: this.password
});
if (response.status === 200) {
  localStorage.setItem('loggedInUsername', this.username); // Almacenar el nombre de usuario en el localStorage
  this.$router.push('/profile'); 
}
        
        console.log('Usuario logueado:', response.data);
        this.$router.push('/profile'); 
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
};
  </script>
  
  <style scoped>
  .login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .login-form {
    width: 300px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #0c7175;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #005658;
  }
  </style>
  