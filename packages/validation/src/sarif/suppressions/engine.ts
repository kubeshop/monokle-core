import {Suppression, ValidationResponse} from '../../common/sarif.js';
import {AnnotationSuppressor} from './plugins/AnnotationSuppressor.js';
import {Suppressor} from './types.js';
import type {Resource} from '../../common/types.js';
import keyBy from 'lodash/keyBy.js';

const DEFAULT_SUPPRESSORS = [new AnnotationSuppressor()];

type SuppressOptions = {
  noInSourceSuppressions?: boolean;
  noExternalSuppressions?: boolean;
};

export class SuppressEngine {
  constructor(private suppressors: Suppressor[] = DEFAULT_SUPPRESSORS) {}

  async preload() {
    return Promise.allSettled(this.suppressors.map(s => s.preload()));
  }

  private getSuppressors(options: SuppressOptions) {
    return this.suppressors.filter(s => {
      return s.kind === 'external' ? !options.noExternalSuppressions : !options.noInSourceSuppressions;
    });
  }

  /**
   * Add suppression requests to all results.
   *
   * @remark Execution will mutate the response and add `result.suppressions`.
   * @remark If no suppressions are found, `result.suppressions` is an empty array.
   */
  async suppress(response: ValidationResponse, resources: Resource[], options: SuppressOptions = {}): Promise<void> {
    const suppressors = this.getSuppressors(options);
    if (!suppressors) {
      return;
    }

    const hasInSource = suppressors.some(s => s.kind === 'inSource');
    const resourceMap = hasInSource ? keyBy(resources, r => r.id) : {};

    for (const run of response.runs) {
      for (const problem of run.results) {
        const allSuppressions: Suppression[] = [];

        for (const suppressor of suppressors) {
          const suppressions = await suppressor.suppress(problem, run, {
            getResource() {
              const resourceId = problem.locations[1].physicalLocation?.artifactLocation.uri;
              return resourceId ? resourceMap[resourceId] : undefined;
            },
            getAllResources() {
              return resources;
            },
          });

          allSuppressions.push(...suppressions);
        }

        problem.suppressions = allSuppressions;
      }
    }
  }
}
