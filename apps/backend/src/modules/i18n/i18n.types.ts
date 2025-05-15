import type { TFunction } from 'i18next';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface I18nService {
  getFixedT(locale: string): TFunction;
  init(): Promise<void>;

  readonly supportedLngs: string[];
  readonly fallbackLng: string;
}

export const I18N_SRV = 'I18N_SRV' as InjectableIdentifier<I18nService>;
