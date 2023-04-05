/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        center: true,
      },
      colors: {
        darkGreen: '#3C6255',
        darkSkin: '#ECB390',
        darkText: '#4D4D4D',
        lightGreen: '#CEE5D0',
        lightSkin: '#FCF8E8',
        lightSkinLighter: '#FFFDF5',
      },
      boxShadow: {
        header: 'inset 0 3000px rgba(60, 98, 85, 0.8)',
      },
      fontFamily: {
        poppins: 'Poppins, sans-serif',
      },
      boxShadow: {
        blogImage: '-15px 15px 0px -1px rgba(255,253,245,1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
