import { ValidationResult, getFileId } from "@monokle/validation";
import { ProblemsType } from "./types";

export const selectProblemsByFilePaths = (problems: ValidationResult[], level: "warning" | "error" | "all") => {
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
