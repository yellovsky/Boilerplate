import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { CASBIN_REPO } from './domain/interfaces/casbin.repository.interace';
import { CASBIN_SRV } from './domain/interfaces/casbin.service.interace';

import { CasbinRepositoryImpl } from './infrastructure/repositories/casbin.repository';

import { CasbinServiceImpl } from './applications/services/casbin.service';

@Module({
  exports: [CASBIN_SRV],
  imports: [PrismaModule],
  providers: [
    { provide: CASBIN_SRV, useClass: CasbinServiceImpl },
    { provide: CASBIN_REPO, useClass: CasbinRepositoryImpl },
  ],
})
export class CasbinModule {}
