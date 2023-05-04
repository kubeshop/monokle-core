import {Resource, ResourceRefType} from '../../common/types.js';
import {areRefPosEqual} from './helpers.js';
import {NodeWrapper} from '../../common/NodeWrapper.js';

/**
 * Adds a image ref with the specified type/target to the specified resource
 */
export function createImageRef(resource: Resource, refType: ResourceRefType, refNode?: NodeWrapper) {
  if (!refNode) {
    // eslint-disable-next-line no-console
    console.warn(`missing both refNode and targetResource for refType ${refType} on resource ${resource.filePath}`);
    return;
  }

  if (!resource.refs) {
    resource.refs = [];
  }

  const [refName, refTargetTag] = (refNode.nodeValue() || '<missing>:<missing>').split(':');

  // image refs are always outgoing
  const imageRefType: ResourceRefType = ResourceRefType.Outgoing;

  // make sure we don't duplicate
  if (
    !resource.refs.some(
      ref =>
        ref.type === imageRefType &&
        ref.name === refName &&
        ref.target?.type === 'image' &&
        ref.target.tag === refTargetTag &&
        areRefPosEqual(ref.position, refNode.getNodePosition())
    )
  ) {
    resource.refs.push({
      type: imageRefType,
      name: refName,
      position: refNode.getNodePosition(),
      target: {
        type: 'image',
        tag: refTargetTag,
      },
    });
  }
}
