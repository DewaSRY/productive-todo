/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#262626',
        heading: '#404040',

        primary: {
          one: '#FFFF33',
          two: '#FFFF66',
          three: '#CCCC00',
        },

        secondary: {
          one: '#7EE500',
          two: '#98FF1A',
          three: '#62B200',
        },

        tertiary: {
          one: '#8F8A8A',
          two: '#B4B1B1',
          three: '#857A7A',
        },

        priority: {
          one: '#565FDC',
          two: '#888EDD',
          three: '#D7D9F4',
        },
      },
    },
  },
  plugins: [],
}

