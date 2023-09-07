/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto_500Medium"],
      },
    },
  },
  plugins: [],
};
