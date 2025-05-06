import 'i18next';

import common from './translations/en/common.json';
import error from './translations/en/error.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      error: typeof error;
    };
  }
}
