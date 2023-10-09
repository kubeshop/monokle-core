import {ValidationResponse, ValidationResult} from '@monokle/validation';

export interface SuppressionBindings {
  onToggleSuppression?: (problem: ValidationResult) => void;
  isSuppressed?: (problem: ValidationResult) => boolean;
  isUnderReview?: (problem: ValidationResult) => boolean;
  hasPermissions?: boolean;
}

export type ValidationOverviewType = {
  status: 'uninitialized' | 'loading' | 'error' | 'loaded';
  validationResponse: ValidationResponse;
  activePlugins?: string[];
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  customMessage?: string;
  hotkeysDisabled?: boolean;
  defaultSelectError?: boolean;
  downloadSarifResponseCallback?: () => void;
  filters?: ValidationFiltersValueType;
  height?: number;
  newProblemsIntroducedType?: string;
  selectedProblem?: ValidationResult;
  groupOnlyByResource?: boolean;
  skeletonStyle?: React.CSSProperties;
  triggerValidationSettingsRedirectCallback?: () => void;
  onProblemSelect?: (payload: {problem: ValidationResult; selectedFrom: 'resource' | 'file' | 'hotkey'}) => void;
  onFiltersChange?: (filters: ValidationFiltersValueType) => void;
  onSearchCallback?: (searchValue: string) => void;
  onSecurityFrameworkFilterChange?: (securityFramework: string, from: 'dropdown' | 'tag') => void;
  onGroupByFilterChange?: (groupByFilterValue: GroupByFilterOptionType) => void;
  onConfigureRule: (problem: ValidationResult) => void;
  suppressionBindings?: SuppressionBindings;
  onProblemAutofix?: (problem: ValidationResult) => void;
  onProblemShare?: (problem: ValidationResult) => void;
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
  showSuppressed?: boolean;
  showUnsuppressed?: boolean;
  showAbsent?: boolean;
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
  baseSecurityFrameworkFilter: string;
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
