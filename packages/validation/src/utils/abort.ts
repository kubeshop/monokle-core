import { ExtendableError } from "./error.js";

/**
 * An error that indicates that the operation was aborted.
 *
 * The main thing we care about is that error.name is 'AbortError'.
 */
export class AbortError extends ExtendableError {
  constructor(message: string) {
    super(message);
  }
}

export function throwIfAborted(signal: AbortSignal) {
  // AbortSignal.throwIfAborted exists but is not supported in NodeJs <v17.3.0
  // and it is also not available in abort-controller polyfill.
  // See https://nodejs.org/api/globals.html#abortsignalthrowifaborted
  if (signal.aborted) {
    throw new AbortError(signal.reason);
  }
}

/**
 * You can use this to continue in the next iteration of the event loop.
 *
 * Useful to prioritise more high-priority execution such as rendering.
 */
export function nextTick(): Promise<void> {
  return new Promise((r) => setImmediate(r));
}
