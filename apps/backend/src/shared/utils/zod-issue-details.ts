import type { TFunction } from 'i18next';
import type { ZodIssue } from 'zod';

type TranslateIssue = (t: TFunction, issue: ZodIssue) => string | undefined;

const getUnknownMessage = (issue: ZodIssue) => issue.message;
const getRequiredMessage: TranslateIssue = (t, issue) => {
  const isUndefined = issue.code === 'invalid_type' && issue.expected !== 'undefined' && issue.received === 'undefined';

  const isMinimalString = issue.code === 'too_small' && issue.type === 'string' && issue.minimum === 1;

  if (isUndefined || isMinimalString) return t('Field is required', { ns: 'error' });
};

const getInvalidUnionMessage: TranslateIssue = (t, issue) => {
  const isInvalidUnion = issue.code === 'invalid_union';
  if (isInvalidUnion) return t('Invalid value', { ns: 'error' });
};

const checkers = [getRequiredMessage, getInvalidUnionMessage];
const getZodIssueMessage: TranslateIssue = (locale, issue) => {
  for (const fn of checkers) {
    const msg = fn(locale, issue);
    if (msg) return msg;
  }
};

export const getZodIssueDetails =
  (t: TFunction) =>
  (issue: ZodIssue): { field: string; message: string } => {
    const message = getZodIssueMessage(t, issue);

    // TODO: add logger
    if (!message) console.warn('Unhandled validation error', issue);

    return {
      field: issue.path.join('.'),
      message: message || getUnknownMessage(issue),
    };
  };
