import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsHHmmss(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimeFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(value)
          );
        },
        defaultMessage() {
          return 'time must be in HH:mm:ss format';
        },
      },
    });
  };
}
