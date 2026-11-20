/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f0f9f6',
          100: '#d6ede6', // Matching the exact soft green-mint background in the user's photos
          200: '#bfe2d7',
          300: '#95cebe',
          700: '#115e59', // Dark teal button color
          800: '#134e4a',
          900: '#042f2e',
        }
      }
    },
  },
  plugins: [],
}
