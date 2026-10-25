/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F4EC",
        sand: "#EDE5D6",
        ink: "#101A17",
        forest: { DEFAULT: "#1C2E27", 800: "#15231E", 700: "#223A31" },
        moss: "#3B5547",
        brass: { DEFAULT: "#B38B4D", light: "#D4B483", dark: "#8F6C37" },
        mist: "#6B7A72",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16,26,23,.18)",
        lift: "0 24px 60px -20px rgba(16,26,23,.35)",
      },
    },
  },
  plugins: [],
};
