import {Suppression} from '@monokle/types';
export type {Suppression, ExternalSuppression, SuppressionStatus, SuppressionKind} from '@monokle/types';

/**
 * A response as defined by Static Analysis Results Interchange Format.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html
 * @see https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning
 */
export type ValidationResponse = {
  $schema: 'https://json.schemastore.org/sarif-2.1.0.json';
  version: '2.1.0';
  runs: ValidationRun[];
};

export type ValidationRun = {
  tool: Tool;
  originalUriBaseIds: OriginalUriBaseIds;
  invocations?: ValidationInvocation[];
  results: ValidationResult[];
  taxonomies?: Taxonomy[];
  automationDetails: RunAutomationDetails;
  baselineGuid?: string;
};

/**
 * A taxonomy, this is a toolComponent.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10540974
 */
export type Taxonomy = {
  name: string;
  version: string;
  organization?: string;
  shortDescription: {text: string};
  taxa: Taxon[];
};

export type Taxon = {
  id: string;
  name: string;
  shortDescription: Message;
  relationships?: reportingDescriptorRelationship[];
};

export type Tool = {
  driver: ToolComponent;
  extensions?: ToolPlugin[];
};

export type RunAutomationDetails = {
  guid: string;
};

export type Message = {
  text: string;
  markdown?: string;
};

/**
 * An artifact is any blob data relevant to the run.
 *
 * It can be used for configuration, policies, any output file of a validator and more.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541049
 */
export type Artifact = ConfigurationArtifact;

/**
 * A suggestion to fix a problem.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541319
 */
export type Fix = {
  description?: Message;
  artifactChanges: ArtifactChange[];
};

export type ArtifactChange = {
  artifactLocation: ArtifactLocation;
  replacements: Replacement[];
};

export type Replacement = OffsetTextualReplacement | LineTextualReplacement | BinaryReplacement;

export type OffsetTextualReplacement = {
  deletedRegion: {
    charOffset: number;
    charLength: number;
  };
  insertedContent?: {
    text: string;
  };
};

export type LineTextualReplacement = {
  deletedRegion: {
    startLine: number;
    endLine?: number; // defaults to startLine for single line delete
    endColumn?: number; // 0 for no deletion; defaults to end of line
  };
  insertedContent?: {
    text: string;
  };
};

export type BinaryReplacement = {
  deletedRegion: {
    byteOffset: number;
    byteLength: number;
  };
  insertedContent?: {
    binary: string;
  };
};

/**
 * A Monokle Validation configuration file.
 *
 * @remark Store as JSON instead YAML as it's more machine-friendly.
 * @remark Store content in-line instead file path for portability.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541049
 */
export type ConfigurationArtifact = {
  roles: ['userSpecifiedConfiguration'];
  mimeType: 'application/json';
  contents: Message;
};

/**
 * The tool component is shared for drivers, plugins, taxonomies and policies.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10540971
 */
export type ToolComponent = {
  name: string;
  rules?: RuleMetadata[];
};

/**
 * A tool component that adds additional rules.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10540971
 */
export type ToolPlugin = ToolComponent & {
  rules: RuleMetadata[];
};

/**
 * The validation rule, aka reportingDescriptor.
 *
 * @see https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning#reportingdescriptor-object
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541274
 */
export type RuleMetadata<TProperties = {}> = {
  id: string;
  name: string;
  shortDescription: Message;
  fullDescription?: Message;
  helpUri?: string;
  help: Message;
  defaultConfiguration?: RuleConfig;

  /**
   * Optional, custom properties
   */
  properties?: GitHubProperties & RuleConfigMetadata & TProperties;

  relationships?: reportingDescriptorRelationship[];
};

export type RelationshipKind = 'superset' | 'relevant';

export type reportingDescriptorRelationship = {
  target: reportingDescriptorReference;
  kinds?: RelationshipKind[];
};

export type reportingDescriptorReference = {
  id: string;
  index: number;
  toolComponent: ToolComponentReference;
};

/**
 * The configuration of a validation rule, aka reportingConfiguration.
 *
 * Configuration default is found on `run.tool.driver.rules[x].defaultConfiguration`.
 * Configuration override is found on `run.policies[x].rules[y]`.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541290
 */
export type RuleConfig = {
  /**
   * Whether the rule is enabled.
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * The level of the rule.
   *
   * @default "warning"
   */
  level?: RuleLevel;

  /**
   * The rank of the rule, used to sort the results.
   *
   * @remark GitHub has a limit of 5000 results. This property
   * might be used to drop the least important results.
   *
   * @default -1
   */
  rank?: number; // between [0, 100].

  /**
   * The custom parameters for this rule.
   *
   * The `configValue` property is used to store rule configuration.
   * The `dynamic` property is used to indicate that the rule was added dynamically (e.g. see Metadata plugin).
   *
   * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Ref508894764
   */
  parameters?: PropertyBag & {configValue?: RuleConfigMetadataAllowedValues; dynamic?: boolean};
};

export type UriBaseIds = 'SRCROOT' | 'RESOURCE' | string;
export type OriginalUriBaseIds = Record<UriBaseIds, Partial<ArtifactLocation>>;

export type RuleLevel = 'warning' | 'error';

export type ValidationInvocation = {
  ruleConfigurationOverrides: ValidationRuleConfigOverride;
};

export type ValidationRuleConfigOverride = {
  description: RuleReference;
  configuration: RuleConfig;
};

/**
 * The external configuration of validation rules.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10540976
 */
export type ValidationPolicy = {
  name: string;
  semanticVersion?: string;
  associatedComponent: ToolComponentReference;
  rules: ValidationPolicyRule[];
};

export type ValidationPolicyRule = {
  id: string;
  defaultConfiguration: RuleConfig;
};

/**
 * Object like SARIF key-value type.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Ref493408960
 */
export type PropertyBag = Record<string, any>;

/**
 * These are custom properties used by GitHub.
 *
 * @see https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning#reportingdescriptor-object
 */
export type GitHubProperties = {
  /**
   * Code scanning uses tags to allow you to filter results on GitHub.
   * For example, it is possible to filter to all results that have the tag security.
   */
  tags?: string[];

  /**
   * A string that indicates how often the results indicated by this rule are true.
   *
   * For example, if a rule has a known high false-positive rate, the precision should be low.
   * Code scanning orders results by precision on GitHub so that the results with the highest
   * level,and highest precision are shown first.
   *
   * Recommended
   */
  precision?: 'very-high' | 'high' | 'medium' | 'low';
  problem?: {
    /**
     * A string that indicates the level of severity of any alerts generated by a non-security query.
     *
     * This, with the properties.precision property, determines whether the results are displayed by
     * default on GitHub so that the results with the highest problem.severity, and highest precision
     * are shown first.
     *
     * Recommended
     */
    severity?: 'error' | 'warning' | 'recommendation';
  };

  /**
   * A string representing a score that indicates the level of severity, between 0.0 and 10.0.
   *
   * This, with the properties.precision property, determines whether the results are displayed
   * by default on GitHub so that the results with the highest security-severity, and highest
   * precision are shown first.
   *
   * Code scanning translates numerical scores as follows:
   * - over 9.0 is critical,
   * - 7.0 to 8.9 is high,
   * - 4.0 to 6.9 is medium, and
   * - 3.9 or less is low.
   *
   * Recommended.
   */
  'security-severity'?: number;
};

/**
 * These are custom types related to the config metadata of rules.
 */
export type RuleConfigMetadata = {
  configMetadata?: RuleConfigMetadataProperties;
};

export type RuleConfigMetadataProperties = {
  type: RuleConfigMetadataType;
  name: string;
};

export type RuleConfigMetadataAllowedValues = string | string[] | number | number[];

export enum RuleConfigMetadataType {
  String = 'string',
  StringArray = 'string[]',
  Number = 'number',
  NumberArray = 'number[]',
}

export type ValidationResult = {
  ruleId: string;
  rule: reportingDescriptorReference;
  taxa?: reportingDescriptorReference[];
  level?: RuleLevel;
  message: Message;
  fingerprints?: FingerPrints;
  baselineState?: BaseLineState;
  suppressions?: Suppression[];
  fixes?: Fix[];

  /**
   * The location of the error.
   *
   * [file, resource] when there is a physical file.
   *
   * File is first when possible because other SARIF consumers take the first as main location
   * and a resource uuid means nothing to these tools.
   *
   * @hint use getFileLocation and getResourceLocation from utils/sarif.ts
   */
  locations: [Location, Location];
};

export type BaseLineState = 'new' | 'unchanged' | 'updated' | 'absent';

/**
 * Fingerprints provide stable identifiers for results based on evolving hashing algorithms.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541092
 */
export type FingerPrints = {
  'monokleHash/v1': string;
};

/**
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541313
 */
export type ToolComponentReference = {
  name: string;
  index?: number;
};

/**
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541300
 */
export type RuleReference = {
  index: number;
  id: string;
};

export type Location = {
  physicalLocation?: PhysicalLocation;
  logicalLocations?: LogicalLocation[];
};

export type PhysicalLocation = {
  artifactLocation: {
    uri: string;
    uriBaseId: 'SRCROOT' | 'RESOURCE';
  };
  region?: Region;
};

export type ArtifactLocation = {
  uri: string;
  uriBaseId?: string;
  description?: Message;
}

export type Region = {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

export type LogicalLocation =
  | {
      kind: 'resource'; // custom value for our split resources
      name?: string; // the name of the resource
      fullyQualifiedName?: string; // the name with file
    }
  | {
      kind: 'element'; // recommended value for location within XML or HTML documents
      name?: string; // the property at the leaf of the path
      fullyQualifiedName?: string; // the full path
    };
