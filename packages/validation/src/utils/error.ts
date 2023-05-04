/**
 * Taken from extendable-error but it has problems with ESM loader.
 * @see https://github.com/vilic/extendable-error/blob/master/src/index.ts
 */
export abstract class ExtendableError extends Error {
  name: string;

  private _error: Error;
  private _stack?: string;

  constructor(public message = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    delete (<Error>this).stack;
    this.name = new.target.name;
    this._error = new Error();
  }

  get stack(): string {
    if (this._stack) {
      return this._stack;
    }

    let prototype = Object.getPrototypeOf(this);
    let depth = 1;

    loop: while (prototype) {
      switch (prototype) {
        case ExtendableError.prototype:
          break loop;
        case Object.prototype:
          depth = 1;
          break loop;
        default:
          depth++;
          break;
      }

      prototype = Object.getPrototypeOf(prototype);
    }

    let stackLines = (this._error.stack || '').match(/.+/g) || [];
    let nameLine = this.name;

    if (this.message) {
      nameLine += `: ${this.message}`;
    }

    stackLines.splice(0, depth + 1, nameLine);

    return (this._stack = stackLines.join('\n'));
  }
}

/**
 * An error that indicates that the operation was aborted.
 */
export class PluginLoadError extends ExtendableError {
  constructor(public plugin: string, message: string) {
    super(message);
  }
}
