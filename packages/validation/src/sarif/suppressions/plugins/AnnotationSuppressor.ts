import {Suppression, SuppressionKind, ValidationResult, ValidationRun} from '../../../common/sarif.js';
import {getRuleForResultV2} from '../../../utils/getRule.js';
import {ResourceApi, Suppressor} from '../types.js';

const SUPPRESSION_ANNOTATION_PREFIX = 'monokle.io/suppress';

export class AnnotationSuppressor implements Suppressor {
  kind: SuppressionKind = 'inSource';

  preload() {
    return Promise.resolve();
  }

  suppress(problem: ValidationResult, run: ValidationRun, {getResource}: ResourceApi): Suppression[] {
    const resource = getResource();

    if (!resource) {
      return [];
    }

    const annotations = resource.content.metadata.annotations;

    if (!annotations) {
      return [];
    }

    const rule = getRuleForResultV2(run, problem);
    const pluginId = rule.id.substring(0, 3).toLowerCase();
    const fullAnnotation = `${SUPPRESSION_ANNOTATION_PREFIX}.${pluginId}.${rule.name}`;
    const idAnnotation = `${SUPPRESSION_ANNOTATION_PREFIX}.${rule.id}`;
    const value = annotations[idAnnotation] ?? annotations[fullAnnotation] ?? annotations[idAnnotation.toLowerCase()];

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
