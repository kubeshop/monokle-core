import {ValidationResponse, ValidationResult} from '@monokle/validation';

import {useEffect, useMemo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {ValidationFiltersValueType, NewProblemsType, ProblemsType, GroupByFilterOptionType} from './types';
import {
  filterBySearchValue,
  filterProblems,
  selectProblemsByFilePath,
  selectProblemsByResource,
  selectProblemsByRule,
} from './utils';

let baseValidationResults: ValidationResult[] = [];

export function useCurrentAndNewProblems(
  groupByFilterValue: GroupByFilterOptionType,
  validationResponse: ValidationResponse
) {
  const [newProblems, setNewProblems] = useState<NewProblemsType>({
    data: {},
    resultsCount: 0,
  });
  const [problems, setProblems] = useState<ProblemsType>({});

  const validationResults = useMemo(() => validationResponse.runs.flatMap(r => r.results) ?? [], [validationResponse]);

  const newResults = useNewResults(validationResults);

  useEffect(() => {
    let currentProblems: ProblemsType = {};
    let newProblems: ProblemsType = {};

    if (groupByFilterValue === 'group-by-resource') {
      newProblems = selectProblemsByResource(newResults, 'all');
      currentProblems = selectProblemsByResource(validationResults, 'all');
    } else if (groupByFilterValue === 'group-by-file') {
      newProblems = selectProblemsByFilePath(newResults, 'all');
      currentProblems = selectProblemsByFilePath(validationResults, 'all');
    } else if (groupByFilterValue === 'group-by-rule') {
      newProblems = selectProblemsByRule(validationResponse, newResults, 'all');
      currentProblems = selectProblemsByRule(validationResponse, validationResults, 'all');
    }

    setNewProblems({data: newProblems, resultsCount: newResults.length});
    setProblems(currentProblems);
  }, [groupByFilterValue, validationResults]);

  return {newProblems, problems};
}

export function useNewResults(validationResults: ValidationResult[]) {
  const newResults = useMemo(
    () =>
      validationResults.filter(result => {
        const found = baseValidationResults.find(
          baseResult => baseResult.ruleId === result.ruleId && isEqual(baseResult.locations, result.locations)
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
  searchValue: string,
  filtersValue: ValidationFiltersValueType
) {
  const [filteredProblems, setFilteredProblems] = useState<ProblemsType>({});

  useEffect(() => {
    let showingProblems: ProblemsType = {};

    if (showNewErrors) {
      showingProblems = newProblems.data;
    } else {
      showingProblems = problems;
    }

    let currentFilteredProblems = filterBySearchValue(showingProblems, searchValue);
    currentFilteredProblems = filterProblems(currentFilteredProblems, filtersValue);

    const sortedFilteredProblems = Object.keys(currentFilteredProblems)
      .sort()
      .reduce((obj, key) => {
        obj[key] = currentFilteredProblems[key];
        return obj;
      }, {} as any);

    setFilteredProblems(sortedFilteredProblems);
  }, [problems, newProblems, showNewErrors, searchValue, filtersValue]);

  return filteredProblems;
}
