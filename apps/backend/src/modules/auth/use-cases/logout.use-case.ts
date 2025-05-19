import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

import { ACCESS_TOKEN_COOKIE_KEY } from '../config/constants';
import { LogoutResponseDto } from '../dto/logout-response.dto';

@Injectable()
export class LogoutUseCase {
  async execute(res: Response): Promise<LogoutResponseDto> {
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, '', { expires: new Date(Date.now()) });
    return new LogoutResponseDto();
  }
}
