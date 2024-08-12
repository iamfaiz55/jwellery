/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-golden': '#f9f2e8', // Light golden color
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

