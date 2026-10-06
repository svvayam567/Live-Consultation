/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mono: {
          white: '#FFFFFF',
          black: '#0A0A0A',
          surface: '#FAFAFA',
          subtle: '#F4F4F4',
          hairline: '#ECECEC',
          border: '#E0E0E0',
          mutedLight: '#A3A3A3',
          muted: '#737373',
          textSecondary: '#5C5C5C',
          nearBlack: '#0A0A0A',
        },
        forest: {
          DEFAULT: '#0E2A1C',
          deep: '#091A11',
          hover: '#143D28',
          border: '#1B4D36',
          ring: '#0E2A1C',
        },
        svvayam: {
          bg: '#FFFFFF',
          white: '#FFFFFF',
          black: '#0A0A0A',
          charcoal: '#0A0A0A',
          surface: '#FAFAFA',
          border: '#ECECEC',
          borderLight: '#F5F5F5',
          muted: '#737373',
          forest: '#0E2A1C',
        }
      },
      borderRadius: {
        'container': '20px',
        'control': '14px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.06)',
        'pill': '0 8px 16px rgba(0, 0, 0, 0.25)',
        'button': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
