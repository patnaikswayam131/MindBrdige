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
        
        // Fallbacks for existing pages
        primary: {
          DEFAULT: "var(--color-brand)",
          50: "var(--color-brand-soft)",
          100: "var(--color-brand-soft)",
          500: "var(--color-brand)",
          600: "var(--color-brand-hover)"
        },
        secondary: {
          DEFAULT: "var(--color-success)",
          50: "var(--color-bg)",
          100: "var(--color-bg)",
          500: "var(--color-success)",
          600: "var(--color-success)"
        },
        accent: {
          DEFAULT: "var(--color-warning)",
          50: "var(--color-bg)",
          100: "var(--color-bg)",
          500: "var(--color-warning)",
          600: "var(--color-warning)"
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"DM Serif Display"', 'serif'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '68px' }],
        'display-l': ['52px', { lineHeight: '58px' }],
        'display-m': ['44px', { lineHeight: '50px' }],
        'h1': ['36px', { lineHeight: '44px' }],
        'h2': ['30px', { lineHeight: '38px' }],
        'h3': ['24px', { lineHeight: '32px' }],
        'h4': ['20px', { lineHeight: '28px' }],
        'body-l': ['18px', { lineHeight: '28px' }],
        'body-m': ['16px', { lineHeight: '25px' }],
        'body-s': ['14px', { lineHeight: '21px' }],
        'label': ['13px', { lineHeight: '18px', letterSpacing: '0.08em' }],
        'caption': ['12px', { lineHeight: '17px' }],
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