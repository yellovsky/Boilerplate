import { cx } from 'class-variance-authority';
import { useAtom, useAtomValue } from 'jotai';
import type { FC } from 'react';

import { updateDocumentCookieColorScheme } from '../lib/theme-cookie';
import type { ColorScheme } from '../model/color-scheme';
import { colorSchemeAtom, selectedColorSchemeAtom } from '../model/color-scheme-atom';

const COLOR_SCHEME_OPTIONS = ['dark', 'light', 'system'] as const;

export const ColorSchemeSwitcher: FC = () => {
  const colorScheme = useAtomValue(colorSchemeAtom);
  const [selectedColorScheme, setSelectedColorScheme] = useAtom(selectedColorSchemeAtom);

  const changeTheme = (colorSchemeToSet: ColorScheme | 'system') => {
    updateDocumentCookieColorScheme(colorSchemeToSet);
    setSelectedColorScheme(colorSchemeToSet === 'system' ? null : colorSchemeToSet);
  };

  return (
    <div className="flex w-min gap-2 p-2">
      {COLOR_SCHEME_OPTIONS.map((theme) => (
        <button
          type="button"
          className={cx(
            'transition-all hover:underline',
            colorScheme === theme ? 'text-blue-500' : 'dark:text-white',
            selectedColorScheme === theme && 'underline',
            !selectedColorScheme && theme === 'system' && 'underline'
          )}
          key={theme}
          onClick={() => changeTheme(theme)}
        >
          {theme}
        </button>
      ))}
    </div>
  );
};
