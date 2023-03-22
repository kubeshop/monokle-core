import { Document, isPair, isScalar, isSeq, Scalar, visit } from "yaml";
import { getRefMappers } from "./getRefMappers.js";
import {
  RefNode,
  Resource,
  ResourceRefsProcessingConfig,
} from "../../common/types.js";
import { REF_PATH_SEPARATOR, NAME_REFNODE_PATH } from "../../constants.js";
import isEqual from "lodash/isEqual.js";

const resourceRefNodesCache = new Map<
  string,
  Record<string, RefNode[] | undefined>
>();

export function clearAllRefNodesCache() {
  resourceRefNodesCache.clear();
}

export function clearRefNodesCache(resourceId: string) {
  resourceRefNodesCache.delete(resourceId);
}

export function joinPathParts(pathParts: string[]): string {
  return pathParts.join(REF_PATH_SEPARATOR);
}

export function getResourceRefNodes(
  resource: Resource,
  config: ResourceRefsProcessingConfig
) {
  if (resourceRefNodesCache.has(resource.id)) {
    return resourceRefNodesCache.get(resource.id);
  }

  const refMappers = getRefMappers(resource);
  if (refMappers.length === 0) {
    return;
  }

  const { parsedDoc } = config.parser.parse(resource);

  const refNodes: Record<string, RefNode[] | undefined> = {};
  resourceRefNodesCache.set(resource.id, refNodes);

  traverseDocument(
    parsedDoc,
    (parentKeyPathParts, keyPathParts, key, scalar) => {
      refMappers.forEach((refMapper) => {
        const refNode = {
          scalar,
          key,
          parentKeyPath: joinPathParts(parentKeyPathParts),
        };
        if (refMapper.type === "pairs") {
          if (
            pathEndsWithPath(parentKeyPathParts, refMapper.source.pathParts) ||
            (refMapper.target.pathParts &&
              pathEndsWithPath(parentKeyPathParts, refMapper.target.pathParts))
          ) {
            addRefNodeAtPath(refNode, joinPathParts(keyPathParts), refNodes);
          }
        } else {
          if (pathEndsWithPath(keyPathParts, refMapper.source.pathParts)) {
            addRefNodeAtPath(
              refNode,
              joinPathParts(refMapper.source.pathParts),
              refNodes
            );
          }

          if (
            (refMapper.type === "path" || refMapper.type === "owner") &&
            refMapper.target.pathParts &&
            pathEndsWithPath(keyPathParts, refMapper.target.pathParts)
          ) {
            addRefNodeAtPath(
              refNode,
              joinPathParts(refMapper.target.pathParts),
              refNodes
            );
          } else if (
            refMapper.type === "name" &&
            keyPathParts.length === 2 &&
            keyPathParts[0] === "metadata" &&
            keyPathParts[1] === "name"
          ) {
            if (!refNodes[NAME_REFNODE_PATH]) {
              addRefNodeAtPath(refNode, NAME_REFNODE_PATH, refNodes);
            }
          }
        }

        const refSiblings = refMapper.source.siblingMatchers
          ? Object.keys(refMapper.source.siblingMatchers)
          : [];

        if (refMapper.source.isOptional) {
          refSiblings.push("optional");
        }

        refSiblings.forEach((sibling) => {
          const siblingPathParts = [
            ...refMapper.source.pathParts.slice(0, -1),
            sibling,
          ];
          if (pathEndsWithPath(keyPathParts, siblingPathParts)) {
            addRefNodeAtPath(
              refNode,
              joinPathParts(siblingPathParts),
              refNodes
            );
          }
        });
      });
    }
  );

  return refNodes;
}

export function traverseDocument(
  doc: Document,
  callback: (
    parentKeyPathParts: string[],
    keyPathParts: string[],
    key: string,
    scalar: Scalar
  ) => void
) {
  visit(doc, {
    Pair(_, pair, parentPath) {
      const parentKeyPathParts = getPathParts(parentPath as any);

      if (isScalar(pair.key) && isScalar(pair.value)) {
        const scalarKey = pair.key;
        const keyPathParts = [...parentKeyPathParts, scalarKey.value as string];
        const scalarValue = pair.value;

        callback(
          parentKeyPathParts,
          keyPathParts,
          scalarKey.value as string,
          scalarValue
        );
      }
    },
    Seq(index, node, path) {
      const seqPair = path[path.length - 1];

      if (isPair(seqPair)) {
        const parentKeyPathParts = getPathParts(path.slice(0, -1) as any);

        node.items.forEach((item, ix) => {
          if (isScalar(item)) {
            const scalarSeqKey = seqPair.key as Scalar;
            const keyPathParts = [
              ...parentKeyPathParts.concat([scalarSeqKey.value as string]),
              String(ix),
            ];
            callback(
              parentKeyPathParts,
              keyPathParts,
              item.value as string,
              item
            );
          }
        });
      }
    },
  });
}

function getPathParts(pathArray: any[]) {
  const pathParts: string[] = [];
  pathArray.forEach((item: any, index) => {
    if (isSeq(item) && index < pathArray.length - 1) {
      const ix = item.items.indexOf(pathArray[index + 1]);
      if (ix >= 0) {
        pathParts.push(String(ix));
      }
    } else if (isPair(item)) {
      const itemKeyScalar = item.key as Scalar;
      pathParts.push(itemKeyScalar.value as string);
    }
  });
  return pathParts;
}

function pathEndsWithPath(pathParts: string[], endPathParts: string[]) {
  if (endPathParts.length > pathParts.length) {
    return false;
  }

  for (let c = 0; c < endPathParts.length; c += 1) {
    const pathIx = pathParts.length - 1 - c;
    const endPathIx = endPathParts.length - 1 - c;

    if (
      pathParts[pathIx] !== "*" &&
      endPathParts[endPathIx] !== "*" &&
      pathParts[pathIx] !== endPathParts[endPathIx]
    ) {
      return false;
    }
  }

  return true;
}

function addRefNodeAtPath(
  refNode: RefNode,
  path: string,
  refNodesByPath: Record<string, RefNode[] | undefined>
) {
  if (refNodesByPath[path]) {
    if( !refNodesByPath[path]?.some( ref => isEqual( ref, refNode))) {
      refNodesByPath[path]?.push(refNode);
    }
  } else {
    refNodesByPath[path] = [refNode];
  }
}
