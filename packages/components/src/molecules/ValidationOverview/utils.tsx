import {Icon} from '@/atoms';
import {Colors} from '@/styles/Colors';
import {
  getFileId,
  getFileLocation,
  getResourceLocation,
  getRuleForResultV2,
  isPendingSuppression,
  isSuppressed,
  ValidationResponse,
  ValidationResult,
} from '@monokle/validation';
import {ProblemsType, GroupByFilterOptionType, ValidationFiltersValueType, ValidationListNode} from './types';

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

    const rule = getRuleForResultV2(validationResponse.runs[0], problem);
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

export const filterProblems = (
  problems: ProblemsType,
  filters: ValidationFiltersValueType,
  securityFrameworkFilter: string
) => {
  return Object.fromEntries(
    Object.entries(problems || {})
      .map(([filePath, validationResults]) => {
        let filteredValidationResults = validationResults.filter(
          el =>
            (filters['type'] ? el.level === filters['type'] : true) &&
            (filters['tool-component']?.length
              ? filters['tool-component'].includes(el.rule.toolComponent.name)
              : true) &&
            (securityFrameworkFilter !== 'all'
              ? el.taxa?.find(t => t.toolComponent.name === securityFrameworkFilter)
              : true)
        );

        if (filters.showSuppressed && !filters.showUnsuppressed) {
          filteredValidationResults = filteredValidationResults.filter(p => isSuppressed(p) || isPendingSuppression(p));
        }
        if (!filters.showSuppressed && filters.showUnsuppressed) {
          filteredValidationResults = filteredValidationResults.filter(
            p => !isSuppressed(p) && !isPendingSuppression(p)
          );
        }
        if (!filters.showSuppressed && !filters.showUnsuppressed) {
          return [];
        }

        if (!filters.showAbsent) {
          filteredValidationResults = filteredValidationResults.filter(p => p.baselineState !== 'absent');
        }

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

export const renderSeverityIcon = (severity: number, isSelected: boolean) => {
  if (severity < 4) {
    return <Icon name="severity-low" style={{color: isSelected ? Colors.grey1 : Colors.green7, fontSize: '13px'}} />;
  } else if (severity < 7) {
    return <Icon name="severity-medium" style={{color: isSelected ? Colors.grey1 : Colors.red7, fontSize: '13px'}} />;
  } else {
    return <Icon name="severity-high" style={{color: isSelected ? Colors.grey1 : Colors.red7, fontSize: '13px'}} />;
  }
};

export const getRuleInfo = (key: string) => {
  const [ruleDescription, toolComponentName, severity] = key.split('__');
  return {ruleDescription, severity: parseInt(severity), toolComponentName};
};

export const getResourceName = (problem: ValidationResult) => getResourceLocation(problem).logicalLocations?.[0]?.name;

export const isProblemSelected = (selectedProblem: ValidationResult, currentProblem: ValidationResult) => {
  return selectedProblem.fingerprints?.['monokleHash/v1'] === currentProblem.fingerprints?.['monokleHash/v1'];
};

export const getValidationList = (problems: ProblemsType, collapsedHeadersKey: string[]) => {
  if (!problems) {
    return [];
  }

  const list: ValidationListNode[] = [];

  const entries = Object.entries(problems).sort();
  for (const [key, keyProblems] of entries) {
    const collapsed = collapsedHeadersKey.indexOf(key) !== -1;

    list.push({
      type: 'header',
      label: key,
      count: keyProblems.length,
      resourceName: getResourceName(keyProblems[0]) || '',
      filePath: key.split('@').pop() || '',
      collapsed,
    });

    if (collapsed) {
      continue;
    }

    for (const problem of keyProblems) {
      list.push({type: 'problem', problem});
    }
  }

  return list;
};

export const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
