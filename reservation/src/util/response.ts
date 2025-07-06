import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BAD_REQUEST_ERROR_CODE } from '../common/error-codes';
import { RESPONSE_DEFAULT_MESSAGES } from '../common/response-message';

interface IResponse {
  statusCode: number;
  errorCode: string | null;
  message: string | 'success';
  data: any;
  meta?: any;
}

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<IResponse> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => this.handleSuccess(statusCode, data)),
      catchError((error) => this.handleError(error)),
    );
  }

  private handleSuccess(statusCode: number, data: any = {}): IResponse {
    const response = {
      statusCode,
      errorCode: null,
      message: 'success',
    };

    if (Array.isArray(data)) {
      return {
        ...response,
        data: { data },
      };
    }

    const { meta, message, ...rest } = data;
    return {
      ...response,
      ...(meta && { meta }),
      ...(message && { message }),
      data: rest,
    };
  }

  private handleError(error: any) {
    const statusCode = error instanceof HttpException ? error.getStatus() : 500;
    const errorResponse = {
      statusCode,
      errorMessage: this.getErrorMessage(error),
      errorCode: error.errorCode || BAD_REQUEST_ERROR_CODE,
      data: {},
    };

    return throwError(() => new HttpException(errorResponse, statusCode));
  }

  private getErrorMessage(error: any): string {
    return (
      error.response?.message ||
      error.errorMessage ||
      error.message ||
      RESPONSE_DEFAULT_MESSAGES[error.getStatus()] ||
      'Bad Request'
    );
  }
}
