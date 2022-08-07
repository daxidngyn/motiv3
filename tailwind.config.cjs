/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          100: "#f9f9fa",
          200: "#ededf0",
          300: "#d7d7db",
          400: "#b1b1b3",
          500: "#737373",
          600: "#4a4a4f",
          700: "#38383d",
          800: "#2a2a2e",
          900: "#0c0c0d",
        },
      },
    },
  },
  plugins: [],
};
