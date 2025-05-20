import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import type * as zod from 'zod';

import {
  type IsAuthorizedResponse,
  type LoginWithEmailResponse,
  type LogoutResponse,
  loginWithEmailBodySchema,
} from '@repo/api-models';

import { Public } from 'src/shared/decorators/public';
import { ApiCommonErrorResponses } from 'src/shared/utils/api-common-response';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';
import { ZodValidationPipe } from 'src/shared/utils/zod-validation-pipe';

import { IsAuthorizedResponseDto } from './dto/is-authorized-response.dto';
import { LoginWithEmailResponseDto } from './dto/login-with-email-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { LocalGuard } from './guards/local.guard';
import { IsAuthorizedUseCase } from './use-cases/is-authorized.use-case';
import { LoginWithEmailUseCase } from './use-cases/login-with-email.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(
    @Inject(LoginWithEmailUseCase)
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,

    @Inject(IsAuthorizedUseCase)
    private readonly isAuthorizedUseCase: IsAuthorizedUseCase,

    @Inject(LogoutUseCase)
    private readonly logoutUseCase: LogoutUseCase
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
      properties: {
        email: { description: 'User email address', example: 'user@example.com', type: 'string' },
        password: { description: 'User password', example: 'strongPassword123', type: 'string' },
      },
      required: ['email', 'password'],
      type: 'object',
    },
  })
  @ApiOkResponse({ type: LoginWithEmailResponseDto })
  // TODO add errors descriptions
  @ApiCommonErrorResponses('unauthorized')
  async loginWithEmail(
    @ReqCtx() reqCtx: RequestContext,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(loginWithEmailBodySchema))
    body: zod.infer<typeof loginWithEmailBodySchema>
  ): Promise<LoginWithEmailResponse> {
    return this.loginWithEmailUseCase.execute(reqCtx, body, req, res);
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
