import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsYYYYMMDD(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          // YYYY-MM-DD 형식 체크 + 월(01-12), 일(01-31) 범위 체크
          const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

          if (!dateRegex.test(value)) return false;

          // 실제 유효한 날짜인지 체크 (2월 30일 같은 경우 방지)
          const date = new Date(value);
          return date.toISOString().slice(0, 10) === value;
        },
        defaultMessage() {
          return 'date must be in YYYY-MM-DD format';
        },
      },
    });
  };
}
