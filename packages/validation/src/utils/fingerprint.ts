import {FingerPrints, ValidationResult} from '../common/sarif';

const DEFAULT_SEED = 1337;

export function fingerprint(result: ValidationResult): FingerPrints {
  const v1 = monokleHashV1(result);
  return {
    'monokleHash/v1': v1,
  };
}

/**
 * The hash algorithm used to provide a stable identifier to a validation result.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541092
 */
function monokleHashV1(result: ValidationResult): string {
  const tool = result.rule.toolComponent.name;
  const rule = result.rule.id;
  const resource = result.locations[1].logicalLocations?.find(l => l.kind === 'resource')?.fullyQualifiedName;
  const yamlPath = result.locations[1].logicalLocations?.find(l => l.kind === 'element')?.fullyQualifiedName;

  const stableIdentifier = `${tool}#${rule}#${resource}#${yamlPath}`;
  return fastHash(stableIdentifier);
}

/**
 * Hash the content of a string to a short, convenient identifier.
 *
 * The hash is sync and fast but inconsistent with git.
 * The hash is generated with cyrb53 which is like MurmurHash but faster and simpler at the cost of less random.
 * @see https://stackoverflow.com/a/52171480
 * @example hash("a") === "501c2ba782c97901"
 */
export function fastHash(input: string, seed = DEFAULT_SEED): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0, ch; i < input.length; i++) {
    ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const h = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return h.toString(16);
}
