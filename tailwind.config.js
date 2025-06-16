/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        crawl: 'crawl 3s ease-in-out infinite',
      },
      keyframes: {
        crawl: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
      colors: {
        primary: "#481317",
        secondary: "#5A1A1F",
        tertiary: "#8A3339",
        "black-100": "#181818",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #222e2d",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/HeroMosterton.jpg')",
      },
    },
  },
  plugins: [],
};