import * as parser from 'accept-language-parser';

import { FALLBACK_LNG } from 'src/shared/config/i18n';

import { createMockProfileEntity } from 'src/modules/acount/entities/profile.entity.mok';

import { makeMockRequestContext, requestContextFromRequest } from './request-context';

vi.mock('accept-language-parser');

describe('RequestContext', () => {
  it('resolves locale from query.locale', () => {
    const req = {
      headers: {},
      query: { locale: 'fr' },
      user: null,
      // biome-ignore lint/suspicious/noExplicitAny: it's a test
    } as any;

    const ctx = requestContextFromRequest(req);
    expect(ctx.locale).toBe('fr');
  });

  it('resolves locale from accept-language header', () => {
    vi.spyOn(parser, 'pick').mockReturnValue('es');

    const req = {
      headers: { 'accept-language': 'es,en;q=0.8' },
      query: {},
      user: null,
      // biome-ignore lint/suspicious/noExplicitAny: it's a test
    } as any;

    const ctx = requestContextFromRequest(req);
    expect(ctx.locale).toBe('es');
  });

  it('uses fallback locale when nothing matches', () => {
    vi.spyOn(parser, 'pick').mockReturnValue(null);

    const req = {
      headers: {},
      query: {},
      user: null,
      // biome-ignore lint/suspicious/noExplicitAny: it's a test
    } as any;

    const ctx = requestContextFromRequest(req);
    expect(ctx.locale).toBe(FALLBACK_LNG);
  });

  it('parses profile correctly if user is ProfileEntity', () => {
    const user = createMockProfileEntity({ accountId: 'acc456', id: 'pid123' });

    const req = {
      headers: {},
      query: {},
      user,
      // biome-ignore lint/suspicious/noExplicitAny: it's a test
    } as any;

    const ctx = requestContextFromRequest(req);
    expect(ctx.accountId).toBe('acc456');
    expect(ctx.profileId).toBe('pid123');
  });

  it('ignores user if not a ProfileEntity', () => {
    const req = {
      headers: {},
      query: {},
      user: { something: 'else' },
      // biome-ignore lint/suspicious/noExplicitAny: it's a test
    } as any;

    const ctx = requestContextFromRequest(req);
    expect(ctx.accountId).toBeNull();
    expect(ctx.profileId).toBeNull();
  });

  it('detects isAuthorized when both IDs are present', () => {
    const ctx = makeMockRequestContext({ accountId: 'acc', profileId: 'prof' });
    expect(ctx.isAuthorized()).toBe(true);
  });

  it('isAuthorized returns false if IDs are missing', () => {
    const ctx = makeMockRequestContext({});
    expect(ctx.isAuthorized()).toBe(false);
  });

  it('withTx returns new context with updated tx', () => {
    // biome-ignore lint/suspicious/noExplicitAny: it's a test
    const fakeTx = { $fake: true } as any;
    const ctx = makeMockRequestContext();
    const updated = ctx.withTx(fakeTx);

    expect(updated.tx).toBe(fakeTx);
    expect(updated.locale).toBe(ctx.locale);
    expect(updated.accountId).toBe(ctx.accountId);
  });
});
