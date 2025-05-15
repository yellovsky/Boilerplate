export type ColorScheme = 'light' | 'dark';

export const isColorScheme = (val: unknown): val is ColorScheme => val === 'light' || val === 'dark';
