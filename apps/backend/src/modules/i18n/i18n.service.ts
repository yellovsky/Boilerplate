import { Injectable } from '@nestjs/common';
import i18next, { TFunction } from 'i18next';

import { I18nService } from './i18n.types';

import errorEn from './translations/en/error.json';
import errorRu from './translations/ru/error.json';

@Injectable()
export class I18nServiceImpl implements I18nService {
  async init() {
    await i18next.init({
      defaultNS: 'common',
      fallbackLng: 'en',
      ns: ['error', 'common'],
      supportedLngs: ['ru', 'en'],

      resources: {
        en: { error: errorEn },
        ru: { error: errorRu },
      },
    });
  }

  get supportedLngs(): string[] {
    return i18next.options.supportedLngs ? [...i18next.options.supportedLngs] : [];
  }

  get fallbackLng(): string {
    const fallbackLng = i18next.options.fallbackLng;
    return typeof fallbackLng === 'string' ? fallbackLng : this.supportedLngs[0];
  }

  getFixedT(locale: string): TFunction {
    return i18next.getFixedT(locale);
  }
}
