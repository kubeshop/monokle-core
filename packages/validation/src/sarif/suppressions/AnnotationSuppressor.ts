import {RuleMetadata, Suppression, ValidationResult} from '../../common/sarif';
import {Resource} from '../../common/types';
import {Suppressor} from './Suppressor';

const SUPPRESSION_ANNOTATION_PREFIX = 'suppress.monokle.io';

export class AnnotationSuppressor implements Suppressor {
  kind: 'external' | 'inline' = 'inline';

  suppress(problem: ValidationResult, rule: RuleMetadata, resource?: Resource): Suppression[] | Promise<Suppression[]> {
    if (!resource) {
      return [];
    }

    const annotations = resource.content.annotations ?? {};
    const idAnnotation = `${SUPPRESSION_ANNOTATION_PREFIX}/${rule.id}`;
    const nameAnnotation = `${SUPPRESSION_ANNOTATION_PREFIX}/${rule.name}`;
    const fullAnnotation = `${SUPPRESSION_ANNOTATION_PREFIX}/${problem.rule.toolComponent.name}.${rule.id}`;
    const value = annotations[idAnnotation] ?? annotations[fullAnnotation] ?? annotations[nameAnnotation];

    if (!value || value === 'false') {
      return [];
    }

    const suppression: Suppression = {
      kind: 'inSource',
      status: 'accept',
    };

    if (value !== 'false' && value !== 'true') {
      suppression.justification = value;
    }

    return [suppression];
  }
}
