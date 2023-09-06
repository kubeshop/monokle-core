import {Suppression, SuppressionKind, ValidationResult} from '../../../common/sarif.js';
import {FingerprintSuppression, Suppressor} from '../types.js';

export class FingerprintSuppressor implements Suppressor<FingerprintSuppression> {
  kind: SuppressionKind = 'external';

  suppressions: FingerprintSuppression[] = [];

  preload(s: FingerprintSuppression[]): Promise<void> {
    this.suppressions = s;
    return Promise.resolve();
  }

  suppress(problem: ValidationResult): Suppression[] | Promise<Suppression[]> {
    const suppression = this.suppressions.find(s => {
      return s.fingerprint && s.kind === this.kind && s.fingerprint === problem.fingerprints?.['monokleHash/v1'];
    });

    suppression && problem.suppressions?.push(suppression);
    return suppression
      ? [
          {
            guid: suppression.guid,
            kind: suppression.kind,
            status: suppression.status,
            justification: suppression.justification,
          },
        ]
      : [];
  }
}
