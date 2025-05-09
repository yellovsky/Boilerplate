import { Module } from '@nestjs/common';
import { PrismaClient } from '@generated/prisma';

import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { PrismaServiceImpl } from './prisma.service';

export const PRISMA_SRV = 'PRISMA_SRV' as InjectableIdentifier<PrismaClient>;

@Module({
  exports: [PRISMA_SRV],
  providers: [{ provide: PRISMA_SRV, useClass: PrismaServiceImpl }],
})
export class PrismaModule {}
