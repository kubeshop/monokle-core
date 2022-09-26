import { optionalExplicitNamespaceMatcher, targetKindMatcher } from "./core.js";
import { RefMapper } from "./mappers.js";

export const endpointsMappers: RefMapper[] = [
  {
    source: {
      pathParts: ["metadata", "name"],
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
