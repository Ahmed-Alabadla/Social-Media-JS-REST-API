/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "3rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [],
};
