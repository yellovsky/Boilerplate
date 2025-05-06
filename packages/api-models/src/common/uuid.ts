import * as zod from 'zod';

import { UniqueEntityID } from './uuid.vo';

export const uuidSchema = zod
  .string()
  .uuid()
  .refine(val => UniqueEntityID.isValidUUID(val), { message: 'Invalid uuid' });
