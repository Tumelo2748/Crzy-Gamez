/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'rainbow': 'rainbow 5s infinite',
        'marquee': 'marquee 10s linear infinite',
        'shake': 'shake 0.5s infinite',
        'bounce-random': 'bounce-random 2s infinite',
      },
      keyframes: {
        rainbow: {
          '0%, 100%': { backgroundColor: '#ff70a6' },
          '25%': { backgroundColor: '#ff9770' },
          '50%': { backgroundColor: '#ffd670' },
          '75%': { backgroundColor: '#70d6ff' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'bounce-random': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      rotate: {
        '360': '360deg',
      },
    },
  },
  plugins: [],
}
