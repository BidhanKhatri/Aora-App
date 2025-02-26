/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,jsx,ts,tsx}",
//     "./customcomponents/**/*.{js,jsx,ts,tsx}", // Add this if you have a `ustomcomponents` folder
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./customcomponents/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  presets: [require("nativewind/preset")], // Correct preset configuration
  plugins: [],
};
