/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zenith Comp Brand Colors
        zenith: {
          navy: {
            50: '#f0f4ff',
            100: '#e6edfe', 
            200: '#d0ddfc',
            300: '#aac2f7',
            400: '#7e9df1',
            500: '#15206c', // Primary Navy
            600: '#1a237e',
            700: '#0f1b5c', 
            800: '#0d1549',
            900: '#061349'
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#EB7C24', // Primary Orange
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12'
          }
        },
        // Chat Interface Colors
        chat: {
          bg: '#F8FAFC',
          user: '#3B82F6',
          bot: '#FFFFFF',
          system: '#EFF6FF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'typing': 'typing 1.4s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        typing: {
          '0%, 60%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.5' 
          },
          '30%': { 
            transform: 'scale(1.2)', 
            opacity: '1' 
          },
        }
      },
      backgroundImage: {
        'zenith-gradient': 'linear-gradient(135deg, #15206c 0%, #EB7C24 100%)',
        'zenith-navy': 'linear-gradient(135deg, #15206c 0%, #2563EB 100%)',
        'zenith-orange': 'linear-gradient(135deg, #EB7C24 0%, #F59E0B 100%)',
        'chat-gradient': 'linear-gradient(to bottom, #F8FAFC 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        'chat': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'message': '0 2px 8px rgba(37, 99, 235, 0.15)',
        'zenith': '0 10px 25px rgba(21, 32, 108, 0.15)',
      },
      borderRadius: {
        'message': '18px',
      }
    },
  },
  plugins: [],
}