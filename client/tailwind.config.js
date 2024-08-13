/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-golden': '#f9f2e8', 
         "golden": '#f5c518',
        'golden-dark': '#f4b400'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

