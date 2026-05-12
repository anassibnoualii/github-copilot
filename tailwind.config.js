/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gh-bg':      '#0d1117',
        'gh-surface': '#161b22',
        'gh-surface2':'#21262d',
        'gh-surface3':'#2d333b',
        'gh-border':  '#30363d',
        'gh-purple':  '#8957e5',
        'gh-purple-dim': '#6e40c9',
        'gh-blue':    '#4493f8',
        'gh-green':   '#3fb950',
        'gh-orange':  '#db6d28',
        'gh-text':    '#e6edf3',
        'gh-text2':   '#8b949e',
        'gh-muted':   '#484f58',
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
