import { Inject, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { ACCESS_TOKEN_COOKIE_KEY } from '../config/constants';
import { IsAuthorizedResponseDto } from '../dto/is-authorized-response.dto';
import { ACCESS_TOKEN_SRV } from '../interfaces/access-token.service.interface';

@Injectable()
export class IsAuthorizedUseCase {
  constructor(
    @Inject(ACCESS_TOKEN_SRV)
    private readonly accessTokenSrv: IdentifierOf<typeof ACCESS_TOKEN_SRV>
  ) {}

  async execute(req: Request): Promise<IsAuthorizedResponseDto> {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
    if (!token) return new IsAuthorizedResponseDto(false);

    await this.accessTokenSrv.parse(token);
    return new IsAuthorizedResponseDto(true);
  }
}
