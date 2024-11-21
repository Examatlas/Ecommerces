// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/line-clamp'),
//   ],
// }



module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Adjust the paths according to your project
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#00b5bc', // Add your custom color here
      },
    },
  },
  plugins: [],
}
