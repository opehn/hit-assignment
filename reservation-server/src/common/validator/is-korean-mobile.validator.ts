import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsKoreanMobileFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isKoreanMobileFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' && /^\d{3}-\d{3,4}-\d{4}$/.test(value)
          );
        },
        defaultMessage() {
          return 'mobile must be in 000-000-0000 or 000-0000-0000 format';
        },
      },
    });
  };
}
