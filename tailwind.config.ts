/** @type {import('tailwindcss').Config} */
import { Titillium_Web } from 'next/font/google';
import { colors } from './src/styles/Theme/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    listStyleType: {
      square: 'square',
      roman: 'upper-roman',
    },
    screen: {
      xs: '20em',
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
    },
    extend: {
      fontFamily: {
        alfaSlabOne: ['var(--font-alfa-slab)', ...defaultTheme.fontFamily.serif],
        titillium_Web: ['var(--font-titillium)', ...defaultTheme.fontFamily.sans],
      },
      width: {
        '278': '17.375rem',
      },
      boxShadow: {
        solid: `0px 0px 5px 1px ${colors.borderColor.secondary}, inset 0px 0px 5px 1px ${colors.borderColor.secondary}`,
        flushed: `0 4px 4px -4px ${colors.brand.secondary},  inset 0 -6px 4px -7px ${colors.brand.secondary} `,
        left: `10px 0px 30px -7px rgba(0,0,0,0.1)`,
      },
      colors: colors,
      transformOrigin: {
        'top-center': 'top center',
        'bottom-center': 'bottom center',
      },
      transitionProperty: {
        height: 'height',
      },
      keyframes: {
        heightModalAnimation: {
          '0%': {
            maxHeight: '0px',

            opacity: 0,
          },

          '100%': {
            maxHeight: '476px',

            opacity: 1,
          },
        },
        fadeInAnimation: {
          '0%': { opacity: 0 },

          '100%': { opacity: 1 },
        },
      },

      animation: {
        heightModalAnimation: 'heightModalAnimation 500ms ease-in-out',
        fadeInAnimation: ' fadeInAnimation 200ms ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-khtml-user-drag': 'none',
          '-moz-user-drag': 'none',
          '-o-user-drag': 'none',
          'user-drag': 'none',
        },
      });
    }),
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /gap-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
};
