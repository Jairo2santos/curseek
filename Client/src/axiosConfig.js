// Client/src/axiosConfig.js
import axios from 'axios';

// Determinar si estamos ejecutando en el servidor (Node.js).
const isServer = typeof window === 'undefined';
const baseURL = isServer
  ? `http://localhost:3333/api`  // URL completa para el servidor
  : import.meta.env.VITE_API_URL || '/api';  // URL relativa o completa para el cliente

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
