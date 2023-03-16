import {ValidationResponse, ValidationResult} from '@monokle/validation';

export type ValidationOverviewType = {
  status: 'uninitialized' | 'loading' | 'error' | 'loaded';
  validationResponse: ValidationResponse;
  height?: number;
  skeletonStyle?: React.CSSProperties;
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
