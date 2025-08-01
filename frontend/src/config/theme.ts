// ================================
// src/config/theme.ts
// ================================
export const ZENITH_THEME = {
  colors: {
    primary: {
      navy: {
        50: '#f0f4ff',
        500: '#15206c',
        600: '#1a237e',
        900: '#061349',
      },
      orange: {
        50: '#fff7ed',
        500: '#EB7C24',
        600: '#ea580c',
        900: '#9a3412',
      },
    },
    chat: {
      bg: '#F8FAFC',
      user: '#3B82F6',
      bot: '#FFFFFF',
      system: '#EFF6FF',
    },
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  spacing: {
    chat: {
      header: '4rem',
      sidebar: '16rem',
      input: '4rem',
      padding: '1rem',
    },
  },
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export const DARK_THEME = {
  ...ZENITH_THEME,
  colors: {
    ...ZENITH_THEME.colors,
    chat: {
      bg: '#0F172A',
      user: '#3B82F6', 
      bot: '#1E293B',
      system: '#1E40AF',
    },
  },
} as const;