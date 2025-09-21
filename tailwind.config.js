/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 10%, 95%)',
        foreground: 'hsl(220, 15%, 25%)',
        accent: 'hsl(150, 70%, 45%)',
        border: 'hsl(220, 15%, 85%)',
        primary: 'hsl(190, 70%, 50%)',
        surface: 'hsl(220, 10%, 100%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 25%, 0.08)',
        'dropdown': '0 10px 20px hsla(0, 0%, 0%, 0.05)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
