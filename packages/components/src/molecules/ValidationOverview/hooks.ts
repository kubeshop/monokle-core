import { ValidationResponse } from "@monokle/validation";
import { useEffect, useMemo, useState } from "react";
import { NewProblemsType, ProblemsType, ShowByFilterOptionType } from "./types";
import {
  extractNewProblems,
  filterBySearchValue,
  selectProblemsByFilePath,
  selectProblemsByResource,
  selectProblemsByRule,
} from "./utils";

let baseProblems: ProblemsType = {};

export function useGetCurrentAndNewProblems(
  showByFilterValue: ShowByFilterOptionType,
  validationResponse: ValidationResponse
) {
  const [newProblems, setNewProblems] = useState<NewProblemsType>({ data: {}, resultsCount: 0 });
  const [problems, setProblems] = useState<ProblemsType>({});

  const validationResults = useMemo(
    () => validationResponse.runs.flatMap((r) => r.results) ?? [],
    [validationResponse]
  );

  useEffect(() => {
    let currentProblems: ProblemsType = {};

    if (showByFilterValue === "show-by-resource") {
      currentProblems = selectProblemsByResource(validationResults, "error");
    } else if (showByFilterValue === "show-by-file") {
      currentProblems = selectProblemsByFilePath(validationResults, "error");
    } else if (showByFilterValue === "show-by-rule") {
      currentProblems = selectProblemsByRule(validationResponse, validationResults, "error");
    }

    if (Object.keys(baseProblems).length) {
      const foundNewProblems = extractNewProblems(baseProblems, currentProblems);
      setNewProblems({ data: foundNewProblems.newProblems, resultsCount: foundNewProblems.resultsCounter });
    }

    baseProblems = { ...currentProblems };
    setProblems(currentProblems);
  }, [showByFilterValue, validationResults]);

  return { newProblems, problems };
}

export function useGetFilteredProblems(
  problems: ProblemsType,
  newProblems: NewProblemsType,
  showNewErrors: boolean,
  searchValue: string
) {
  const [filteredProblems, setFilteredProblems] = useState<ProblemsType>({});

  useEffect(() => {
    let showingProblems: ProblemsType = {};

    if (showNewErrors) {
      showingProblems = newProblems.data;
    } else {
      showingProblems = problems;
    }

    const currentFilteredProblems = filterBySearchValue(showingProblems, searchValue);
    setFilteredProblems(currentFilteredProblems);
  }, [problems, newProblems, showNewErrors, searchValue]);

  return filteredProblems;
}
