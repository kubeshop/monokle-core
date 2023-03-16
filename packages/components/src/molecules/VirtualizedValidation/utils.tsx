import {getFileId, getRuleForResult, ValidationResponse, ValidationResult} from '@monokle/validation';
import {FiltersValueType, ProblemsType} from './types';

export const selectProblemsByRule = (
  validationResponse: ValidationResponse,
  problems: ValidationResult[],
  level: 'warning' | 'error' | 'all'
) => {
  const problemsByRule: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== 'all' && (problem.level ?? 'warning') !== level) {
      continue;
    }

    const filePath = getFileId(problem);

    if (filePath === undefined) {
      continue;
    }

    const rule = getRuleForResult(validationResponse, problem);
    // The following code creates an ID for each rule in the form of "{ruleDescription}__{toolComponentName}__{ruleSecuritySeverity}".
    // This is to ensure that each collapsible panel in the header can have the corresponding icon displayed directly.
    // The reason for this format is that the metadata for the rules does not include the associated tool component.
    const currentRule = `${rule.shortDescription.text}__${problem.rule.toolComponent.name}__${
      rule.properties?.['security-severity'] ?? 1
    }`;

    if (!problemsByRule.has(currentRule)) {
      problemsByRule.set(currentRule, []);
    }

    problemsByRule.get(currentRule)?.push(problem);
  }

  return Object.fromEntries(problemsByRule);
};

export const selectProblemsByFilePath = (problems: ValidationResult[], level: 'warning' | 'error' | 'all') => {
  const problemsByFile: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== 'all' && (problem.level ?? 'warning') !== level) {
      continue;
    }

    const filePath = getFileId(problem);

    if (filePath === undefined) {
      continue;
    }

    if (!problemsByFile.has(filePath)) {
      problemsByFile.set(filePath, []);
    }

    problemsByFile.get(filePath)?.push(problem);
  }

  return Object.fromEntries(problemsByFile);
};

export const selectProblemsByResource = (problems: ValidationResult[], level: 'warning' | 'error' | 'all') => {
  const problemsByResources: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== 'all' && (problem.level ?? 'warning') !== level) {
      continue;
    }

    const resourceName = getFullyQualifiedName(problem);

    if (resourceName === undefined) {
      continue;
    }

    if (!problemsByResources.has(resourceName)) {
      problemsByResources.set(resourceName, []);
    }

    problemsByResources.get(resourceName)?.push(problem);
  }

  return Object.fromEntries(problemsByResources);
};

export const getFullyQualifiedName = (problem: ValidationResult) =>
  problem.locations[1].logicalLocations?.[0].fullyQualifiedName ||
  problem.locations[0].physicalLocation?.artifactLocation.uri;

export const filterProblems = (problems: ProblemsType, filters: FiltersValueType) => {
  if (!filters['tool-component'] && !filters['type']) {
    return problems;
  }

  return Object.fromEntries(
    Object.entries(problems || {})
      .map(([filePath, validationResults]) => {
        let filteredValidationResults = validationResults.filter(el =>
          filters['type']
            ? el.level === filters['type']
            : true && filters['tool-component']?.length
            ? filters['tool-component'].includes(el.rule.toolComponent.name)
            : true
        );

        if (filteredValidationResults.length > 0) {
          return [filePath, filteredValidationResults];
        }

        return [];
      })
      .filter(el => el.length > 0)
  );
};

export const filterBySearchValue = (problems: ProblemsType, searchValue: string) => {
  if (!searchValue) {
    return problems;
  }

  return Object.fromEntries(
    Object.entries(problems || {})
      .map(([filePath, validationResults]) => {
        if (filePath.toLowerCase().includes(searchValue.toLowerCase())) {
          return [filePath, validationResults];
        }

        const filteredValidationResults = validationResults.filter(el =>
          el.ruleId.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filteredValidationResults.length > 0) {
          return [filePath, filteredValidationResults];
        }

        return [];
      })
      .filter(el => el.length > 0)
  );
};
