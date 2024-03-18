const axios = require('axios');

// Cambia la URL por una de tus rutas protegidas por la limitación de tasa
const url = 'http://localhost:3333/api/cursos/coursera/';

async function testRateLimit() {
  for (let i = 0; i < 120; i++) { // Intenta hacer más solicitudes de las permitidas en tu ventana de tiempo
    try {
      const response = await axios.get(url);
      console.log(`Solicitud ${i+1}:`, response.status);
    } catch (error) {
      // Aquí capturamos el error cuando se supera el límite de solicitudes
      console.error(`Solicitud ${i+1}:`, error.response.status, error.response.data);
      break; // Rompe el bucle después de alcanzar el límite para no saturar el servidor
    }
  }
}

testRateLimit();
