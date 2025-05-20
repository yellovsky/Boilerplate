import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import * as parser from 'accept-language-parser';
import type { Request } from 'express';

import { FALLBACK_LNG, SUPPORTED_LNGS } from 'src/shared/config/i18n';

import { ProfileEntity } from 'src/modules/acount';
import type { PrismaTransaction } from 'src/modules/prisma';

export type TxRequestContext = {
  tx: PrismaTransaction | null;
  withTx(tx: PrismaTransaction): RequestContext;
};

type LocalizationRequestContext = {
  locale: string;
};

export type AuthRequestContext = {
  accountId: string | null;
  profileId: string | null;
  isAuthorized(): this is { accountId: string; profileId: string };
};

export type RequestContext = TxRequestContext & LocalizationRequestContext & AuthRequestContext;

const getRequestLocale = (request: Request): string => {
  const queryLocale = request.query.locale;
  if (queryLocale && typeof queryLocale === 'string') return queryLocale;

  const header = request.headers['accept-language'];
  const headerLocale = header ? parser.pick(SUPPORTED_LNGS, header) : undefined;

  if (headerLocale) return headerLocale;
  return FALLBACK_LNG;
};

interface RequestContextData {
  locale: string;
  accountId: string | null;
  profileId: string | null;
  tx: PrismaTransaction | null;
}

class RequestContextImpl implements RequestContext {
  static fromRequest(req: Request): RequestContext {
    const profile = req.user instanceof ProfileEntity ? req.user : null;

    return RequestContextImpl.from({
      accountId: profile?.accountId || null,
      locale: getRequestLocale(req),
      profileId: profile?.id || null,
      tx: null,
    });
  }

  static from(params: RequestContextData): RequestContext {
    return new RequestContextImpl(params.locale, params.accountId, params.profileId, params.tx);
  }

  constructor(
    public readonly locale: string,
    public readonly accountId: string | null,
    public readonly profileId: string | null,
    public readonly tx: PrismaTransaction | null = null
  ) {}

  withTx(tx: PrismaTransaction): RequestContext {
    return new RequestContextImpl(this.locale, this.accountId, this.profileId, tx);
  }

  isAuthorized(): this is { accountId: string; profileId: string } {
    return !!this.accountId && !!this.profileId;
  }
}

export const requestContextFromRequest = (request: Request): RequestContext => RequestContextImpl.fromRequest(request);

export const ReqCtx = createParamDecorator((_data: unknown, ctx: ExecutionContext): RequestContext => {
  const request = ctx.switchToHttp().getRequest();
  return requestContextFromRequest(request);
});

export const makeMockRequestContext = (params?: Partial<RequestContextData>): RequestContext =>
  RequestContextImpl.from({
    accountId: null,
    locale: 'en',
    profileId: null,
    tx: null,
    ...params,
  });
