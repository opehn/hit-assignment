import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    private readonly errorCode: string | number,
    private readonly errorMessage: string,
    private readonly statusCode: number = HttpStatus.BAD_REQUEST, // 기본값 설정
  ) {
    super(
      {
        errorCode,
        errorMessage,
        statusCode,
      },
      statusCode,
    );

    this.message = errorMessage;
  }
}

export class BadRequestBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.NOT_FOUND);
  }
}

export class ConflictBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.CONFLICT);
  }
}

export class InternalServerErrorBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ServiceUnavailableBaseException extends BaseException {
  constructor(errorCode: string | number, errorMessage: string) {
    super(errorCode, errorMessage, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
