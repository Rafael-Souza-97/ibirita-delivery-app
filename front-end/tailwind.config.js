/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        corLetra: '#035D6F',
        corFundo: '#0786c7',
        corAmareloBirita: '#ebbc00',
        corBotao: '#6bd4cd',
        corBotaoHover: '#4aa39d',
        corDisabled: '#dfdfdf',
        corHeader: '#04345c',
      },
    },
    fontFamily: {
      'glacial-bold': ['GlacialIndifferenceBold', 'sans-serif'],
      'glacial-regular': ['GlacialIndifference', 'sans-serif'],
    },
  },
  plugins: [],
};
