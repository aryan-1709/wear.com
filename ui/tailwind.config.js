/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    {
      relative: true,
      transform: (content) => content.replace(/taos:/g, ''),
      files: ['./src/*.{html,js}'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('taos/plugin')
  ],
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ]

}