import { colors } from './colors';
import { typography } from './typography';
import { spacing, breakpoints } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows: {
    subtle: '0 1px 2px rgba(23, 33, 43, 0.04)',
    card: '0 8px 30px -12px rgba(23, 33, 43, 0.08)',
    elevated: '0 20px 44px -16px rgba(7, 91, 80, 0.14)',
  },
  transitions: {
    fast: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
    medium: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export function applyThemeCssVariables(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--z-primary', colors.primary);
  root.style.setProperty('--z-primary-dark', colors.primaryDark);
  root.style.setProperty('--z-charcoal', colors.charcoal);
  root.style.setProperty('--z-bg', colors.background);
  root.style.setProperty('--z-surface', colors.surface);
  root.style.setProperty('--z-sage', colors.sage);
  root.style.setProperty('--z-pale-green', colors.paleGreen);
  root.style.setProperty('--z-text', colors.text);
  root.style.setProperty('--z-secondary-text', colors.secondaryText);
  root.style.setProperty('--z-border', colors.border);
  root.style.setProperty('--z-font-display', typography.fontFamily.display);
  root.style.setProperty('--z-font-body', typography.fontFamily.body);
  root.style.setProperty('--z-font-mono', typography.fontFamily.mono);
}

export { colors, typography, spacing, breakpoints };
