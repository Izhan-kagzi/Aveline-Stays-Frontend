/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E2635",
        muted: "#5B6273",
        cream: "#F7F2E7",
        cream2: "#EFE7D6",
        gold: "#B8892B",
        goldBright: "#D4A94A",
        teal: "#1F4A40",
        tealDark: "#153631",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
