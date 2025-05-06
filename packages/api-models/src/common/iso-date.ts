import * as zod from 'zod';
import { ISODate } from './iso-date.vo';

export const isoDateSchema = zod.string().refine(val => ISODate.isValidISO(val), {
  message: 'Invalid ISO 8601 date',
});
