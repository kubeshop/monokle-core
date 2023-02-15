import {Icon} from '@/atoms';
import {Colors} from '@/styles/Colors';
import {
  ValidationResult,
  getFileId,
  getResourceLocation,
  getRuleForResult,
  ValidationResponse,
  getFileLocation,
} from '@monokle/validation';
import {ProblemsType, ShowByFilterOptionType} from './types';

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

export const getRuleInfo = (key: string) => {
  const [ruleDescription, toolComponentName, severity] = key.split('__');
  return {ruleDescription, severity: parseInt(severity), toolComponentName};
};

export const isProblemSelected = (
  selectedProblem: ValidationResult,
  currentProblem: ValidationResult,
  type: ShowByFilterOptionType
) => {
  const selectedFilePhysicalLocation = getFileLocation(selectedProblem).physicalLocation;
  const currentFileLocationPhysicalLocation = getFileLocation(currentProblem).physicalLocation;

  const selectedFileURI = selectedFilePhysicalLocation?.artifactLocation.uri;
  const selectedFileStartLine = selectedFilePhysicalLocation?.region?.startLine;
  const currentFileURI = currentFileLocationPhysicalLocation?.artifactLocation.uri;
  const currentFileStartLine = currentFileLocationPhysicalLocation?.region?.startLine;

  if (selectedProblem.ruleId !== currentProblem.ruleId) {
    return false;
  }

  if (type === 'show-by-file' || type === 'show-by-rule') {
    if (selectedFileURI === currentFileURI && selectedFileStartLine === currentFileStartLine) {
      return true;
    }
  } else if (type === 'show-by-resource') {
    if (
      getResourceName(selectedProblem) === getResourceName(currentProblem) &&
      selectedFileStartLine === currentFileStartLine
    ) {
      return true;
    }
  }

  return false;
};

export const getResourceName = (problem: ValidationResult) => getResourceLocation(problem).logicalLocations?.[0]?.name;

export const renderSeverityIcon = (severity: number, isSelected: boolean) => {
  if (severity < 4) {
    return <Icon name="severity-low" style={{color: isSelected ? Colors.grey1 : Colors.green7, fontSize: '13px'}} />;
  } else if (severity < 7) {
    return <Icon name="severity-medium" style={{color: isSelected ? Colors.grey1 : Colors.red7, fontSize: '13px'}} />;
  } else {
    return <Icon name="severity-high" style={{color: isSelected ? Colors.grey1 : Colors.red7, fontSize: '13px'}} />;
  }
};

export const getFullyQualifiedName = (problem: ValidationResult) =>
  problem.locations[1].logicalLocations?.[0].fullyQualifiedName ||
  problem.locations[0].physicalLocation?.artifactLocation.uri;

export const getItemRowId = (problem: ValidationResult, index: number) =>
  `${problem.ruleId}-${problem.message.text}-${problem.locations[0].physicalLocation?.region?.startLine}-${problem.locations[0].physicalLocation?.artifactLocation.uri}-${index}`;

export const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
