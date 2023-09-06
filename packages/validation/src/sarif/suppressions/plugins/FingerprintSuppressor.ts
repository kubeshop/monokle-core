import {Suppression, SuppressionKind, ValidationResult} from '../../../common/sarif.js';
import {FingerprintSuppression, Suppressor} from '../types.js';

export class FingerprintSuppressor implements Suppressor<FingerprintSuppression> {
  kind: SuppressionKind = 'external';
  suppressions: FingerprintSuppression[] = [];
  suppressionsMap: Map<FingerprintSuppression['fingerprint'], FingerprintSuppression> = new Map();

  preload(suppressions: FingerprintSuppression[]): Promise<void> {
    this.suppressions = suppressions;
    this.suppressionsMap.clear();

    for (const suppression of suppressions) {
      if (suppression.kind === this.kind && suppression.fingerprint) {
        this.suppressionsMap.set(suppression.fingerprint, suppression);
      }
    }

    return Promise.resolve();
  }

  suppress(problem: ValidationResult): Suppression[] | Promise<Suppression[]> {
    const fingerprint = problem.fingerprints?.['monokleHash/v1'];
    if (!fingerprint) return [];
    const suppression = this.suppressionsMap.get(fingerprint);

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
