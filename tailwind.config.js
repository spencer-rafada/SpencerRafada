/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        code: {
          bg: 'var(--color-code-bg)',
          border: 'var(--color-code-border)',
          blue: 'var(--color-code-blue)',
          green: 'var(--color-code-green)',
          orange: 'var(--color-code-orange)',
          purple: 'var(--color-code-purple)',
          yellow: 'var(--color-code-yellow)',
          red: 'var(--color-code-red)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(210 40% 78%)',
            maxWidth: 'none',
            a: {
              color: 'hsl(217.2 91.2% 59.8%)',
              textDecoration: 'underline',
              '&:hover': {
                color: 'hsl(217.2 91.2% 69.8%)',
              },
            },
            strong: { color: 'hsl(210 40% 98%)' },
            h1: { color: 'hsl(210 40% 98%)' },
            h2: { color: 'hsl(210 40% 98%)' },
            h3: { color: 'hsl(210 40% 98%)' },
            h4: { color: 'hsl(210 40% 98%)' },
            code: {
              color: 'hsl(217.2 91.2% 59.8%)',
              backgroundColor: 'var(--color-code-bg)',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.4rem',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'var(--color-code-bg)',
              border: '1px solid var(--color-code-border)',
              borderRadius: '0.5rem',
            },
            blockquote: {
              borderLeftColor: 'hsl(217.2 91.2% 59.8%)',
              color: 'hsl(215 20.2% 65.1%)',
            },
            hr: { borderColor: 'hsl(217.2 32.6% 17.5%)' },
            'ol > li::marker': { color: 'hsl(215 20.2% 65.1%)' },
            'ul > li::marker': { color: 'hsl(215 20.2% 65.1%)' },
            thead: { borderBottomColor: 'hsl(217.2 32.6% 17.5%)' },
            'tbody tr': { borderBottomColor: 'hsl(217.2 32.6% 17.5%)' },
            img: { borderRadius: '0.5rem' },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}