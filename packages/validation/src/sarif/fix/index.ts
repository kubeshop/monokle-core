import {ResourceParser} from '../../common/resourceParser.js';
import type {Resource} from '../../common/types.js';
import type {Fix} from '../../common/sarif.js';

export * from './plugins/DisabledSuppressor.js';

export interface Fixer {
  createFix(resource: Resource, fixedContent: any, parser: ResourceParser): Fix[];
}
