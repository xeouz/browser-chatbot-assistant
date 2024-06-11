/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'lighterindigo': '#51536d',
        'lightindigo': "#2f314b",
        'baseindigo':'#212238',
        'medindigo': '#28293a',
        'darkindigo': "#1d1f34",
        'darkerindigo': "#1a1b32",
      },
      fontFamily: {
        google: ["Manrope"],
        oxygen: ["Oxygen", "sans-serif"],
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '33%': { transform: 'rotate(-0.7deg)' },
          '66%': { transform: 'rotate(0.7deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'shake': 'wave 0.15s ease-in-out',
      },
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwindcss-animate")
  ],
}

