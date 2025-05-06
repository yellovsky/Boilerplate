import { Module } from '@nestjs/common';

import { I18N_SRV } from './i18n.types';
import { I18nServiceImpl } from './i18n.service';

@Module({
  exports: [I18N_SRV],
  providers: [{ provide: I18N_SRV, useClass: I18nServiceImpl }],
})
export class I18nModule {}
