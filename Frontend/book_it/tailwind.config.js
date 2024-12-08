module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Add Nunito as the default sans font
      },
      colors: {
        beige: '#E9DEC9', // Add a custom name for the color
      },
    },
  },
  plugins: [],
}