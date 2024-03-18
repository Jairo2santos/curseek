import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
})
=======
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
>>>>>>> developer
