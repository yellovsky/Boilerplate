import type { MantineColorSchemeManager } from '@mantine/core';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

import { colorSchemeAtom, selectedColorSchemeAtom } from '../model/color-scheme-atom';
import { updateDocumentCookieColorScheme } from './theme-cookie';

export const useColorSchemeManager = (): MantineColorSchemeManager => {
  const colorScheme = useAtomValue(colorSchemeAtom);
  const setSelectedColorScheme = useSetAtom(selectedColorSchemeAtom);

  const [colorSchemeManager] = useState(
    (): MantineColorSchemeManager => ({
      clear() {
        updateDocumentCookieColorScheme('auto');
        setSelectedColorScheme(null);
      },
      get() {
        return colorScheme;
      },
      set(val) {
        updateDocumentCookieColorScheme(val);
        setSelectedColorScheme(val === 'auto' ? null : val);
      },
      subscribe() {
        // No cross-tab support with cookies, no-op
      },
      unsubscribe() {
        // No cross-tab support with cookies, no-op
      },
    })
  );
  return colorSchemeManager;
};
