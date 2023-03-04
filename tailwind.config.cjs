// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './theme.config.tsx'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1360px',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        accent: {
          500: '#F7AB0A',
        },
      },
      typography: ({ theme }) => ({
        yellow: {
          css: {
            '--tw-prose-body': theme('colors.stone[300]'),
            '--tw-prose-links': theme('colors.yellow[600]'),
            '--tw-prose-headings': theme('colors.stone[400]'),
            '--tw-prose-quotes': theme('colors.stone[400]'),
          },
        },
      }),
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
};
