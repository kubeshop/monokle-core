import {ValidationResponse, ValidationResult} from '@monokle/validation';
import isEqual from 'lodash.isequal';
import {useEffect, useMemo, useState} from 'react';
import {NewProblemsType, ProblemsType, ShowByFilterOptionType} from './types';
import {
  filterBySearchValue,
  selectProblemsByFilePath,
  selectProblemsByResource,
  selectProblemsByRule,
} from './utils';

let baseValidationResults: ValidationResult[] = [];

export function useCurrentAndNewProblems(
  showByFilterValue: ShowByFilterOptionType,
  validationResponse: ValidationResponse
) {
  const [newProblems, setNewProblems] = useState<NewProblemsType>({
    data: {},
    resultsCount: 0,
  });
  const [problems, setProblems] = useState<ProblemsType>({});

  const validationResults = useMemo(
    () => validationResponse.runs.flatMap(r => r.results) ?? [],
    [validationResponse]
  );

  const newResults = useNewResults(validationResults);

  useEffect(() => {
    let currentProblems: ProblemsType = {};
    let newProblems: ProblemsType = {};

    if (showByFilterValue === 'show-by-resource') {
      newProblems = selectProblemsByResource(newResults, 'error');
      currentProblems = selectProblemsByResource(validationResults, 'error');
    } else if (showByFilterValue === 'show-by-file') {
      newProblems = selectProblemsByFilePath(newResults, 'error');
      currentProblems = selectProblemsByFilePath(validationResults, 'error');
    } else if (showByFilterValue === 'show-by-rule') {
      newProblems = selectProblemsByRule(
        validationResponse,
        newResults,
        'error'
      );
      currentProblems = selectProblemsByRule(
        validationResponse,
        validationResults,
        'error'
      );
    }

    setNewProblems({data: newProblems, resultsCount: newResults.length});
    setProblems(currentProblems);
  }, [showByFilterValue]);

  return {newProblems, problems};
}

export function useNewResults(validationResults: ValidationResult[]) {
  const newResults = useMemo(
    () =>
      validationResults.filter(result => {
        const found = baseValidationResults.find(
          baseResult =>
            baseResult.ruleId === result.ruleId &&
            isEqual(baseResult.locations, result.locations)
        );
        return !found;
      }),
    [validationResults]
  );

  useEffect(() => {
    baseValidationResults = [...validationResults];
  }, [newResults]);

  return newResults;
}

export function useFilteredProblems(
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

    const currentFilteredProblems = filterBySearchValue(
      showingProblems,
      searchValue
    );
    setFilteredProblems(currentFilteredProblems);
  }, [problems, newProblems, showNewErrors, searchValue]);

  return filteredProblems;
}
