import { ValidationResult, getFileId, getResourceId, getResourceLocation } from "@monokle/validation";
import { ProblemsType } from "./types";

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

    const resourceName = getResourceLocation(problem).logicalLocations?.[0]?.name;

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
