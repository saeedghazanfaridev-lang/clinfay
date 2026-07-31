/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D7BD5',
          light: '#8da2e2',
          dark: '#3f5bb0',
        },
        accent: {
          DEFAULT: '#42D0DD',
          light: '#56D1DC',
          dark: '#09627E',
        },
        surface: {
          DEFAULT: '#FAFBFE',
          blue: '#DCE8F7',
          lilac: '#D7E1FD',
          mint: '#D9F3F7',
        },
        ink: {
          DEFAULT: '#333333',
        },
      },
      fontFamily: {
        peyda: ['Peyda', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
        xl4: '2rem',
      },
    },
  },
  plugins: [],
}
