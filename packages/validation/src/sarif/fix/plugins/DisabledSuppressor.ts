import type {Fixer} from '../index.js';
import type {Fix} from '../../../common/sarif.js';

export class DisabledFixer implements Fixer {
  createFix(): Fix[] {
    return [];
  }
}
