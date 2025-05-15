import { Module } from '@nestjs/common';

import { I18nServiceImpl } from './i18n.service';
import { I18N_SRV } from './i18n.types';

@Module({
  exports: [I18N_SRV],
  providers: [{ provide: I18N_SRV, useClass: I18nServiceImpl }],
})
export class I18nModule {}
