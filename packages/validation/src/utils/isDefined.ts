import { isNil } from 'lodash';

export function isDefined<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}
