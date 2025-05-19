import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { CASBIN_REPO } from './interfaces/casbin.repository.interace';
import { CASBIN_SRV } from './interfaces/casbin.service.interace';
import { CasbinRepositoryImpl } from './repositories/casbin.repository';
import { CasbinServiceImpl } from './services/casbin.service';

@Module({
  exports: [CASBIN_SRV],
  imports: [PrismaModule],
  providers: [
    { provide: CASBIN_SRV, useClass: CasbinServiceImpl },
    { provide: CASBIN_REPO, useClass: CasbinRepositoryImpl },
  ],
})
export class CasbinModule {}
