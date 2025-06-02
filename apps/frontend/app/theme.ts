import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    palePurple: [
      '#f1f1ff',
      '#e0dff2',
      '#bfbdde',
      '#9b98ca',
      '#7d79b9',
      '#6a66af',
      '#605cac',
      '#504c97',
      '#464388',
      '#3b3979',
    ],
  },
  defaultRadius: 'md',

  fontFamily: 'Inter Variable, sans-serif',
  fontFamilyMonospace: 'Roboto Mono Variable, monospace',

  headings: {
    fontFamily: 'Geologica Variable, sans-serif',
  },
  primaryColor: 'palePurple',
});
