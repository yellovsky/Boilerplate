import { PrismaClient } from '@generated/prisma';

const languages = [{ code: 'en' }, { code: 'ru' }] as const;

export const seedLanguages = async (tx: PrismaClient) => {
  const allLanguages = await tx.language.findMany();
  const languagesToAdd = languages.filter(l => !allLanguages.some(ll => ll.code === l.code));

  if (languagesToAdd.length) await tx.language.createMany({ data: languagesToAdd });
};
