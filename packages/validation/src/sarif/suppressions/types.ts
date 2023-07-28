import {Suppression, SuppressionKind, ValidationResult, ValidationRun} from '../../common/sarif.js';
import {Resource} from '../../common/types.js';

export type ResourceApi = {
  getResource: () => Resource | undefined;
  getAllResources: () => Resource[];
};

export interface Suppressor {
  kind: SuppressionKind;
  preload(): Promise<void>;
  suppress(problem: ValidationResult, run: ValidationRun, api: ResourceApi): Suppression[] | Promise<Suppression[]>;
}
