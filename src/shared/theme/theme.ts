import type { tokens } from './tokens';

export type Theme = {
  color: (typeof tokens)['color'];
  spacing: (typeof tokens)['spacing'];
  radius: (typeof tokens)['radius'];
  typography: (typeof tokens)['typography'];
};

export function createTheme(t: typeof tokens): Theme {
  return {
    color: t.color,
    spacing: t.spacing,
    radius: t.radius,
    typography: t.typography,
  };
}

