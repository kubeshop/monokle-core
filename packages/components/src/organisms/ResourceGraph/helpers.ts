import { ValidationResult } from '@monokle/validation';

export const getValidationLevel = (
  errors: ValidationResult[],
  warnings: ValidationResult[]
) => {
  if (errors.length && warnings.length) {
    return 'both';
  }

  if (errors.length > 0) {
    return 'error';
  }

  if (warnings.length > 0) {
    return 'warning';
  }

  return 'none';
};

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
}
