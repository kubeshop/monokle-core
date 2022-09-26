import { Resource } from "../../common/types.js";
import { targetKindMatcher, targetGroupMatcher } from "./core.js";
import { RefMapper } from "./mappers.js";

export const roleBindingMappers: RefMapper[] = [
  // see https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#roleref-v1-rbac-authorization-k8s-io
  {
    type: "name",
    source: {
      pathParts: ["roleRef", "name"],
      siblingMatchers: {
        kind: targetKindMatcher,
        apiGroup: targetGroupMatcher,
      },
    },
    target: { kind: "$.*" },
  },
  // see https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#subject-v1-rbac-authorization-k8s-io
  {
    source: {
      pathParts: ["subjects", "*", "name"],
      siblingMatchers: {
        kind: (sourceResource: Resource, targetResource, value) => {
          if (!value) return false;
          return (
            ["User", "Group", "ServiceAccount"].includes(value) &&
            targetResource.kind === value
          );
        },
        apiGroup: (
          sourceResource: Resource,
          targetResource,
          value,
          siblingValues
        ) => {
          const apiGroup =
            value || ["User", "Group"].includes(siblingValues["kind"])
              ? "rbac.authorization.k8s.io"
              : "";
          return targetResource.apiVersion.startsWith(apiGroup);
        },
        namespace: (
          sourceResource: Resource,
          targetResource,
          value,
          siblingValues
        ) => {
          // namespace should not be specified for User/Group kinds
          if (["User", "Group"].includes(siblingValues["kind"])) {
            return !value;
          }

          return value === "default" || !value
            ? !targetResource.namespace ||
                targetResource.namespace === "default" ||
                sourceResource.namespace === targetResource.namespace
            : targetResource.namespace === value;
        },
      },
    },
    target: {
      kind: "$(User|Group|ServiceAccount)",
    },
    type: "name",

    // ignore refs to Users or Groups
    shouldCreateUnsatisfiedRef: (refMapper, sourceResource, values) => {
      const kind = values["kind"];
      return kind !== "User" && kind !== "Group";
    },
  },
];
