// axiosConfig.js
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api', // Asegúrate de que esto apunte a la URL de tu API
  headers: {
    'Referer': import.meta.env.VITE_FRONTEND_URL || 'http://localhost:2222' // Añade el header Referer
  }
});

export default axiosInstance;
