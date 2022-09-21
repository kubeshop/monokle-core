import { Resource, ResourceMapType } from "../../common/types.js";
import { isResourceRefTo } from "./helpers.js";

/*
  removes all outgoing refs on the specified resource and
  removes all incoming refs from the specified resource on all the other resources
*/
export function clearOutgoingResourceRefs(
  resource: Resource,
  resourceMap: ResourceMapType
) {
  if (!resource.refs) {
    return;
  }

  resource.refs.forEach((ref) => {
    if (
      ref.type === "outgoing" &&
      ref.target?.type === "resource" &&
      ref.target.resourceId
    ) {
      const targetResource = resourceMap[ref.target.resourceId];
      if (targetResource) {
        targetResource.refs = targetResource.refs?.filter(
          (resourceRef) =>
            resourceRef.type !== "incoming" ||
            !isResourceRefTo(resourceRef, resource.id)
        );
      }
    }
  });

  resource.refs = resource.refs.filter((ref) => ref.type === "incoming");
}
