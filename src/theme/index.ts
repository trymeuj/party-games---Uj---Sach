import { colors, gradients } from './colors';
import { typography } from './typography';

export const theme = {
  colors,
  gradients,
  typography,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
};

export type Theme = typeof theme;

