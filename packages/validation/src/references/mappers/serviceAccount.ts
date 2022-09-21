import { implicitNamespaceMatcher, SecretTarget } from "./core.js";
import { RefMapper } from "./mappers.js";

export const serviceAccountMapper: RefMapper[] = [
  {
    source: {
      pathParts: ["secrets", "*", "name"],
      siblingMatchers: {
        kind(_source, target, value) {
          return value === undefined || target.kind === value;
        },
        apiVersion(_source, target, value) {
          return value === undefined || target.apiVersion.startsWith(value);
        },
        namespace(_source, target, value) {
          return value === undefined || target.namespace === value;
        },
        uid(_source, target, value) {
          return value === undefined || target.id === value;
        },
      },
      isOptional: true,
    },
    target: {
      kind: "Secret",
    },
    type: "name",
  },
  {
    type: "name",
    source: {
      pathParts: ["imagePullSecrets", "*", "name"],
      siblingMatchers: {
        namespace: implicitNamespaceMatcher,
      },
    },
    ...SecretTarget,
  },
];
