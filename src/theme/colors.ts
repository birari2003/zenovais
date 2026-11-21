export const colors = {
  primary: '#075B50',
  primaryDark: '#06443C',
  charcoal: '#17212B',
  background: '#FAFAF7',
  surface: '#FFFFFF',
  sage: '#DCE9E3',
  paleGreen: '#EAF2ED',
  text: '#17212B',
  secondaryText: '#5E6872',
  border: '#E4E9E5',
  error: '#B42318',
  errorSurface: '#FEF3F2',
  success: '#075B50',
  successSurface: '#EAF2ED',
} as const;

export type BrandColors = typeof colors;
