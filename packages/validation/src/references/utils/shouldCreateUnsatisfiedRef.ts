import {RefNode, Resource, ResourceRefsProcessingConfig} from '../../common/types.js';
import {RefMapper} from '../mappers/index.js';
import {getSiblingValue, getSiblingValues} from './GetSiblings.js';

/**
 * Checks for an optional flag to determine if an unsatisfied resourceRef should be created or not
 */
export function shouldCreateUnsatisfiedRef(
  outgoingRefMapper: RefMapper,
  config: ResourceRefsProcessingConfig,
  sourceResource: Resource,
  sourceRefNode: RefNode
) {
  if (outgoingRefMapper.source.isOptional && config.shouldIgnoreOptionalUnsatisfiedRefs) {
    const optionalValue = getSiblingValue('optional', outgoingRefMapper, sourceResource, sourceRefNode, config);
    if (optionalValue !== false) {
      return false;
    }
  }

  if (
    outgoingRefMapper.shouldCreateUnsatisfiedRef &&
    !outgoingRefMapper.shouldCreateUnsatisfiedRef(
      outgoingRefMapper,
      sourceResource,
      getSiblingValues(outgoingRefMapper, sourceResource, sourceRefNode, config)
    )
  ) {
    return false;
  }

  return true;
}
