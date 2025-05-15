import { FC } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Link } from '@shared/ui/link';
import { i18n as localizationI18n } from '@app/localization';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <div className="fixed top-0 right-0 z-10 flex w-min gap-2 p-2">
      {localizationI18n.supportedLngs.map(language => (
        <Link
          className="text-blue-500 transition-all hover:underline dark:text-white"
          key={language}
          language={language}
          onClick={() => i18n.changeLanguage(language)}
          to={`${location.pathname}`}
        >
          {language}
        </Link>
      ))}
    </div>
  );
};
