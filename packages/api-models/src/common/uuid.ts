import { v4 } from 'uuid';
import * as zod from 'zod';
export class UniqueEntityID {
  private constructor(private readonly value: string) {}

  static fromString(value: string): UniqueEntityID {
    if (!UniqueEntityID.isValidUUID(value)) throw new Error(`Invalid UUID: ${value}`);
    return new UniqueEntityID(value);
  }

  static createRandom(): UniqueEntityID {
    return new UniqueEntityID(v4());
  }

  static isValidUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  equals(other: UniqueEntityID): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  get raw(): string {
    return this.value;
  }
}

export const uuidSchema = zod
  .string()
  .uuid()
  .refine((val) => UniqueEntityID.isValidUUID(val), { message: 'Invalid uuid' });
