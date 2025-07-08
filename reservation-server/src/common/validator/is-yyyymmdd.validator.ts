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
          return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        defaultMessage() {
          return 'date must be in YYYY-MM-DD format';
        },
      },
    });
  };
}
