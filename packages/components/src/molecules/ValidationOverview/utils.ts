import { ValidationResult, getFileId } from "@monokle/validation";

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
