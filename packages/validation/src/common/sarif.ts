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
  tool: {
    driver: {
      name: string;
    };
  };
  results: ValidationResult[];
};

export type ValidationLevel = 'warning' | 'error' | 'none';

export type ValidationResult = {
  ruleId: string;
  level?: ValidationLevel;
  message: {
    text: string;
  };
  locations?: Array<{
    physicalLocation?: PhysicalLocation;
    logicalLocations?: LogicalLocation[];
  }>;
};

export type PhysicalLocation = {
  artifactLocation: {
    uri: string;
    uriBaseId?: string;
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

