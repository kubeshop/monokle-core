import {
  implicitNamespaceMatcher,
  optionalExplicitNamespaceMatcher,
  targetKindMatcher,
} from "./core.js";
import { RefMapper } from "./mappers.js";

export const endpointSliceMappers: RefMapper[] = [
  {
    source: {
      pathParts: ["metadata", "labels", "kubernetes.io/service-name"],
      siblingMatchers: {
        namespace: implicitNamespaceMatcher,
      },
    },
    target: {
      kind: "Service",
    },
    type: "name",
  },
  {
    source: {
      pathParts: ["targetRef", "name"],
      siblingMatchers: {
        namespace: optionalExplicitNamespaceMatcher,
        kind: targetKindMatcher,
      },
    },
    target: {
      kind: "$.*",
    },
    type: "name",
  },
];
