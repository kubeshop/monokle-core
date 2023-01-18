import {
  ValidationResult,
  getFileId,
  getResourceLocation,
  getRuleForResult,
  ValidationResponse,
  getFileLocation,
} from "@monokle/validation";
import { ProblemsType, ShowByFilterOptionType } from "./types";

export const selectProblemsByRule = (
  validationResponse: ValidationResponse,
  problems: ValidationResult[],
  level: "warning" | "error" | "all"
) => {
  const problemsByRule: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== "all" && (problem.level ?? "warning") !== level) {
      continue;
    }

    const filePath = getFileId(problem);

    if (filePath === undefined) {
      continue;
    }

    const rule = getRuleForResult(validationResponse, problem);
    // Since the rules metadata doesn't contain also the corresponding tool component,
    // the id created is of form {ruleId}__{toolComponentName}__{ruleSecuritySeverity}
    // in order to be used for showing icons in the header directly for each collapsible panel
    const currentRule = `${problem.ruleId}__${problem.rule.toolComponent.name}__${
      rule.properties?.["security-severity"] ?? 1
    }`;

    if (!problemsByRule.has(currentRule)) {
      problemsByRule.set(currentRule, []);
    }

    problemsByRule.get(currentRule)?.push(problem);
  }

  return Object.fromEntries(problemsByRule);
};

export const selectProblemsByFilePath = (problems: ValidationResult[], level: "warning" | "error" | "all") => {
  const problemsByFile: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== "all" && (problem.level ?? "warning") !== level) {
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

export const selectProblemsByResource = (problems: ValidationResult[], level: "warning" | "error" | "all") => {
  const problemsByResources: Map<string, ValidationResult[]> = new Map();

  for (const problem of problems) {
    if (level && level !== "all" && (problem.level ?? "warning") !== level) {
      continue;
    }

    const resourceName = getResourceName(problem);

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

export const extractNewProblems = (previousProblems: ProblemsType, currentProblems: ProblemsType) => {
  let newProblems: ProblemsType = {};
  let resultsCounter = 0;

  Object.entries(currentProblems).forEach(([filePath, results]) => {
    results.forEach((result) => {
      const comparingResults = previousProblems[filePath];

      if (comparingResults?.length && !comparingResults.find((r) => r.ruleId === result.ruleId)) {
        if (!newProblems[filePath]) {
          newProblems[filePath] = [];
        }

        newProblems[filePath].push(result);
        resultsCounter += 1;
      }
    });
  });

  return { newProblems, resultsCounter };
};

export const filterBySearchValue = (problems: ProblemsType, searchValue: string) => {
  if (!searchValue) {
    return problems;
  }

  return Object.fromEntries(
    Object.entries(problems).filter(([filePath, _]) => filePath.toLowerCase().includes(searchValue.toLowerCase()))
  );
};

export const getRuleInfo = (key: string) => {
  const [ruleId, toolComponentName, severity] = key.split("__");
  return { ruleId, severity: parseInt(severity), toolComponentName };
};

export const isProblemSelected = (
  selectedProblem: ValidationResult,
  currentProblem: ValidationResult,
  type: ShowByFilterOptionType
) => {
  const selectedFileLocation = getFileLocation(selectedProblem).physicalLocation?.artifactLocation.uri;
  const currentFileLocation = getFileLocation(currentProblem).physicalLocation?.artifactLocation.uri;

  if (selectedProblem.ruleId !== currentProblem.ruleId) {
    return false;
  }

  if (type === "show-by-file" || type === "show-by-rule") {
    if (selectedFileLocation === currentFileLocation) {
      return true;
    }
  } else if (type === "show-by-resource") {
    if (getResourceName(selectedProblem) === getResourceName(currentProblem)) {
      return true;
    }
  }

  return false;
};

export const getResourceName = (problem: ValidationResult) => getResourceLocation(problem).logicalLocations?.[0]?.name;
