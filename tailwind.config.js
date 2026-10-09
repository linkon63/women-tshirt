/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './fashion4/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customGray: {
          800: '#1f2937',
        },
        // Brand palette derived from the PJ Fashion gold logo (#FFC000)
        brand: {
          50: '#FFFAEB',
          100: '#FFF1C6',
          200: '#FFE388',
          300: '#FFD34A',
          400: '#FFC000',
          500: '#E6A800',
          600: '#C78F00',
          700: '#9E6F00',
          800: '#7A5500',
          900: '#5C4000',
        },
        // Warm neutral "ink" scale for text & dark surfaces
        ink: {
          DEFAULT: '#14110F',
          900: '#14110F',
          800: '#26211D',
          700: '#3A3430',
          600: '#57504A',
          500: '#78716C',
          400: '#A8A29E',
        },
        cream: '#FFFCF5',
      },
      fontFamily: {
        // Pure Hind Siliguri for ultra-clean, elegant Bangla typography
        display: ['"Hind Siliguri"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Hind Siliguri"', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        hindi: ['"Hind Siliguri"', 'sans-serif'],
      },
      borderRadius: {
        global: '4px',
      },
      maxWidth: {
        1440: '1440px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,17,15,0.04), 0 12px 32px -16px rgba(20,17,15,0.14)',
        lift: '0 2px 4px rgba(20,17,15,0.04), 0 24px 48px -20px rgba(20,17,15,0.25)',
        glow: '0 12px 32px -10px rgba(255,192,0,0.65)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '60%, 100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        shine: 'shine 3.2s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
