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
    return !isNaN(d.getTime()) && d.toISOString() === value;
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
