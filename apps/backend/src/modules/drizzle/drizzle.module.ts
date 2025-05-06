import { drizzle } from 'drizzle-orm/node-postgres';
import { Module } from '@nestjs/common';

import * as schema from '../../shared/infrastructure/db/schema';
import { DB } from '../../shared/infrastructure/db/drizzle-client';
import { InjectableIdentifier } from '../../shared/utils/injectable-identifier';

export const DRIZZLE_SRV = 'DRIZZLE_SRV' as InjectableIdentifier<DB>;

@Module({
  exports: [DRIZZLE_SRV],
  providers: [
    {
      provide: DRIZZLE_SRV,
      useFactory: (): DB => drizzle(process.env.DATABASE_URL!, { schema }),
    },
  ],
})
export class DrizzleModule {}
