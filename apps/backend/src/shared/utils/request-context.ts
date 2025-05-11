import * as parser from 'accept-language-parser';
import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { FALLBACK_LNG, SUPPORTED_LNGS } from 'src/shared/application/config/i18n';

import { PrismaTransaction } from 'src/modules/prisma';
import { ProfileEntity } from 'src/modules/acount';

export type TxRequestContext = {
  tx: PrismaTransaction | null;
  withTx(tx: PrismaTransaction): RequestContext;
};

export type LocalizationRequestContext = {
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

class RequestContextImpl implements RequestContext {
  static fromRequest(req: Request): RequestContext {
    const profile = req.user instanceof ProfileEntity ? req.user : null;

    return new RequestContextImpl(
      getRequestLocale(req),
      profile?.accountId || null,
      profile?.id || null,
    );
  }

  constructor(
    public readonly locale: string,
    public readonly accountId: string | null,
    public readonly profileId: string | null,
    public readonly tx: PrismaTransaction | null = null,
  ) {}

  withTx(tx: PrismaTransaction): RequestContext {
    return new RequestContextImpl(this.locale, this.accountId, this.profileId, tx);
  }

  isAuthorized(): this is { accountId: string; profileId: string } {
    return !!this.accountId && !!this.profileId;
  }
}

export const ReqCtx = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContext => {
    const request = ctx.switchToHttp().getRequest();
    return RequestContextImpl.fromRequest(request);
  },
);
