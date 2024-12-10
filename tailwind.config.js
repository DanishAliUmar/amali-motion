/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        romantically: ["Romantically", "sans-serif"],
        alegreya: ["Alegreya Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
}