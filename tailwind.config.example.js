// Tailwind CSS Configuration for Reddy on the Road
// Copy this into tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/**/*.html',
    './*.html',
  ],
  theme: {
    extend: {
      // Custom Color Palette
      colors: {
        // Warm Coffee & Cream Theme
        primary: {
          DEFAULT: '#92400E', // amber-800
          light: '#B45309',   // amber-700
          dark: '#78350F',    // amber-900
        },
        cream: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
        },
        accent: {
          DEFAULT: '#F97316', // orange-500
          light: '#FB923C',   // orange-400
          dark: '#EA580C',    // orange-600
        },
      },

      // Typography
      fontFamily: {
        display: ['Abril Fatface', 'serif'],
        body: ['Merriweather', 'serif'],
        handwritten: ['Caveat', 'cursive'],
      },

      // Font Sizes (with line heights)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },

      // Spacing (extends default)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Border Radius
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },

      // Box Shadows
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },

      // Transitions
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },

      // Animation
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Max Width
      maxWidth: {
        'timeline': '800px',
        'container': '1200px',
      },

      // Z-Index
      zIndex: {
        'navbar': '50',
        'modal': '100',
        'tooltip': '60',
      },

      // Aspect Ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        'square': '1 / 1',
      },
    },
  },
  plugins: [
    // Typography Plugin (optional but recommended)
    // npm install @tailwindcss/typography
    require('@tailwindcss/typography'),
    
    // Aspect Ratio Plugin (if using Tailwind < v3.0)
    // require('@tailwindcss/aspect-ratio'),
  ],

  // Safelist (if you need these classes to always be included)
  safelist: [
    'animate-fadeInUp',
    'cursor-pointer',
  ],
}
