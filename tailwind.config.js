/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Fuentes de marca
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Jost"', 'system-ui', 'sans-serif'],
      },

      // Paleta Luminae — sincronizada con globals.css
      colors: {
        cream:   '#F7F2EB',
        beige:   '#E8DDD0',
        sand:    '#D4B896',
        earth:   '#C4A882',
        gold:    '#B8975A',
        'gold-lt': '#D4AD6A',
        moss:    '#7A8C6E',
        deep:    '#2C2416',
        deep2:   '#1A150D',
        warm:    '#6A5A42',
        light:   '#F0E8DA',
      },

      // Transición estándar de marca
      transitionTimingFunction: {
        luminae: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },

      // Animaciones
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideLeft: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)'    },
        },
        marquee: {
          from: { transform: 'translateX(0)'    },
          to:   { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)'     },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.7s ease both',
        'fade-in':  'fadeIn 0.5s ease both',
        'slide-left': 'slideLeft 0.35s cubic-bezier(0.4,0,0.2,1)',
        marquee:    'marquee 25s linear infinite',
        float:      'float 4s ease-in-out infinite',
      },

      // Sombras de marca
      boxShadow: {
        sm: '0 2px 12px rgba(44,36,22,0.06)',
        md: '0 8px 32px rgba(44,36,22,0.10)',
        lg: '0 20px 60px rgba(44,36,22,0.14)',
      },
    },
  },
  plugins: [],
}
