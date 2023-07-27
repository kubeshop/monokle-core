import {Suppression, SuppressionKind, ValidationResult} from '../../../common/sarif.js';
import {Suppressor} from '../types.js';

export class FakeSuppressor implements Suppressor {
  kind: SuppressionKind = 'external';

  private _suppressions = new Set();

  addSuppressionRequest(problem: ValidationResult) {
    this._suppressions.add(problem.fingerprints?.['monokleHash/v1']);
  }

  preload() {
    return Promise.resolve();
  }

  suppress(problem: ValidationResult): Suppression[] {
    if (!this._suppressions.has(problem.fingerprints?.['monokleHash/v1'])) {
      return [];
    }

    return [{kind: 'external', status: 'accept', justification: 'Suppressed by john.doe on 6th June.'}];
  }
}
