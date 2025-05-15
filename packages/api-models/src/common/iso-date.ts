import * as zod from 'zod';

/**
 * Value object for ISO date
 *
 * This VO keeps date string representation to always be in ISO format
 */
export class ISODate {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromDate(date: Date): ISODate {
    return new ISODate(date.toISOString());
  }

  static fromString(value: string): ISODate {
    if (!ISODate.isValidISO(value)) {
      throw new Error(`Invalid ISO date: ${value}`);
    }
    return new ISODate(value);
  }

  static isValidISO(value: string): boolean {
    const d = new Date(value);
    return !Number.isNaN(d.getTime()) && d.toISOString() === value;
  }

  static transformApiProperty({ value }: { value: unknown }) {
    return value instanceof ISODate ? value.toString() : value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  toDate(): Date {
    return new Date(this.value);
  }
}

export const isoDateSchema = zod.string().refine((val) => ISODate.isValidISO(val), {
  message: 'Invalid ISO 8601 date',
});
