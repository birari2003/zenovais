export const typography = {
  fontFamily: {
    display: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
  },
  scale: {
    heroTitle: 'clamp(2.25rem, 4.2vw, 3.85rem)',
    pageTitle: 'clamp(2rem, 3.8vw, 3.35rem)',
    sectionTitle: 'clamp(1.75rem, 3vw, 2.65rem)',
    subsectionTitle: 'clamp(1.25rem, 2vw, 1.65rem)',
    lead: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
    body: '1rem',
    small: '0.875rem',
    caption: '0.8125rem',
  },
  lineHeight: {
    tight: '1.12',
    snug: '1.25',
    normal: '1.6',
    relaxed: '1.7',
  },
} as const;
