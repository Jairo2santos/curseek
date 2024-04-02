
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    "./src/**/*.{js,ts,jsx,tsx}",
    './public/**/*.html',
  ],
  theme: {
    extend: {

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#4a5568',
            h1: {
              color: '#6b46c1',
              textAlign: 'center',
            },
            h2: {
              color: '#6b46c1',
            },
            strong: {
              color: '#9f7aea',
            },
            u: {
              textDecorationColor: '#9f7aea',
            },
            // Añadir más aquí
          },

          },
        }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}