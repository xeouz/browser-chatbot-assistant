/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'lightindigo': "#2f314b",
        'medindigo': '#28293a',
        'darkindigo': "#1d1f34",
        'darkerindigo': "#1a1b32",
      },
      fontFamily: {
        google: ["Manrope"],
        oxygen: ["Oxygen", "sans-serif"],
      },
    }
  },
  plugins: [],
}

