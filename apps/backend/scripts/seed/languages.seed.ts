import { DB } from '../../src/shared/infrastructure/db/drizzle-client';
import { languages } from '../../src/shared/infrastructure/db/schema';

export const seedLanguages = async (tx: DB): Promise<Array<{ code: string }>> =>
  tx
    .insert(languages)
    .values([{ code: 'en' }, { code: 'ru' }])
    .returning({ code: languages.code });
