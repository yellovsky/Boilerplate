import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import type { FC } from 'react';

import { Icon } from '@shared/ui/icon';

export const ColorSchemeSwitcher: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon aria-label="Color scheme" color="gray" onClick={toggleColorScheme} variant="subtle">
      <Icon className="h-full w-full" name={colorScheme === 'dark' ? 'moon' : 'sun'} />
    </ActionIcon>
  );
};
