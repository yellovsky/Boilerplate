import type { TFunction } from 'i18next';
import type { ZodIssue } from 'zod';

import { getZodIssueDetails } from './zod-issue-details';

describe('getZodIssueDetails', () => {
  const t: TFunction = vi.fn((key: string) => `[translated] ${key}`) as unknown as TFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('translates a required field (undefined)', () => {
    const issue: ZodIssue = {
      code: 'invalid_type',
      expected: 'string',
      message: 'Required',
      path: ['name'],
      received: 'undefined',
    };

    const result = getZodIssueDetails(t)(issue);

    expect(result).toEqual({
      field: 'name',
      message: '[translated] Field is required',
    });

    expect(t).toHaveBeenCalledWith('Field is required', { ns: 'error' });
  });

  it('translates a required field (empty string)', () => {
    const issue: ZodIssue = {
      code: 'too_small',
      inclusive: true,
      message: 'Too short',
      minimum: 1,
      path: ['description'],
      type: 'string',
    };

    const result = getZodIssueDetails(t)(issue);

    expect(result).toEqual({
      field: 'description',
      message: '[translated] Field is required',
    });
  });

  it('falls back to issue.message for unknown issue types', () => {
    const issue: ZodIssue = {
      code: 'invalid_literal',
      expected: 'foo',
      message: 'Invalid value',
      path: ['type'],
      received: 'buz',
    };

    const result = getZodIssueDetails(t)(issue);

    expect(result).toEqual({
      field: 'type',
      message: 'Invalid value',
    });

    expect(console.warn).toHaveBeenCalledWith('Unhandled validation error', issue);
  });
});
