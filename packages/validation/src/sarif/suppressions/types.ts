import {
  ExternalSuppression,
  Suppression,
  SuppressionKind,
  ValidationResult,
  ValidationRun,
} from '../../common/sarif.js';
import {Resource} from '../../common/types.js';

export type ResourceApi = {
  getResource: () => Resource | undefined;
  getAllResources: () => Resource[];
};

export interface Suppressor<S extends Suppression = Suppression> {
  kind: SuppressionKind;
  preload(suppressions?: S[]): Promise<void>;
  suppress(problem: ValidationResult, run: ValidationRun, api: ResourceApi): Suppression[] | Promise<Suppression[]>;
  suppressions?: S[];
}

export interface AnnotationsSuppression extends Suppression {
  kind: 'inSource';
  status: 'accepted';
}

export interface FingerprintSuppression extends ExternalSuppression {
  kind: 'external';
  fingerprint: string;
}
