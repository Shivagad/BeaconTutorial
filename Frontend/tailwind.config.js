// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',       // Main blue for trust and professionalism
        secondary: '#F97316',     // Accent orange for call-to-action elements
        background: '#F9FAFB',    // Light background for a clean look
        textPrimary: '#1F2937',   // Dark text for excellent readability
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern and clean typography
      },
    },
  },
  plugins: [],
};
