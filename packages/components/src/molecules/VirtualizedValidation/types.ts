import {ValidationResponse, ValidationResult} from '@monokle/validation';

export type ValidationOverviewType = {
  status: 'uninitialized' | 'loading' | 'error' | 'loaded';
  validationResponse: ValidationResponse;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  customMessage?: string;
  height?: number;
  newProblemsIntroducedType?: string;
  selectedProblem?: ValidationResult;
  showOnlyByResource?: boolean;
  skeletonStyle?: React.CSSProperties;
};

export type ValidationOverviewFiltersType = {
  filtersValue: FiltersValueType;
  searchValue: string;
  onFiltersChange: (filters: FiltersValueType) => void;
  onSearch: (searchValue: string) => void;
};

export type FiltersValueType = {
  'tool-component'?: string[];
  type?: 'error' | 'warning';
};

export type ProblemsType = {
  [k: string]: ValidationResult[];
};

export type NewProblemsType = {data: ProblemsType; resultsCount: number};

export type ShowByFilterOptionType = 'show-by-file' | 'show-by-resource' | 'show-by-rule';

export type BaseDataType = {
  baseActiveKeys: string[];
  baseShowByFilterValue: ShowByFilterOptionType;
  baseShowOnlyByResource: boolean;
};

export type HeaderNode = {
  type: 'header';
  label: string;
  count: number;
  resourceName: string;
  filePath: string;
};

export type ProblemNode = {
  type: 'problem';
  problem: ValidationResult;
};

export type ValidationListNode = HeaderNode | ProblemNode;