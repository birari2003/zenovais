export const spacing = {
  containerMaxWidth: '1320px',
  containerPaddingX: 'clamp(1.25rem, 3.5vw, 3rem)',
  sectionPaddingY: 'clamp(4rem, 7vw, 6.5rem)',
  sectionPaddingCompactY: 'clamp(3rem, 5vw, 4.5rem)',
  cardPadding: 'clamp(1.5rem, 2.5vw, 2rem)',
  radius: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    xl: '1.75rem',
    full: '9999px',
  },
} as const;

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;
