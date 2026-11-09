/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07020d',
          900: '#0d0418',
          850: '#140626',
          800: '#1c0936',
          700: '#280c4c',
        },
        purple: {
          glow: '#c084fc',
          neon: '#a855f7',
          deep: '#6b21a8',
          darkest: '#3b0764',
          accent: '#e9d5ff',
        }
      },
      fontFamily: {
        romantic: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        serifDisplay: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 25px -5px rgba(168, 85, 247, 0.45)',
        'purple-glow-lg': '0 0 45px -5px rgba(168, 85, 247, 0.6)',
        'purple-glow-intense': '0 0 70px 0px rgba(192, 132, 252, 0.55)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.57)',
      },
      backgroundImage: {
        'radial-purple': 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.25) 0%, rgba(7, 2, 13, 0.95) 75%)',
        'purple-shimmer': 'linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.2), transparent)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(192,132,252,0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}

