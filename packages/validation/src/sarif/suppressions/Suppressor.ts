import {RuleMetadata, Suppression, ValidationResult} from '../../common/sarif';
import {Resource} from '../../common/types';

export interface Suppressor {
  kind: 'inline' | 'external';
  suppress(problem: ValidationResult, rule: RuleMetadata, resource?: Resource): Suppression[] | Promise<Suppression[]>;
}
