/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        page: 'var(--bg-page)',
        'page-alt': 'var(--bg-page-alt)',
        surface: 'var(--bg-surface)',
        ink: 'var(--text-primary)',
        'ink-secondary': 'var(--text-secondary)',
        'ink-muted': 'var(--text-muted)',
        accent: 'var(--accent-primary)',
        'accent-strong': 'var(--accent-strong)',
        sage: 'var(--accent-secondary)',
        'sage-soft': 'var(--accent-secondary-soft)',
        rule: 'var(--border-subtle)',
        'rule-strong': 'var(--border-strong)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        book: 'var(--shadow-book)',
        page: 'var(--shadow-page)',
        card: 'var(--shadow-card)',
      },
    },
  },
  plugins: [],
};
