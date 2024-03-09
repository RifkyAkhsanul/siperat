const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {
    animation: ['responsive', 'hover'],
    extend: {
      opacity: ['disabled'],
      pointerEvents: ['disabled'],
    },
  },
  plugins: [],
};
