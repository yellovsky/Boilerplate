import * as zod from 'zod';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  IsAuthorizedResponse,
  loginWithEmailBodySchema,
  LoginWithEmailResponse,
  LogoutResponse,
} from '@repo/api-models';

import { ApiCommonErrorResponses } from 'src/shared/utils/api-common-response';
import { Public } from 'src/shared/application/decorators/public';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { IsAuthorizedResponseDto } from './application/dto/is-authorized-response.dto';
import { IsAuthorizedUseCase } from './application/use-cases/is-authorized.use-case';
import { LocalGuard } from './application/guards/local.guard';
import { LoginWithEmailResponseDto } from './application/dto/login-with-email-response.dto';
import { LoginWithEmailUseCase } from './application/use-cases/login-with-email.use-case';
import { LogoutResponseDto } from './application/dto/logout-response.dto';
import { LogoutUseCase } from './application/use-cases/logout.use-case';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(
    @Inject()
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,

    @Inject()
    private readonly isAuthorizedUseCase: IsAuthorizedUseCase,

    @Inject()
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  @ApiOperation({
    description: 'Login user with e-mail',
    operationId: 'Login with e-mail',
  })
  @ApiBody({
    schema: {
      required: ['email', 'password'],
      type: 'object',

      properties: {
        email: { description: 'User email address', example: 'user@example.com', type: 'string' },
        password: { description: 'User password', example: 'strongPassword123', type: 'string' },
      },
    },
  })
  @ApiOkResponse({ type: LoginWithEmailResponseDto })
  // TODO add errors descriptions
  @ApiCommonErrorResponses('unauthorized')
  async loginWithEmail(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(loginWithEmailBodySchema))
    body: zod.infer<typeof loginWithEmailBodySchema>,
  ): Promise<LoginWithEmailResponse> {
    return this.loginWithEmailUseCase.execute(body, req, res);
  }

  @Get('is-authorized')
  @Public()
  @ApiOperation({
    description: 'Check whether user is authorized or not',
    operationId: 'Is authorized',
  })
  @ApiOkResponse({ type: IsAuthorizedResponseDto })
  async isAuthorized(@Req() req: Request): Promise<IsAuthorizedResponse> {
    return this.isAuthorizedUseCase.execute(req);
  }

  @Post('logout')
  @Public()
  @ApiOperation({
    description: 'Sign out',
    operationId: 'Sign out',
  })
  @ApiOkResponse({ type: LogoutResponseDto })
  @ApiCommonErrorResponses('unauthorized')
  async logout(@Res({ passthrough: true }) res: Response): Promise<LogoutResponse> {
    return this.logoutUseCase.execute(res);
  }
}
