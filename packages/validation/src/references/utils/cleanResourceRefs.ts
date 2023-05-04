import {RefPosition, Resource, ResourceRef} from '../../common/types.js';
import {isUnsatisfiedOwnerRef, isUnsatisfiedRef} from './helpers.js';

/**
 * Clears invalid resourceRefs from a resource after processing
 */
export function cleanResourceRefs(resources: Resource[]) {
  resources.forEach(resource => {
    const cleanRefs: ResourceRef[] = [];

    const findSatisfiedRefOnPosition = (refPos: RefPosition) => {
      return resource.refs?.find(
        ref =>
          !isUnsatisfiedRef(ref.type) &&
          !isUnsatisfiedOwnerRef(ref.type) &&
          ref.position?.column === refPos.column &&
          ref.position.line === refPos.line
      );
    };

    resource.refs?.forEach(ref => {
      let shouldPush = true;

      if (isUnsatisfiedRef(ref.type) || isUnsatisfiedOwnerRef(ref.type)) {
        if (ref.position) {
          const foundSatisfiedRefOnSamePosition = findSatisfiedRefOnPosition(ref.position);
          if (foundSatisfiedRefOnSamePosition) {
            shouldPush = false;
          }
        }
      }

      if (shouldPush) {
        cleanRefs.push(ref);
      }
    });

    resource.refs = cleanRefs.length > 0 ? cleanRefs : undefined;
  });
}
