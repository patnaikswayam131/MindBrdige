module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js", "./components/*.{html,js}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        'surface-soft': "var(--color-surface-soft)",
        
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)"
        },
        
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          light: "var(--color-primary-light)",
          50: "var(--color-secondary)",
          100: "var(--color-secondary)",
          500: "var(--color-primary)",
          600: "var(--color-primary-hover)"
        },

        secondary: {
          DEFAULT: "var(--color-secondary)",
          50: "var(--color-bg)",
          100: "var(--color-secondary)",
          500: "var(--color-secondary)",
          600: "var(--color-secondary)"
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          50: "var(--color-bg)",
          100: "var(--color-secondary)",
          500: "var(--color-accent)",
          600: "var(--color-accent)"
        },

        lavender: "var(--color-accent-purple)",
        'accent-purple': "var(--color-accent-purple)",

        brand: {
          DEFAULT: "var(--color-brand)",
          hover: "var(--color-brand-hover)",
          soft: "var(--color-brand-soft)"
        },
        
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)"
        },
        
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Fraunces"', '"DM Serif Display"', 'serif'],
        display: ['"Fraunces"', '"DM Serif Display"', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 2rem + 4vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-l': ['clamp(2.5rem, 1.8rem + 3vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(2rem, 1.5rem + 2vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h1': ['clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.5rem, 1.1rem + 1vw, 1.875rem)', { lineHeight: '1.3' }],
        'h3': ['clamp(1.25rem, 1rem + 0.5vw, 1.5rem)', { lineHeight: '1.4' }],
        'h4': ['clamp(1.125rem, 0.9rem + 0.5vw, 1.25rem)', { lineHeight: '1.4' }],
        'body-l': ['clamp(1.0625rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6' }],
        'body-m': ['1rem', { lineHeight: '1.6' }],
        'body-s': ['0.875rem', { lineHeight: '1.5' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', textTransform: 'uppercase' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
        'pill': '999px',
      },
      boxShadow: {
        'light': '0 2px 8px rgba(51, 43, 69, 0.04), 0 8px 24px rgba(51, 43, 69, 0.05)',
        'elevated': '0 16px 48px rgba(51, 43, 69, 0.12)',
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}