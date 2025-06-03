import { ActionIcon, Popover, Stack } from '@mantine/core';
import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Link } from '@shared/ui/link';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcherDesktop: FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <Popover middlewares={{ shift: { padding: 40 } }} position="bottom" shadow="md" withArrow>
      <Popover.Target>
        <ActionIcon
          classNames={{
            icon: cx(styles.flag, i18n.language === 'en' && styles.enUs, i18n.language === 'ru' && styles.ru),
          }}
          radius="lg"
          variant="subtle"
        />
      </Popover.Target>

      <Popover.Dropdown p="xs">
        <Stack>
          <ActionIcon
            classNames={{ icon: cx(styles.flag, styles.enUs) }}
            component={Link}
            language="en"
            onClick={() => i18n.changeLanguage('en')}
            radius="lg"
            to={`${location.pathname}`}
            variant="subtle"
          />
          <ActionIcon
            classNames={{ icon: cx(styles.flag, styles.ru) }}
            component={Link}
            language="ru"
            onClick={() => i18n.changeLanguage('ru')}
            radius="lg"
            to={`${location.pathname}`}
            variant="subtle"
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
