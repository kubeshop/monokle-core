import {ValidationResponse, ValidationResult} from '@monokle/validation';

export type ValidationOverviewType = {
  status: 'uninitialized' | 'loading' | 'error' | 'loaded';
  validationResponse: ValidationResponse;
  activePlugins?: string[];
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  customMessage?: string;
  defaultSelectError?: boolean;
  filters?: ValidationFiltersValueType;
  height?: number;
  newProblemsIntroducedType?: string;
  selectedProblem?: ValidationResult;
  groupOnlyByResource?: boolean;
  skeletonStyle?: React.CSSProperties;
  onProblemSelect?: (payload: {problem: ValidationResult; selectedFrom: 'resource' | 'file'}) => void;
  onFiltersChange?: (filters: ValidationFiltersValueType) => void;
};

export type ValidationOverviewFiltersType = {
  activePlugins: string[];
  filtersValue: ValidationFiltersValueType;
  searchValue: string;
  onFiltersChange: (filters: ValidationFiltersValueType) => void;
  onSearch: (searchValue: string) => void;
};

export type ValidationFiltersValueType = {
  'tool-component'?: string[];
  type?: 'error' | 'warning';
};

export type ProblemsType = {
  [k: string]: ValidationResult[];
};

export type NewProblemsType = {data: ProblemsType; resultsCount: number};

export type GroupByFilterOptionType = 'group-by-file' | 'group-by-resource' | 'group-by-rule';

export type BaseDataType = {
  baseCollapsedKeys: string[];
  baseGroupByFilterValue: GroupByFilterOptionType;
  baseGroupOnlyByResource: boolean;
};

export type HeaderNode = {
  type: 'header';
  label: string;
  count: number;
  resourceName: string;
  filePath: string;
  collapsed: boolean;
};

export type ProblemNode = {
  type: 'problem';
  problem: ValidationResult;
};

export type ValidationListNode = HeaderNode | ProblemNode;
