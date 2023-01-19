/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'hero': "url('/clement-falize-UzZhBohuFXo-unsplash.jpg')",
        'walker': "url('/filip-mroz-Mg9xdh3keeo-unsplash.jpg')",
        'protector': "url('/joey-nicotra-0EI_4R2r0qg-unsplash.jpg')",
        'bridge': "url('/brooklynbridge.jpg')",
        'skyline': "url('/valentin-antonucci-fWBP0w-k89Q-unsplash.jpg')"
      },
    },
  },
  plugins: [],
}
