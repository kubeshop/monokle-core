import { isNil } from "lodash-es";

export function isDefined<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}
