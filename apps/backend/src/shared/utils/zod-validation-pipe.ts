import type { ZodSchema } from 'zod';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) throw result.error;
    return result.data;
  }
}
