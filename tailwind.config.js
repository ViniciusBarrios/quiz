/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,tsx}", "./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["Montserrat", "sans-serif"],
        reading: ["Spectral", "serif"],
      },
    },
  },
  plugins: [],
};
