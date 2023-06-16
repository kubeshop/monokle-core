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
  invocations?: ValidationInvocation[];
  results: ValidationResult[];
  taxonomies?: Taxonomy[];
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
  shortDescription: {text: string};
  relationships?: reportingDescriptorRelationship[];
};

export type Tool = {
  driver: ToolComponent;
  extensions?: ToolPlugin[];
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
  contents: {
    text: string;
  };
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
  shortDescription: {
    text: string;
  };
  fullDescription?: {
    text: string;
  };
  helpUri?: string;
  help: {
    text: string;
    markdown?: string;
  };
  defaultConfiguration?: RuleConfig;

  /**
   * Optional, custom properties
   */
  properties?: GitHubProperties & TProperties;

  relationships?: reportingDescriptorRelationship[];

  configurability?: RuleConfigurability;
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
   * The parameters for this rule.
   */
  parameters?: any;
};

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

export enum RuleConfigurabilityType {
  Number = 'number',
  String = 'string',
  StringArray = 'string[]',
  NumberArray = 'number[]',
}

export type RuleConfigurability = {
  type: RuleConfigurabilityType;
  name: string;
  defaultValue: number | string | string[] | number[];
}

export type ValidationResult = {
  ruleId: string;
  rule: reportingDescriptorReference;
  taxa?: reportingDescriptorReference[];
  level?: RuleLevel;
  message: {
    text: string;
  };

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

/**
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541313
 */
export type ToolComponentReference = {
  name: string;
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

export type Region = {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

export type LogicalLocation = {
  kind: 'resource';
  name?: string;
  fullyQualifiedName?: string;
};
