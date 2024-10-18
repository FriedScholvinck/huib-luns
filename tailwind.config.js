/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: {
          DEFAULT: '#353535',
          100: '#0b0b0b',
          200: '#151515',
          300: '#202020',
          400: '#2b2b2b',
          500: '#353535',
          600: '#5e5e5e',
          700: '#868686',
          800: '#aeaeae',
          900: '#d7d7d7'
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff'
        },
        french_gray: {
          DEFAULT: '#d2d7df',
          100: '#242a33',
          200: '#485365',
          300: '#6d7d97',
          400: '#a0aabb',
          500: '#d2d7df',
          600: '#dbdfe6',
          700: '#e4e7ec',
          800: '#edeff2',
          900: '#f6f7f9'
        },
        silver: {
          DEFAULT: '#bdbbb0',
          100: '#282721',
          200: '#504e43',
          300: '#787564',
          400: '#9d9a89',
          500: '#bdbbb0',
          600: '#cbc9c1',
          700: '#d8d7d0',
          800: '#e5e4e0',
          900: '#f2f2ef'
        },
        battleship_gray: {
          DEFAULT: '#8a897c',
          100: '#1c1b18',
          200: '#373731',
          300: '#535249',
          400: '#6e6d62',
          500: '#8a897c',
          600: '#a1a095',
          700: '#b9b8b0',
          800: '#d0d0ca',
          900: '#e8e7e5'
        },
        accent: {
          DEFAULT: '#8a897c',
          dark: '#6e6d62',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      scale: {
        '105': '1.05',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover', 'focus'],
    },
  },
  plugins: [],
}
