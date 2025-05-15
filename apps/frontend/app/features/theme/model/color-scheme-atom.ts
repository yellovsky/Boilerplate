import { atom } from 'jotai';

import type { ColorScheme } from './color-scheme';

// TODO Research how to set atom value without hook
export const selectedColorSchemeAtom = atom<ColorScheme | null>(null);
export const fallbackColorSchemeAtom = atom<ColorScheme>('light');

export const colorSchemeAtom = atom<ColorScheme>((get) => get(selectedColorSchemeAtom) || get(fallbackColorSchemeAtom));
