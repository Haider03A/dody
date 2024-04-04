/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./*.html"
],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '26px',
        lg: '36px'
      },
    },
    extend: {},
  },
  plugins: [],
}