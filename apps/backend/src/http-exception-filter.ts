import * as parser from 'accept-language-parser';
import { TFunction } from 'i18next';
import { ZodError } from 'zod';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { FailedResponseDto } from 'src/shared/presentation/dtos/failure-response.dto';
import { I18nService } from 'src/modules/i18n';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nSrv: I18nService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const failedResponse = this.#getResponse(exception, host);
    return response.status(failedResponse.error.httpCode).json(failedResponse);
  }

  #getResponse(exception: Error, host: ArgumentsHost): FailedResponseDto {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (exception instanceof FailedResponseDto) {
      return exception;
    }

    if (exception instanceof HttpException) {
      return FailedResponseDto.fromHttpException(exception);
    }

    if (exception instanceof ZodError) {
      const locale = this.#getRequestLocale(request);
      const t: TFunction = this.i18nSrv.getFixedT(locale);

      return FailedResponseDto.fromZodError(t, exception);
    }

    // TODO: add logger
    console.error('Unhandled error', exception);
    return FailedResponseDto.from({
      code: 'unknown_error',
      httpCode: 500,
      message: 'Unknown error',
      timestamp: new Date(),
    });
  }

  #getRequestLocale(request: Request): string {
    const queryLocale = request.query.locale;
    if (queryLocale && typeof queryLocale === 'string') return queryLocale;

    const header = request.headers['accept-language'];
    const headerLocale = header ? parser.pick(this.i18nSrv.supportedLngs, header) : undefined;
    if (headerLocale) return headerLocale;

    return this.i18nSrv.fallbackLng;
  }
}
