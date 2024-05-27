/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "cooper-std": ["Cooper Std", "sans"],
      },
      colors: {
        primary: {
          200: "#FEF1EE",
          800: "#381914",
        },
        orange: {
          500: "#F76F59",
        },
      },
    },
  },
  plugins: [],
};
