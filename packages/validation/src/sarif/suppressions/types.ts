import {Suppression, SuppressionKind, ValidationResult, ValidationRun} from '../../common/sarif.js';
import {Resource} from '../../common/types.js';

export {AnnotationsSuppression, FingerprintSuppression} from '@monokle/types';

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
