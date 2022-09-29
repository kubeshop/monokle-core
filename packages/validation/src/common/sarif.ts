import { JsonObject } from "type-fest";

/**
 * A response as defined by Static Analysis Results Interchange Format.
 *
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html
 * @see https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning
 */
export type ValidationResponse = {
  $schema: "https://json.schemastore.org/sarif-2.1.0.json";
  version: "2.1.0";
  runs: ValidationRun[];
};

export type ValidationRun = {
  tool: {
    driver: {
      name: string;
      rules: ValidationRule[];
    };
  };
  results: ValidationResult[];
};

export type ValidationLevel = "warning" | "error" | "none";

/**
 * The validation rule, aka reportingDescriptor.
 *
 * @see https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning#reportingdescriptor-object
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541274
 */
export type ValidationRule<TProperties extends JsonObject = {}> = {
  id: string;
  name: string;
  shortDescription: {
    text: string;
  };
  fullDescription: {
    text: string;
  };
  helpUri?: string;
  help: {
    text: string;
    markdown?: string;
  };

  /**
   * Optional, custom properties
   */
  properties?: GitHubProperties & TProperties;
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
  precision?: "very-high" | "high" | "medium" | "low";
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
    severity?: "error" | "warning" | "recommendation";
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
  "security-severity"?: number;
};

export type ValidationResult = {
  ruleId: string;
  rule: {
    index: number;
    toolComponent: ToolComponentReference;
  };
  level?: ValidationLevel;
  message: {
    text: string;
  };

  /**
   * The location of the error.
   *
   * [resource, file] when there is a physical file.
   * [resource] when there is no physical file (e.g. previews).
   *
   * The `uriBaseId` can be used to differentiate between resource and file.
   * This is a loose interpretation of the spec but our resources are kept in-memory
   * yet we want access to regions.
   */
  locations: [Location, Location] | [Location];
};

/**
 * @see https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html#_Toc10541313
 */
export type ToolComponentReference = {
  name: string;
};

export type Location = {
  physicalLocation?: PhysicalLocation;
  // logicalLocations?: LogicalLocation[];
};

export type PhysicalLocation = {
  artifactLocation: {
    uri: string;
    uriBaseId: "SRCROOT" | "RESOURCE";
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
  kind: "resource";
  name?: string;
  fullyQualifiedName?: string;
};
