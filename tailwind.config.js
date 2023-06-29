/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      logo: ["Passion One", "cursive"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
