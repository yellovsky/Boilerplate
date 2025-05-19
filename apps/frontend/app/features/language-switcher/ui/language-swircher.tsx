import { cx } from 'class-variance-authority';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { SUPPORTED_LOCALES } from '@shared/config';
import { Link } from '@shared/ui/link';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex w-min gap-2 p-2">
      {SUPPORTED_LOCALES.map((language) => (
        <Link
          className={cx(' transition-all hover:underline', language === i18n.language ? 'text-blue-500' : 'text-text')}
          key={language}
          language={language}
          // TODO check react compiler
          onClick={() => i18n.changeLanguage(language)}
          to={`${location.pathname}`}
        >
          {language}
        </Link>
      ))}
    </div>
  );
};
