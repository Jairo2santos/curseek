import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // Asegúrate de importar 'resolve'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Punto de entrada para el cliente
        client: resolve(__dirname, 'src/entry-client.js'), // Alternativamente 'src/entry-client.js' si existe
        server: resolve(__dirname, 'src/entry-server.js'), // Punto de entrada para SSR
      },
    },
    outDir: 'dist/client', // Directorio de salida para el build del cliente
  },
  server: {
    proxy: {
      // Configura el proxy para las solicitudes que comiencen con `/api`
      '/api': {
        target: 'http://localhost:3333', // La URL de tu backend
        changeOrigin: true, // necesario para virtual hosted sites
      // secure: false, // si el backend usa https
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
