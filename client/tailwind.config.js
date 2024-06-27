/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "image-background": "url('/public/image/bg.jpeg')"
      }
    },
  },
  plugins: [],
}

