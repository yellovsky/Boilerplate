import type { PrismaClient } from '@generated/prisma';
import { Module } from '@nestjs/common';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { PrismaServiceImpl } from './services/prisma.service';

export type PrismaTransaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const PRISMA_SRV = 'PRISMA_SRV' as InjectableIdentifier<PrismaClient>;

@Module({
  exports: [PRISMA_SRV],
  providers: [{ provide: PRISMA_SRV, useClass: PrismaServiceImpl }],
})
export class PrismaModule {}
