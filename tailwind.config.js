/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        destructive: 'var(--destructive)',
      },
      backgroundColor: {
        sidebar: 'var(--sidebar-bg)',
        card: 'var(--card-bg)',
      },
      textColor: {
        sidebar: 'var(--sidebar-text)',
      },
    },
  },
  plugins: [],
};
