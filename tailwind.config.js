/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hot_weather': "url('./assets/hot-weather.jpg')",
        'cold-weather': "url('./assets/cold_weather.png')",
      },
      opacity:{
        'smooth': '0.01'
      },
      colors:{
        'slateBlack': 'rgba(255, 255, 255, .2)'
      },
    },
  },
  plugins: [],
}

