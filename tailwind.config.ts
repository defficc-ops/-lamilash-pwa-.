import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:      'var(--cream)',
        'warm-beige': 'var(--warm-beige)',
        sand:       'var(--sand)',
        cocoa:      'var(--cocoa)',
        'dark-cocoa': 'var(--dark-cocoa)',
        espresso:   'var(--espresso)',
        gold:       'var(--gold)',
        'light-gold': 'var(--light-gold)',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease-in-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'float':      'float 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'gradient-beige': 'linear-gradient(135deg, var(--cream) 0%, var(--warm-beige) 50%, var(--sand) 100%)',
        'gradient-cocoa': 'linear-gradient(135deg, var(--cocoa) 0%, var(--dark-cocoa) 100%)',
        'gradient-gold':  'linear-gradient(90deg, var(--gold), var(--light-gold), var(--gold))',
      },
      boxShadow: {
        'soft':   '0 4px 24px rgba(44, 24, 16, 0.08)',
        'medium': '0 8px 40px rgba(44, 24, 16, 0.12)',
        'strong': '0 20px 60px rgba(44, 24, 16, 0.18)',
        'glow':   '0 0 30px rgba(201, 169, 110, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
